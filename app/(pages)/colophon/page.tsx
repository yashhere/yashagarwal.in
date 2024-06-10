import { Metadata } from "next"
import Link from "@/components/ui/link"
import SectionTitle from "@/components/ui/section-title"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Colophon | Yash Agarwal",
  description: "Read how I built this site",
  alternates: {
    canonical: `${siteConfig.url}/colophon`,
    types: {
      "application/rss+xml": [
        { url: "rss.xml", title: "RSS Feed for yashagarwal.in" },
        { url: "atom.xml", title: "Atom Feed for yashagarwal.in" },
      ],
    },
  },
}

export default function Colophon() {
  return (
    <>
      <SectionTitle data={null} title="colophon" />
      <section className="prose prose-lg leading-7 text-text">
        <section>
          <p>
            I designed and built this website myself. Being a backend developer,
            UI design is not my strongest skill, but playing with latest web
            technologies is an indulgent hobby I don&apos;t want to relinquish.
            The source code of this website is available on Github, if
            you&apos;d like to poke around. I started building this version of
            the site in July 2023 and tinker on it regularly.
          </p>
        </section>

        <section>
          <h3 className="text-text">Technologies</h3>
          <p>
            The site is primarily built with Next.js. Most of the site is
            statically rendered at the build time. Vercel takes care of hosting
            this site. Cloudflare manages the DNS.
            <br />
            <br />
            One of my primary intention behind switching to Next.js was to
            explore React. I used React and TailwindCSS to build and design the
            interface. All the notes are written in MDX - a variant of markdown
            that makes it easy to design and reuse custom components and
            interactive JavaScript elements (though I don&apos;t have many
            custom components yet).
          </p>
        </section>

        <section>
          <h3 className="text-text">Content Editing</h3>
          <p>
            I use MDX files to write content for this site. There is no fancy
            one-click pipeline or a WYSIWYG editor. Whenever I want to create a
            new note, I create a new file and start writing in VSCode. In past,
            I tried to write content in Notion, but that didn&apos;t work after
            a few times. I would definitely like to have a setup where I
            don&apos;t have to worry about git, vscode etc. Given that I
            don&apos;t really need a lot of interactive components in my notes,
            I think this is a doable task. I might do it myself someday.
          </p>
        </section>

        <section>
          <h3 className="text-text">Typography</h3>
          <p>
            Wotfard font family by{" "}
            <Link href="https://www.atipofoundry.com/fonts/wotfard">
              Atipo Foundary
            </Link>{" "}
            is the primary font on this site. I first noticed this being used on
            the <Link href="https://www.joshwcomeau.com/">website</Link> of Josh
            Comeau and instantly loved it. The site deliberately uses a single
            font for both headings and body, to reduce complexity.
            <br />
            <br />
            The mono font is the{" "}
            <Link href="https://fonts.google.com/specimen/IBM+Plex+Mono">
              IBM Plex Mono
            </Link>
            .
            <br />
            <br />
            Both these fonts are locally hosted.
          </p>
        </section>
      </section>
    </>
  )
}
