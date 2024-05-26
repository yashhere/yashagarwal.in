import { ZodError } from "zod"

export const EMPTY_FORM_STATE: FormState = {
  status: "UNSET" as const,
  message: "",
  fieldErrors: {},
  timestamp: Date.now(),
}

export type FormState = {
  status: "UNSET" | "SUCCESS" | "ERROR"
  message: string
  fieldErrors: Record<string, string[] | undefined>
  timestamp: number
}

export const toFormState = (
  status: FormState["status"],
  message: string
): FormState => {
  return {
    status,
    message,
    fieldErrors: {},
    timestamp: Date.now(),
  }
}

export const fromErrorToFormState = (error: unknown) => {
  // if validation error with Zod, return first error message
  if (error instanceof ZodError) {
    return {
      status: "ERROR" as const,
      message: "",
      fieldErrors: error.flatten().fieldErrors,
      timestamp: Date.now(),
    }
  } else if (error instanceof Error) {
    return {
      status: "ERROR" as const,
      message: error.message,
      fieldErrors: {},
      timestamp: Date.now(),
    }
  } else {
    return {
      status: "ERROR" as const,
      message: "An unknown error occurred",
      fieldErrors: {},
      timestamp: Date.now(),
    }
  }
}
