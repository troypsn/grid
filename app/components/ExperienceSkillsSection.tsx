import Link from "next/link";

interface SkillCard {
  title: string;
  subtitle: string;
  stack: string;
}

const items: SkillCard[] = [
  {
    title: "Full-Stack Development",
    subtitle: "Building responsive, accessible web applications and robust distributed APIs.",
    stack: "React, Next.js, TypeScript, Node.js, PostgreSQL",
  },
  {
    title: "UI/UX & Creative Engineering",
    subtitle: "Designing tactile design systems, spatial web graphics, and micro-interactions.",
    stack: "Figma, Tailwind CSS, Three.js, WebGL, Motion",
  },
  {
    title: "Machine Learning & Mobile",
    subtitle: "Engineering computer vision pipelines and edge ML models for Android applications.",
    stack: "Python, TensorFlow Lite, OpenCV, Kotlin, Android SDK",
  },
];

export default function ExperienceSkillsSection() {
  return (
    <section
      id="experience-skills"
      className="relative z-10 py-16 sm:py-24 px-6 sm:px-10 lg:px-16 max-w-6xl mx-auto text-black"
    >
      {/* Centered Heading */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-kulim font-light text-center text-black mb-12 sm:mb-16">
        Experience and Skills
      </h2>

      {/* 3-Column Experience and Skills Grid matching wireframe */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="border border-black bg-[#FCFDEC] p-4 sm:p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            {/* Top Placeholder Box matching wireframe */}
            <div className="w-full aspect-4/3 bg-[#D9D9D9] border border-black/30 mb-4 flex items-center justify-center p-4">
              <span className="font-kode text-xs text-black/40 uppercase tracking-wider">
                {`[ 0${idx + 1} // OVERVIEW ]`}
              </span>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <h3 className="font-kulim text-xl sm:text-2xl font-normal text-black">
                {item.title}
              </h3>
              <p className="font-kulim text-xs sm:text-sm text-black/85 leading-relaxed font-light min-h-[36px]">
                {item.subtitle}
              </p>
              <div className="pt-2 border-t border-black/10">
                <span className="font-kode text-[11px] text-black/70 block truncate">
                  Stack: {item.stack}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View More / View Full Experience & Education Link */}
      <div className="mt-10 sm:mt-12 text-center">
        <Link
          href="/education"
          className="inline-flex items-center gap-1.5 font-kulim text-sm sm:text-base text-black/80 hover:text-black underline underline-offset-4 decoration-black/40 hover:decoration-black transition-all cursor-pointer"
        >
          <span>view full experience &amp; education</span>
          <span>→</span>
        </Link>
      </div>
    </section>
  );
}
