import { FC } from "react"
import { Metadata } from "next"
import {
  BriefcaseIcon,
  CalendarDotsIcon,
  CaretDoubleRightIcon,
} from "@phosphor-icons/react/dist/ssr"

import { BreadcrumbItem, Breadcrumbs } from "@/components/content/breadcrumbs"
import { Heading } from "@/components/ui/heading"
import Section from "@/components/ui/section"
import { generatePageMetadata } from "@/lib/seo/metadata"
import { BreadcrumbStructuredData } from "@/lib/seo/structured-data"

export const metadata: Metadata = generatePageMetadata({
  title: "Work Experience",
  description:
    "Explore my backend engineering journey across cyber security industry, building secure, scalable systems with Golang, Python, C++, and cloud-native tools.",
  canonicalUrl: "/work",
})

interface WorkExperienceProps {
  company: string
  period: string
  title: string
  description: string
  achievements?: string[]
  nestedAchievements?: { [key: string]: string[] }
}

const WorkExperience: FC<WorkExperienceProps> = ({
  company,
  period,
  title,
  description,
  achievements,
  nestedAchievements,
}) => {
  return (
    <div className="relative pb-10 pl-8 last:pb-0">
      <div className="border-border absolute top-0 bottom-0 left-1 border-l"></div>

      <div className="border-border bg-foreground absolute top-2.5 left-0 h-2.5 w-2.5 rounded-full border"></div>

      <Heading level="h4" className="text-foreground flex items-center">
        {company}
      </Heading>

      <div className="text-foreground/70 mt-1 flex items-center text-sm">
        <CalendarDotsIcon className="mr-1.5 h-4 w-4" />
        <span>{period}</span>
      </div>

      <h3 className="text-foreground mt-2 font-medium">{title}</h3>

      <p className="text-foreground mt-3">{description}</p>

      {achievements && achievements.length > 0 && (
        <ul className="mt-4 space-y-2">
          {achievements.map((achievement, i) => (
            <li key={i} className="flex gap-2">
              <CaretDoubleRightIcon className="text-foreground mt-0.5 h-4 w-4 shrink-0" />
              <span>{achievement}</span>
            </li>
          ))}
        </ul>
      )}

      {nestedAchievements && Object.keys(nestedAchievements).length > 0 && (
        <div className="mt-4 space-y-4">
          {Object.entries(nestedAchievements).map(([key, items], i) => (
            <div key={i}>
              <div className="flex gap-2">
                <CaretDoubleRightIcon className="text-foreground mt-0.5 h-4 w-4 shrink-0" />
                <span>{key}</span>
              </div>
              <ul className="mt-2 space-y-1 pl-7">
                {items.map((item, j) => (
                  <li key={j} className="relative pl-4">
                    <span className="bg-foreground absolute top-2 left-0 block h-1.5 w-1.5 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const Page: FC = () => {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Work" },
  ]

  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "/" },
          { name: "Work", url: "/work" },
        ]}
      />
      <Section data={null} title="Work">
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />
        <section className="text-foreground mb-8 leading-relaxed">
          <p>
            I am an enthusiastic software developer with a knack for backend
            development. I&apos;ve got my hands dirty in Python, Golang, and
            C++. I have mainly worked in cybersecurity domain in my career
            including things like web-application penetration testing and
            writing code for both POCs and highly scalable commercial security
            products.
          </p>
          <p className="mt-2">
            What sets me apart? I am not just about what&apos;s already in the
            toolkit. A relentless commitment to continuous learning and
            adaptability. I am always ready to dive into the latest, adapt and
            turn challenges into victory.
          </p>
        </section>

        <div className="mb-8 flex items-center gap-2">
          <BriefcaseIcon className="text-foreground h-6 w-6" />
          <Heading level="h3" className="text-foreground">
            Experience
          </Heading>
        </div>

        <div className="space-y-0">
          <WorkExperience
            company="Netskope"
            period="Apr 2024 - Present"
            title="Sr. Software Engineer"
            description="Working on the next-gen implementation of the CASB API product, while also maintaining two crucial apps from the legacy product, ensuring a smooth transition to the next-gen implementations."
          />

          <WorkExperience
            company="Netskope"
            period="Jan 2022 - Apr 2024"
            title="Software Engineer II"
            description="As part of the API Data Protection Team, I've grown to own end-to-end pipeline for two app implementations."
            achievements={[
              "Implemented a system to enable migration of existing customers to the next-gen product without any downtime.",
              "Took initiative to improve file listing performance for one of the apps and implemented check-pointing logic to prevent retrying duplicate tasks on any API rate limiting.",
            ]}
          />

          <WorkExperience
            company="Cisco Systems"
            period="Aug 2018 - Jan 2022"
            title="Software Engineer I and II"
            description=""
            achievements={[
              "Did an analysis of Cisco FTD's layer-7 detection capabilities against the open-source WAF ModSecurity and provided suggestions to improve Snort's detection capabilities.",
              "Later joined Snort team to help improve its layer-7 detection capabilities.",
              "Worked on implementing monitoring capabilities in Cisco Secure Firewall Cloud Native (SFCN) using open-source Prometheus, Grafana and Telegraf stack using Helm charts.",
            ]}
            nestedAchievements={{
              "Used automated and manual pentesting methodologies to generate the traffic to these tools":
                [
                  "Standardized the logs generated by these tools and used log-correlation to compare the efficacy and performance of FTD",
                  "Orchestrated and managed the entire supporting infrastructure on AWS.",
                ],
              "Implemented Portscan feature for FTD platforms": [
                "Moved functionality from layer-4 (Snort) to layer-2 (ASA) for better performance",
              ],
            }}
          />
        </div>
      </Section>
    </>
  )
}

export default Page
