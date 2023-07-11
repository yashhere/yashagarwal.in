// https://github.com/orgs/giscus/discussions/152

import React from "react"
import { siteConfig } from "@/config/site"
import { useTheme } from "next-themes"

interface IGiscus {
  mapping: string
  commentNodeId: string
}

const config = siteConfig.comment
const REPO_NAME = config.repo as string
const REPO_ID = config.repoId as string
const CATEGORY = config.category as string
const CATEGORY_ID = config.categoryId as string

const THEME_MAPPING = {
  light: config.lightTheme,
  dark: config.darkTheme,
}

export const useGiscus = ({ mapping, commentNodeId }: IGiscus) => {
  const { resolvedTheme = "light" } = useTheme()
  const theme = React.useRef(resolvedTheme)

  React.useEffect(() => {
    const scriptParentNode = document.getElementById(commentNodeId)
    if (!scriptParentNode) return

    const script = document.createElement("script")
    const attributes = {
      src: "https://giscus.app/client.js",
      "data-repo": REPO_NAME,
      "data-repo-id": REPO_ID,
      "data-category": CATEGORY,
      "data-category-id": CATEGORY_ID,
      "data-strict": "0",
      "data-mapping": "pathname",
      "data-reactions-enabled": "1",
      "data-input-position": "top",
      "data-emit-metadata": "0",
      "data-theme": THEME_MAPPING[theme.current as keyof typeof THEME_MAPPING],
      "data-lang": "en",
      "data-loading": "lazy",
      crossorigin: "anonymous",
      async: "",
    }

    Object.entries(attributes).forEach(([name, value]) =>
      script.setAttribute(name, value)
    )

    scriptParentNode.appendChild(script)
  }, [commentNodeId, mapping])

  React.useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>(
      "iframe.giscus-frame"
    )
    iframe?.contentWindow?.postMessage(
      {
        giscus: {
          setConfig: {
            theme: THEME_MAPPING[resolvedTheme as keyof typeof THEME_MAPPING],
          },
        },
      },
      "https://giscus.app"
    )
  }, [resolvedTheme])
}
