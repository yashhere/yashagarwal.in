import { createHash } from "crypto"
import { headers } from "next/headers"

export function getSessionId(slug: string) {
  const ipAddress = headers().get("x-forwarded-for")

  const currentUserId =
    // Since a users IP address is part of the sessionId in our database, we
    // hash it to protect their privacy. By combining it with a salt, we get
    // get a unique id we can refer to, but we won't know what their ip
    // address was.
    createHash("md5")
      .update(ipAddress + process.env.IP_ADDRESS_SALT!, "utf8")
      .digest("hex")

  // Identify a specific users interactions with a specific post
  return slug + "___" + currentUserId
}
