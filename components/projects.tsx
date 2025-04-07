import { getPreviewNotes } from "@/lib/content"

import Link from "./ui/link"

export async function Projects() {
  // Your projects data
  const projects = [
    {
      title: "yashagarwal.in",
      description: "A NextJS based portfolio",
      link: "https://yashagarwal.in",
      icon: "🚀",
    },
    {
      title: "ProjectTwo",
      description: "The best tool for solving problem X",
      link: "https://project-two.com",
      icon: "🔍",
    },
    {
      title: "ProjectThree",
      description: "Find exactly what you need when you need it",
      link: "https://project-three.com",
      icon: "✨",
    },
  ]
  return (
    <>
      <div className="group flex flex-col justify-between">
        <h2 className="uppercase tracking-wider text-gray-500 mb-2">
          Projects
        </h2>
        <div>
          {projects.map((project, index) => (
            <Link
              href={project.link}
              key={index}
              noExternalLinkIcon
              noUnderline
            >
              <div className="flex items-start group mb-4">
                <div className="w-9 h-9 flex">{project.icon}</div>
                <div className="mr-4">
                  <p className="inline-flex items-center">{project.title}</p>
                  <p className="text-gray-600">{project.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
