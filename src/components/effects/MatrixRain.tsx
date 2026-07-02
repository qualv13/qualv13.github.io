import { useEffect, useRef } from "react";

const GLYPHS = "アイウエオカキクケコサシスセソ01<>{}[]$#@%&*+=/\\";
const FONT_SIZE = 14;
const FRAME_MS = 50; // ~20fps is plenty for rain and easy on the CPU
const CYAN = "rgba(0, 240, 255, 0.85)";
const YELLOW = "rgba(252, 238, 10, 0.8)";
const RED = "rgba(255, 0, 60, 0.8)";

/**
 * Classic "digital rain" on a canvas. Sized to its parent, capped DPR,
 * throttled to ~20fps, and disabled entirely for reduced-motion users.
 */
export default function MatrixRain({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let drops: number[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${FONT_SIZE}px "JetBrains Mono", monospace`;
      const columns = Math.ceil(canvas.offsetWidth / FONT_SIZE);
      drops = Array.from({ length: columns }, () => Math.random() * -50);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    let last = 0;
    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (now - last < FRAME_MS) return;
      last = now;

      // Translucent wipe leaves fading trails behind each drop.
      ctx.fillStyle = "rgba(3, 3, 8, 0.12)";
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      drops.forEach((y, i) => {
        const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        const roll = Math.random();
        ctx.fillStyle = roll < 0.06 ? YELLOW : roll < 0.08 ? RED : CYAN;
        ctx.fillText(glyph, i * FONT_SIZE, y * FONT_SIZE);
        // Reset a drop to the top at random once it leaves the screen.
        drops[i] = y * FONT_SIZE > canvas.offsetHeight && Math.random() > 0.975 ? 0 : y + 1;
      });
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={`pointer-events-none ${className}`} aria-hidden="true" />;
}
