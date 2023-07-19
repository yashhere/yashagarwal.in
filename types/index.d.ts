/* eslint-disable no-unused-vars */
export type SiteConfig = {
  title: string
  name: string
  email: string
  description: string
  url: string
  links: {
    twitter: string
    github: string
  }
  comment: {
    repo: string
    repoId: string
    category: string
    categoryId: string
    lightTheme: string
    darkTheme: string
  }
  popularPosts: number
}

export type PostWithMetrics = {
  post: Partial<Post>
  likes: number
  views: number
  series?: {
    seriesTitle: string
    posts: {
      title: string
      slug: string
      status: "draft" | "published"
      isCurrent: boolean
    }[]
  }
}

export interface ImageProps {
  id: number
  height: string
  width: string
  public_id: string
  format: string
  blurDataUrl?: string
}
