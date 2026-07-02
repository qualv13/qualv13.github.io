import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "../../lib/motion";

/**
 * Section shell with the terminal-style header:
 *   [01]
 *   $ ls ./projects
 */
export default function Section(props: {
  id: string;
  index: number;
  command: string;
  children: ReactNode;
}) {
  return (
    <section id={props.id} className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-20 md:py-24">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
        <p className="text-sm text-cyber-magenta">[{String(props.index).padStart(2, "0")}]</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
          <span className="text-cyber-cyan">$</span> {props.command}
        </h2>
        <div className="neon-flicker mt-4 h-px w-28 bg-gradient-to-r from-cyber-cyan to-transparent" />
      </motion.div>
      <div className="mt-10">{props.children}</div>
    </section>
  );
}
