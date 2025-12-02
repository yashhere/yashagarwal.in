"use client"

import React from "react"
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr"
import { motion } from "motion/react"

import Link from "@/components/ui/link"

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
        className="ml-1 inline-block pr-1"
        animate={{ x: isHovered ? -4 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <ArrowLeftIcon size={16} />
      </motion.span>{" "}
      Back to Notes
    </Link>
  )
}
