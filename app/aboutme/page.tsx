import Navbar from "../components/Navbar";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import Carousel, { CarouselItem } from "../components/Carousel";

const aboutImages: CarouselItem[] = [
  {
    src: "/troy.jpg",
    alt: "Projects",
  },
  {
    src: "/discussion.png",
    alt: "Troy",
  },
  {
    src: "/defense.jpg",
    alt: "Workspace",
  },
];

export default function AboutMePage() {
  return (
    <main className="relative min-h-screen pt-16 sm:pt-20 overflow-x-hidden text-black selection:bg-black selection:text-[#FCFDEC] flex flex-col justify-between">
      {/* Top Main Navigation */}
      <Navbar />

      {/* Background grid */}
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

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 md:px-10 lg:px-16 py-10 sm:py-16 md:py-20 w-full flex-1 flex flex-col justify-center">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-kulim font-light tracking-tight text-black mb-8 sm:mb-12 md:mb-16 text-center">
          About Me
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
          <div id="imageScrollerContainer" className="w-full flex justify-center">
            <Carousel images={aboutImages} />
          </div>

          <div id="textContent" className="w-full flex flex-col gap-5 sm:gap-6 text-left">
            <p className="font-kulim text-base sm:text-lg lg:text-xl text-black leading-relaxed font-light">
              Hey! I&apos;m Troy, I started from designing simple posters to making web
              designs and eventually even developing websites! I have always been
              curious in how different types of software work and wanted to pursue a
              career that dabbled in making them and designing them.
            </p>

            <p className="font-kulim text-base sm:text-lg lg:text-xl text-black leading-relaxed font-light">
              Fast forward to today, I had the privilege of working as a lead UI/UX
              designer and front-end developer on my school projects and practiced
              collaborative effort with my schoolmates in developing projects from
              simple portfolios to more complex machine learning based applications.
            </p>
          </div>
        </div>
      </div>

      <ContactSection />
      <Footer />
    </main>
  );
}
