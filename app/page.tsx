
import CircularNav from "./components/CircularNav";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden text-white">
      {/* Grid background */}
      <div
        className="
          pointer-events-none
          fixed inset-0
          opacity-4
          [background-image:linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)]
          [background-size:100px_100px]
        "
      />

      {/* Hero section with orbital nav */}
      <section className="relative min-h-screen flex flex-col items-center justify-center">
        <div className="relative z-10 text-center pointer-events-none">
          <h3 className="text-2xl text-black font-kode">
            welcome to grid - a personal web space
          </h3>
          <h1 className="text-[clamp(1.5rem,5vw,3rem)] text-black font-kulim max-w-200 p-15 text-center">
            Hi, I am Troy. A full-stack developer and a creative at heart. I
            like crafting digital experiences that bring out the personality of
            each product.
          </h1>
        </div>

        <CircularNav />
      </section>

      {/* Navigation target sections */}
      <section
        id="aboutme"
        className="min-h-screen flex items-center justify-center"
      >
        <h2 className="text-4xl text-black font-kulim">About Me</h2>
      </section>

      <section
        id="education"
        className="min-h-screen flex items-center justify-center"
      >
        <h2 className="text-4xl text-black font-kulim">Education</h2>
      </section>

      <section
        id="designs"
        className="min-h-screen flex items-center justify-center"
      >
        <h2 className="text-4xl text-black font-kulim">Designs</h2>
      </section>

      <section
        id="contact"
        className="min-h-screen flex items-center justify-center"
      >
        <h2 className="text-4xl text-black font-kulim">Contact</h2>
      </section>

      <section
        id="projects"
        className="min-h-screen flex items-center justify-center"
      >
        <h2 className="text-4xl text-black font-kulim">Projects</h2>
      </section>
    </main>
  );
}