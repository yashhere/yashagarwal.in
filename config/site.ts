import { siteConfig as siteMetadata } from "@/lib/seo/default"
import { SiteConfig } from "@/types"

export const siteConfig: SiteConfig = {
  ...siteMetadata,
  email: "yashagarwaljpr+blog@gmail.com",
  links: {
    twitter: "https://twitter.com/yash__here",
    github: "https://github.com/yashhere",
  },
  popularNotes: 3,
  featuredNotes: 5,
}
