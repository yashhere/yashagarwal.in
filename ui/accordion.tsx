import { FC, ReactNode, useState } from "react"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid"

type AccordionItemProps = {
  label: string
  children: ReactNode
  isOpen?: boolean
}

export const AccordionItem: FC<AccordionItemProps> = ({
  label,
  children,
  isOpen,
}) => {
  const [open, setOpen] = useState(isOpen)

  return (
    <div className="border-b last:border-none bg-clip-border">
      <div className="">
        <div className="flex justify-between mx-2 my-2">
          <h4 className="font-semibold">{label}</h4>
          <button onClick={(e) => setOpen(!open)}>
            {open ? (
              <ChevronUpIcon className="w-4" />
            ) : (
              <ChevronDownIcon className="w-4" />
            )}
          </button>
        </div>
      </div>
      {open ? (
        <div className="border-t mt-2 bg-white">
          <div className="mx-2 my-2">{children}</div>
        </div>
      ) : null}
    </div>
  )
}

type AccordionProps = {
  children: ReactNode[]
}

export const Accordion: FC<AccordionProps> = ({ children }) => {
  return <div className="rounded-lg border border-black/80">{children}</div>
}
