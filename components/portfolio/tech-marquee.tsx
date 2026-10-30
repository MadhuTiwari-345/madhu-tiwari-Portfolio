"use client"

import { Marquee } from "@/components/magicui/marquee"

const technologies = [
  "Java", "Python", "TypeScript", "React", "Next.js", "Spring Boot",
  "Node.js", "PostgreSQL", "MongoDB", "Firebase", "Gemini", "REST APIs",
]

export function TechMarquee() {
  return (
    <section aria-label="Technology stack" className="relative mx-auto w-full max-w-7xl overflow-hidden py-5">
      <div className="mb-3 text-center font-mono text-[9px] uppercase tracking-[0.28em] text-muted-foreground/70">
        tools I build with
      </div>
      <Marquee pauseOnHover className="[--duration:32s] [--gap:0.75rem]">
        {technologies.map((item) => (
          <span key={item} className="rounded-full border border-border/80 bg-card/70 px-4 py-2 font-mono text-[11px] text-muted-foreground shadow-sm transition-colors hover:border-[var(--primary)]/50 hover:text-foreground">
            {item}
          </span>
        ))}
      </Marquee>
    </section>
  )
}
