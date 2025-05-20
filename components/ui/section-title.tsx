export default function SectionTitle({
  data,
  title,
}: {
  data: any
  title: string
}) {
  return (
    <div className="mb-4">
      <h1 className="mt-2 font-sans text-2xl font-semibold text-foreground sm:text-2xl md:text-3xl">
        {title}
      </h1>
    </div>
  )
}
