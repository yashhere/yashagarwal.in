import { ChangeEvent } from "react"
import { FiSearch } from "react-icons/fi"

export const SearchInput = ({
  search,
  onChange,
}: {
  search: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}) => {
  return (
    <>
      <form>
        <div className="relative text-foreground/80">
          <div className="pointer-events-none absolute inset-y-0 flex items-center pl-2">
            <FiSearch className="w-5" />
          </div>
          <input
            type="search"
            id="default_search"
            placeholder="Search for a note..."
            className="block w-full rounded-md border-none bg-muted/70 p-1 pl-8 text-lg placeholder:text-foreground/80 focus-within:border-border focus-within:outline-hidden"
            value={search}
            onChange={onChange}
          />
        </div>
      </form>
    </>
  )
}
