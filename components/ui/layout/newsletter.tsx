export default async function NewsLetter() {
  return (
    <>
      <div className="mb-5 mt-16 flex flex-col items-start align-middle font-semibold sm:mb-6 ">
        <h1>Newsletter</h1>
      </div>
      <div className="text-gray-1100">
        <form className="shadow-border mt-6 flex h-10  items-center justify-between gap-2 overflow-hidden rounded-md border-[1px] border-gray-600 bg-white focus-within:border-gray-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-black/20 focus-within:ring-offset-0 dark:bg-[#0B0B09] dark:focus-within:ring-white/20">
          <input
            type="text"
            name="name"
            placeholder="Enter your email"
            className="h-full w-[40%] grow border-none bg-transparent px-3.5 transition-colors placeholder:text-gray-900 focus:outline-none"
          />
          <button
            type="submit"
            className="hover:bg-gray-1200/90 focus:shadow-focus-ring h-full rounded-r-[4px] bg-gray-1200 px-1.5 text-sm font-medium text-gray-100 outline-none md:w-[104px] md:px-3.5"
          >
            <span className="block">Subscribe</span>
          </button>
        </form>
      </div>
    </>
  )
}
