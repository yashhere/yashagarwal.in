export const NotePreviewLoading = () => {
  return (
    <>
      <div className="flex w-full animate-pulse flex-col space-y-3 transition-all hover:scale-[1.02] [&_h5]:hover:underline">
        <div className="flex flex-col space-y-1">
          <div className="h-4 w-3/4 rounded-full bg-background"></div>
          <div className="flex w-1/4 space-x-1">
            <div className="h-3 w-full rounded-full bg-background"></div>
            <div className="h-3 w-full rounded-full bg-background"></div>
          </div>
        </div>
      </div>
    </>
  )
}
