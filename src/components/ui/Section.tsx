import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "../../lib/motion";

/**
 * Section shell with a CP2077-style HUD header:
 *   [01] ABOUT // IDENTITY
 *   ▰▰▰▰ (hazard bar)
 */
export default function Section(props: {
  id: string;
  index: number;
  title: string;
  sub: string;
  children: ReactNode;
}) {
  return (
    <section id={props.id} className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-20 md:py-24">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
        <div className="flex items-center gap-3">
          <span className="clip-corner-sm bg-cyber-yellow px-2.5 py-0.5 font-hud text-sm font-bold text-black">
            {String(props.index).padStart(2, "0")}
          </span>
          <h2 className="font-hud text-2xl font-bold uppercase tracking-wide md:text-3xl">
            {props.title} <span className="text-cyber-cyan">// {props.sub}</span>
          </h2>
        </div>
        <div className="hazard-bar neon-flicker mt-4 h-1.5 w-36" />
      </motion.div>
      <div className="mt-10">{props.children}</div>
    </section>
  );
}
