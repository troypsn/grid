"use client";

export default function ContactSection() {
  const socials = [
    { label: "github", handle: "@troypsn", href: "https://github.com/troypsn" },
    { label: "linkedin", handle: "@Troy Pineda", href: "https://www.linkedin.com/in/troy-pineda-2a0a61441/" },
    { label: "instagram", handle: "@taskykopi", href: "https://www.instagram.com/tastykopi/" },
    { label: "email", handle: "troy.arcilla.pineda@gmail.com", href: "mailto:troy.arcilla.pineda@gmail.com" },
  ];

  return (
    <section
      id="contact"
      className="relative z-10 py-20 sm:py-28 px-6 sm:px-10 lg:px-16 max-w-4xl mx-auto text-black"
    >

      <div className="text-center space-y-5 mb-14 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-kulim font-light text-black tracking-tight">
          lets connect &amp; collaborate.
        </h2>

        <div className="space-y-3 max-w-xl mx-auto font-kulim text-sm sm:text-base text-black/85 leading-relaxed font-light">
          <p>
            I&apos;m currently a student exploring web development, creative design, and machine learning. Always excited to learn, build fun side projects, or explore internship opportunities.
          </p>
          <p>
            Got a project idea, want to collaborate, or just want to say hi? Feel free to reach out anytime!
          </p>
        </div>
      </div>


      <div className="max-w-md mx-auto pt-8 border-t border-black/15">
        <h3 className="font-kulim text-base font-semibold text-black mb-6">
          contact
        </h3>

        <div className="space-y-3 font-kulim text-sm sm:text-base">
          {socials.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-1 border-b border-black/5 hover:border-black/20 transition-colors"
            >
              <span className="text-black/70 lowercase font-light">
                {item.label}
              </span>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black font-normal hover:underline underline-offset-2 transition-all"
              >
                {item.handle}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
