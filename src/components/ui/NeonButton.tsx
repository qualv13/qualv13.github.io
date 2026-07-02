import type { ReactNode } from "react";
import { motion } from "framer-motion";

const COLOR_CLASS = {
  /* CP2077 primary: solid yellow plate with black text. */
  solid:
    "border-cyber-yellow bg-cyber-yellow font-bold text-black hover:shadow-[0_0_32px_rgba(252,238,10,0.45)]",
  cyan: "border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan/10 hover:shadow-[0_0_28px_rgba(0,240,255,0.35)]",
  red: "border-cyber-red text-cyber-red hover:bg-cyber-red/10 hover:shadow-[0_0_28px_rgba(255,0,60,0.35)]",
  ghost: "border-white/20 text-white/70 hover:border-white/50 hover:text-white",
} as const;

type Props = {
  color?: keyof typeof COLOR_CLASS;
  children: ReactNode;
  /** Renders an anchor when href is set, otherwise a button. */
  href?: string;
  onClick?: () => void;
  external?: boolean;
};

/** Clipped-corner CP2077-style button. */
export default function NeonButton(props: Props) {
  const className = `clip-corner-sm inline-block border px-6 py-3 font-hud text-sm font-semibold uppercase tracking-widest transition ${COLOR_CLASS[props.color ?? "cyan"]}`;
  const interaction = { whileHover: { scale: 1.03 }, whileTap: { scale: 0.97 } };

  if (props.href) {
    return (
      <motion.a
        href={props.href}
        {...(props.external ? { target: "_blank", rel: "noreferrer" } : {})}
        {...interaction}
        className={className}
      >
        {props.children}
      </motion.a>
    );
  }
  return (
    <motion.button type="button" onClick={props.onClick} {...interaction} className={className}>
      {props.children}
    </motion.button>
  );
}
