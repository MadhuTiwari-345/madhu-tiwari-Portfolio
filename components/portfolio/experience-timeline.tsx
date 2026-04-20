"use client"

import { motion } from "framer-motion"
import { SectionHeader } from "./about-bento"
import { GraduationCap, Users, GitBranch, Award } from "lucide-react"

type Entry = {
  kind: "exp" | "edu" | "honor"
  title: string
  org: string
  time: string
  bullets: string[]
  tag?: string
}

const entries: Entry[] = [
  {
    kind: "exp",
    title: "Open Source Contributor",
    org: "Apertre 3.0",
    time: "Feb 2026 to Apr 2026",
    tag: "completed",
    bullets: [
      "Contributed to multiple full-stack projects across the Apertre cohort.",
      "Shipped UI, accessibility, and bug-fix PRs reviewed by project maintainers.",
      "Collaborated async with global contributors through issues and code reviews.",
    ],
  },
  {
    kind: "exp",
    title: "Open Source Contributor",
    org: "Open Source Connect Global (OSCG)",
    time: "Feb 2026 to Mar 2026",
    tag: "completed",
    bullets: [
      "Worked with international maintainers on globally distributed repos.",
      "Landed documentation, refactor, and feature PRs across several codebases.",
    ],
  },
  {
    kind: "exp",
    title: "Open Source Contributor",
    org: "Social Winter of Code (SWOC) 2026",
    time: "Jan 2026 to Mar 2026",
    tag: "completed",
    bullets: [
      "Built features and reviewed code on community-driven software projects.",
      "Paired with maintainers on issue triage, documentation, and UI improvements.",
    ],
  },
  {
    kind: "exp",
    title: "Open Source Contributor",
    org: "Elite Coders Winter of Code (ECWOC) 2026",
    time: "Jan 2026 to Mar 2026",
    tag: "completed",
    bullets: [
      "Contributed to projects focused on entrepreneurship and innovation.",
      "Improved documentation, triaged issues, and onboarded new contributors.",
      "Shipped UI enhancements and small features reviewed by project leads.",
    ],
  },
  {
    kind: "exp",
    title: "Open Source Contributor",
    org: "GirlScript Summer of Code (GSSoC) 2025",
    time: "Jul 2025 to Oct 2025",
    tag: "completed",
    bullets: [
      "Shipped React and Node.js apps used by 20+ contributors across repos.",
      "Implemented role based access control to tighten security.",
      "Built REST APIs and backend services with Spring Boot and Firebase auth.",
    ],
  },
  {
    kind: "edu",
    title: "B.Tech in Computer & Data Science (AI & ML)",
    org: "Maharishi University of Information Technology, Noida",
    time: "Aug 2024 to Aug 2028",
    tag: "SGPA 7.82",
    bullets: [
      "Coursework: DSA, Operating Systems, Software Engineering, Database Systems.",
      "AI, Probability, Linear Algebra, Multivariable & Vector Calculus.",
    ],
  },
  {
    kind: "honor",
    title: "Selected honors",
    org: "Recognitions",
    time: "2024 to 2025",
    bullets: [
      "AI Agent Intensive Course, Google × Kaggle.",
      "McKinsey Forward Program 2025.",
      "L'Oreal Brandstorm 2025 Certificate of Recognition.",
      "EliteHack 1.0 Hackathon Finalist.",
    ],
  },
]

const iconForKind = (k: Entry["kind"]) => {
  if (k === "edu") return GraduationCap
  if (k === "honor") return Award
  return Users
}

export function ExperienceTimeline() {
  return (
    <section id="experience" className="relative mx-auto w-full max-w-7xl px-4 py-24 md:px-8">
      <SectionHeader index="04" label="journey" title="How the systems got built." />

      <div className="relative">
        {/* vertical line */}
        <div
          aria-hidden
          className="absolute top-0 bottom-0 left-4 w-px md:left-1/2"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, color-mix(in oklch, var(--primary) 60%, transparent) 20%, color-mix(in oklch, var(--primary) 40%, transparent) 80%, transparent 100%)",
          }}
        />

        <ul className="space-y-6 md:space-y-10">
          {entries.map((e, i) => {
            const Icon = iconForKind(e.kind)
            const side = i % 2 === 0 ? "md:pr-10 md:text-right md:justify-self-end" : "md:pl-10 md:col-start-2"
            return (
              <motion.li
                key={e.title + e.org}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="relative grid grid-cols-1 md:grid-cols-2"
              >
                {/* dot */}
                <span
                  aria-hidden
                  className="absolute top-6 left-4 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-background md:left-1/2"
                  style={{ background: "var(--primary)" }}
                />
                <div
                  className={`ml-10 rounded-2xl border border-border bg-card p-5 md:ml-0 md:w-full ${side}`}
                >
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:justify-end">
                    <Icon className="h-3 w-3" />
                    <span>{e.time}</span>
                    {e.tag && (
                      <span
                        className="rounded-full border px-2 py-0.5"
                        style={{
                          borderColor: "color-mix(in oklch, var(--primary) 50%, transparent)",
                          color: "var(--primary)",
                        }}
                      >
                        {e.tag}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 text-balance text-lg font-semibold tracking-tight">
                    {e.title}
                  </h3>
                  <div className="text-sm text-[var(--primary)]">{e.org}</div>
                  <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground leading-relaxed">
                    {e.bullets.map((b) => (
                      <li key={b} className="flex gap-2 md:[&]:justify-end">
                        <GitBranch className="mt-1 h-3 w-3 shrink-0 opacity-60" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
