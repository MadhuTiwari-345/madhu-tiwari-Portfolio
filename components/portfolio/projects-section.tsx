"use client"

import { projects } from "./projects-data"
import { ProjectCardXRay } from "./project-card-xray"
import { SectionHeader } from "./about-bento"

export function ProjectsSection() {
  return (
    <section id="projects" className="relative mx-auto w-full max-w-7xl px-4 py-24 md:px-8">
      <SectionHeader index="02" label="data shards" title="Work that actually runs in production." />

      <p className="mb-8 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
        Each card has an{" "}
        <span className="rounded-md border border-border bg-card px-1.5 py-0.5 font-mono text-xs">
          X RAY
        </span>{" "}
        toggle. Flip it to see the actual system diagram behind the interface.
      </p>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <ProjectCardXRay key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  )
}
