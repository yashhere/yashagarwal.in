import { getPost } from "@/lib/content";
import moment from "moment";
import Link from "next/link";
import { Suspense } from "react";
import { ViewCounter } from "../view-counter";
import { PostPreviewLoading } from "./loading";

export const PostPreview = ({
  post,
}: {
  post: NonNullable<ReturnType<typeof getPost>>;
}) => {
  return (
    <>
      <Suspense fallback={<PostPreviewLoading />}>
        <Link
          href={`/blog/${post.slug}`}
          className="flex flex-col w-full [&_h5]:hover:underline transform hover:scale-[1.02] transition-all"
        >
          <div className="flex flex-col">
            <h5 className="text-md font-semibold font-body">{post.title}</h5>
            <div className="flex flex-row justify-between font-medium text-black/50 text-sm items-center">
              <div className="flex flex-row space-x-1">
                <p>
                  {moment(post.published, "YYYY-MM-DD").format("MMM DD, YYYY")}
                </p>
                {/* <p>&middot;</p> */}
                {/* TODO: <ViewCounter slug={post.slug} track={false} /> */}
              </div>
            </div>
          </div>
        </Link>
      </Suspense>
    </>
  );
};
