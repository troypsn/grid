import Navbar from "../components/Navbar";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import ExperienceCard, { ExperienceItem } from "../components/ExperienceCard";

export const experienceSkills: ExperienceItem[] = [
  {
    title: "Legacy Responsive Web Design",
    subtitle: "freeCodeCamp.org",
    stack: "HTML5, CSS3, Flexbox, CSS Grid, Responsive Design",
    link: "https://www.freecodecamp.org/certification/troypsn/responsive-web-design",
  },
  {
    title: "Python Essentials 1 and 2",
    subtitle: "Cisco Networking Academy",
    stack: "Python",
    file: "python1.pdf",
    link: "/python1.pdf",
  },
  {
    title: "Machine Learning & Mobile",
    subtitle: "Edge ML & Android SDK",
    stack: "Python, TensorFlow Lite, OpenCV, Kotlin, Android SDK",
  },
];

export default function EducationPage() {
  return (
    <main className="relative min-h-screen pt-16 sm:pt-20 overflow-x-hidden text-black selection:bg-black selection:text-[#FCFDEC] flex flex-col justify-between">
      {/* Top Main Navigation */}
      <Navbar />

      {/* Subtle Yellow Grid Paper Background Texture */}
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

      {/* Education & Experience In-Depth Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 md:px-10 lg:px-16 py-10 sm:py-16 md:py-20 w-full flex-1 flex flex-col">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-kulim font-light tracking-tight text-black mb-8 sm:mb-12 md:mb-16 text-center">
          Education &amp; Experience
        </h1>

        {/* Experience & Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8 max-w-sm sm:max-w-md md:max-w-none mx-auto w-full">
          {experienceSkills.map((item, idx) => (
            <ExperienceCard key={idx} item={item} index={idx} />
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <ContactSection />

      {/* Minimal Footer */}
      <Footer />
    </main>
  );
}
