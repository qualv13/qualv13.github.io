const COLOR_CLASS = {
  cyan: "border-cyber-cyan/40 text-cyber-cyan",
  magenta: "border-cyber-magenta/40 text-cyber-magenta",
  dim: "border-white/15 text-white/60",
} as const;

/** Small square-cornered neon chip. */
export default function Tag(props: { children: string; color?: keyof typeof COLOR_CLASS }) {
  return (
    <span className={`border px-2.5 py-1 text-xs ${COLOR_CLASS[props.color ?? "dim"]}`}>
      {props.children}
    </span>
  );
}
