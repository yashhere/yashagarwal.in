"use client"

import { useFormReset } from "@/hooks/use-form-reset"
import { useToastMessage } from "@/hooks/use-toast-message"
import submitEmail from "@/lib/actions/newsletter/form"
import { EMPTY_FORM_STATE } from "@/lib/actions/newsletter/utils"
import { useFormState, useFormStatus } from "react-dom"

import { FieldError } from "./forms/field-error"
import LoadingSpinner from "./ui/icons/loading-spinner"

type SubmitButtonProps = {
  label: string
  loading: React.ReactNode
}

const SubmitButton = ({ label, loading }: SubmitButtonProps) => {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      className="focus:shadow-focus-ring mr-1 h-[30px] w-[80px] rounded-3xl bg-text px-1.5 text-sm font-semibold text-gray-100 outline-none md:w-[104px] md:px-3.5 md:text-sm"
      disabled={pending}
    >
      {pending ? loading : label}
    </button>
  )
}

export default function Newsletter() {
  const [formState, action] = useFormState(submitEmail, EMPTY_FORM_STATE)

  const noScriptFallback = useToastMessage(formState)
  const formRef = useFormReset(formState)

  return (
    <>
      <form
        className="flex h-10 items-center justify-between gap-2 overflow-hidden rounded-3xl border border-gray-400/50 bg-background-subtle focus-within:border-gray-400 focus-within:outline-none"
        action={action}
        ref={formRef}
      >
        <input
          type="text"
          name="email"
          placeholder="Enter your email"
          required
          className="h-full w-1/5 grow border-none bg-transparent px-3.5 text-lg transition-colors placeholder:text-text/60 focus:outline-none"
        />
        <SubmitButton
          label="Subscribe"
          loading={<LoadingSpinner className="mx-auto flex flex-row" />}
        />
        {noScriptFallback}
      </form>
      <FieldError formState={formState} name="email" />
    </>
  )
}
