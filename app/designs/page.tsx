import Navbar from "../components/Navbar";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

export default function DesignsPage() {
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

      {/* Designs Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 md:px-10 lg:px-16 py-10 sm:py-16 md:py-20 w-full flex-1 flex flex-col justify-center items-center text-center">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-kulim font-light tracking-tight text-black mb-6">
          Designs - Coming Soon
        </h1>
      </div>

      {/* Contact Section */}
      <ContactSection />

      {/* Minimal Footer */}
      <Footer />
    </main>
  );
}
