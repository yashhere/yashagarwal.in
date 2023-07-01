import useSWR, { SWRConfiguration } from "swr"

async function getTotalViews(): Promise<number> {
  const res = await fetch("/views")
  if (!res.ok) {
    throw new Error("An error occurred while fetching the data.")
  }
  return res.json()
}

export const useLikes = (config?: SWRConfiguration) => {
  const { data: views, error: viewsError } = useSWR<number>(
    `/views`,
    () => getTotalViews(),
    {
      dedupingInterval: 60000,
      ...config,
    },
  )

  return {
    views,
    isLoading: !viewsError && !views,
    isError: !!viewsError,
  }
}
