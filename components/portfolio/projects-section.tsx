"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Layers3 } from "lucide-react"
import { projects } from "./projects-data"
import { ProjectCardXRay } from "./project-card-xray"
import { SectionHeader } from "./about-bento"

const filters = ["All", "AI & Security", "AI & SaaS", "AI & Health", "AI & Data", "Full Stack", "Web3", "Developer Tools"]

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("All")
  const visibleProjects = useMemo(
    () => activeFilter === "All" ? projects : projects.filter((project) => project.category === activeFilter),
    [activeFilter],
  )

  return (
    <section id="projects" className="relative mx-auto w-full max-w-7xl px-4 py-24 md:px-8">
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <SectionHeader label="WORK / 01—09" title="Selected builds." />
        </div>
        <div className="flex items-center gap-2 self-start rounded-full border border-border bg-card/70 px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground sm:self-auto">
          <Layers3 className="h-3.5 w-3.5 text-[var(--primary)]" />
          <span>{visibleProjects.length} projects</span>
          <ArrowUpRight className="h-3 w-3 opacity-50" />
        </div>
      </div>

      <div className="mb-7 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="group" aria-label="Filter projects">
        {filters.map((filter) => {
          const selected = activeFilter === filter
          return (
            <button
              key={filter}
              type="button"
              aria-pressed={selected}
              onClick={() => setActiveFilter(filter)}
              className={`shrink-0 rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] ${selected ? "border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-foreground)] shadow-[0_5px_24px_-10px_var(--primary)]" : "border-border bg-card/60 text-muted-foreground hover:border-[var(--primary)]/50 hover:text-foreground"}`}
            >
              {filter}
            </button>
          )
        })}
      </div>

      <motion.div layout className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project, index) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, y: 18, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.985 }}
              transition={{ duration: 0.28, delay: index * 0.025 }}
              className={project.span ?? ""}
            >
              <ProjectCardXRay project={{...project, span: ""}} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
