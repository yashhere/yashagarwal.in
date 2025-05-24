import { FC, Suspense } from "react"
import { env } from "@/env.mjs"

import { LastVisitor, LastVisitorSkeleton } from "../interactive/last-visitor"
import Link from "../ui/link"

export const Footer: FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-auto w-full border-t-1  border-border bg-background">
      <div className="mx-auto max-w-2xl px-4 py-8 md:px-0">
        <div className="space-y-4 text-center text-sm text-foreground/70">
          <div>
            © {currentYear === 2016 ? currentYear : `2016 - ${currentYear}`}{" "}
            Yash Agarwal. All rights reserved.
          </div>

          <div className="flex flex-row justify-center text-center gap-1">
            <span>
              Website{" "}
              <Link
                href="/colophon"
                variant="text"
                className="font-medium transition-colors"
              >
                built with
              </Link>{" "}
              Next.js & Tailwind CSS
            </span>
            <div>
              (
              <Link
                href="https://github.com/yashhere/yashagarwal.in"
                external={true}
                showIcon={false}
                variant="text"
                className="font-medium transition-colors"
              >
                source
              </Link>
              )
            </div>
          </div>

          <Suspense
            fallback={
              <div className="mb-6 flex justify-center">
                <LastVisitorSkeleton />
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
