"use client"

import { motion } from "framer-motion"
import { SectionHeader } from "./about-bento"
import { GraduationCap, Users, GitBranch, Award, BriefcaseBusiness, CalendarDays, MapPin } from "lucide-react"

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
    title: "Full-stack Developer",
    org: "ARVIQ Digital Solution · Self-employed · Remote",
    time: "Mar 2026 to Present",
    tag: "Ongoing",
    bullets: [
      "Build full-stack client apps from UI to backend APIs.",
    ],
  },
  {
    kind: "exp",
    title: "Growth Marketing Intern",
    org: "PHICSIT InfoTech Pvt. Ltd. · Part-time · Remote",
    time: "May 2026 to Jul 2026",
    tag: "Completed",
    bullets: [
      "Supported social campaigns focused on brand awareness and user acquisition.",
      "Contributed market research and campaign execution.",
    ],
  },
  {
    kind: "exp",
    title: "Data Analytics Job Simulation",
    org: "Deloitte Australia · Forage · Remote",
    time: "Apr 2026",
    tag: "Completed",
    bullets: [
      "Built Tableau KPI dashboards and Excel financial models in a forensic technology simulation.",
      "",
    ],
  },
  {
    kind: "exp",
    title: "Open-Source Contributor",
    org: "GSSoC '25 · SWOC '26 · ECWOC '26 · OSCG '26 · Aperture 3.0",
    time: "2025 to Present · Remote",
    tag: "5+ programs",
    bullets: [
      "Contributed across 5+ programs, 89 public repositories and 20+ collaborators.",
      "GitHub: Pull Shark ×2, Pair Extraordinaire, Quickdraw.",
      "Built REST APIs with Spring Boot and Firebase Auth; joined code reviews.",
    ],
  },
  {
    kind: "edu",
    title: "B.Tech in Computer & Data Science (AI & ML)",
    org: "Maharishi University of Information Technology, Noida",
    time: "Aug 2024 to Aug 2028",
    tag: "CGPA 7.88 · Semester IV",
    bullets: [
      "Coursework: DSA, OS, Software Engineering, Databases, AI.",
      "Probability, Linear Algebra, Multivariable & Vector Calculus.",
    ],
  },
  {
    kind: "honor",
    title: "Honors & Achievements",
    org: "Selected programs and recognitions",
    time: "2025 to 2026",
    bullets: [
      "McKinsey & Company Forward Program (2025).",
      "EliteHack 1.0 Hackathon, Finalist.",
      "L'Oréal Brandstorm 2025, Certificate of Recognition.",
      "Deloitte Australia Data Analytics Simulation, Certificate of Completion (Apr 2026).",
      "Active contributor: Aperture 3.0, OSCG '26, SWOC '26, ECWOC '26, and GSSoC '25.",
    ],
  },
]

const iconForKind = (kind: Entry["kind"]) => {
  if (kind === "edu") return GraduationCap
  if (kind === "honor") return Award
  return BriefcaseBusiness
}

export function ExperienceTimeline() {
  return (
    <section id="experience" className="relative mx-auto w-full max-w-7xl px-4 py-24 md:px-8">
      <SectionHeader label="EXPERIENCE" title="The journey so far." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {entries.map((entry, index) => {
          const Icon = iconForKind(entry.kind)
          return (
            <motion.article
              key={entry.title + entry.org}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: (index % 3) * 0.07 }}
              whileHover={{ y: -5 }}
              className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/80 bg-card/80 p-5 shadow-sm shadow-black/5 backdrop-blur-sm transition-colors hover:border-[var(--primary)]/50 hover:bg-card sm:p-6 ${entry.kind === "honor" ? "sm:col-span-2 xl:col-span-1" : ""}`}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20"
                style={{ background: "var(--primary)" }}
              />
              <div className="relative flex items-start justify-between gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--primary)]/25 bg-[var(--primary)]/10 text-[var(--primary)]">
                  <Icon className="h-5 w-5" />
                </span>
                {entry.tag && (
                  <span className="rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/8 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--primary)]">
                    {entry.tag}
                  </span>
                )}
              </div>

              <div className="relative mt-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                <span>{entry.time}</span>
              </div>

              <h3 className="relative mt-2 text-balance text-lg font-semibold leading-snug tracking-tight sm:text-xl">
                {entry.title}
              </h3>
              <p className="relative mt-2 flex items-start gap-1.5 text-sm leading-relaxed text-[var(--primary)]">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-70" />
                <span>{entry.org}</span>
              </p>

              <ul className="relative mt-4 flex-1 space-y-2.5 border-t border-border/70 pt-4 text-sm leading-relaxed text-muted-foreground">
                {entry.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    {entry.kind === "honor" ? (
                      <Award className="mt-1 h-3.5 w-3.5 shrink-0 text-[var(--primary)]/75" />
                    ) : (
                      <GitBranch className="mt-1 h-3.5 w-3.5 shrink-0 text-[var(--primary)]/75" />
                    )}
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
