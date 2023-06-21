"use client";
import { Suspense, useEffect } from "react";

import { Stats } from "@/lib/db";
import { fetcher } from "@/lib/fetcher";
import { LoadingDots } from "./loading";
import { Metric } from "./metrics/metric";
import useSWR from "swr";

export function ViewCounter({
  slug,
  track,
}: {
  slug?: string;
  track: boolean;
}) {
  const { data } = useSWR<Stats>(`/views/${slug}`, fetcher);
  let views = data?.views || 0;

  useEffect(() => {
    const register = () =>
      fetch(`/views/${slug}`, {
        method: "POST",
      });
    if (track) {
      register();
    }
  }, [slug]);

  return (
    <div className="flex space-x-1">
      <Suspense fallback={<LoadingDots />}>
        <Metric key={"views"} stat={views} />
      </Suspense>
      <p>views</p>
    </div>
  );
}
