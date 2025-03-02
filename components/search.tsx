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
        <div className="relative text-text/80">
          <div className="pointer-events-none absolute inset-y-0 flex items-center pl-2">
            <FiSearch className="w-5" />
          </div>
          <input
            type="search"
            id="default_search"
            placeholder="Search for a note..."
            className="block w-full rounded-md border-none bg-gray-500/10 p-1 pl-8 text-lg drop-shadow-md placeholder:text-text/80 focus-within:border-gray-400 focus-within:outline-hidden"
            value={search}
            onChange={onChange}
          />
        </div>
      </form>
    </>
  )
}
