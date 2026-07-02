import { useEffect, useState } from "react";

/**
 * Types `text` one character at a time after `startDelay` ms.
 * Stays idle until `enabled` turns true (used to wait for the boot screen).
 */
export function useTyping(text: string, speed = 70, startDelay = 400, enabled = true) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    let interval: number | undefined;
    const timeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setCount((current) => {
          if (current >= text.length) {
            window.clearInterval(interval);
            return current;
          }
          return current + 1;
        });
      }, speed);
    }, startDelay);

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [text, speed, startDelay, enabled]);

  return { typed: text.slice(0, count), done: count >= text.length };
}
