"use client"

import { motion } from "framer-motion"
import { SectionHeader } from "./about-bento"
import { Braces, Cloud, Code2, Database, Layers3, Workflow } from "lucide-react"

const skillGroups = [
  {
    title: "Languages",
    note: "The tools I reach for to solve problems",
    icon: Code2,
    items: ["Java", "Python", "JavaScript", "TypeScript", "SQL"],
  },
  {
    title: "Application development",
    note: "Interfaces, services and APIs",
    icon: Braces,
    items: ["React", "Next.js", "Node.js", "Spring Boot", "REST APIs", "Tailwind CSS"],
  },
  {
    title: "Data & infrastructure",
    note: "Persistence, deployment and integrations",
    icon: Database,
    items: ["PostgreSQL", "MongoDB", "Firebase", "Docker", "Google Cloud Run", "Vercel"],
  },
  {
    title: "Engineering practice",
    note: "How I approach building and maintaining software",
    icon: Workflow,
    items: ["Git & GitHub", "API design", "Testing", "System design", "AI agents", "Applied ML"],
  },
]

const concepts = [
  "Data structures & algorithms",
  "Object-oriented programming",
  "Operating systems",
  "Database systems",
  "Software engineering",
  "Artificial intelligence",
  "Probability & statistics",
  "Linear algebra",
  "Access control",
]

export function SkillsBento() {
  return (
    <section id="skills" className="relative mx-auto w-full max-w-7xl px-4 py-24 md:px-8">
      <SectionHeader label="TOOLKIT" title="Tools are useful. How you use them matters." />

      <div className="grid gap-3 md:grid-cols-2">
        {skillGroups.map((group, index) => {
          const Icon = group.icon
          return (
            <motion.article
              key={group.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="rounded-2xl border border-border bg-card p-5 transition-colors duration-200 hover:border-[var(--primary)]/40 sm:p-6"
            >
              <div className="flex items-start gap-3">
                <span className="rounded-xl bg-[var(--primary)]/8 p-2.5 text-[var(--primary)]">
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold">{group.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{group.note}</p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item, itemIndex) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: index * 0.06 + itemIndex * 0.025 }}
                    className="rounded-lg border border-border/80 bg-background px-3 py-2 text-xs text-foreground/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--primary)]/45 hover:bg-[var(--primary)]/5 hover:text-foreground"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.article>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4 }}
        className="mt-3 rounded-2xl border border-border/80 bg-[var(--background-elevated)] p-5 sm:p-6"
      >
        <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
          <Layers3 className="h-3.5 w-3.5 text-[var(--primary)]" />
          Foundations
        </div>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
          {concepts.map((concept) => (
            <span key={concept} className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              {concept}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
