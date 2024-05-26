import { FormState } from "@/lib/actions/newsletter/utils"

type FieldErrorProps = {
  formState: FormState
  name: string
}

export const FieldError = ({ formState, name }: FieldErrorProps) => {
  return (
    <>
      {formState.fieldErrors[name]?.[0] ? (
        <span className="px-3.5 pt-1 text-xs text-red-400">
          {formState.fieldErrors[name]?.[0]}
        </span>
      ) : (
        <span className="px-3.5 pt-1 text-xs">
          No spam. Unsubscribe anytime
        </span>
      )}
    </>
  )
}
