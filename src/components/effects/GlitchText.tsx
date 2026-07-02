import { useEffect, useState } from "react";

/**
 * Text with the RGB-split glitch effect: always on hover, plus short
 * automatic bursts every few seconds when `auto` is set.
 */
export default function GlitchText(props: { text: string; className?: string; auto?: boolean }) {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    if (!props.auto || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let burstEnd: number;
    const interval = window.setInterval(() => {
      setGlitching(true);
      burstEnd = window.setTimeout(() => setGlitching(false), 380);
    }, 4600);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(burstEnd);
    };
  }, [props.auto]);

  return (
    <span
      data-text={props.text}
      className={`cyber-glitch ${glitching ? "glitching" : ""} ${props.className ?? ""}`}
    >
      {props.text}
    </span>
  );
}
