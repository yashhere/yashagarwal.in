import { ChangeEvent } from "react"
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"

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
        <div className="relative text-text/80">
          <div className="pointer-events-none absolute inset-y-0 flex items-center pl-2">
            <MagnifyingGlassIcon className="w-5" />
          </div>
          <input
            type="search"
            id="default_search"
            placeholder="Search for a note..."
            className="block w-full rounded-md border-none bg-gray-900/10 p-1 pl-8 text-lg drop-shadow-md placeholder:text-text/80"
            value={search}
            onChange={onChange}
          />
        </div>
      </form>
    </>
  )
}
