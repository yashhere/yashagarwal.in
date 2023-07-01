import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import { ChangeEvent } from "react"

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
        <div className="relative text-black/40">
          <div className="absolute inset-y-0 flex items-center pl-2 pointer-events-none">
            <MagnifyingGlassIcon className="w-5" />
          </div>
          <input
            type="search"
            id="default_search"
            placeholder="Search for a post..."
            className="bg-black/10 text-lg block p-1 pl-8 w-full rounded-md drop-shadow-md"
            value={search}
            onChange={onChange}
          />
        </div>
      </form>
    </>
  )
}
