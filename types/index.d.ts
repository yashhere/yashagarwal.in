/* eslint-disable no-unused-vars */
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

export interface ImageProps {
  id: number
  height: string
  width: string
  public_id: string
  format: string
  blurDataUrl?: string
}
