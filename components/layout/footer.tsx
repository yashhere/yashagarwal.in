import { FC, Suspense } from "react"

import { LastVisitor } from "../interactive/last-visitor"

export const Footer: FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-border bg-background mt-auto w-full border-t-1">
      <div className="mx-auto max-w-2xl px-4 py-8 md:px-0">
        <div className="text-foreground/70 space-y-4 text-center text-sm">
          <div>
            © {currentYear === 2016 ? currentYear : `2016 - ${currentYear}`}{" "}
            Yash Agarwal. All rights reserved.
          </div>

          <Suspense
            fallback={
              <div className="mb-6 flex justify-center">
                <div className="bg-muted h-5 w-32 animate-pulse rounded" />
              </div>
            }
          >
            <div className="mb-6 flex justify-center">
              <LastVisitor />
            </div>
          </Suspense>
        </div>
      </div>
    </footer>
  )
}
