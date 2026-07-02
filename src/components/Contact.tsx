import { motion } from "framer-motion";
import { profile } from "../data/content";
import { stagger, fadeIn, viewportOnce } from "../lib/motion";
import { GitHubIcon, LinkedInIcon } from "./icons";
import NeonButton from "./ui/NeonButton";

const CV_URL = `${import.meta.env.BASE_URL}${profile.cvFile}`;

export default function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mx-auto flex max-w-2xl flex-col items-center border border-cyber-cyan/20 bg-cyber-panel/60 px-6 py-14 text-center shadow-[0_0_80px_rgba(0,240,255,0.07)]"
      >
        <motion.p variants={fadeIn}>
          <span className="clip-corner-sm bg-cyber-yellow px-2.5 py-0.5 font-hud text-sm font-bold text-black">
            06
          </span>
        </motion.p>
        <motion.h2
          variants={fadeIn}
          className="mt-3 font-hud text-2xl font-bold uppercase tracking-wide md:text-3xl"
        >
          Contact <span className="text-cyber-cyan">// open_channel</span>
        </motion.h2>

        <motion.p variants={fadeIn} className="mt-5 max-w-md leading-relaxed text-white/60">
          Got a junior Java opening, an internship growth path, or just want to talk graph
          databases? My inbox compiles without warnings.
        </motion.p>

        <motion.p variants={fadeIn} className="mt-5 text-sm">
          <span className="text-cyber-green">●</span>{" "}
          <span className="text-white/70">
            status: open_to_work — junior java backend · {profile.location} ·{" "}
            {profile.workMode}
          </span>
        </motion.p>

        <motion.div variants={fadeIn} className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <NeonButton href={`mailto:${profile.email}`} color="solid">
            ▶ send_email
          </NeonButton>
          <NeonButton href={CV_URL} color="cyan" external>
            &gt; download_cv
          </NeonButton>
        </motion.div>

        <motion.p variants={fadeIn} className="mt-5 text-xs text-white/40">
          {profile.email}
        </motion.p>

        <motion.div variants={fadeIn} className="mt-6 flex items-center gap-5 text-white/40">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-cyber-cyan"
            aria-label="GitHub"
          >
            <GitHubIcon className="size-5" />
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-cyber-cyan"
            aria-label="LinkedIn"
          >
            <LinkedInIcon className="size-5" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
