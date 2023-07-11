import { Transition, motion } from "framer-motion"

export const LoadingDots = () => {
  const container = {
    initial: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const dotVariants = {
    initial: {
      y: "0%",
      opacity: 0,
    },
    animate: {
      y: "15%",
      opacity: 1,
    },
  }

  const dotTransition: Transition = {
    duration: 0.5,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeIn",
  }

  return (
    <motion.span
      variants={container}
      initial="initial"
      animate="animate"
      className="space-x-1"
    >
      <motion.span
        variants={dotVariants}
        transition={dotTransition}
        className="inline-flex rounded-full"
      >
        &bull;
      </motion.span>
      <motion.span
        variants={dotVariants}
        transition={dotTransition}
        className="inline-flex rounded-full"
      >
        &bull;
      </motion.span>
      <motion.span
        variants={dotVariants}
        transition={dotTransition}
        className="inline-flex rounded-full"
      >
        &bull;
      </motion.span>
    </motion.span>
  )
}
