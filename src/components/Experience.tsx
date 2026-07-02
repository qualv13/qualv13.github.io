import { motion } from "framer-motion";
import { experience } from "../data/content";
import { stagger, fadeIn, viewportOnce } from "../lib/motion";
import Section from "./ui/Section";
import Tag from "./ui/Tag";

export default function Experience() {
  return (
    <Section id="experience" index={2} title="Experience" sub="combat_log">
      <div className="relative ml-2 border-l border-white/10 pl-8 md:ml-4">
        {experience.map((entry) => (
          <motion.article
            key={`${entry.company}-${entry.role}`}
            className="relative pb-12 last:pb-0"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {/* timeline node */}
            <span
              className={`absolute -left-[38.5px] top-1.5 size-[9px] rounded-full md:-left-[38.5px] ${
                entry.current
                  ? "bg-cyber-cyan shadow-[0_0_12px_rgba(0,240,255,0.9)]"
                  : "bg-white/25"
              }`}
            />
            {entry.current && (
              <span className="absolute -left-[42.5px] top-[2px] size-[17px] animate-ping rounded-full bg-cyber-cyan/30" />
            )}

            <motion.header variants={fadeIn}>
              <p className="text-xs text-white/40">
                {entry.period}
                {entry.meta && <span className="ml-3 text-white/25">· {entry.meta}</span>}
              </p>
              <h3 className="mt-1.5 text-lg font-bold text-white">
                {entry.role} <span className="font-normal text-cyber-cyan">@ {entry.company}</span>
              </h3>
            </motion.header>

            <motion.ul variants={fadeIn} className="mt-3 space-y-2 text-sm leading-relaxed text-white/60">
              {entry.bullets.map((bullet) => (
                <li key={bullet.slice(0, 24)}>
                  <span className="text-cyber-yellow">▹</span> {bullet}
                </li>
              ))}
            </motion.ul>

            <motion.div variants={fadeIn} className="mt-4 flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </motion.div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
