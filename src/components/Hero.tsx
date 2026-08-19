import { motion } from "framer-motion";
import { profile, highlights, heroStats, heroTerminalLines } from "../data/content";
import { stagger, fadeIn } from "../lib/motion";
import { useTyping } from "../hooks/useTyping";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./icons";
import GlitchText from "./effects/GlitchText";
import MatrixRain from "./effects/MatrixRain";
import NeonButton from "./ui/NeonButton";
import Tag from "./ui/Tag";

const CV_URL = `${import.meta.env.BASE_URL}${profile.cvFile}`;

const ACCENT_CLASS: Record<(typeof heroTerminalLines)[number]["accent"], string> = {
  dim: "text-white/40",
  plain: "text-white/85",
  cyan: "text-cyber-cyan",
  warn: "text-cyber-yellow",
};

export default function Hero(props: { start: boolean; onBreach: () => void }) {
  const boot = useTyping("initialize --profile jakub_kierznowski", 70, 300, props.start);

  return (
    <div className="relative overflow-hidden">
      {/* --- background: digital rain, glows, grid floor --- */}
      <MatrixRain className="absolute inset-0 h-full w-full opacity-[0.16]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(252,238,10,0.08),transparent)]" />
      <div className="cyber-gridfloor" />

      <div className="relative z-10 mx-auto grid max-w-6xl gap-14 px-6 pb-28 pt-16 md:pt-24 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        {/* --- left column --- */}
        <div>
          <p className="text-sm text-white/50">
            <span className="text-cyber-yellow">$</span> {boot.typed}
            {!boot.done && <span className="cursor-blink text-cyber-cyan">▊</span>}
            {boot.done && <span className="text-cyber-green"> [OK]</span>}
          </p>

          <motion.div variants={stagger} initial="hidden" animate={boot.done ? "visible" : "hidden"}>
            <motion.p
              variants={fadeIn}
              className="mt-8 font-hud text-xs font-semibold uppercase tracking-[0.3em] text-cyber-yellow"
            >
              ID: JK-2077 // class: netrunner // merc for hire
            </motion.p>

            <motion.h1
              variants={fadeIn}
              className="mt-2 text-4xl font-bold uppercase tracking-tight md:text-6xl"
            >
              <GlitchText auto text={profile.name.toUpperCase()} />
            </motion.h1>

            <motion.p variants={fadeIn} className="mt-4 text-lg text-cyber-cyan md:text-xl">
              &gt; {profile.role}
            </motion.p>
            <motion.p variants={fadeIn} className="mt-1 text-white/50">
              &gt; {profile.education} · {profile.location}
            </motion.p>

            <motion.p variants={fadeIn} className="mt-6 max-w-xl leading-relaxed text-white/60">
              {profile.tagline}
            </motion.p>

            {/* stat chips */}
            <motion.div variants={fadeIn} className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/45">
              {heroStats.map((stat) => (
                <span key={stat.key}>
                  [ {stat.key}: <span className="text-cyber-cyan">{stat.value}</span> ]
                </span>
              ))}
            </motion.div>

            <motion.div variants={fadeIn} className="mt-6 flex flex-wrap gap-2.5">
              {highlights.map((badge, i) => (
                <Tag key={badge} color={i % 2 === 0 ? "yellow" : "cyan"}>
                  {badge}
                </Tag>
              ))}
            </motion.div>

            <motion.div variants={fadeIn} className="mt-9 flex flex-wrap gap-4">
              <NeonButton color="solid" onClick={props.onBreach}>
                ▶ breach_protocol
              </NeonButton>
              <NeonButton href="#projects" color="cyan">
                &gt; view_projects
              </NeonButton>
              <NeonButton href={CV_URL} color="red" external>
                &gt; download_cv
              </NeonButton>
            </motion.div>

            <motion.div variants={fadeIn} className="mt-9 flex items-center gap-5 text-white/40">
              <a href={profile.links.github} target="_blank" rel="noreferrer" className="transition hover:text-cyber-cyan" aria-label="GitHub">
                <GitHubIcon className="size-5" />
              </a>
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="transition hover:text-cyber-cyan" aria-label="LinkedIn">
                <LinkedInIcon className="size-5" />
              </a>
              <a href={`mailto:${profile.email}`} className="transition hover:text-cyber-cyan" aria-label="Email">
                <MailIcon className="size-5" />
              </a>
              <span className="text-xs">press <kbd className="border border-white/20 px-1.5 py-0.5">`</kbd> for netdeck</span>
            </motion.div>
          </motion.div>
        </div>

        {/* --- right column: terminal window --- */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={boot.done ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="clip-corner border border-cyber-cyan/25 bg-black/60 shadow-[0_0_60px_rgba(0,240,255,0.12)] backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <span className="size-3 rounded-full bg-cyber-red/70" />
            <span className="size-3 rounded-full bg-cyber-yellow/70" />
            <span className="size-3 rounded-full bg-cyber-cyan/70" />
            <span className="ml-3 text-xs text-white/40">~/jakub — netdeck</span>
          </div>
          <div className="space-y-2 px-5 py-5 text-[13px] leading-relaxed">
            {heroTerminalLines.map((line, i) => (
              <motion.p
                key={line.text}
                initial={{ opacity: 0 }}
                animate={boot.done ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.16 }}
                className={ACCENT_CLASS[line.accent]}
              >
                {line.text}
              </motion.p>
            ))}
            <motion.p
              initial={{ opacity: 0 }}
              animate={boot.done ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 + heroTerminalLines.length * 0.16 }}
              className="text-cyber-cyan"
            >
              <span className="cursor-blink">▊</span>
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#about"
        className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 text-xs text-white/40 transition hover:text-cyber-cyan"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        ▼ scroll_down
      </motion.a>
    </div>
  );
}
