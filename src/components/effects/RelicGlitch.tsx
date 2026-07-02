import { useEffect, useState } from "react";

/**
 * Periodic "RELIC MALFUNCTION" burst, CP2077-style: the page never moves —
 * instead horizontal bands of the screen get chromatic distortion
 * (backdrop-filter hue shifts), thin interference lines flash, and a static
 * noise layer flickers for ~0.4s. Each burst renders 3 rapid frames with
 * re-randomized bands, like dropped frames in the game.
 */

type Band =
  | { kind: "chroma"; top: number; height: number; hue: number; saturate: number }
  | { kind: "bar"; top: number; height: number; color: string };

const BURST_EVERY_MS = 14000;
const FIRST_BURST_MS = 5000;
const FRAME_MS = 130;
const FRAMES_PER_BURST = 3;

function randomFrame(): Band[] {
  const chroma: Band[] = Array.from({ length: 3 }, () => ({
    kind: "chroma",
    top: Math.random() * 92,
    height: 2 + Math.random() * 7,
    hue: (Math.random() < 0.5 ? -1 : 1) * (90 + Math.random() * 90),
    saturate: 1.5 + Math.random(),
  }));
  const bars: Band[] = Array.from({ length: 3 }, () => ({
    kind: "bar",
    top: Math.random() * 98,
    height: 0.2 + Math.random() * 0.5,
    color: Math.random() < 0.5 ? "rgba(255,0,60,0.4)" : "rgba(0,240,255,0.35)",
  }));
  return [...chroma, ...bars];
}

export default function RelicGlitch() {
  const [frame, setFrame] = useState<Band[] | null>(null);
  const [showLabel, setShowLabel] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frameTimer: number | undefined;
    let burstCount = 0;

    const burst = () => {
      burstCount += 1;
      setShowLabel(burstCount % 2 === 0);
      let frameIndex = 0;
      setFrame(randomFrame());
      frameTimer = window.setInterval(() => {
        frameIndex += 1;
        if (frameIndex >= FRAMES_PER_BURST) {
          window.clearInterval(frameTimer);
          setFrame(null);
        } else {
          setFrame(randomFrame());
        }
      }, FRAME_MS);
    };

    const initial = window.setTimeout(burst, FIRST_BURST_MS);
    const interval = window.setInterval(burst, BURST_EVERY_MS);

    return () => {
      window.clearTimeout(initial);
      window.clearInterval(interval);
      window.clearInterval(frameTimer);
    };
  }, []);

  if (!frame) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[68]" aria-hidden="true">
      {/* subtle whole-screen chroma pump */}
      <div
        className="absolute inset-0"
        style={{ backdropFilter: "saturate(1.35) contrast(1.08)" }}
      />
      {frame.map((band, i) =>
        band.kind === "chroma" ? (
          <div
            key={i}
            className="absolute inset-x-0"
            style={{
              top: `${band.top}%`,
              height: `${band.height}%`,
              backdropFilter: `hue-rotate(${band.hue}deg) saturate(${band.saturate})`,
            }}
          />
        ) : (
          <div
            key={i}
            className="absolute inset-x-0"
            style={{ top: `${band.top}%`, height: `${band.height}%`, background: band.color }}
          />
        ),
      )}
      {/* static noise flash */}
      <div className="glitch-noise absolute inset-0 opacity-[0.07]" />
      {showLabel && (
        <p className="absolute bottom-8 right-6 font-hud text-sm font-bold uppercase tracking-widest text-cyber-red">
          ⚠ relic malfunction detected
        </p>
      )}
    </div>
  );
}
