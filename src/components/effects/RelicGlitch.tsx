import { useEffect, useState } from "react";

type Slice = { top: number; height: number; shift: number; color: string };

const BURST_EVERY_MS = 14000;
const BURST_LENGTH_MS = 420;

function randomSlices(): Slice[] {
  return Array.from({ length: 3 }, () => ({
    top: Math.random() * 90,
    height: 1.5 + Math.random() * 3,
    shift: (Math.random() - 0.5) * 40,
    color: Math.random() < 0.5 ? "rgba(255,0,60,0.35)" : "rgba(0,240,255,0.3)",
  }));
}

/**
 * Periodic "RELIC MALFUNCTION" burst: displaced color slices flash over
 * the viewport for ~0.4s every ~14s, with a warning label on every other
 * burst. Adds the `relic-jitter` shake class to #site-shell while active.
 */
export default function RelicGlitch() {
  const [slices, setSlices] = useState<Slice[] | null>(null);
  const [showLabel, setShowLabel] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let burstCount = 0;
    let end: number;
    const interval = window.setInterval(() => {
      burstCount += 1;
      setSlices(randomSlices());
      setShowLabel(burstCount % 2 === 0);
      document.getElementById("site-shell")?.classList.add("relic-jitter");
      end = window.setTimeout(() => {
        setSlices(null);
        document.getElementById("site-shell")?.classList.remove("relic-jitter");
      }, BURST_LENGTH_MS);
    }, BURST_EVERY_MS);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(end);
      document.getElementById("site-shell")?.classList.remove("relic-jitter");
    };
  }, []);

  if (!slices) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[68]" aria-hidden="true">
      {slices.map((slice, i) => (
        <div
          key={i}
          className="absolute inset-x-0"
          style={{
            top: `${slice.top}%`,
            height: `${slice.height}%`,
            background: slice.color,
            transform: `translateX(${slice.shift}px)`,
          }}
        />
      ))}
      {showLabel && (
        <p className="absolute bottom-8 right-6 font-hud text-sm font-bold uppercase tracking-widest text-cyber-red">
          ⚠ relic malfunction detected
        </p>
      )}
    </div>
  );
}
