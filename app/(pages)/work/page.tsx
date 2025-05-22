import { FC } from "react"
import { Metadata } from "next"
import Head from "next/head"
import { Heading } from "@/components/ui/heading"
import Section from "@/components/ui/section"
import { siteConfig } from "@/config/site"
import {
  BriefcaseIcon,
  CalendarDotsIcon,
  CaretDoubleRightIcon,
} from "@phosphor-icons/react/dist/ssr"

export const metadata: Metadata = {
  title: "Work | Yash Agarwal",
  description: "Learn about my professional journey.",
  alternates: {
    canonical: `${siteConfig.url}/work`,
    types: {
      "application/rss+xml": [
        { url: "rss.xml", title: "RSS Feed for yashagarwal.in" },
        { url: "atom.xml", title: "Atom Feed for yashagarwal.in" },
      ],
    },
  },
}

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
    <div className="relative pl-8 pb-10 last:pb-0">
      <div className="absolute left-1 top-0 bottom-0 border-l border-border"></div>

      <div className="absolute left-0 top-2.5 h-2.5 w-2.5 rounded-full border border-border bg-foreground"></div>

      <Heading level="h3" className="flex items-center text-foreground">
        {company}
      </Heading>

      <div className="mt-1 flex items-center text-sm text-muted-foreground">
        <CalendarDotsIcon className="mr-1.5 h-4 w-4" />
        <span>{period}</span>
      </div>

      <h3 className="mt-2 text-lg text-foreground">{title}</h3>

      <p className="mt-3 text-foreground">{description}</p>

      {achievements && achievements.length > 0 && (
        <ul className="mt-4 space-y-2">
          {achievements.map((achievement, i) => (
            <li key={i} className="flex gap-2">
              <CaretDoubleRightIcon className="h-4 w-4 flex-shrink-0 text-foreground mt-0.5" />
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
                <CaretDoubleRightIcon className="h-4 w-4 flex-shrink-0 text-foreground mt-0.5" />
                <span>{key}</span>
              </div>
              <ul className="mt-2 space-y-1 pl-7">
                {items.map((item, j) => (
                  <li key={j} className="relative pl-4">
                    <span className="absolute left-0 top-2 block h-1.5 w-1.5 rounded-full bg-foreground"></span>
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
  return (
    <>
      <Section data={null} title="work">
        <section className="prose leading-7 text-foreground mb-8">
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

        <div className="flex items-center gap-2 mb-8">
          <BriefcaseIcon className="h-6 w-6 text-foreground" />
          <Heading level="h2" className="text-foreground">
            Experience
          </Heading>
        </div>

        <div className="space-y-0">
          <WorkExperience
            company="Netskope"
            period="2024 - Present"
            title="Sr. Software Engineer"
            description="Working on the next-gen implementation of the CASB API product, while also maintaining two crucial apps from the legacy product, ensuring a smooth transition to the next-gen implementations."
          />

          <WorkExperience
            company="Netskope"
            period="2022 - 2024"
            title="Software Engineer II"
            description="As part of the API Data Protection Team, I've grown to own end-to-end pipeline for two app implementations."
            achievements={[
              "Implemented a system to enable migration of existing customers to the next-gen product without any downtime.",
              "Took initiative to improve file listing performance for one of the apps and implemented check-pointing logic to prevent retrying duplicate tasks on any API rate limiting.",
            ]}
          />

          <WorkExperience
            company="Cisco Systems"
            period="2018 - 2021"
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
