import Link from "next/link";
import CircularNav from "./components/CircularNav";
import HeroText from "./components/HeroText";
import Navbar from "./components/Navbar";
import ProjectCard from "./components/ProjectCard";
import ExperienceCard from "./components/ExperienceCard";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import { projects } from "./projects/page";
import { experienceSkills } from "./education/page";

export default function Home() {
  const featuredProjects = projects.slice(0, 3);
  const featuredExperience = experienceSkills.slice(0, 3);

  return (
    <main className="relative overflow-x-hidden text-black selection:bg-black selection:text-[#FCFDEC]">
      <Navbar />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          fixed inset-0
          opacity-[0.06]
          [background-image:linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)]
          [background-size:50px_50px]
          z-0
        "
      />

      <section className="relative min-h-screen flex flex-col items-center justify-center p-5 sm:p-8 md:p-10 z-10">
        <HeroText />
        <CircularNav />
      </section>

      {/* Projects Section with regularized padding and mobile safety margin */}
      <section
        id="projects"
        className="relative z-10 py-12 sm:py-20 md:py-24 px-5 sm:px-8 md:px-10 lg:px-16 max-w-6xl mx-auto text-black"
      >
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-kulim font-light text-center text-black mb-8 sm:mb-12 md:mb-16">
          Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8 max-w-sm sm:max-w-md md:max-w-none mx-auto">
          {featuredProjects.map((project, idx) => (
            <ProjectCard key={idx} project={project} />
          ))}
        </div>

        <div className="mt-8 sm:mt-12 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 font-kulim text-xs sm:text-base text-black/80 hover:text-black underline underline-offset-4 decoration-black/40 hover:decoration-black transition-all cursor-pointer"
          >
            <span>view all projects</span>
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* Experience and Skills Section with regularized padding and mobile safety margin */}
      <section
        id="experience-skills"
        className="relative z-10 py-12 sm:py-20 md:py-24 px-5 sm:px-8 md:px-10 lg:px-16 max-w-6xl mx-auto text-black"
      >
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-kulim font-light text-center text-black mb-8 sm:mb-12 md:mb-16">
          Experience and Skills
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8 max-w-sm sm:max-w-md md:max-w-none mx-auto">
          {featuredExperience.map((item, idx) => (
            <ExperienceCard key={idx} item={item} index={idx} />
          ))}
        </div>

        <div className="mt-8 sm:mt-12 text-center">
          <Link
            href="/education"
            className="inline-flex items-center gap-1.5 font-kulim text-xs sm:text-base text-black/80 hover:text-black underline underline-offset-4 decoration-black/40 hover:decoration-black transition-all cursor-pointer"
          >
            <span>view full experience &amp; education</span>
            <span>→</span>
          </Link>
        </div>
      </section>

      <ContactSection />

      <Footer />
    </main>
  );
}