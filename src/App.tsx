import { useEffect, useState } from "react";
import { MotionConfig, motion, useScroll } from "framer-motion";
import BootScreen from "./components/effects/BootScreen";
import HudFrame from "./components/effects/HudFrame";
import RelicGlitch from "./components/effects/RelicGlitch";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import TerminalOverlay from "./components/TerminalOverlay";
import BreachProtocol from "./components/BreachProtocol";
import AuroraLanding from "./drafts/AuroraLanding";
import LightLanding from "./drafts/LightLanding";

/** `?draft=aurora|light` renders the archived design drafts kept in src/drafts. */
function getDraftParam(): "aurora" | "light" | null {
  const value = new URLSearchParams(window.location.search).get("draft");
  return value === "aurora" || value === "light" ? value : null;
}

/** Thin cyan→yellow bar at the very top tracking scroll position. */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-cyber-cyan to-cyber-yellow"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

function Site() {
  const [bootDone, setBootDone] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [breachOpen, setBreachOpen] = useState(false);

  // Backtick opens the netdeck terminal from anywhere (unless typing in an input).
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "`" && !(event.target instanceof HTMLInputElement)) {
        event.preventDefault();
        setTerminalOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div id="site-shell" className="crt min-h-screen bg-cyber-bg font-mono text-white">
      <BootScreen onDone={() => setBootDone(true)} />
      <ScrollProgress />
      <HudFrame />
      <RelicGlitch />
      <Navbar onTerminal={() => setTerminalOpen(true)} />
      <main>
        <Hero start={bootDone} onBreach={() => setBreachOpen(true)} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <TerminalOverlay
        open={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onBreach={() => {
          setTerminalOpen(false);
          setBreachOpen(true);
        }}
      />
      <BreachProtocol open={breachOpen} onClose={() => setBreachOpen(false)} />
    </div>
  );
}

export default function App() {
  const draft = getDraftParam();

  return (
    <MotionConfig reducedMotion="user">
      {draft === "aurora" && <AuroraLanding />}
      {draft === "light" && <LightLanding />}
      {draft === null && <Site />}

      {draft !== null && (
        <a
          href={import.meta.env.BASE_URL}
          className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full border border-white/20 bg-zinc-900/90 px-4 py-2 font-mono text-sm text-white/80 shadow-2xl backdrop-blur-md transition hover:text-white"
        >
          draft preview — back to live site →
        </a>
      )}
    </MotionConfig>
  );
}
