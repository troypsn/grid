import Link from "next/link";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden text-black selection:bg-black selection:text-[#FCFDEC] flex flex-col justify-between">
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

      {/* Top Simple Sub-Navigation */}
      <header className="relative z-10 w-full border-b border-black/10 bg-[#FCFDEC]/80 backdrop-blur-xs">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="font-kode text-xs sm:text-sm font-medium tracking-tight text-black/75 hover:text-black transition-colors flex items-center gap-1.5"
          >
            <span>←</span>
            <span>back to home</span>
          </Link>
        </div>
      </header>

      {/* Projects In-Depth Title / Body */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 py-20 w-full flex-1 flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-kulim font-light tracking-tight text-black mb-6">
          Projects
        </h1>
      </div>

      {/* Contact Section at bottom */}
      <ContactSection />

      {/* Minimal Footer */}
      <Footer />
    </main>
  );
}
