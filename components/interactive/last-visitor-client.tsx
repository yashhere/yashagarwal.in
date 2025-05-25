"use client"

import { useEffect, useState } from "react"
import { LastVisitorLocation } from "@/lib/lastVisitor"

interface LastVisitorClientProps {
  serverLocation: LastVisitorLocation | null
  currentUserLocation: LastVisitorLocation | null
}

interface SessionVisitorData {
  location: LastVisitorLocation
  timestamp: number
  expiresAt: number
}

export const LoadingSkeleton = () => (
  <div className="flex items-center gap-2">
    <div className="size-1.5 shrink-0 rounded-full bg-foreground/20 animate-pulse" />
    <div className="h-4 w-48 bg-foreground/20 animate-pulse rounded" />
  </div>
)

export function LastVisitorClient({
  serverLocation,
  currentUserLocation,
}: LastVisitorClientProps) {
  const [displayLocation, setDisplayLocation] =
    useState<LastVisitorLocation | null>(null)
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setMounted(true)

    const currentLocation = currentUserLocation
    const SESSION_TTL = 10 * 60 * 1000 // 10 minutes in milliseconds
    const now = Date.now()

    // Get the persisted "last visitor" location for this session
    const persistedSessionData = localStorage.getItem("sessionLastVisitor")
    let sessionLastVisitor: LastVisitorLocation | null = null
    let isSessionValid = false

    try {
      if (persistedSessionData) {
        const sessionData: SessionVisitorData = JSON.parse(persistedSessionData)

        // Check if session has expired
        if (now < sessionData.expiresAt) {
          sessionLastVisitor = sessionData.location
          isSessionValid = true
        } else {
          // Session expired, clean up
          localStorage.removeItem("sessionLastVisitor")
          console.log("Session visitor data expired, removed from localStorage")
        }
      }
    } catch (e) {
      console.error("Failed to parse session last visitor location:", e)
      localStorage.removeItem("sessionLastVisitor")
    }

    let locationToShow: LastVisitorLocation | null = null

    // Updated Strategy with TTL:
    // 1. If we have a valid (non-expired) session location that's different from current user, keep showing it
    // 2. If no valid session location OR session location is same as current user:
    //    - Always show server location if it exists (it represents a different visitor)
    //    - Only persist it if it's different from current user (to avoid showing current user on navigation)

    if (
      isSessionValid &&
      sessionLastVisitor &&
      !isSameLocation(sessionLastVisitor, currentLocation)
    ) {
      // Keep showing the valid session's last visitor location
      locationToShow = sessionLastVisitor
    } else if (serverLocation) {
      // Show server location (represents previous visitor, even if same city)
      locationToShow = serverLocation

      // Only persist server location if it's different from current user
      if (!isSameLocation(serverLocation, currentLocation)) {
        const sessionData: SessionVisitorData = {
          location: serverLocation,
          timestamp: now,
          expiresAt: now + SESSION_TTL,
        }

        localStorage.setItem("sessionLastVisitor", JSON.stringify(sessionData))
        console.log(
          `Stored new session visitor data, expires at: ${new Date(sessionData.expiresAt).toLocaleString()}`
        )
      }
    }

    setDisplayLocation(locationToShow)
    setIsLoading(false)
  }, [serverLocation, currentUserLocation])

  // Show skeleton while mounting or processing
  if (!mounted || isLoading) {
    return <LoadingSkeleton />
  }

  // Don't render anything if no location to show
  if (!displayLocation) {
    return null
  }

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <div className="size-1.5 shrink-0 rounded-full bg-green-400 animate-blink" />
      <span>
        Last visitor from {displayLocation.city}, {displayLocation.country}
      </span>
    </div>
  )
}

function isSameLocation(
  loc1: LastVisitorLocation | null,
  loc2: LastVisitorLocation | null
): boolean {
  if (!loc1 || !loc2) return false
  return loc1.city === loc2.city && loc1.country === loc2.country
}
