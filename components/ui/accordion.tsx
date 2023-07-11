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
    <div className="border-b bg-clip-border last:border-none">
      <div className="">
        <div className="m-2 flex justify-between">
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
        <div className="mt-2 border-t bg-white">
          <div className="m-2">{children}</div>
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
