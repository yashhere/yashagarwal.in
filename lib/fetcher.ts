export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
) {
  const res = await fetch(input, init)

  if (!res.ok) {
    const { message } = await res.json()
    throw Error(`Unable to execute request`, {
      cause: message,
    })
  }

  return res.json()
}
