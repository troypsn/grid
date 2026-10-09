import Navbar from "../components/Navbar";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import ProjectCard, { ProjectItem } from "../components/ProjectCard";

export const projects: ProjectItem[] = [
  {
    title: "Kuwago",
    subtitle: "Android based Machine Learning Based SMS Phising Detector.",
    stack: "Kotlin, TensorFlow Lite, Python",
    image: "/Kuwago.png",
    link: "https://github.com/troypsn/kuwago",
  },
  {
    title: "Expence",
    subtitle: "Simple Interface Expense Tracking for Phones",
    stack: "React Native, Supabase",
    image: "/Expence.png",
    link: "https://github.com/troypsn/Expence-Native",
  },
  {
    title: "Lawbot",
    subtitle: "AI Helper for legal summaries and questions",
    stack: "React, PHP, MySQL, Ollama",
    image: "/Lawbot.png",
    link: "https://github.com/Minami189/LawBot",
  },
];

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen pt-16 sm:pt-20 overflow-x-hidden text-black selection:bg-black selection:text-[#FCFDEC] flex flex-col justify-between">
      {/* Top Main Navigation */}
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

      {/* Projects In-Depth Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 md:px-10 lg:px-16 py-10 sm:py-16 md:py-20 w-full flex-1 flex flex-col">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-kulim font-light tracking-tight text-black mb-8 sm:mb-12 md:mb-16 text-center">
          Projects
        </h1>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8 max-w-sm sm:max-w-md md:max-w-none mx-auto w-full">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} />
          ))}
        </div>
      </div>

      {/* Contact Section at bottom */}
      <ContactSection />

      {/* Minimal Footer */}
      <Footer />
    </main>
  );
}
