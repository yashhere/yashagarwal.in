import { env } from "@/env.mjs"
import { SiteConfig } from "types"

export const siteConfig: SiteConfig = {
  name: "Yash Agarwal",
  description: "Developer, writer, and creator",
  url: "https://yashagarwal.in",
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og.jpg`,
  links: {
    twitter: "https://twitter.com/yash__here",
    github: "https://github.com/yashhere",
  },
}
