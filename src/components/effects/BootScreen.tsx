import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const BOOT_LINES = [
  { text: "BREACH PROTOCOL v2.077 // NC-KRK RELAY", tone: "yellow" },
  { text: "> scanning target .............. [ JK_PORTFOLIO ]", tone: "cyan" },
  { text: "> ICE detected: none — choom left the door open", tone: "dim" },
  { text: "> injecting daemon: PORTFOLIO.EXE ......... [OK]", tone: "cyan" },
  { text: "> RELIC integrity: 98% (ignore the flickering)", tone: "red" },
  { text: "> ACCESS GRANTED — welcome, netrunner", tone: "yellow" },
] as const;

const TONE_CLASS: Record<(typeof BOOT_LINES)[number]["tone"], string> = {
  yellow: "text-cyber-yellow",
  cyan: "text-cyber-cyan/85",
  red: "text-cyber-red/90",
  dim: "text-white/45",
};

const LINE_DELAY_MS = 150;
const HOLD_MS = 500;

/**
 * Breach-protocol boot overlay shown once per browser session.
 * Any click or key press skips it immediately.
 * Calls `onDone` once it's out of the way so the hero can start typing.
 */
export default function BootScreen(props: { onDone: () => void }) {
  const [visible, setVisible] = useState(
    () => sessionStorage.getItem("booted") !== "1" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (!visible) {
      props.onDone();
      return;
    }

    const dismiss = () => {
      sessionStorage.setItem("booted", "1");
      setVisible(false);
    };
    const timeout = window.setTimeout(dismiss, BOOT_LINES.length * LINE_DELAY_MS + HOLD_MS);
    window.addEventListener("pointerdown", dismiss);
    window.addEventListener("keydown", dismiss);

    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("pointerdown", dismiss);
      window.removeEventListener("keydown", dismiss);
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-cyber-bg px-6"
          exit={{ opacity: 0, transition: { duration: 0.35 } }}
          aria-hidden="true"
        >
          <div className="w-full max-w-md">
            <div className="hazard-bar mb-4 h-1.5 w-24" />
            <div className="font-mono text-[13px] leading-relaxed">
              {BOOT_LINES.map((line, i) => (
                <motion.p
                  key={line.text}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: (i * LINE_DELAY_MS) / 1000, duration: 0.05 }}
                  className={TONE_CLASS[line.tone]}
                >
                  {line.text}
                </motion.p>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
