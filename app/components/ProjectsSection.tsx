"use client";

import Image from "next/image";
import Link from "next/link";

interface ProjectItem {
  title: string;
  subtitle: string;
  stack: string;
  image?: string;
  link?: string;
}

const projects: ProjectItem[] = [
  {
    title: "Kuwago",
    subtitle: "Android based Machine Learning Based Smoking Detection.",
    stack: "Kotlin, TensorFlow Lite, Python, OpenCV",
    image: "/tandem_preview.jpg",
    link: "https://github.com/troypsn",
  },
  {
    title: "Tandem",
    subtitle: "Collaborative expense telemetry and split management platform.",
    stack: "Next.js, TypeScript, Tailwind CSS, Supabase",
    image: "/forge_preview.jpg",
    link: "https://github.com/troypsn",
  },
  {
    title: "Aetheria",
    subtitle: "Real-time interactive 3D WebGL soundscape playground.",
    stack: "Three.js, Web Audio API, TypeScript, GLSL",
    image: "/aetheria_preview.jpg",
    link: "https://github.com/troypsn",
  },
];

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative z-10 py-16 sm:py-24 px-6 sm:px-10 lg:px-16 max-w-6xl mx-auto text-black"
    >
      {/* Centered Heading */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-kulim font-light text-center text-black mb-12 sm:mb-16">
        Projects
      </h2>

      {/* 3-Column Projects Grid matching wireframe */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {projects.map((project, idx) => (
          <a
            key={idx}
            href={project.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="group block border border-black bg-[#FCFDEC] p-4 sm:p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            {/* Top Thumbnail Box */}
            <div className="relative w-full aspect-4/3 bg-[#D9D9D9] border border-black/30 overflow-hidden mb-4 flex items-center justify-center">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
              ) : (
                <div className="w-full h-full bg-[#D4D4D8]" />
              )}
            </div>

            {/* Content matching wireframe */}
            <div className="space-y-2">
              <h3 className="font-kulim text-xl sm:text-2xl font-normal text-black group-hover:underline underline-offset-2">
                {project.title}
              </h3>
              <p className="font-kulim text-xs sm:text-sm text-black/85 leading-relaxed font-light min-h-[36px]">
                {project.subtitle}
              </p>
              <div className="pt-2 border-t border-black/10">
                <span className="font-kode text-[11px] text-black/70 block truncate">
                  Stack: {project.stack}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* View More / View All Projects Link */}
      <div className="mt-10 sm:mt-12 text-center">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 font-kulim text-sm sm:text-base text-black/80 hover:text-black underline underline-offset-4 decoration-black/40 hover:decoration-black transition-all cursor-pointer"
        >
          <span>view all projects</span>
          <span>→</span>
        </Link>
      </div>
    </section>
  );
}
