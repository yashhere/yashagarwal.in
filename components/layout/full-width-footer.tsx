import { DarkToggle } from "../interactive/mode-toggle"
import { AnalogClock } from "../ui/clock/clock"

export default function FullWidthFooter() {
  return (
    <>
      {/* <hr className="border-[0.5px]" /> */}
      <footer className="mt-auto w-full space-y-4">
        {/* <hr className="border-[0.5px]" /> */}
        <div className="mx-auto flex max-w-2xl flex-col px-3 sm:px-0">
          <div className="my-2 flex flex-row items-center justify-between">
            <DarkToggle />
            <AnalogClock />
          </div>
        </div>
      </footer>
    </>
  )
}
