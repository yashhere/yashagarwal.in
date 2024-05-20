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
      <form className="shadow-border mt-6 flex h-10 items-center justify-between gap-2 overflow-hidden rounded-md border-[1px] border-gray-600 bg-white focus-within:border-gray-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-black/20 focus-within:ring-offset-0 dark:bg-[#0B0B09] dark:focus-within:ring-white/20">
        <div className="pointer-events-none relative inset-y-0 flex items-center pl-2 text-gray-1200">
          <FiSearch className="w-5" />
        </div>
        <input
          type="search"
          id="default_search"
          placeholder="Search and you will find ..."
          className="h-full grow border-none bg-transparent pr-2 transition-colors placeholder:text-gray-900 focus:outline-none"
          value={search}
          onChange={onChange}
        />
      </form>
    </>
  )
}
