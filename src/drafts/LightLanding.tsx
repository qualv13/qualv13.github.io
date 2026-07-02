import { motion, type Variants } from "framer-motion";
import { profile, coreStack } from "../data/content";
import { GitHubIcon, LinkedInIcon, MailIcon } from "../components/icons";

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Soft pastel blob drifting behind the content. */
function PastelBlob(props: { className: string; duration: number }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-[110px] ${props.className}`}
      animate={{ x: [0, 40, -30, 0], y: [0, -30, 25, 0] }}
      transition={{ duration: props.duration, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

/** White card with soft shadow floating around the hero on large screens. */
function FloatingCard(props: {
  className: string;
  delay: number;
  emoji: string;
  title: string;
  sub: string;
}) {
  return (
    <motion.div
      className={`absolute hidden lg:block ${props.className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: props.delay, duration: 0.7 }}
    >
      <motion.div
        className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white/80 px-5 py-3.5 shadow-xl shadow-violet-200/50 backdrop-blur-md"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: props.delay }}
      >
        <span className="text-xl">{props.emoji}</span>
        <div>
          <p className="font-display text-sm font-semibold text-lite-ink">{props.title}</p>
          <p className="text-xs text-black/45">{props.sub}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function LightLanding() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-lite-bg text-lite-ink">
      {/* --- background blobs --- */}
      <PastelBlob className="left-[-8%] top-[-10%] h-[30rem] w-[30rem] bg-violet-300/60" duration={17} />
      <PastelBlob className="right-[-10%] top-[10%] h-[28rem] w-[28rem] bg-cyan-300/50" duration={21} />
      <PastelBlob className="bottom-[-20%] left-[35%] h-[26rem] w-[26rem] bg-rose-300/40" duration={24} />

      {/* --- floating pill nav --- */}
      <motion.header
        className="relative z-10 mx-auto mt-6 flex items-center gap-1 rounded-full border border-black/5 bg-white/70 px-2 py-2 shadow-lg shadow-violet-200/40 backdrop-blur-md"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <a href="#" className="rounded-full bg-lite-ink px-4 py-1.5 font-display text-sm font-bold text-white">
          JK
        </a>
        {["Projects", "Experience", "Skills", "Contact"].map((item) => (
          <a
            key={item}
            href="#"
            className="hidden rounded-full px-4 py-1.5 text-sm text-black/60 transition hover:bg-black/5 hover:text-black md:block"
          >
            {item}
          </a>
        ))}
      </motion.header>

      {/* --- hero --- */}
      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center px-6 pt-16 text-center md:pt-20">
        <FloatingCard className="left-2 top-40 xl:left-8" delay={1.1} emoji="💼" title="IBM Software Lab" sub="SWE Intern · 2026" />
        <FloatingCard className="right-2 top-32 xl:right-8" delay={1.35} emoji="🥇" title="HackYeah 2025" sub="TOP 8 of 65+ projects" />
        <FloatingCard className="bottom-28 right-6 xl:right-16" delay={1.6} emoji="🕸️" title="Neo4j Certified" sub="graph data professional" />

        <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col items-center">
          <motion.div
            variants={fadeUp}
            className="mb-7 rounded-full border border-violet-200 bg-white/70 px-4 py-1.5 text-sm text-black/70 shadow-sm backdrop-blur-md"
          >
            ✦ {profile.availability}
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="max-w-3xl font-display text-5xl font-bold tracking-tight md:text-6xl"
          >
            I build production-grade{" "}
            <span className="text-gradient-animated bg-gradient-to-r from-violet-600 via-cyan-500 to-rose-500">
              Java backends
            </span>
            .
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 text-lg font-medium text-black/70">
            {profile.name} — {profile.role}
          </motion.p>
          <motion.p variants={fadeUp} className="mt-1 text-sm text-black/45">
            {profile.education} · {profile.location}
          </motion.p>

          <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-balance text-black/55">
            {profile.tagline}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <motion.a
              href="#"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full bg-lite-ink px-7 py-3 font-medium text-white shadow-lg transition hover:shadow-xl"
            >
              View Projects →
            </motion.a>
            <motion.a
              href={`mailto:${profile.email}`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full border border-black/15 bg-white/70 px-7 py-3 font-medium text-black/80 backdrop-blur-md transition hover:border-black/40"
            >
              Get in touch
            </motion.a>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-9 flex items-center gap-5 text-black/40">
            <a href={profile.links.github} target="_blank" rel="noreferrer" className="transition hover:text-violet-600" aria-label="GitHub">
              <GitHubIcon className="size-5" />
            </a>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="transition hover:text-violet-600" aria-label="LinkedIn">
              <LinkedInIcon className="size-5" />
            </a>
            <a href={`mailto:${profile.email}`} className="transition hover:text-violet-600" aria-label="Email">
              <MailIcon className="size-5" />
            </a>
          </motion.div>
        </motion.div>
      </main>

      {/* --- tech marquee --- */}
      <motion.footer
        className="relative z-10 mt-14 w-full overflow-hidden border-t border-black/5 bg-white/50 py-4 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="marquee-track flex w-max items-center gap-10 pr-10">
          {[...coreStack, ...coreStack].map((tech, i) => (
            <span key={`${tech}-${i}`} className="font-display text-sm font-medium text-black/35">
              {tech} <span className="ml-9 text-violet-400">·</span>
            </span>
          ))}
        </div>
      </motion.footer>
    </div>
  );
}
