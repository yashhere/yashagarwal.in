import { cn } from "@/lib/utils"

interface DecorativeHrProps {
  className?: string
  variant?: "dot" | "dots" | "diamond" | "star"
}

export function DecorativeHr({
  className,
  variant = "dots",
}: DecorativeHrProps) {
  const renderCenter = () => {
    switch (variant) {
      case "dots":
        return (
          <div className="flex space-x-1 px-4">
            <div className="bg-border h-1 w-1 rounded-full"></div>
            <div className="bg-border h-1 w-1 rounded-full"></div>
            <div className="bg-border h-1 w-1 rounded-full"></div>
          </div>
        )
      case "diamond":
        return (
          <div className="px-4">
            <div className="bg-border h-2 w-2 rotate-45 rounded-sm"></div>
          </div>
        )
      case "star":
        return <div className="text-border px-4 text-lg font-light">✦</div>
      case "dot":
      default:
        return (
          <div className="px-4">
            <div className="bg-border h-2 w-2 rounded-full shadow-sm"></div>
          </div>
        )
    }
  }

  return (
    <div className={cn("my-8 flex items-center justify-center", className)}>
      <div className="via-border/80 to-border h-px flex-1 bg-linear-to-r from-transparent"></div>
      {renderCenter()}
      <div className="via-border/80 to-border h-px flex-1 bg-linear-to-l from-transparent"></div>
    </div>
  )
}
