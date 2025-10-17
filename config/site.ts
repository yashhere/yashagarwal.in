import { siteConfig as siteMetadata } from "@/lib/seo/default"
import { SiteConfig } from "@/types"

export const siteConfig: SiteConfig = {
  ...siteMetadata,
  email: "yashagarwaljpr+blog@gmail.com",
  links: {
    twitter: "https://twitter.com/yash__here",
    github: "https://github.com/yashhere",
  },
  comment: {
    repo: "yashhere/yashagarwal.in-comments",
    repoId: "R_kgDOJ5aOmA",
    category: "Comments",
    categoryId: "DIC_kwDOJ5aOmM4CXxEK",
    lightTheme: "light",
    darkTheme: "dark",
  },
  popularNotes: 3,
  featuredNotes: 5,
}
