import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid"

export type Tool = {
  title: string
  description?: string
  tags?: string[]
  link?: string
  category?: string
}

export const ToolCard = ({ title, tags, description, link }: Tool) => {
  return (
    <div className="h-full flex flex-col justify-between pb-2">
      <div>
        <div className="mb-2">
          <h4 className="font-semibold">{title}</h4>
          <div className="flex space-x-1 mb-1">
            {tags?.map((t) => {
              return <p key={t} className="text-xs">{`#${t}`}</p>
            })}
          </div>
        </div>
        <p className="text-sm">{description}</p>
      </div>
      {link != null ? (
        <div className="flex flex-row justify-end mt-3 space-x-1 [&>*]:hover:text-black/80 [&>*]:hover:underline text-xs text-black/60">
          <a className="" href={link}>
            take a look
          </a>
          <ChevronDoubleRightIcon className="w-2" />
        </div>
      ) : null}
    </div>
  )
}
