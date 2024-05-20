import Connect from "@/components/ui/layout/connect"
import NewsLetter from "@/components/ui/layout/newsletter"
import Now from "@/components/ui/layout/now"
import Writing from "@/components/ui/layout/writing"

export default async function Page() {
  return (
    <>
      <Now />
      {/* <Work /> */}
      <Writing />
      <Connect />
      <NewsLetter />
    </>
  )
}
