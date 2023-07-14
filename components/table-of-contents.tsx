"use client"

import { FC, ReactNode, useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline"
import { motion } from "framer-motion"

import Link from "./ui/link"

type TitleProps = {
  children?: ReactNode
}

const Title: FC<TitleProps> = ({ children }) => {
  return (
    <div>
      <div className="text-lg font-bold">{children}</div>
    </div>
  )
}

export const TableOfContents = ({ headings, path, interactive }) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(!interactive)

  return (
    <>
      <div className="shadow-surface-elevation-low rounded border-2 bg-transparent p-5 lg:px-8">
        {interactive ? (
          <button
            className="items center group flex w-full items-center text-left"
            onClick={() => {
              setIsOpen(!isOpen)
            }}
          >
            <div className="font-heading text-lg font-bold uppercase tracking-widest text-secondary ">
              Table of Contents
            </div>

            <div className="ml-auto pl-4">
              <div className="rounded-full bg-gray-600/10 p-2 text-text group-hover:bg-gray-600/25">
                {isOpen ? (
                  <ChevronUpIcon className="w-5" />
                ) : (
                  <ChevronDownIcon className="w-5" />
                )}
              </div>
            </div>
          </button>
        ) : (
          <div className="font-heading text-lg text-text">On This Page</div>
        )}
        {isOpen && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            transition={{ duration: 0.8, ease: "easeInOut" }}
            variants={{
              open: {
                opacity: 1,
                height: "auto",
              },
              collapsed: {
                opacity: 0,
                height: 0,
              },
            }}
          >
            {headings ? (
              <div>
                {headings.map((heading) => (
                  <div key={heading.slug}>
                    <Link
                      href={`#${heading.slug}`}
                      className={cn("my-4 text-lg text-text", {
                        "pl-5": heading.heading === 2,
                        "pl-7": heading.heading === 3,
                      })}
                    >
                      {heading.text}
                    </Link>
                  </div>
                ))}
              </div>
            ) : null}
          </motion.div>
        )}
      </div>
    </>
  )
}
