export const PostPreviewLoading = () => {
  return (
    <>
      <div className="flex flex-col w-full [&_h5]:hover:underline transform hover:scale-[1.02] transition-all space-y-3 animate-pulse">
        <div className="flex flex-col space-y-1">
          <div className="h-4 bg-black rounded-full w-3/4"></div>
          <div className="flex space-x-1 w-1/4">
            <div className="h-3 bg-black rounded-full w-full"></div>
            <div className="h-3 bg-black rounded-full w-full"></div>
          </div>
        </div>
      </div>
    </>
  )
}
