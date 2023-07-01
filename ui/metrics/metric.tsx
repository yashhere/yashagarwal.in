export const Metric = ({ stat }: { stat: Number | undefined }) => {
  return (
    <span className="-mx-0.5 animate-[mutation_2s_ease-in-out_1] rounded-md px-0.5 slashed-zero tabular-nums tracking-tight">
      {`${Number(stat || 0).toLocaleString()} views`}
    </span>
  )
}
