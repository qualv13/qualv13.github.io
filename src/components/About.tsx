import { motion } from "framer-motion";
import { about } from "../data/content";
import { stagger, fadeIn, viewportOnce } from "../lib/motion";
import Section from "./ui/Section";
import Tag from "./ui/Tag";

export default function About() {
  return (
    <Section id="about" index={1} command="cat ./about.md">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {about.paragraphs.map((paragraph) => (
            <motion.p
              key={paragraph.slice(0, 24)}
              variants={fadeIn}
              className="mb-5 leading-relaxed text-white/65"
            >
              {paragraph}
            </motion.p>
          ))}

          <motion.div variants={fadeIn} className="mt-8">
            <p className="text-sm text-white/40"># what drives me</p>
            <ul className="mt-3 space-y-2">
              {about.drives.map((drive) => (
                <li key={drive} className="text-white/70">
                  <span className="text-cyber-cyan">▹</span> {drive}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {/* quick facts card */}
          <motion.div
            variants={fadeIn}
            className="border border-white/10 bg-cyber-panel/80 p-5"
          >
            <p className="text-sm text-white/40">$ cat facts.json</p>
            <dl className="mt-4 space-y-3 text-sm">
              {about.quickFacts.map((fact) => (
                <div key={fact.key}>
                  <dt className="text-cyber-magenta">"{fact.key}":</dt>
                  <dd className="pl-4 text-white/70">"{fact.value}"</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <motion.div variants={fadeIn} className="mt-6">
            <p className="text-sm text-white/40"># after hours</p>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {about.interests.map((interest) => (
                <Tag key={interest}>{interest}</Tag>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
