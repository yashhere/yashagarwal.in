import { Variants } from "motion/react"

export const ANIMATION_CONFIG = {
  STAGGER_DELAY: 0.1, // Stagger between list items
  INITIAL_DELAY: 0.1, // Initial delay for first item
  MAX_DELAY: 0.3, // Maximum delay cap
  SPRING_CONFIG: {
    type: "spring",
    stiffness: 150,
    damping: 15,
  },
}

export const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: ({ index, baseDelay = 0 }: { index: number; baseDelay?: number }) => {
    return {
      opacity: 1,
      y: 0,
      transition: {
        delay:
          baseDelay +
          Math.min(
            index * ANIMATION_CONFIG.STAGGER_DELAY,
            ANIMATION_CONFIG.MAX_DELAY
          ),
        ...ANIMATION_CONFIG.SPRING_CONFIG,
      },
    } as any
  },
}

export const simpleFadeInVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ...ANIMATION_CONFIG.SPRING_CONFIG,
    } as any,
  },
}
