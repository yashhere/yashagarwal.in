"use client"

import { GraphIcon } from "@phosphor-icons/react/dist/ssr"
import { motion } from "motion/react"

import { getNoteBacklinks } from "@/lib/content"
import Link from "../ui/link"

export const BackLinks = ({
  backlinks,
}: {
  backlinks?: NonNullable<ReturnType<typeof getNoteBacklinks>>
}) => {
  if (backlinks?.length === 0) {
    return null
  }

  const item = {
    hidden: { opacity: 0, x: -10 },
    show: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        type: "spring",
        stiffness: 150,
        damping: 15,
      },
    }),
  } as any

  return (
    <div className="border-border bg-background my-8 rounded-md border p-2.5 text-sm">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5">
          <GraphIcon className="text-muted-foreground h-3 w-3" />
          <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
            Backlinks ({backlinks?.length})
          </span>
        </div>

        <div className="border-border space-y-1.5 border-t pt-2">
          {backlinks?.map((link, idx) => (
            <motion.div
              key={link.url}
              className="overflow-hidden text-ellipsis whitespace-nowrap"
              variants={item}
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
      </div>
    </div>
  )
}
