"use client"

type ErrorProps = {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <>
      <div className="flex h-screen bg-white px-4">
        <h1 className="my-8 text-4xl font-bold tracking-tighter sm:mt-4">
          Some error occurred. <br />
          {error.message}
        </h1>
      </div>
    </>
  )
}
