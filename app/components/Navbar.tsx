"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useTransitionRouter } from "./PageTransition";

interface NavLink {
  label: string;
  href: string;
  sectionId: string;
}

// Links shown specifically on the Landing Page (in-page sections)
const homeNavLinks: NavLink[] = [
  { label: "projects", href: "#projects", sectionId: "projects" },
  { label: "experience and skills", href: "#experience-skills", sectionId: "experience-skills" },
  { label: "contact", href: "#contact", sectionId: "contact" },
];

// Links shown on all Subwebpages (dedicated routes)
const subpageNavLinks: NavLink[] = [
  { label: "about me", href: "/aboutme", sectionId: "aboutme" },
  { label: "education", href: "/education", sectionId: "education" },
  { label: "projects", href: "/projects", sectionId: "projects" },
  { label: "contact me", href: "/contact", sectionId: "contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { navigateTo } = useTransitionRouter();

  const isHome = pathname === "/";
  const activeNavLinks = isHome ? homeNavLinks : subpageNavLinks;

  const [isHomeScrolled, setIsHomeScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const isVisible = !isHome || isHomeScrolled;

  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      const scrollThreshold = window.innerHeight * 0.35;
      const scrollY = window.scrollY;
      const visible = scrollY > scrollThreshold;
      setIsHomeScrolled(visible);

      if (!visible) {
        setIsOpen(false);
        setActiveSection("");
        return;
      }

      // Check if reached bottom of the page -> activate contact
      if (window.innerHeight + scrollY >= document.body.offsetHeight - 80) {
        setActiveSection("contact");
        return;
      }

      // Determine which section is active based on viewport intersection
      const triggerPoint = scrollY + window.innerHeight * 0.35;

      for (let i = homeNavLinks.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(homeNavLinks[i].sectionId);
        if (sectionEl) {
          const top = sectionEl.offsetTop;
          if (triggerPoint >= top) {
            setActiveSection(homeNavLinks[i].sectionId);
            return;
          }
        }
      }

      setActiveSection(homeNavLinks[0].sectionId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHome]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent, link: NavLink) => {
      e.preventDefault();
      setIsOpen(false);

      if (isHome) {
        const element = document.getElementById(link.sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          setActiveSection(link.sectionId);
        }
      } else {
        navigateTo(link.href);
      }
    },
    [isHome, navigateTo]
  );

  const handleGridClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsOpen(false);
      if (isHome) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigateTo("/");
      }
    },
    [isHome, navigateTo]
  );

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-out ${
        isVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="w-full bg-[#FCFDEC]/60 backdrop-blur-md border-b border-black/[0.08] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-4 flex items-center justify-between">
          {/* "grid" button on the left -> returns to landing / scrolls to top */}
          <button
            onClick={handleGridClick}
            className="font-kode text-black text-base md:text-lg font-medium tracking-tight hover:opacity-60 transition-opacity cursor-pointer focus:outline-none"
            aria-label="Back to home"
          >
            grid
          </button>

          {/* Desktop Navigation Links */}
          <nav aria-label="Desktop navigation" className="hidden md:block">
            <ul className="flex items-center gap-6 sm:gap-8 md:gap-10">
              {activeNavLinks.map((link) => {
                const isSectionActive = isHome
                  ? activeSection === link.sectionId
                  : pathname === link.href;

                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link)}
                      className={`font-kode text-xs sm:text-sm tracking-normal transition-all cursor-pointer relative py-1 focus:outline-none block ${
                        isSectionActive
                          ? "text-black font-semibold opacity-100"
                          : "text-black/60 hover:text-black opacity-80 hover:opacity-100 font-normal"
                      }`}
                    >
                      <span>{link.label}</span>
                      {isSectionActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-black rounded-full transition-all duration-200" />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Sandwich / Hamburger button (Mobile & Tablet) */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col items-center justify-center w-8 h-8 gap-1.5 cursor-pointer focus:outline-none group p-1"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <span
              className={`w-5 h-[2px] bg-black rounded-full transition-all duration-300 ease-in-out ${
                isOpen ? "rotate-45 translate-y-[7.5px]" : ""
              }`}
            />
            <span
              className={`w-5 h-[2px] bg-black rounded-full transition-all duration-200 ease-in-out ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`w-5 h-[2px] bg-black rounded-full transition-all duration-300 ease-in-out ${
                isOpen ? "-rotate-45 -translate-y-[7.5px]" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-black/[0.06] bg-[#FCFDEC]/95 ${
            isOpen ? "max-h-80 opacity-100 py-3" : "max-h-0 opacity-0 py-0 pointer-events-none"
          }`}
        >
          <nav aria-label="Mobile navigation">
            <ul className="flex flex-col px-6 divide-y divide-black/[0.04]">
              {activeNavLinks.map((link) => {
                const isSectionActive = isHome
                  ? activeSection === link.sectionId
                  : pathname === link.href;

                return (
                  <li key={link.label} className="py-2.5">
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link)}
                      className={`w-full text-left font-kode text-sm tracking-wide transition-colors cursor-pointer flex items-center justify-between ${
                        isSectionActive
                          ? "text-black font-semibold"
                          : "text-black/60 hover:text-black font-normal"
                      }`}
                    >
                      <span>{link.label}</span>
                      {isSectionActive && (
                        <span className="w-2 h-2 bg-black rounded-full" />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
