import Link from "../link"

export default async function Header() {
  return (
    <>
      <Link href="/" className="mb-8 flex flex-col items-start">
        <span className="text-lg font-bold">Yash Agarwal</span>
        <span className="stroke-current font-medium leading-none text-gray-1100">
          Software Developer
        </span>
      </Link>
    </>
  )
}
