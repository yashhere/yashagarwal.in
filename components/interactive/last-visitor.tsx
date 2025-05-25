import {
  getCurrentUserLocation,
  getLastVisitorLocation,
} from "@/lib/lastVisitor"
import { LastVisitorClient } from "./last-visitor-client"

export async function LastVisitor() {
  if (process.env.NODE_ENV === "development") {
    const serverLocation = { city: "Mumbai", country: "India" }
    const currentLocation = { city: "New Delhi", country: "India" }

    return (
      <LastVisitorClient
        serverLocation={serverLocation}
        currentUserLocation={currentLocation}
      />
    )
  }

  const [serverLocation, currentLocation] = await Promise.all([
    getLastVisitorLocation(),
    getCurrentUserLocation(),
  ])

  return (
    <LastVisitorClient
      serverLocation={serverLocation}
      currentUserLocation={currentLocation}
    />
  )
}
