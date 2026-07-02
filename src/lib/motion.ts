import type { Variants } from "framer-motion";

/** Parent container: staggers its children's entrance. */
export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/** Small upward fade — default entrance for most elements. */
export const fadeIn: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

/** Larger upward fade for section-level reveals. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Shared whileInView viewport config: animate once, slightly before entering. */
export const viewportOnce = { once: true, margin: "-70px" } as const;
