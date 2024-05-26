"use server"

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
  } catch (error) {
    console.log(fromErrorToFormState(error))
    return fromErrorToFormState(error)
  }

  return toFormState("SUCCESS", "Message created")
}
