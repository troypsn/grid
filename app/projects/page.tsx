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
    roles: "UI/UX Designer, Front-End Developer, Database Management",
    design: "https://www.figma.com/design/xeuxeKhCXMECOUwv51gFYn/KUWAGO?t=2T53AIRrSr6MB9K8-1"
  },
  {
    title: "Expence",
    subtitle: "Simple Interface Expense Tracking for Phones",
    stack: "React Native, Supabase",
    image: "/Expence.png",
    link: "https://github.com/troypsn/Expence-Native",
    roles: "UI/UX Designer, Fullstack Developer, Database Management",
    design: "https://www.figma.com/design/GduiKgBfrJei4hdWWDMUI1/xpence?t=2T53AIRrSr6MB9K8-1",
  },
  {
    title: "Lawbot",
    subtitle: "AI Helper for legal summaries and questions",
    stack: "React, PHP, MySQL, Ollama",
    image: "/Lawbot.png",
    link: "https://github.com/Minami189/LawBot",
    design: "https://www.figma.com/design/NsVSDkTkvfshvJeanWmeaz/WEBSYS-313?node-id=0-1&t=2T53AIRrSr6MB9K8-1",
    roles: "UI/UX Designer, Front-end Developer"
  },
  {
    title: "Jotty",
    subtitle: "Note Taking Application with AI Quiz and Multiplayer",
    stack: "Mit App Inventor, TinyDB",
    image: "/jotty.png",
    roles: "UI/UX Designer, Front-end Developer"
  },
  {
    title: "dhvsuSMS",
    subtitle: "Mobile Application based on the SMS Portal of DHVSU",
    stack: "B4a, Supabase",
    image: "/dhvsuSMS.png",
    roles: "UI/UX Designer, Front-End Developer",
  },
  {
    title: "GeloPOS",
    subtitle: "AI Helper for legal summaries and questions",
    stack: "ReactNative, Supabase",
    image: "/gelopos.png",
    roles: "UI/UX Designer, Front-End Developer, Backend Developer, Database Management",
    design: "https://www.figma.com/design/hjleeXgixHX5dEs2I1ucyR/GeloPOS?node-id=0-1&t=GbBVYKDYaZfUzDYy-1",
  },
  
];

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen pt-16 sm:pt-20 overflow-x-hidden text-black selection:bg-black selection:text-[#FCFDEC] flex flex-col justify-between">
   
      <Navbar />

    
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 md:px-10 lg:px-16 py-10 sm:py-16 md:py-20 w-full flex-1 flex flex-col">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-kulim font-light tracking-tight text-black mb-8 sm:mb-12 md:mb-16 text-center">
          Projects
        </h1>

       
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
