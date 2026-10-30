"use client"

import { projects } from "./projects-data"
import { ProjectCardXRay } from "./project-card-xray"
import { SectionHeader } from "./about-bento"

export function ProjectsSection() {
  return (
    <section id="projects" className="relative mx-auto w-full max-w-7xl px-4 py-24 md:px-8">
      <SectionHeader label="PROJECTS" title="Things I’ve built." />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2">
        {projects.map((p, i) => (
          <ProjectCardXRay key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  )
}
