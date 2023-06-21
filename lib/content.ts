import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";

export function getPosts() {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.published), new Date(b.published));
  });
  if (process.env.NODE_ENV === "development") {
    return posts;
  } else {
    return posts.filter((p) => p.status === "published");
  }
}

export function getPost(slug: string) {
  const post = allPosts.find((post) => post.slug === slug);
  if (post != null) {
    return post;
  } else {
    throw Error("Unable to Retrieve Post");
  }
}

export function getSeries(title: string, current: string) {
  return {
    title: title,
    posts: allPosts
      .filter((p) => p.series?.title === title)
      .sort(
        (a, b) =>
          Number(new Date(a.series!.order)) - Number(new Date(b.series!.order))
      )
      .map((p) => {
        return {
          title: p.title,
          slug: p.slug,
          status: p.status,
          isCurrent: p.slug === current,
        };
      }),
  };
}
