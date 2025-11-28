export const NoteSkeleton = () => {
  return (
    <div className="flex">
      <div className="hover:bg-muted/80 flex w-full flex-col items-start gap-0 rounded-lg px-4 py-2 transition-all duration-200 select-none md:flex-row md:items-center md:gap-2">
        <div className="flex w-full flex-col md:w-auto">
          <div className="bg-muted h-5 w-64 animate-pulse rounded" />
        </div>
        <span
          className="border-foreground/30 mx-2 hidden h-px flex-1 border-t border-dotted bg-transparent md:block"
          aria-hidden
        />
        <div className="bg-muted mt-1 h-4 w-12 animate-pulse rounded md:mt-0" />
      </div>
    </div>
  )
}
