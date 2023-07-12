"use client"

import { useState } from "react"
import { incrementLikes } from "@/lib/actions"
import { FOCUS_VISIBLE_OUTLINE } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { HeartIcon } from "@heroicons/react/24/solid"

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
    currentUserLikes ? [emojis[currentUserLikes]] : []
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
    <div className="flex items-center space-x-4">
      <div className="relative">
        {/* Thank you emojis */}
        {animatedEmojis.map((emoji, index) => {
          return (
            <div
              key={index}
              className="absolute w-full animate-[emoji_0.75s_ease-out] text-center opacity-100"
            >
              {emoji}
            </div>
          )
        })}

        <button
          aria-label="like"
          className={cn(
            "shadow-lgx group relative block overflow-hidden rounded-lg bg-gradient-to-tl from-black/30 to-black/60 p-1 transition-all duration-300 ease-out hover:scale-[1.2] hover:rounded-[10px] active:scale-100 active:rounded-lg",
            FOCUS_VISIBLE_OUTLINE,
            {
              "animate-pulse": false,
              "hover:shadow-gray-500/30": currentUserLikes === 0,
              "hover:shadow-purple-500/50": currentUserLikes !== 0,
            }
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
              }
            )}
          />

          <HeartIcon className="relative w-5 text-rose-100 transition delay-100 duration-500 ease-out group-hover:scale-110" />
        </button>
      </div>

      {/* Like counter text */}
      <div className="text-black-100/90 text-xl font-medium leading-none">
        {<span>{totalUserLikes}</span>}
      </div>
    </div>
  )
}
