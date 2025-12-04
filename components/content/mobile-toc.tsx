"use client"

import { useState } from "react"
import { ListIcon } from "@phosphor-icons/react/dist/ssr"
import { Drawer } from "vaul"

import { Heading } from "@/types"
import { TableOfContents } from "./table-of-contents"

export const MobileTOC = ({
  headings,
  children,
}: {
  headings: Heading[]
  children?: React.ReactNode
}) => {
  const [open, setOpen] = useState(false)

  if (!headings || headings.length === 0) return null

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        {children || (
          <button className="border-border bg-background text-foreground hover:bg-muted/50 flex w-full items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium uppercase transition-colors">
            <ListIcon className="h-4 w-4" />
            On this Page
          </button>
        )}
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay
          className="fixed inset-0 bg-black/40"
          aria-hidden="true"
        />
        <Drawer.Content className="bg-background border-border fixed right-0 bottom-0 left-0 z-50 mt-24 flex h-[80vh] flex-col rounded-t-[10px] border-t outline-none">
          <div className="bg-background flex-1 overflow-y-auto rounded-t-[10px] p-4">
            <div className="bg-muted mx-auto mb-6 h-1.5 w-12 shrink-0 rounded-full" />
            <div className="mx-auto max-w-md">
              <Drawer.Title className="mb-4 text-lg font-semibold uppercase">
                On this Page
              </Drawer.Title>
              <Drawer.Description className="sr-only">
                Table of contents for the current page.
              </Drawer.Description>
              <TableOfContents
                headings={headings}
                className="border-none p-0 shadow-none"
                onItemClick={() => setOpen(false)}
                mode="mobile"
              />
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
