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
            <div className="w-1 h-1 bg-border rounded-full"></div>
            <div className="w-1 h-1 bg-border rounded-full"></div>
            <div className="w-1 h-1 bg-border rounded-full"></div>
          </div>
        )
      case "diamond":
        return (
          <div className="px-4">
            <div className="w-2 h-2 bg-border rotate-45 rounded-sm"></div>
          </div>
        )
      case "star":
        return <div className="px-4 text-border text-lg font-light">✦</div>
      case "dot":
      default:
        return (
          <div className="px-4">
            <div className="w-2 h-2 bg-border rounded-full shadow-sm"></div>
          </div>
        )
    }
  }

  return (
    <div className={cn("my-8 flex items-center justify-center", className)}>
      <div className="h-px bg-gradient-to-r from-transparent via-border/80 to-border flex-1"></div>
      {renderCenter()}
      <div className="h-px bg-gradient-to-l from-transparent via-border/80 to-border flex-1"></div>
    </div>
  )
}
