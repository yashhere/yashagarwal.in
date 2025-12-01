"use client"

import { motion } from "motion/react"

import { Heading } from "@/components/ui/heading"
import Link from "@/components/ui/link"
import { SocialLinks } from "@/components/ui/social-links"

export const HomeContent = ({ children }: { children: React.ReactNode }) => {
  const item = {
    hidden: { opacity: 0, y: 10 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 150,
        damping: 15,
      },
    }),
  } as any

  return (
    <>
      <div className="mt-12 max-w-full">
        <motion.div
          className="mb-8"
          variants={item}
          custom={0}
          initial="hidden"
          animate="show"
        >
          <Heading
            level="h2"
            className="text-foreground text-2xl font-semibold"
          >
            Yash Agarwal
          </Heading>
          <p className="mt-1 text-base italic">Engineer / Builder / Learner </p>
        </motion.div>

        <div className="text-foreground/90 space-y-6 text-base leading-relaxed">
          <motion.p
            variants={item}
            custom={1}
            initial="hidden"
            animate="show"
          >
            Welcome to my corner of the internet. I write code at{" "}
            <Link
              href="https://netskope.com"
              target="_blank"
              variant="text"
              external={false}
            >
              Netskope
            </Link>{" "}
            for a living, building CASB security products for SaaS APIs that
            protect businesses&apos; data at rest.
          </motion.p>
          <motion.p
            variants={item}
            custom={2}
            initial="hidden"
            animate="show"
          >
            Outside of work, I enjoy tinkering with my homelab, diving into
            cybersecurity and LLMs, and documenting my experiments. You can
            connect with me on{" "}
            <Link
              href="https://x.com/yash__here"
              target="_blank"
              variant="text"
              external={false}
            >
              X
            </Link>{" "}
            or drop me{" "}
            <Link
              href="mailto:yashagarwaljpr+blog@gmail.com"
              target="_blank"
              variant="text"
              external={false}
            >
              an email{" "}
            </Link>
            .
          </motion.p>

          <motion.p
            variants={item}
            custom={3}
            initial="hidden"
            animate="show"
          >
            Now a days, I write primarily about homelab experiments, security,
            and backend development.
          </motion.p>
        </div>
      </div>

      <motion.div
        className="mt-8"
        variants={item}
        custom={4}
        initial="hidden"
        animate="show"
      >
        <SocialLinks />
      </motion.div>

      <div className="relative mt-12">
        <motion.div
          variants={item}
          custom={5}
          initial="hidden"
          animate="show"
        >
          <div className="via-border absolute -top-10 left-1/2 h-px w-48 -translate-x-1/2 transform bg-gradient-to-r from-transparent to-transparent"></div>
          <div className="text-primary mb-4 text-xl font-bold tracking-wide">
            Popular Writing
          </div>
        </motion.div>
        {children}
      </div>
    </>
  )
}
