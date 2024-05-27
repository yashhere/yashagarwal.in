import { cn } from "@/lib/utils"

export default function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={cn("size-5", className)}>
      <div
        style={{
          position: "relative",
          top: "50%",
          left: "50%",
        }}
        className={cn("loading-spinner", "size-5", className)}
      >
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            style={{
              animationDelay: `${-1.2 + 0.1 * i}s`,
              background: "gray",
              position: "absolute",
              borderRadius: "1rem",
              width: "30%",
              height: "8%",
              left: "-10%",
              top: "-4%",
              transform: `rotate(${30 * i}deg) translate(120%)`,
            }}
            className="animate-spinner"
          />
        ))}
      </div>
    </div>
  )
}
