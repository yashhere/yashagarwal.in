import "server-only";

import { getPost, getSeries } from "@/lib/content";
import { components } from "@/ui/mdx";
import { TableOfContents } from "@/ui/post/table-of-contents";
import { Series } from "@/ui/series";
import { ViewCounter } from "@/ui/view-counter";
import { allPosts } from "contentlayer/generated";
import moment from "moment";
import { getMDXComponent } from "next-contentlayer/hooks";
import { Suspense } from "react";
import { useRouter } from "next/router";

export async function generateStaticParams() {
  return allPosts
    .filter((p) => p.status != "draft")
    .map((p) => {
      slug: p.slug;
    });
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);

  return {
    title: `${post.title} | Yash Agarwal`,
    description: post.description,
    authors: {
      name: "Yash Agarwal",
      url: "https://yashagarwal.in",
    },
    keywords: post.tags?.map((tag) => tag.value),
    creator: "Yash Agarwal",
    twitter: {
      card: "summary_large_image",
      creator: "@yash__here",
    },
  };
}

const Page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const post: NonNullable<ReturnType<typeof getPost>> = getPost(slug);
  const Content = getMDXComponent(post.body.code);

  return (
    <>
      <div className="space-y-2">
        <section>
          <h1 className="font-bold font-heading text-5xl sm:text-[72px] leading-extra-tight relative max-w-4xl pb-2">
            {post.title}
          </h1>
          <div className="mt-2 flex space-x-1 text-xs text-black/60 sm:text-lg font-body font-semibold">
            <p>{moment(post.published).format("MMM DD, YYYY")}</p>
            {/* <p>&middot;</p> */}
            {/* TODO: <ViewCounter slug={slug} track={true} /> */}
          </div>
        </section>

        <Suspense fallback={<div>Loading...</div>}>
          {/* DEBUG: Table of contents probably need some UI tweaking */}
          <TableOfContents
            headings={post.headings}
            path={`/blog/${post.slug}`}
          />

          {/* Post Series */}
          {post.series != null ? (
            <Series
              series={getSeries(post.series.title, post.slug)}
              interactive={true}
              current={slug}
            />
          ) : null}

          {/* Post Content */}
          <div className="space-y-4 font-medium text-black/80 [&_h1,h2,h3,h4]:text-black">
            <Content components={components} />
          </div>
        </Suspense>
      </div>
    </>
  );
};

export default Page;
