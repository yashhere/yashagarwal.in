import { FC, Suspense } from "react"

import { AnalogClock, ClockSkeleton } from "../ui/clock/clock"

export const Footer: FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-border bg-background mt-auto w-full border-t-2">
      <div className="mx-auto max-w-3xl px-4 py-2 xl:px-6">
        <div className="text-foreground/70 flex items-center justify-between text-base">
          {/* Left: Copyright */}
          <div>
            © {currentYear === 2016 ? currentYear : `2016 - ${currentYear}`}{" "}
            Yash Agarwal.
          </div>

          {/* Right: Clock */}
          <div className="flex items-center">
            <Suspense fallback={<ClockSkeleton />}>
              <AnalogClock />
            </Suspense>
          </div>

          {/* <Suspense
            fallback={
              <div className="flex justify-center">
                <div className="bg-muted h-5 w-32 animate-pulse rounded" />
              </div>
            }
          >
            <div className="flex justify-center">
              <LastVisitor />
            </div>
          </Suspense> */}
        </div>
      </div>
    </footer>
  )
}
