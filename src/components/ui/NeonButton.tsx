import type { ReactNode } from "react";
import { motion } from "framer-motion";

const COLOR_CLASS = {
  cyan: "border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan/10 hover:shadow-[0_0_28px_rgba(0,240,255,0.35)]",
  magenta:
    "border-cyber-magenta text-cyber-magenta hover:bg-cyber-magenta/10 hover:shadow-[0_0_28px_rgba(255,46,196,0.35)]",
  ghost: "border-white/20 text-white/70 hover:border-white/50 hover:text-white",
} as const;

/** Square neon-outline button (anchor element). */
export default function NeonButton(props: {
  href: string;
  color?: keyof typeof COLOR_CLASS;
  external?: boolean;
  children: ReactNode;
}) {
  return (
    <motion.a
      href={props.href}
      {...(props.external ? { target: "_blank", rel: "noreferrer" } : {})}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-block border px-6 py-3 text-sm transition ${COLOR_CLASS[props.color ?? "cyan"]}`}
    >
      {props.children}
    </motion.a>
  );
}
