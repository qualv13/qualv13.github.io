import { motion } from "framer-motion";
import { skillGroups, softSkills } from "../data/content";
import { fadeUp, viewportOnce } from "../lib/motion";
import Section from "./ui/Section";

export default function Skills() {
  return (
    <Section id="skills" index={4} title="Skills" sub="cyberware">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <motion.div
            key={group.dir}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="border border-white/10 bg-cyber-panel/60 p-5 transition hover:border-white/25"
          >
            <p className="text-sm text-cyber-cyan">{group.dir}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill.name}
                  className={`border px-2.5 py-1 text-xs transition ${
                    skill.core
                      ? "border-cyber-cyan/60 text-cyber-cyan shadow-[0_0_14px_rgba(0,240,255,0.12)]"
                      : "border-white/15 text-white/60"
                  }`}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-8 border border-white/10 bg-cyber-panel/60 p-5"
      >
        <p className="text-sm text-white/40">$ cat soft_skills.txt</p>
        <p className="mt-3 text-sm leading-relaxed text-white/65">
          {softSkills.join("  ·  ")}
        </p>
        <p className="mt-3 text-xs text-white/40">
          <span className="text-cyber-cyan">core stack highlighted</span> — the tools I ship with
          daily. Everything else is battle-tested in projects.
        </p>
      </motion.div>
    </Section>
  );
}
