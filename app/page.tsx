import CircularNav from "./components/CircularNav";
import Navbar from "./components/Navbar";
import ProjectsSection from "./components/ProjectsSection";
import ExperienceSkillsSection from "./components/ExperienceSkillsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
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


      <section className="relative min-h-screen flex flex-col items-center justify-center p-6 sm:p-10 z-10">
        <div className="relative z-10 text-center pointer-events-none max-w-2xl mx-auto flex flex-col items-center">
          {/* Welcome Tag */}
          <span className="font-kulim text-xs sm:text-sm text-black/60 block mb-3 font-light tracking-wide">
            welcome to grid - a personal web space
          </span>


          <h1 className="text-[clamp(1.25rem,3.2vw,2.15rem)] text-black font-kulim font-light leading-relaxed text-center max-w-xl mx-auto mb-6">
            Hi, I am Troy. A full-stack developer and a creative at heart. I like crafting digital experiences that bring out the personality of each product.
          </h1>


        </div>


        <CircularNav />
      </section>


      <ProjectsSection />


      <ExperienceSkillsSection />


      <ContactSection />


      <Footer />
    </main>
  );
}