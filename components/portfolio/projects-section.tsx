"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Layers3, SlidersHorizontal } from "lucide-react"
import { projects } from "./projects-data"
import { ProjectCardXRay } from "./project-card-xray"
import { SectionHeader } from "./about-bento"

const filters = ["All", "AI & Security", "AI & SaaS", "AI & Health", "AI & Data", "Full Stack", "Web3", "Developer Tools"]
const gallerySpans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4", "lg:col-span-6", "lg:col-span-6"]

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("All")
  const visibleProjects = useMemo(
    () => activeFilter === "All" ? projects : projects.filter((project) => project.category === activeFilter),
    [activeFilter],
  )

  return (
    <section id="projects" className="relative mx-auto w-full max-w-7xl px-4 py-20 md:px-8">
      <div className="mb-9 grid gap-6 border-b border-border/80 pb-7 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
            The work archive / 2025—26
          </div>
          <SectionHeader label="SELECTED WORK / 01—09" title="Built to be explored." />
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            A collection of products, experiments and systems. Pick a project to see the interface, the thinking and the build behind it.
          </p>
        </div>
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          <Layers3 className="h-4 w-4 text-[var(--primary)]" />
          <span><strong className="text-foreground">{String(visibleProjects.length).padStart(2, "0")}</strong> projects</span>
          <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
        </div>
      </div>

      <div className="mb-8 flex flex-col gap-3">
        <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filter the archive
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="group" aria-label="Filter projects">
          {filters.map((filter) => {
            const selected = activeFilter === filter
            return (
              <button
                key={filter}
                type="button"
                aria-pressed={selected}
                onClick={() => setActiveFilter(filter)}
                className={`shrink-0 rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] ${selected ? "border-foreground bg-foreground text-background" : "border-border/80 bg-transparent text-muted-foreground hover:border-foreground/50 hover:text-foreground"}`}
              >
                {filter}
              </button>
            )
          })}
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project, index) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.32, delay: Math.min(index * 0.035, 0.2) }}
              className={`min-w-0 sm:col-span-1 ${activeFilter === "All" ? (gallerySpans[projects.indexOf(project)] ?? "lg:col-span-4") : "lg:col-span-4"}`}
            >
              <ProjectCardXRay project={{ ...project, span: "" }} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      <div className="mt-8 flex items-center justify-between border-t border-border/70 pt-4 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
        <span>End of selected work</span>
        <span>More experiments in progress <span className="text-[var(--primary)]">↗</span></span>
      </div>
    </section>
  )
}
