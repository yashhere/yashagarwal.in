import type { Root } from "hast"
import { visitParents } from "unist-util-visit-parents"
import { rehype } from "rehype"

const siteURL = "https://yashagarwal.in"

export function sanitizeRSSHTML(html: string): string {
  const file = rehype()
    .data("settings", { fragment: true })
    .use(sanitizePlugin)
    .processSync(html)
  return String(file)
}

function sanitizePlugin() {
  return (tree: Root) => {
    visitParents(tree, (node, parents) => {
      if (node.type !== "element") return

      if (node.tagName === "style" || node.tagName === "script") {
        removeNode(node, parents)
        return
      }

      if (
        node.tagName === "span" &&
        parents.some(
          (p) => p.type === "element" && p.tagName === "code"
        )
      ) {
        removeNode(node, parents, true)
        return
      }

      if (node.tagName === "a") {
        if (typeof node.properties.href === "string") {
          node.properties.href = new URL(node.properties.href, siteURL).href
        }
        delete node.properties.target
      }

      if (node.tagName === "img" && typeof node.properties.src === "string") {
        node.properties.src = new URL(node.properties.src, siteURL).href
      }

      delete node.properties.style
      delete node.properties.className
      delete node.properties.class

      for (const key of Object.keys(node.properties)) {
        if (key.startsWith("data-astro-cid")) {
          delete node.properties[key]
        }
      }
    })
  }
}

function removeNode(
  node: { type: string },
  parents: { type: string; children: unknown[] }[],
  keepChildren = false
) {
  if (parents.length === 0) return
  const parent = parents[parents.length - 1]
  if (!("children" in parent) || !Array.isArray(parent.children)) return
  const index = parent.children.indexOf(node)
  if (index === -1) return
  if (keepChildren && "children" in node && Array.isArray(node.children)) {
    parent.children.splice(index, 1, ...node.children)
  } else {
    parent.children.splice(index, 1)
  }
}
