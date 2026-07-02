import { motion, type Variants } from "framer-motion";
import { profile, highlights } from "../data/content";
import { GitHubIcon, LinkedInIcon, MailIcon } from "../components/icons";

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Blurred gradient orb that slowly drifts around the background. */
function GlowBlob(props: {
  className: string;
  path: { x: number[]; y: number[] };
  duration: number;
}) {
  return (
    <motion.div
      className={`absolute rounded-full blur-[130px] ${props.className}`}
      animate={{ x: props.path.x, y: props.path.y, scale: [1, 1.15, 0.95, 1] }}
      transition={{ duration: props.duration, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

/** Small glass card floating beside the hero on large screens. */
function FloatingCard(props: {
  className: string;
  delay: number;
  dot: string;
  title: string;
  sub: string;
}) {
  return (
    <motion.div
      className={`absolute hidden lg:block ${props.className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: props.delay, duration: 0.8 }}
    >
      <motion.div
        className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-md"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: props.delay }}
      >
        <div className="flex items-center gap-2.5">
          <span className={`size-2 rounded-full ${props.dot}`} />
          <p className="font-display text-sm font-semibold text-white">{props.title}</p>
        </div>
        <p className="mt-1 pl-[18px] text-xs text-white/50">{props.sub}</p>
      </motion.div>
    </motion.div>
  );
}

export default function AuroraLanding() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-aurora-bg text-white">
      {/* --- background layers --- */}
      <div className="absolute inset-0 aurora-grid" />
      <GlowBlob
        className="left-[-10%] top-[-15%] h-[34rem] w-[34rem] bg-aurora-violet/40"
        path={{ x: [0, 70, -30, 0], y: [0, 40, -20, 0] }}
        duration={19}
      />
      <GlowBlob
        className="right-[-12%] top-[15%] h-[30rem] w-[30rem] bg-aurora-cyan/30"
        path={{ x: [0, -60, 30, 0], y: [0, 50, -30, 0] }}
        duration={23}
      />
      <GlowBlob
        className="bottom-[-25%] left-[30%] h-[28rem] w-[28rem] bg-aurora-pink/25"
        path={{ x: [0, 50, -50, 0], y: [0, -40, 20, 0] }}
        duration={26}
      />

      {/* --- nav --- */}
      <motion.header
        className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-5"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <a href="#" className="font-display text-xl font-bold tracking-tight">
          <span className="text-gradient-animated bg-gradient-to-r from-aurora-violet via-aurora-cyan to-aurora-pink">
            JK
          </span>
          <span className="text-white/40">.dev</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-white/60 md:flex">
          {["Projects", "Experience", "Skills", "Contact"].map((item) => (
            <a key={item} href="#" className="transition hover:text-white">
              {item}
            </a>
          ))}
        </nav>
        <a
          href={`mailto:${profile.email}`}
          className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm backdrop-blur-md transition hover:border-aurora-cyan/60 hover:text-aurora-cyan"
        >
          Get in touch
        </a>
      </motion.header>

      {/* --- hero --- */}
      <main className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 pb-24 pt-16 text-center md:pt-24">
        <FloatingCard
          className="left-4 top-36 xl:left-10"
          delay={1.2}
          dot="bg-aurora-cyan"
          title="Java · Spring Boot"
          sub="production backend systems"
        />
        <FloatingCard
          className="right-4 top-64 xl:right-10"
          delay={1.5}
          dot="bg-aurora-violet"
          title="Neo4j · Graph Data"
          sub="certified professional"
        />

        <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col items-center">
          <motion.div
            variants={fadeUp}
            className="mb-7 flex items-center gap-2.5 rounded-full border border-white/12 bg-white/5 px-4 py-1.5 text-sm text-white/80 backdrop-blur-md"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            {profile.availability}
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display text-5xl font-bold tracking-tight md:text-7xl"
          >
            <span className="text-gradient-animated bg-gradient-to-r from-aurora-violet via-aurora-cyan to-aurora-pink">
              {profile.name}
            </span>
          </motion.h1>

          <motion.h2
            variants={fadeUp}
            className="mt-5 font-display text-2xl font-medium text-white/90 md:text-3xl"
          >
            {profile.headline}
          </motion.h2>

          <motion.p variants={fadeUp} className="mt-3 text-sm text-white/50 md:text-base">
            {profile.role} · {profile.education}
          </motion.p>

          <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-balance text-white/60">
            {profile.tagline}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-7 flex flex-wrap justify-center gap-2.5">
            {highlights.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-white/70 backdrop-blur-md"
              >
                {badge}
              </span>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <motion.a
              href="#"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full bg-gradient-to-r from-aurora-violet to-aurora-cyan px-7 py-3 font-medium text-white shadow-[0_0_35px_rgba(139,92,246,0.45)] transition hover:shadow-[0_0_50px_rgba(34,211,238,0.5)]"
            >
              View Projects
            </motion.a>
            <motion.a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3 font-medium backdrop-blur-md transition hover:border-white/40"
            >
              <GitHubIcon className="size-4" /> GitHub
            </motion.a>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-9 flex items-center gap-5 text-white/40">
            <a href={profile.links.github} target="_blank" rel="noreferrer" className="transition hover:text-aurora-cyan" aria-label="GitHub">
              <GitHubIcon className="size-5" />
            </a>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="transition hover:text-aurora-cyan" aria-label="LinkedIn">
              <LinkedInIcon className="size-5" />
            </a>
            <a href={`mailto:${profile.email}`} className="transition hover:text-aurora-cyan" aria-label="Email">
              <MailIcon className="size-5" />
            </a>
            <span className="text-xs">{profile.location}</span>
          </motion.div>
        </motion.div>

        {/* scroll cue */}
        <motion.div
          className="mt-16 flex h-9 w-6 items-start justify-center rounded-full border border-white/20 p-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <motion.span
            className="block h-2 w-1 rounded-full bg-white/60"
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </main>
    </div>
  );
}
