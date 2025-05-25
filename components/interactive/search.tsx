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
    <form className="w-full group">
      <div className="relative text-foreground">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <ListMagnifyingGlassIcon className="h-4 w-4 text-muted-foreground transition-colors duration-300 ease-out group-focus-within:text-foreground group-focus-within:animate-wobble" />
        </div>
        <input
          type="search"
          id="default_search"
          placeholder="Search for a note..."
          className="block w-full rounded-md border border-input bg-transparent px-3 py-2 pl-10
            text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm
            disabled:cursor-not-allowed disabled:opacity-50"
          value={search}
          onChange={onChange}
        />
      </div>
    </form>
  )
}
