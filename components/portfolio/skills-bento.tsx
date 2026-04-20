"use client"

import { motion } from "framer-motion"
import { SectionHeader } from "./about-bento"

const skillGroups: {
  title: string
  icon: string
  items: { name: string; level: number }[]
  span?: string
}[] = [
  {
    title: "Languages",
    icon: "<>",
    span: "md:col-span-2",
    items: [
      { name: "Java", level: 85 },
      { name: "Python", level: 82 },
      { name: "JavaScript", level: 88 },
      { name: "SQL", level: 78 },
      { name: "TypeScript", level: 80 },
    ],
  },
  {
    title: "Frameworks",
    icon: "{ }",
    items: [
      { name: "Spring Boot", level: 82 },
      { name: "Node.js", level: 85 },
      { name: "React", level: 90 },
      { name: "Next.js", level: 86 },
    ],
  },
  {
    title: "Databases",
    icon: "db",
    items: [
      { name: "PostgreSQL", level: 80 },
      { name: "MongoDB", level: 82 },
      { name: "Firebase", level: 76 },
    ],
  },
  {
    title: "Tools & Cloud",
    icon: "ops",
    span: "md:col-span-2",
    items: [
      { name: "Git / GitHub", level: 92 },
      { name: "Docker", level: 68 },
      { name: "Vercel", level: 88 },
      { name: "Google Cloud Run", level: 64 },
      { name: "IPFS / Web3", level: 60 },
    ],
  },
]

export function SkillsBento() {
  return (
    <section id="skills" className="relative mx-auto w-full max-w-7xl px-4 py-24 md:px-8">
      <SectionHeader index="03" label="stack" title="The tools I reach for, ranked by muscle memory." />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: gi * 0.08 }}
            className={`relative overflow-hidden rounded-2xl border border-border bg-card p-5 ${
              group.span ?? ""
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                {group.title}
              </div>
              <div
                className="rounded-md border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
              >
                {group.icon}
              </div>
            </div>

            <ul className="mt-5 space-y-3">
              {group.items.map((item, i) => (
                <li key={item.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium">{item.name}</span>
                    <span className="font-mono text-[10px] text-muted-foreground">{item.level}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-[var(--background-elevated)]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.level}%` }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 1, delay: 0.2 + i * 0.06, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{
                        background:
                          "linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%)",
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}

        {/* Concepts card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.32 }}
          className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 md:col-span-4"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            core concepts
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "Data Structures",
              "Algorithms",
              "Object Oriented Programming",
              "Operating Systems",
              "Database Systems",
              "Software Engineering",
              "Artificial Intelligence",
              "Probability & Statistics",
              "Linear Algebra",
              "REST APIs",
              "Role Based Access",
              "Smart Contracts",
              "Prompt Engineering",
              "System Design",
            ].map((c) => (
              <span
                key={c}
                className="glass-pill rounded-full px-3 py-1 text-xs text-muted-foreground"
              >
                {c}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
