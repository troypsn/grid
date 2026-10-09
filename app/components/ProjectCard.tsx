"use client";

import { useState } from "react";
import Image from "next/image";
import ProjectModal from "./ProjectModal";

export interface ProjectItem {
  title: string;
  subtitle: string;
  stack: string;
  image?: string;
  link?: string;
}

interface ProjectCardProps {
  project: ProjectItem;
}

export default function ProjectCard({ project }: ProjectCardProps) {
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
        {/* Top Thumbnail Box with safety ratio on mobile */}
        <div className="relative w-full aspect-16/10 sm:aspect-4/3 bg-[#D9D9D9] border border-black/30 overflow-hidden mb-3.5 sm:mb-4 flex items-center justify-center">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, 320px"
            />
          ) : (
            <div className="w-full h-full bg-[#D4D4D8]" />
          )}
        </div>

        {/* Content */}
        <div className="space-y-1.5 sm:space-y-2">
          <h3 className="font-kulim text-lg sm:text-xl md:text-2xl font-normal text-black group-hover:underline underline-offset-2">
            {project.title}
          </h3>
          <p className="font-kulim text-xs sm:text-sm text-black/85 leading-relaxed font-light min-h-0 sm:min-h-[36px]">
            {project.subtitle}
          </p>
          <div className="pt-2 border-t border-black/10">
            <span className="font-kode text-[10px] sm:text-[11px] text-black/70 block truncate">
              Stack: {project.stack}
            </span>
          </div>
        </div>
      </div>

      <ProjectModal
        project={project}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
