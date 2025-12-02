import { FeaturedNotes } from "@/components/content/featured-notes"
import { siteConfig } from "@/config/site"
import { HomeContent } from "./home-content"

export default function Page() {
  return (
    <HomeContent>
      <FeaturedNotes count={siteConfig.featuredNotes} />
    </HomeContent>
  )
}
