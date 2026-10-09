import Navbar from "../components/Navbar";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

export default function ContactPage() {
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

      <div className="flex-1 flex flex-col justify-center">
        <ContactSection />
      </div>

      {/* Minimal Footer */}
      <Footer />
    </main>
  );
}
