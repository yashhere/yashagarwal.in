import { ChangeEvent } from "react"
import { ListMagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr"

export const SearchInput = ({
  search,
  onChange,
}: {
  search: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}) => {
  return (
    <form className="group w-full">
      <div className="text-foreground relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <ListMagnifyingGlassIcon className="text-muted-foreground group-focus-within:text-foreground group-focus-within:animate-wobble h-4 w-4 transition-colors duration-200 ease-out" />
        </div>
        <input
          type="search"
          id="default_search"
          placeholder="Search for a note..."
          className="border-input file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring block w-full rounded-md border bg-transparent px-3 py-2 pl-10 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          value={search}
          onChange={onChange}
        />
      </div>
    </form>
  )
}
