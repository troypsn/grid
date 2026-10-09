"use client";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 border-t border-black/10 py-12 px-6 sm:px-10 lg:px-16 text-black">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-kulim text-xs text-black/60 font-light">
          © 2026 Troy Pineda. All rights reserved.
        </span>

        <button
          onClick={scrollToTop}
          className="font-kulim text-xs text-black/70 hover:text-black underline underline-offset-4 cursor-pointer focus:outline-none"
        >
          back to top ↑
        </button>
      </div>
    </footer>
  );
}
