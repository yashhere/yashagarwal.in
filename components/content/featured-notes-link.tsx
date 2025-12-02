"use client"

import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr"
import { motion } from "motion/react"

import Link from "@/components/ui/link"
import { fadeInUpVariants } from "@/lib/animations"

export const FeaturedNotesLink = () => {
  return (
    <motion.div
      variants={fadeInUpVariants}
      custom={{ index: 0, baseDelay: 0.9 }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <Link
        href="/notes"
        className="group text-foreground/80 hover:text-primary text-md mt-3 inline-flex items-center gap-1 font-medium transition-colors"
        variant="text"
      >
        <span>View all notes</span>
        <ArrowRightIcon className="relative top-[1px] h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
      </Link>
    </motion.div>
  )
}
