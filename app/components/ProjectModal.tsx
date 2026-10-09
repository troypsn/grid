"use client";

import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { ProjectItem } from "./ProjectCard";

interface ProjectModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({
  project,
  isOpen,
  onClose,
}: ProjectModalProps) {
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);

      const timer = setTimeout(() => {
        setIsRendered(true);
        setIsVisible(true);
      }, 10);

      return () => {
        clearTimeout(timer);
      };
    } else {
      document.body.style.overflow = "";

      const fadeTimer = setTimeout(() => {
        setIsVisible(false);
      }, 0);

      const unmountTimer = setTimeout(() => {
        setIsRendered(false);
      }, 600);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(unmountTimer);
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, handleKeyDown]);

  const shouldMount = isOpen || isRendered;

  if (!shouldMount || !project || typeof document === "undefined") return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className={`fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/75 backdrop-blur-[4px] transition-opacity duration-600 ease-in-out ${
        isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      {/* Modal Card with slow scale & fade */}
      <div
        className={`relative w-full max-w-xl md:max-w-2xl max-h-[88vh] overflow-y-auto border border-black bg-[#FCFDEC] p-5 sm:p-7 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-black transition-all duration-600 ease-in-out transform ${
          isVisible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-[0.96] translate-y-3"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar: X button placed cleanly at the top right above the picture */}
        <div className="flex items-center justify-end pb-3 mb-1">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 flex items-center justify-center bg-transparent border-none text-black/60 hover:text-black hover:bg-black/[0.06] rounded-sm font-kode text-lg transition-colors duration-300 ease-in-out cursor-pointer focus:outline-none -mr-1"
          >
            ✕
          </button>
        </div>

        {/* Project Image */}
        <div className="relative w-full aspect-16/10 sm:aspect-16/9 bg-[#D9D9D9] border border-black/30 overflow-hidden mb-5 flex items-center justify-center">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 650px"
              priority
            />
          ) : (
            <div className="w-full h-full bg-[#D4D4D8]" />
          )}
        </div>

        {/* Details: Title, Subtitle, Tech Stack */}
        <div className="space-y-3 sm:space-y-4">
          <h2
            id="modal-project-title"
            className="font-kulim text-2xl sm:text-3xl font-normal text-black"
          >
            {project.title}
          </h2>

          <p className="font-kulim text-xs sm:text-sm md:text-base text-black/85 leading-relaxed font-light">
            {project.subtitle}
          </p>

          <div className="pt-3 border-t border-black/10">
            <span className="font-kode text-xs sm:text-sm text-black/75 block">
              <span className="font-medium text-black">Stack:</span> {project.stack}
            </span>
          </div>

          {/* Actions: GitHub link & View Other Projects */}
          <div className="pt-4 sm:pt-5 border-t border-black/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
            <a
              href={project.link || "https://github.com/troypsn"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-black bg-transparent text-black hover:bg-black hover:text-white px-5 py-2.5 font-kode text-xs sm:text-sm tracking-wide hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-in-out cursor-pointer"
            >
              <span>View GitHub Repo</span>
              <span>↗</span>
            </a>

            <Link
              href="/projects"
              onClick={onClose}
              className="inline-flex items-center justify-center gap-1.5 font-kulim text-xs sm:text-sm text-black/80 hover:text-black underline underline-offset-4 decoration-black/40 hover:decoration-black transition-all duration-300 ease-in-out cursor-pointer py-1"
            >
              <span>view other projects</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
