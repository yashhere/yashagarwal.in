export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
  }
}

export type PostWithMetrics = {
  post: Partial<Post>
  likes: number
  views: number
}
