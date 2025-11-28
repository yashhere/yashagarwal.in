"use client"

import { BookOpen } from "@phosphor-icons/react/dist/ssr"
import { Drawer } from "vaul"

export const MobileFootnotes = () => {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <button className="border-border bg-background text-foreground hover:bg-muted/50 flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors">
          <BookOpen className="h-4 w-4" />
          Footnotes
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-background border-border fixed right-0 bottom-0 left-0 z-50 mt-24 flex h-[50vh] flex-col rounded-t-[10px] border-t outline-none">
          <div className="bg-background flex-1 overflow-y-auto rounded-t-[10px] p-4">
            <div className="bg-muted mx-auto mb-6 h-1.5 w-12 flex-shrink-0 rounded-full" />
            <div className="mx-auto max-w-md">
              <h3 className="mb-4 text-lg font-semibold">Footnotes</h3>
              <div
                id="mobile-footnote-target"
                className="text-muted-foreground footnotes-area pb-8 text-sm"
              />
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
