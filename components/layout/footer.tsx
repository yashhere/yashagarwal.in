import { FC } from "react"

export const Footer: FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-border bg-background mt-auto w-full border-t-2">
      <div className="mx-auto max-w-xl py-2">
        <div className="text-foreground/70 space-y-1 text-center text-sm">
          <div>
            © {currentYear === 2016 ? currentYear : `2016 - ${currentYear}`}{" "}
            Yash Agarwal.
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
