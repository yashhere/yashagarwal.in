import moment from "moment";
import Link from "next/link";
import { FC } from "react";

import { BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs";

const Socials = [
  {
    name: "Github",
    url: "https://github.com/yashhere",
    icon: BsGithub,
  },
  {
    name: "Linkedin",
    url: "https://www.linkedin.com/in/theyashagarwal/",
    icon: BsLinkedin,
  },
  {
    name: "Twitter",
    url: "https://twitter.com/yash__here",
    icon: BsTwitter,
  },
];

export const Footer: FC = () => {
  return (
    <footer className="mt-12 pb-4 font-heading font-bold">
      <hr className="border-black/20 border-t-2" />
      <div className="mt-8 mb-12 grid space-y-2 sm:space-y-0 sm:grid-cols-2">
        <div className="text-md flex flex-col text-black/60">
          {/* <Link href="/books" className="hover:text-black/95">
            reading
          </Link>
          <Link href="/bookmarks" className="hover:text-black/95">
            bookmarks
          </Link>
          <Link href="/snippets" className="hover:text-black/95">
            snippets
          </Link> */}
          <Link href="/stats" className="hover:text-black/95">
            stats
          </Link>
        </div>
        <div className="flex flex-row justify-end">
          <div className="grid grid-cols-3 gap-4">
            {Socials.map((s) => {
              return (
                <a href={s.url} key={s.name}>
                  <s.icon className="text-black/70 w-6 h-6 hover:text-black" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
      <div className="grid xl:grid-cols-2">
        <div className="text-sm text-black/70">
          <p>Yash Agarwal</p>
          <p>© 2016 - {moment().format("YYYY")}</p>
        </div>
      </div>
    </footer>
  );
};
