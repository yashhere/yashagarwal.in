"use client"

type ErrorProps = {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <>
      <div className="flex h-screen px-4 bg-white">
        <h1 className="mt-8 sm:mt-4 font-bold text-4xl mb-8 tracking-tighter">
          Some error occurred. <br />
          {error.message}
        </h1>
      </div>
    </>
  )
}
