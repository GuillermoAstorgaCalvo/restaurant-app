// Common transition presets
export const transitions = {
  default: { duration: 0.5 },
  slow: { duration: 0.8 },
  fast: { duration: 0.3 },
  bounce: { type: "spring", stiffness: 300, damping: 15 },
} as const;
