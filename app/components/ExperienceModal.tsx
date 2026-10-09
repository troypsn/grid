"use client";

import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { ExperienceItem } from "./ExperienceCard";

interface ExperienceModalProps {
  item: ExperienceItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ExperienceModal({
  item,
  isOpen,
  onClose,
}: ExperienceModalProps) {
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

  if (!shouldMount || !item || typeof document === "undefined") return null;

  // Resolve target certificate URL or local document file
  const targetUrl = item.file
    ? item.file.startsWith("/")
      ? item.file
      : `/${item.file}`
    : item.link || "";

  const hasPreview = Boolean(item.image || targetUrl);

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-experience-title"
      className={`fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/75 backdrop-blur-[4px] transition-opacity duration-600 ease-in-out ${
        isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      {/* Modal Card with slow scale & fade */}
      <div
        className={`relative w-full ${
          hasPreview ? "max-w-2xl lg:max-w-3xl" : "max-w-lg sm:max-w-xl"
        } max-h-[92vh] flex flex-col border border-black bg-[#FCFDEC] p-5 sm:p-7 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-black transition-all duration-600 ease-in-out transform ${
          isVisible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-[0.96] translate-y-3"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        {hasPreview ? (
          /* Mini Browser Header with URL and traffic lights */
          <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-black/15 shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full border border-black/40 bg-[#ff5f56]" />
              <span className="w-2.5 h-2.5 rounded-full border border-black/40 bg-[#ffbd2e]" />
              <span className="w-2.5 h-2.5 rounded-full border border-black/40 bg-[#27c93f]" />
            </div>

            <a
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 max-w-xs sm:max-w-md mx-2 px-3 py-1 bg-black/[0.04] hover:bg-black/[0.08] border border-black/20 rounded text-[10px] sm:text-[11px] font-kode text-black/75 flex items-center justify-center gap-1.5 truncate transition-colors"
              title="Open link in new tab"
            >
              <span className="opacity-60">{item.file ? "📄" : "🔒"}</span>
              <span className="truncate">{targetUrl}</span>
              <span className="text-[10px] opacity-60">↗</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="w-8 h-8 flex items-center justify-center bg-transparent border-none text-black/60 hover:text-black hover:bg-black/[0.06] rounded-sm font-kode text-lg transition-colors duration-300 ease-in-out cursor-pointer focus:outline-none -mr-1"
            >
              ✕
            </button>
          </div>
        ) : (
          /* Plain Modal Header: Category label & top-right X button */
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-black/15 shrink-0">
            <span className="font-kode text-[11px] text-black/50 uppercase tracking-wider">
              [ EXPERIENCE &amp; SKILLS ]
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="w-8 h-8 flex items-center justify-center bg-transparent border-none text-black/60 hover:text-black hover:bg-black/[0.06] rounded-sm font-kode text-lg transition-colors duration-300 ease-in-out cursor-pointer focus:outline-none -mr-1"
            >
              ✕
            </button>
          </div>
        )}

        {/* Mini Browser Preview Area (ONLY shown if file, link or image exists) */}
        {hasPreview && (
          <div className="relative w-full h-[45vh] sm:h-[50vh] min-h-[260px] bg-white border border-black/30 overflow-hidden mb-4 shrink-0">
            {item.image ? (
              <div className="relative w-full h-full bg-[#FCFDEC] flex items-center justify-center">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 768px) 100vw, 750px"
                />
              </div>
            ) : (
              <iframe
                src={targetUrl}
                title={item.title}
                className="w-full h-full border-none bg-white"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-downloads"
              />
            )}
          </div>
        )}

        {/* Details & Actions Footer */}
        <div className="space-y-3 overflow-y-auto pr-1">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <h2
              id="modal-experience-title"
              className="font-kulim text-xl sm:text-2xl font-normal text-black"
            >
              {item.title}
            </h2>
            <span className="font-kode text-xs text-black/60 font-light">
              {item.subtitle}
            </span>
          </div>

          <div className="pt-2 border-t border-black/10">
            <span className="font-kode text-xs text-black/75 block">
              <span className="font-medium text-black">Stack:</span> {item.stack}
            </span>
          </div>

          {/* Actions: Open link in new tab (if link exists) & View all education */}
          <div className="pt-3 border-t border-black/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {hasPreview && targetUrl ? (
              <a
                href={targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-black bg-transparent text-black hover:bg-black hover:text-white px-5 py-2.5 font-kode text-xs sm:text-sm tracking-wide hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-in-out cursor-pointer"
              >
                <span>Open Certificate in New Tab</span>
                <span>↗</span>
              </a>
            ) : (
              <div />
            )}

            <Link
              href="/education"
              onClick={onClose}
              className="inline-flex items-center justify-center gap-1.5 font-kulim text-xs sm:text-sm text-black/80 hover:text-black underline underline-offset-4 decoration-black/40 hover:decoration-black transition-all duration-300 ease-in-out cursor-pointer py-1"
            >
              <span>view full experience &amp; education</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
