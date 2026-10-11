import Navbar from "../components/Navbar";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen pt-16 sm:pt-20 overflow-x-hidden text-black selection:bg-black selection:text-[#FCFDEC] flex flex-col justify-between">
      {/* Top Main Navigation */}
      <Navbar />

      <div className="flex-1 flex flex-col justify-center">
        <ContactSection />
      </div>

      {/* Minimal Footer */}
      <Footer />
    </main>
  );
}
