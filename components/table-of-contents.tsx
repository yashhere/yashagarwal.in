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

  if (headings.length == 0) {
    return null
  }

  return (
    <>
      <div>
        {interactive ? (
          <button
            className="group flex w-full items-center text-left"
            onClick={() => {
              setIsOpen(!isOpen)
            }}
          >
            <div className="font-heading text-lg font-bold">
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
          <div className="font-heading text-lg font-bold">
            Table of Contents
          </div>
        )}
        <hr className="border-t-1 my-4 border-gray-300/60" />
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
            <div className="ml-2">
              {headings.map((heading) => (
                <div
                  key={heading.slug}
                  className={cn("my-3 line-clamp-1 sm:line-clamp-none", {
                    "ml-5": heading.heading === 2,
                    "ml-9": heading.heading === 3,
                    "ml-14": heading.heading === 4,
                  })}
                >
                  <Link
                    noUnderline
                    href={`#${heading.slug}`}
                    className="text-lg text-text/80 hover:text-primary"
                  >
                    {heading.text}
                  </Link>
                </div>
              ))}
              <hr className="border-t-1 my-4 border-gray-300/60" />
            </div>
          </motion.div>
        )}
      </div>
    </>
  )
}
