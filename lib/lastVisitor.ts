"use server"

import { headers } from "next/headers"
import { Redis } from "@upstash/redis"

import { decodeParameter } from "./utils"

export type LastVisitorLocation = {
  city: string
  country: string
}

const LOCATION_KEY = "lastVisitorLocation"

const CITY_HEADER_NAME = "x-vercel-ip-city"
const COUNTRY_HEADER_NAME = "x-vercel-ip-country"

const redis = Redis.fromEnv()

export async function getCurrentUserLocation(): Promise<LastVisitorLocation | null> {
  const headersList = await headers()
  const city = decodeParameter(headersList.get(CITY_HEADER_NAME))
  const country = headersList.get(COUNTRY_HEADER_NAME)

  if (city && country) {
    return { city, country }
  }
  return null
}

export async function getLastVisitorLocation() {
  const currentLocation = await getCurrentUserLocation()

  if (!currentLocation) {
    return await redis.get<LastVisitorLocation>(LOCATION_KEY)
  }

  const { city: currentCity, country: currentCountry } = currentLocation

  // Get the previous visitor BEFORE updating
  const previousVisitor = await redis.get<LastVisitorLocation>(LOCATION_KEY)

  // Update with current visitor (for the NEXT request)
  if (
    currentCity &&
    currentCountry &&
    (!previousVisitor ||
      currentCity !== previousVisitor.city ||
      currentCountry !== previousVisitor.country)
  ) {
    await redis.set<LastVisitorLocation>(LOCATION_KEY, {
      city: currentCity,
      country: currentCountry,
    })
  }

  return previousVisitor
}
