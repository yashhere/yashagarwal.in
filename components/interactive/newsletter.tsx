"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"

import { useFormReset } from "@/hooks/use-form-reset"
import { useToastMessage } from "@/hooks/use-toast-message"
import submitEmail from "@/lib/actions/newsletter/form"
import { EMPTY_FORM_STATE } from "@/lib/actions/newsletter/utils"
import { FieldError } from "../forms/field-error"
import LoadingSpinner from "../ui/icons/loading-spinner"

type SubmitButtonProps = {
  label: string
  loading: React.ReactNode
}

const SubmitButton = ({ label, loading }: SubmitButtonProps) => {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      className="focus:shadow-focus-ring bg-foreground text-background mr-1 h-[30px] w-[80px] rounded-3xl px-1.5 text-sm outline-hidden md:w-[104px] md:px-3.5 md:text-sm"
      disabled={pending}
    >
      {pending ? loading : label}
    </button>
  )
}

export default function Newsletter() {
  const [formState, action] = useActionState(submitEmail, EMPTY_FORM_STATE)

  const noScriptFallback = useToastMessage(formState)
  const formRef = useFormReset(formState)

  return (
    <>
      <form
        className="border-border/50 bg-muted focus-within:border-border flex h-10 items-center justify-between gap-2 overflow-hidden rounded-3xl border focus-within:outline-hidden"
        action={action}
        ref={formRef}
      >
        <input
          type="text"
          name="email"
          placeholder="Enter your email"
          required
          className="placeholder:text-foreground/60 h-full w-1/5 grow border-none bg-transparent px-3.5 text-base transition-colors focus:outline-hidden"
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
