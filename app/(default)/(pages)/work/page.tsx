import { Metadata } from "next"

import { WorkContent } from "./work-content"

export const metadata: Metadata = {
  title: "Work",
  description: "My professional work experience.",
}

export default function Page() {
  return <WorkContent />
}
