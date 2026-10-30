"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowDownRight, ArrowUpRight, BrainCircuit, BriefcaseBusiness, Code2, Command, Github, Layers3, Network, Terminal, UserRound } from "lucide-react"
import { SectionHeader } from "./about-bento"

const destinations = [
  { id: "console", label: "Console", group: "INTERFACE", description: "Start with the interactive terminal and quick commands.", icon: Terminal, x: 15, y: 18 },
  { id: "about", label: "About", group: "PROFILE", description: "Get the short version of who I am and what I care about building.", icon: UserRound, x: 50, y: 13 },
  { id: "projects", label: "Projects", group: "BUILDS", description: "Explore shipped projects, product ideas and implementation details.", icon: Code2, x: 85, y: 18 },
  { id: "engineering", label: "Engineering", group: "ARCHITECTURE", description: "Inspect project-level architecture maps and technology choices.", icon: Network, x: 15, y: 50 },
  { id: "skills", label: "Stack", group: "TOOLKIT", description: "Browse the languages, frameworks and tools used across my work.", icon: Layers3, x: 85, y: 50 },
  { id: "experience", label: "Journey", group: "EXPERIENCE", description: "Follow my education, internships and open-source contributions.", icon: BriefcaseBusiness, x: 15, y: 82 },
  { id: "github-activity", label: "GitHub", group: "ACTIVITY", description: "See recent public repository activity and project updates.", icon: Github, x: 50, y: 87 },
  { id: "contact", label: "Contact", group: "CONNECT", description: "Open a direct channel for opportunities and collaborations.", icon: ArrowUpRight, x: 85, y: 82 },
]

function jumpTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

export function MiniSystemMapPreview() {
  return (
    <a href="#system-map" className="group mt-5 block rounded-xl border border-border bg-background/70 p-3 transition-colors hover:border-[var(--primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]">
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[.2em] text-muted-foreground"><Network className="h-3.5 w-3.5 text-[var(--primary)]" /> system map / preview</span>
        <span className="font-mono text-[9px] text-[var(--primary)]">OPEN MAP ↗</span>
      </div>
      <svg viewBox="0 0 300 76" className="mt-2 h-16 w-full" role="img" aria-label="Preview of the connected portfolio system map">
        <g stroke="var(--primary)" strokeOpacity=".45" strokeWidth="1.2" fill="none">
          <path d="M150 37 L45 15 M150 37 L105 15 M150 37 L195 15 M150 37 L255 15 M150 37 L45 61 M150 37 L105 61 M150 37 L195 61 M150 37 L255 61" />
        </g>
        {[ [45,15],[105,15],[195,15],[255,15],[45,61],[105,61],[195,61],[255,61] ].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="5" fill="var(--background)" stroke="var(--primary)" strokeWidth="1.5"/>)}
        <circle cx="150" cy="37" r="13" fill="color-mix(in oklch, var(--primary) 22%, var(--card))" stroke="var(--primary)" strokeWidth="1.5"/>
        <text x="150" y="40" textAnchor="middle" fill="var(--foreground)" fontSize="7" fontFamily="monospace">MT</text>
      </svg>
      <p className="text-[11px] text-muted-foreground">Eight destinations. One connected portfolio.</p>
    </a>
  )
}

