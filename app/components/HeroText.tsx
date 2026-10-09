"use client";

import { useEffect, useState } from "react";

export default function HeroText() {
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    // Stage 1: Main Title
    const t1 = setTimeout(() => setStage(1), 40);
    // Stage 2: Hero Bio Description
    const t2 = setTimeout(() => setStage(2), 160);
    // Stage 3: Subtitle
    const t3 = setTimeout(() => setStage(3), 300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="relative z-10 text-center pointer-events-none max-w-2xl mx-auto flex flex-col items-center">
      {/* Stage 1: Name / Title */}
      <h1
        className={`text-[clamp(2.5rem,5vw,4rem)] text-black font-kulim font-light leading-tight sm:leading-relaxed text-center max-w-xl mx-auto mb-2 sm:mb-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
          stage >= 1
            ? "opacity-100 translate-y-0 filter-none"
            : "opacity-0 translate-y-3 blur-[6px]"
        }`}
      >
        Troy Pineda
      </h1>

      {/* Stage 2: Description */}
      <p
        className={`text-[clamp(1.15rem,3.2vw,2.15rem)] text-black font-kulim font-light text-center max-w-2xl mx-auto mb-5 sm:mb-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
          stage >= 2
            ? "opacity-100 translate-y-0 filter-none"
            : "opacity-0 translate-y-3 blur-[6px]"
        }`}
      >
        A full-stack developer and a creative at heart. I like crafting digital experiences that bring out the personality of each product.
      </p>

      {/* Stage 3: Subtitle / Welcome */}
      <span
        className={`font-kulim text-xs sm:text-sm text-black/60 block font-light tracking-wide transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
          stage >= 3
            ? "opacity-100 translate-y-0 filter-none"
            : "opacity-0 translate-y-2 blur-[4px]"
        }`}
      >
        welcome to grid - a personal web space
      </span>
    </div>
  );
}
