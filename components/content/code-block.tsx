"use client"

import { useState } from "react"
import { Check, Copy } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"

interface CodeBlockProps {
  children: React.ReactNode
  className?: string
  "data-language"?: string
  "data-theme"?: string
  [key: string]: any
}

export function CodeBlock({
  children,
  className,
  "data-language": language,
  ...props
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const codeElement = (children as any)?.props?.children
    const code =
      typeof codeElement === "string" ? codeElement : extractCode(codeElement)

    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const extractCode = (element: any): string => {
    if (typeof element === "string") return element
    if (Array.isArray(element)) {
      return element.map(extractCode).join("")
    }
    if (element?.props?.children) {
      return extractCode(element.props.children)
    }
    return ""
  }

  // Only show controls for code blocks (not inline code)
  const isCodeBlock = props["data-theme"] || language

  return (
    <div className="group relative">
      {isCodeBlock && (
        <div className="bg-muted flex items-center justify-between px-2 py-1">
          <span className="text-muted-foreground text-xs font-medium capitalize">
            {language || "code"}
          </span>
          <button
            onClick={handleCopy}
            className="text-muted-foreground hover:text-foreground hover:bg-accent flex items-center gap-1.5 rounded px-2 py-1 text-xs transition-colors"
            aria-label="Copy code"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      )}
      <pre
        className={cn(
          "no-scrollbar overflow-x-auto",
          !isCodeBlock &&
            "mt-4 mb-6 rounded-lg border px-4 py-4 font-mono text-base",
          isCodeBlock && "rounded-t-none",
          className
        )}
        data-language={language}
        {...props}
      >
        {children}
      </pre>
    </div>
  )
}
