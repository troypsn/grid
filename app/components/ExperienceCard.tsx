"use client";

import { useState } from "react";
import ExperienceModal from "./ExperienceModal";

export interface ExperienceItem {
  title: string;
  subtitle: string;
  stack: string;
  link?: string;
  file?: string;
  image?: string;
}

interface ExperienceCardProps {
  item: ExperienceItem;
  index?: number;
}

export default function ExperienceCard({ item }: ExperienceCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsModalOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsModalOpen(true);
          }
        }}
        className="group text-left block w-full border border-black bg-[#FCFDEC] p-3.5 sm:p-5 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:scale-[1.01] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
      >
        {/* Content */}
        <div className="space-y-1.5 sm:space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-kulim text-lg sm:text-xl md:text-2xl font-normal text-black group-hover:underline underline-offset-2">
              {item.title}
            </h3>
            <span className="font-kode text-xs text-black/40 group-hover:text-black transition-colors">
              ↗
            </span>
          </div>

          <p className="font-kulim text-xs sm:text-sm text-black/85 leading-relaxed font-light min-h-0 sm:min-h-[36px]">
            {item.subtitle}
          </p>

          <div className="pt-2 border-t border-black/10">
            <span className="font-kode text-[10px] sm:text-[11px] text-black/70 block truncate">
              Stack: {item.stack}
            </span>
          </div>
        </div>
      </div>

      <ExperienceModal
        item={item}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