export function SystemMap() {
  const [active, setActive] = useState("projects")
  const selected = destinations.find((item) => item.id === active) ?? destinations[0]
  const SelectedIcon = selected.icon

  return (
    <section id="system-map" className="relative mx-auto w-full max-w-7xl scroll-mt-24 px-4 py-20 md:px-8">
      <SectionHeader index="01" label="MADHU.OS / SYSTEM MAP" title="One portfolio. Eight connected destinations." />
      <p className="mb-7 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        Navigate the portfolio as a connected system. Select a node to inspect its destination, then jump straight into that part of the experience.
      </p>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(260px,.65fr)]">
        <div className="relative h-[430px] overflow-hidden rounded-2xl border border-border bg-card sm:h-[490px]">
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-50" style={{ backgroundImage: "radial-gradient(color-mix(in oklch, var(--primary) 30%, transparent) .8px, transparent .8px)", backgroundSize: "17px 17px" }} />
          <div className="absolute left-4 top-4 z-20 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[.2em] text-muted-foreground"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--primary)]"/> topology / interactive</div>
          <div className="absolute right-4 top-4 z-20 font-mono text-[9px] text-muted-foreground">08 NODES · 01 CORE</div>
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
            <defs><linearGradient id="system-link-gradient" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="var(--primary)" stopOpacity=".75"/><stop offset="100%" stopColor="var(--accent)" stopOpacity=".35"/></linearGradient></defs>
            {destinations.map((node) => <motion.line key={node.id} x1="50" y1="50" x2={node.x} y2={node.y} stroke="url(#system-link-gradient)" strokeWidth=".42" strokeDasharray="1.5 1.4" vectorEffect="non-scaling-stroke" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: .9 }} viewport={{ once: true }} transition={{ duration: .8, delay: .08 }}/>)}
            <circle cx="50" cy="50" r="8.5" fill="none" stroke="var(--primary)" strokeOpacity=".3" strokeWidth=".35" vectorEffect="non-scaling-stroke"/>
            <circle cx="50" cy="50" r="12" fill="none" stroke="var(--primary)" strokeOpacity=".18" strokeWidth=".35" vectorEffect="non-scaling-stroke"/>
          </svg>

          <div className="absolute left-1/2 top-1/2 z-10 flex h-[82px] w-[82px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-[var(--primary)]/70 bg-background/95 shadow-[0_0_45px_color-mix(in_oklch,var(--primary)_24%,transparent)] sm:h-[100px] sm:w-[100px]">
            <BrainCircuit className="h-5 w-5 text-[var(--primary)] sm:h-6 sm:w-6"/>
            <span className="mt-1 font-mono text-[9px] font-bold tracking-widest">MADHU.OS</span>
            <span className="font-mono text-[7px] text-muted-foreground">CORE</span>
          </div>

          {destinations.map((node,index) => {
            const Icon = node.icon
            const isActive = active === node.id
            return (
              <motion.button key={node.id} type="button" onClick={() => setActive(node.id)} aria-pressed={isActive} aria-label={`Inspect ${node.label} destination`} className={`absolute z-10 flex min-h-[54px] w-[29%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-xl border px-1.5 py-2 text-center shadow-lg backdrop-blur-md transition-colors sm:min-h-[66px] sm:w-[22%] sm:px-3 ${isActive ? "border-[var(--primary)] bg-[var(--primary)]/15 text-foreground shadow-[0_0_25px_color-mix(in_oklch,var(--primary)_18%,transparent)]" : "border-border bg-background/90 text-muted-foreground hover:border-[var(--primary)]/60 hover:text-foreground"} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]`} style={{ left: node.x+"%", top: node.y+"%" }}>
                <span className="flex items-center gap-1.5"><Icon className={`h-3.5 w-3.5 ${isActive ? "text-[var(--primary)]" : ""}`}/><span className="text-[10px] font-semibold sm:text-xs">{node.label}</span></span>
                <span className="font-mono text-[7px] uppercase tracking-[.13em] opacity-55 sm:text-[8px]">{String(index+1).padStart(2,"0")} / {node.group}</span>
              </motion.button>
            )
          })}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between font-mono text-[8px] uppercase tracking-widest text-muted-foreground/60"><span>select any node to inspect</span><span>LOCAL NAVIGATION / NO EXTERNAL DATA</span></div>
        </div>

        <motion.aside key={selected.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex min-w-0 flex-col rounded-2xl border border-border bg-card p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[9px] uppercase tracking-[.22em] text-muted-foreground">destination / {selected.group}</span>
            <span className="rounded-lg border border-border bg-background p-2"><SelectedIcon className="h-4 w-4 text-[var(--primary)]"/></span>
          </div>
          <h3 className="mt-5 text-2xl font-semibold tracking-tight">{selected.label}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{selected.description}</p>
          <div className="mt-6 rounded-xl border border-border bg-background p-4">
            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-muted-foreground"><Command className="h-3.5 w-3.5 text-[var(--primary)]"/> route preview</div>
            <div className="mt-3 flex items-center gap-2 font-mono text-xs"><span className="text-[var(--primary)]">MADHU.OS</span><ArrowDownRight className="h-3.5 w-3.5 text-muted-foreground"/><span className="text-foreground">#{selected.id}</span></div>
          </div>
          <button type="button" onClick={() => jumpTo(selected.id)} className="mt-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-5 text-sm font-medium text-[var(--primary-foreground)] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]">
            Enter {selected.label}<ArrowUpRight className="h-4 w-4"/>
          </button>
          <p className="mt-3 text-center text-[10px] text-muted-foreground">Opens the existing section. Nothing gets replaced.</p>
        </motion.aside>
      </div>
    </section>
  )
}
