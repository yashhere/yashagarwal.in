"use client"

import React from "react"
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr"
import { motion } from "motion/react"

import Link from "@/components/ui/link"

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

export const ArticleHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.section
      className="mb-8 space-y-2"
      variants={item}
      custom={0}
      initial="hidden"
      animate="show"
    >
      {children}
    </motion.section>
  )
}

export const AnimatedBackLinks = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <motion.div
      variants={item}
      custom={0}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}

export const AnimatedTagList = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <motion.div
      variants={item}
      custom={0}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}

export const AnimatedActions = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <motion.div
      className="my-8 flex flex-row items-center justify-between space-x-2"
      variants={item}
      custom={0}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}

export const BackToNotesLink = () => {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <Link
      href="/notes"
      variant="text"
      className="group text-muted-foreground"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.span
        className="inline-block pr-1"
        style={{ marginLeft: "4px" }}
        animate={{ x: isHovered ? -4 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <ArrowLeftIcon size={16} />
      </motion.span>{" "}
      Back to Notes
    </Link>
  )
}
