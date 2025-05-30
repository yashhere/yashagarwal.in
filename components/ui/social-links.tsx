import {
  EnvelopeIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  XLogoIcon,
} from "@phosphor-icons/react/dist/ssr"

import Link from "./link"

const socialLinks = [
  {
    name: "Email",
    href: "mailto:yashagarwaljpr+blog@gmail.com",
    icon: EnvelopeIcon,
  },
  {
    name: "X",
    href: "https://x.com/yash__here",
    icon: XLogoIcon,
  },
  { name: "GitHub", href: "https://github.com/yashhere", icon: GithubLogoIcon },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/theyashagarwal/",
    icon: LinkedinLogoIcon,
  },
]

export function SocialLinks() {
  return (
    <div className="flex items-center gap-2">
      {socialLinks.map((social) => (
        <Link
          key={social.name}
          href={social.href}
          external={true}
          showIcon={false}
          variant="nav"
          className="text-muted-foreground hover:text-foreground hover:bg-muted/50 -ml-2 rounded-md p-2 transition-all duration-200"
          aria-label={social.name}
        >
          <social.icon size={24} weight="regular" />
        </Link>
      ))}
    </div>
  )
}
