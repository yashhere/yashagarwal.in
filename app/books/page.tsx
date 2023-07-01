import Books from "@/container/books"
import { allBooks } from "contentlayer/generated"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Reading | Yash Agarwal",
  description: "Read on for my list of books I've read so far this year",
}

const Page = async () => {
  return <Books books={allBooks} />
}

export default Page
