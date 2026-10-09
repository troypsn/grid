"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useTransition,
} from "react";

interface TransitionContextType {
  navigateTo: (url: string) => void;
  isExiting: boolean;
}

const TransitionContext = createContext<TransitionContextType>({
  navigateTo: () => {},
  isExiting: false,
});

export const useTransitionRouter = () => useContext(TransitionContext);

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);
  const [, startReactTransition] = useTransition();

  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setIsExiting(false);
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  const navigateTo = useCallback(
    (url: string) => {
      if (url === pathname) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      // Stage 1: Quick graceful exit dissolve
      setIsExiting(true);

      // Stage 2: Push router quickly (150ms) so new page textures load promptly
      setTimeout(() => {
        startReactTransition(() => {
          router.push(url);
        });
      }, 150);
    },
    [pathname, router]
  );

  return (
    <TransitionContext.Provider value={{ navigateTo, isExiting }}>
      <div
        key={pathname}
        className={`flex-1 flex flex-col w-full transition-all duration-300 ease-out transform ${
          isExiting
            ? "opacity-0 -translate-y-2 blur-[4px] pointer-events-none"
            : "opacity-100 translate-y-0 filter-none scale-100 animate-page-enter"
        }`}
      >
        {children}
      </div>
    </TransitionContext.Provider>
  );
}
