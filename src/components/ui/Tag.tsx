const COLOR_CLASS = {
  cyan: "border-cyber-cyan/40 text-cyber-cyan",
  yellow: "border-cyber-yellow/50 text-cyber-yellow",
  red: "border-cyber-red/40 text-cyber-red",
  dim: "border-white/15 text-white/60",
} as const;

/** Small clipped-corner neon chip. */
export default function Tag(props: { children: string; color?: keyof typeof COLOR_CLASS }) {
  return (
    <span className={`clip-corner-sm border px-2.5 py-1 text-xs ${COLOR_CLASS[props.color ?? "dim"]}`}>
      {props.children}
    </span>
  );
}
