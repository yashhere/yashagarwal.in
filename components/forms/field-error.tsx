import { FormState } from "@/lib/actions/newsletter/utils"

type FieldErrorProps = {
  formState: FormState
  name: string
}

export const FieldError = ({ formState, name }: FieldErrorProps) => {
  return (
    <>
      {formState.fieldErrors[name]?.[0] ? (
        <span className="mt-3 px-3.5 text-sm text-red-600">
          {formState.fieldErrors[name]?.[0]}
        </span>
      ) : (
        <span className="mt-3 px-3.5 text-sm">
          No spam. Unsubscribe anytime.
        </span>
      )}
    </>
  )
}
