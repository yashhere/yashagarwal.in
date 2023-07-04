"use client"

import { createHash } from "crypto"
import { useState } from "react"
import { headers } from "next/headers"
import { HeartIcon } from "@heroicons/react/24/solid"

import { FOCUS_VISIBLE_OUTLINE } from "@/lib/constants"
import { getAllLikesCount, getLikes, incrementLikes } from "@/lib/db"
import { cn } from "@/lib/utils"

const emojis = ["👍", "🙏", "🥰"]

export function LikeButton({
  slug,
  sessionId,
  totalLikes,
  userLikes,
}: {
  slug: string
  sessionId: string
  totalLikes: number
  userLikes: number
}) {
  const [currentUserLikes, setCurrentUserLikes] = useState(userLikes)
  const [totalUserLikes, setTotalUserLikes] = useState(totalLikes)
  let [animatedEmojis, setAnimatedEmojis] = useState<string[]>(
    currentUserLikes ? [emojis[currentUserLikes]] : [],
  )

  const handleClick = async () => {
    if (currentUserLikes >= 3) {
      return
    }
    await incrementLikes(slug, sessionId, 1)
    setCurrentUserLikes(currentUserLikes + 1)
    setTotalUserLikes(totalUserLikes + 1)

    if (currentUserLikes && currentUserLikes <= 2) {
      setAnimatedEmojis([...animatedEmojis, emojis[currentUserLikes]])
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        {/* Thank you emojis */}
        {animatedEmojis.map((emoji, index) => {
          return (
            <div
              key={index}
              className="absolute w-full animate-[emoji_0.75s_ease-out] text-center opacity-0"
            >
              {emoji}
            </div>
          )
        })}

        <button
          className={cn(
            "shadow-lgx group relative block overflow-hidden rounded-lg bg-gradient-to-tl from-white/5 to-white/30 p-1 transition-all duration-300 ease-out hover:scale-[1.2] hover:rounded-[10px] active:scale-100 active:rounded-lg",
            FOCUS_VISIBLE_OUTLINE,
            {
              // "animate-pulse": isLoading,
              "hover:shadow-gray-500/30": currentUserLikes === 0,
              "hover:shadow-purple-500/50": currentUserLikes !== 0,
            },
          )}
          onClick={handleClick}
        >
          <div
            className={cn(
              "absolute inset-0 transform-gpu bg-gradient-to-tl from-purple-500 to-rose-400 transition-transform",
              {
                "translate-y-8": currentUserLikes === 0,
                "translate-y-5": currentUserLikes === 1,
                "translate-y-3": currentUserLikes === 2,
              },
            )}
          />

          <HeartIcon className="relative w-5 text-rose-500 transition delay-100 duration-500 ease-out group-hover:scale-110" />
        </button>
      </div>

      {/* Like counter text */}
      <div className="text-lg font-medium leading-none text-rose-500/90">
        {<span>{totalUserLikes}</span>}
      </div>
    </div>
  )
}
