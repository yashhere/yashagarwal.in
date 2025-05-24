import {
  getLastVisitorLocation,
  type LastVisitorLocation,
} from "@/lib/lastVisitor"

export const LastVisitorSkeleton = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="size-1.5 shrink-0 rounded-full bg-foreground/20 animate-pulse" />
      <div className="h-4 w-48 bg-foreground/20 animate-pulse rounded" />
    </div>
  )
}

export async function LastVisitor() {
  var location: LastVisitorLocation | null

  if (process.env.NODE_ENV === "development") {
    location = {
      city: "New Delhi",
      country: "India",
    }
  } else {
    location = await getLastVisitorLocation()
  }

  if (!location) {
    return null
  }

  return (
    <div className="flex items-center gap-2">
      <div className="relative size-1.5 shrink-0 rounded-full bg-green-400 animate-pulse" />
      <p>
        Last visitor from {location.city}, {location.country}
      </p>
    </div>
  )
}
