"use server"

import { revalidatePath } from "next/cache"
import { env } from "@/env.mjs"
import { google } from "googleapis"
import { z } from "zod"

import { FormState, fromErrorToFormState, toFormState } from "./utils"

const submitEmailSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Please provide your email" })
    .email("This is not a valid email."),
})

export default async function submitEmail(
  formState: FormState,
  formData: FormData
) {
  try {
    const { email } = submitEmailSchema.parse({
      email: formData.get("email"),
    })
    const signupDate = new Date().toUTCString()

    const private_key = env.GOOGLE_PRIVATE_KEY?.replace(/['"]/g, "")

    if (!private_key) throw new Error("no key")

    try {
      const auth = await google.auth.getClient({
        projectId: env.GOOGLE_PROJECT_ID,
        credentials: {
          type: "service_account",
          private_key: private_key?.replace(/\\n/g, "\n"),
          client_email: env.GOOGLE_CLIENT_EMAIL,
          client_id: env.GOOGLE_CLIENT_ID,
          token_url: env.GOOGLE_TOKEN_URL,
          universe_domain: "googleapis.com",
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      })
      const sheets = google.sheets({ version: "v4", auth })
      const spreadsheetId = env.GOOGLE_SHEETS_ID
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: "subscribers!A:B",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [[signupDate, email]],
        },
      })
      revalidatePath("/")
    } catch (error) {}
  } catch (error) {
    return fromErrorToFormState(error)
  }
  return toFormState("SUCCESS", "Thanks for signing up!")
}
