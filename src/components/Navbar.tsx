import { useState } from "react";
import { motion } from "framer-motion";
import { profile } from "../data/content";

const NAV_ITEMS = [
  { label: "./about", href: "#about" },
  { label: "./experience", href: "#experience" },
  { label: "./projects", href: "#projects" },
  { label: "./skills", href: "#skills" },
  { label: "./contact", href: "#contact" },
] as const;

const CV_URL = `${import.meta.env.BASE_URL}${profile.cvFile}`;

export default function Navbar(props: { onTerminal: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      className="sticky top-0 z-40 border-b border-white/10 bg-cyber-bg/85 backdrop-blur-md"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5 text-sm">
        <a href="#top" className="text-white/70 transition hover:text-white">
          <span className="text-cyber-cyan">jakub</span>@kierznowski:~
        </a>

        <nav className="hidden items-center gap-5 md:flex">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} className="text-white/50 transition hover:text-cyber-cyan">
              {item.label}
            </a>
          ))}
          {/* CV stands out on purpose — the link recruiters are looking for. */}
          <a
            href={CV_URL}
            target="_blank"
            rel="noreferrer"
            className="border border-cyber-magenta/60 px-3 py-1 text-cyber-magenta transition hover:bg-cyber-magenta/10 hover:shadow-[0_0_20px_rgba(255,46,196,0.35)]"
          >
            ./CV
          </a>
          <button
            type="button"
            onClick={props.onTerminal}
            title="Open terminal (`)"
            className="border border-white/15 px-2 py-1 text-white/50 transition hover:border-cyber-cyan/60 hover:text-cyber-cyan"
          >
            &gt;_
          </button>
        </nav>

        <button
          type="button"
          className="text-white/70 md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          {menuOpen ? "[x]" : "[≡]"}
        </button>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-white/10 px-6 py-4 text-sm md:hidden">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="py-2 text-white/60 transition hover:text-cyber-cyan"
            >
              {item.label}
            </a>
          ))}
          <a
            href={CV_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-2 w-fit border border-cyber-magenta/60 px-3 py-1.5 text-cyber-magenta"
          >
            ./CV
          </a>
        </nav>
      )}
    </motion.header>
  );
}
