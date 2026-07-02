import { motion } from "framer-motion";
import { achievements, education, profile } from "../data/content";
import { fadeUp, viewportOnce } from "../lib/motion";
import Section from "./ui/Section";

const KIND_ICON = {
  award: { symbol: "★", className: "text-cyber-magenta border-cyber-magenta/40" },
  cert: { symbol: "◆", className: "text-cyber-cyan border-cyber-cyan/40" },
  leadership: { symbol: "⚡", className: "text-yellow-300 border-yellow-300/40" },
} as const;

export default function Achievements() {
  return (
    <Section id="achievements" index={5} command="cat ./achievements.log">
      <div className="grid gap-4 md:grid-cols-2">
        {achievements.map((achievement) => {
          const icon = KIND_ICON[achievement.kind];
          return (
            <motion.div
              key={achievement.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="flex gap-4 border border-white/10 bg-cyber-panel/60 p-5 transition hover:border-white/25"
            >
              <span
                className={`flex size-9 shrink-0 items-center justify-center border text-sm ${icon.className}`}
                aria-hidden="true"
              >
                {icon.symbol}
              </span>
              <div>
                <h3 className="font-bold text-white">
                  {achievement.title}
                  <span className="ml-2 text-xs font-normal text-white/35">{achievement.year}</span>
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-white/55">{achievement.detail}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-6 text-sm text-white/40"
      >
        <span className="text-cyber-cyan">$</span> ls --all certifications{"  "}
        <span className="text-white/30"># 25 total →</span>{" "}
        <a
          href={profile.links.linkedinCerts}
          target="_blank"
          rel="noreferrer"
          className="text-cyber-cyan underline-offset-4 hover:underline"
        >
          see LinkedIn ↗
        </a>
      </motion.p>

      {/* education */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-12"
      >
        <p className="text-sm text-white/40">$ cat ./education.log</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {education.map((entry) => (
            <div key={entry.school} className="border border-white/10 bg-cyber-panel/60 p-5">
              <p className="text-xs text-white/35">{entry.period}</p>
              <h3 className="mt-1 font-bold text-white">{entry.school}</h3>
              <p className="mt-0.5 text-sm text-cyber-cyan">{entry.degree}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{entry.detail}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
