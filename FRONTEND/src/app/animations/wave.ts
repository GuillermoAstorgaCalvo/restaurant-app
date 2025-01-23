export const waveEffect = (index: number) => ({
  hidden: { opacity: 0, x: -50 }, // Start from the left
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay: index * 0.2,
    },
  },
});
