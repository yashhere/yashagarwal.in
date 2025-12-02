"use client"

import { motion } from "motion/react"

import Link from "@/components/ui/link"
import { fadeInUpVariants } from "@/lib/animations"

type Backlink = {
  url: string
  title: string
  type: string
}

export const AnimatedBacklinksList = ({ links }: { links: Backlink[] }) => {
  return (
    <div className="border-border space-y-1.5 border-t pt-2">
      {links.map((link, idx) => (
        <motion.div
          key={link.url}
          className="overflow-hidden text-ellipsis whitespace-nowrap"
          variants={fadeInUpVariants}
          custom={idx}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <Link
            href={link.url}
            className="text-muted-foreground hover:text-primary block text-xs transition-colors"
            variant="nav"
          >
            <span className="text-foreground font-medium">{link.type}</span>
            <span className="ml-1">{link.title}</span>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
