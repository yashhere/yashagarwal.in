import { siteConfig } from "@/config/site"
import { Post } from "contentlayer/generated"
import moment from "moment"

export const createOgImageForPost = ({ post }: { post: Post }) => {
  const siteUrl: string = siteConfig.url

  const title = post.title
  const tags = (post.tags && post.tags.map(({ value }) => value)) || []
  const metaItems = [
    siteUrl.replace(/(^\w+:|^)\/\//, ""),
    moment(post.published).format("MMM DD, YYYY"),
  ]

  if (tags.length != 0) {
    metaItems.push(...tags)
  }

  const meta = metaItems.join(" · ")

  return getOgImageUrl({ title, meta })
}

export const createOgImageGeneral = () => {
  const title = `${siteConfig.title}`
  const meta = siteConfig.description

  return getOgImageUrl({ title, meta })
}

const getOgImageUrl = ({ title, meta }: { title: string; meta: string }) =>
  [
    `https://res.cloudinary.com/yashagarwal/image/upload`,
    // Composed Image Transformations
    `w_1600,h_836,q_100`,

    // TITLE
    // Karla google font in light rose
    `l_text:Karla_72_bold:${e(title)},co_rgb:ffe4e6,c_fit,w_1400,h_240`,
    // Positioning
    `fl_layer_apply,g_south_west,x_100,y_180`,

    // META
    // Karla, but smaller
    `l_text:Karla_48:${e(meta)},co_rgb:ffe4e680,c_fit,w_1400`,
    // Positioning
    `fl_layer_apply,g_south_west,x_100,y_100`,

    `l_twitter_name:yash__here`,
    // Transformations
    `c_thumb,g_face,r_max,w_380,h_380,q_100`,
    // Positioning
    `fl_layer_apply,w_140,g_north_west,x_100,y_100`,

    // The BG path in Cloudinary library
    "yashagarwal.in/opengraph_background.jpg",
  ].join("/")

// double escape for commas and slashes
const e = (str: string) => encodeURIComponent(encodeURIComponent(str))
