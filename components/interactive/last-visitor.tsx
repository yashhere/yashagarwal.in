import {
  getLastVisitorLocation,
  type LastVisitorLocation,
} from "@/lib/lastVisitor"

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
