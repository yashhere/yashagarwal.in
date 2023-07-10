import { env } from "@/env.mjs"
import { SiteConfig } from "types"

export const siteConfig: SiteConfig = {
  name: "Yash Agarwal",
  email: "yashagarwaljpr+blog@gmail.com",
  description: "Developer, writer, and creator",
  url: `${env.NEXT_PUBLIC_APP_URL}`,
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/images/og.jpg`,
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
}
