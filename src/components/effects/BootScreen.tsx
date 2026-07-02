import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const BOOT_LINES = [
  "JK-BIOS v26.7 — POST",
  "> cpu: caffeine-9000 @ 4.74GHz ......... [OK]",
  "> mounting /dev/java ................... [OK]",
  "> spring context loaded in 0.42s ....... [OK]",
  "> neo4j graph online: 47,031 nodes ..... [OK]",
  "> launching jakub.kierznowski .......... [OK]",
] as const;

const LINE_DELAY_MS = 140;
const HOLD_MS = 450;

/**
 * Fake BIOS boot overlay shown once per browser session.
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
          <div className="w-full max-w-md font-mono text-[13px] leading-relaxed">
            {BOOT_LINES.map((line, i) => (
              <motion.p
                key={line}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: (i * LINE_DELAY_MS) / 1000, duration: 0.05 }}
                className={i === 0 ? "text-cyber-magenta" : "text-cyber-cyan/80"}
              >
                {line}
              </motion.p>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
