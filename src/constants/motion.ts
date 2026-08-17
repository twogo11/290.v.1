import type { Variants } from "framer-motion";

export const FADE_IN_UP: Variants = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};
