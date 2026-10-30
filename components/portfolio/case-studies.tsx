"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, ArrowUpRight, BookOpen, Code2, ExternalLink, Layers3, Network } from "lucide-react"
import { projects } from "./projects-data"
import { SectionHeader } from "./about-bento"

type StoryTab = "overview" | "architecture" | "stack"

function jumpToCaseStudies() {
  document.getElementById("case-studies")?.scrollIntoView({ behavior: "smooth", block: "start" })
}

export function CaseStudyPreview() {
  return (
    <a href="#case-studies" className="group mt-3 flex items-center justify-between gap-3 rounded-xl border border-border bg-background/70 p-3 transition-colors hover:border-[var(--primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]">
      <span className="flex min-w-0 items-center gap-2"><BookOpen className="h-4 w-4 shrink-0 text-[var(--primary)]"/><span className="min-w-0"><span className="block font-mono text-[9px] uppercase tracking-widest text-muted-foreground">case study / preview</span><span className="block text-xs text-foreground">Explore the thinking behind the builds</span></span></span>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--primary)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"/>
    </a>
  )
}

export function CaseStudies() {
  const [activeTitle, setActiveTitle] = useState(projects[0]?.title ?? "")
  const [tab, setTab] = useState<StoryTab>("overview")
  const project = projects.find((item) => item.title === activeTitle) ?? projects[0]
  const nodeNames = Object.fromEntries(project.architecture.nodes.map((node) => [node.id, node.label]))

  return (
    <section id="case-studies" className="relative mx-auto w-full max-w-7xl scroll-mt-24 px-4 py-20 md:px-8">
      <SectionHeader index="03" label="build stories / case studies" title="The thinking behind the things I build." />
      <p className="mb-7 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        Explore each project through its stated product goal, mapped system structure and technology choices. The stories use the project information and architecture documented in this portfolio.
      </p>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]">
        <div className="flex min-w-0 flex-col gap-2">
          {projects.map((item, index) => {
            const active = item.title === project.title
            return (
              <button key={item.title} type="button" onClick={() => { setActiveTitle(item.title); setTab("overview") }} aria-pressed={active} className={`flex min-h-[66px] items-center gap-3 rounded-xl border p-3 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] ${active ? "border-[var(--primary)] bg-[var(--primary)]/10" : "border-border bg-card hover:border-[var(--primary)]/50"}`}>
                <span className="font-mono text-[10px] text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                <span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold">{item.title}</span><span className="mt-1 block truncate text-xs text-muted-foreground">{item.tagline}</span></span>
                <ArrowUpRight className={`h-4 w-4 shrink-0 ${active ? "text-[var(--primary)]" : "text-muted-foreground"}`}/>
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.article key={project.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: .2 }} className="flex min-w-0 flex-col rounded-2xl border border-border bg-card p-5 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-[9px] uppercase tracking-[.22em] text-muted-foreground">project file / {project.year}</span>
              <span className="rounded-lg border border-border bg-background p-2"><BookOpen className="h-4 w-4 text-[var(--primary)]"/></span>
            </div>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">{project.title}</h3>
            <p className="mt-1 text-sm text-[var(--primary)]">{project.tagline}</p>
            <div className="mt-5 grid grid-cols-3 gap-2">
              {[{ label:"Mapped nodes", value:project.architecture.nodes.length },{ label:"Connections", value:project.architecture.edges.length },{ label:"Stack items", value:project.tags.length }].map((stat)=><div key={stat.label} className="rounded-xl border border-border bg-background p-3"><div className="text-xl font-semibold tabular-nums">{stat.value}</div><div className="mt-1 font-mono text-[8px] uppercase tracking-wider text-muted-foreground">{stat.label}</div></div>)}
            </div>
            <div className="mt-5 grid grid-cols-3 rounded-xl border border-border bg-background p-1">
              {(["overview","architecture","stack"] as const).map((item)=><button key={item} type="button" onClick={()=>setTab(item)} aria-pressed={tab===item} className={`min-h-9 rounded-lg font-mono text-[9px] uppercase tracking-widest transition-colors ${tab===item ? "bg-[var(--primary)]/15 text-foreground" : "text-muted-foreground hover:text-foreground"}`}>{item}</button>)}
            </div>
            <div className="mt-4 min-h-[190px]">
              {tab === "overview" ? <div className="rounded-xl border border-border bg-background p-4"><div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-muted-foreground"><Layers3 className="h-3.5 w-3.5 text-[var(--primary)]"/> product brief</div><h4 className="mt-3 text-sm font-semibold">What this build is</h4><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p><p className="mt-4 text-xs text-muted-foreground">This summary reflects the project description currently published in the portfolio.</p></div> : null}
              {tab === "architecture" ? <div className="rounded-xl border border-border bg-background p-4"><div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-muted-foreground"><Network className="h-3.5 w-3.5 text-[var(--primary)]"/> mapped system flow</div><ol className="mt-3 space-y-2">{project.architecture.edges.map((edge,index)=><li key={index} className="flex min-w-0 items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs"><span className="font-mono text-[9px] text-[var(--primary)]">{String(index+1).padStart(2,"0")}</span><span className="min-w-0 flex-1 truncate">{nodeNames[edge.from] ?? edge.from}</span><ArrowRight className="h-3 w-3 shrink-0 text-muted-foreground"/><span className="min-w-0 flex-1 truncate text-right">{nodeNames[edge.to] ?? edge.to}</span></li>)}</ol><p className="mt-3 text-[10px] text-muted-foreground">Architecture connections as represented in the portfolio map; not a live runtime trace.</p></div> : null}
              {tab === "stack" ? <div className="rounded-xl border border-border bg-background p-4"><div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-muted-foreground"><Code2 className="h-3.5 w-3.5 text-[var(--primary)]"/> listed technologies</div><div className="mt-3 flex flex-wrap gap-2">{project.tags.map(tag=><span key={tag} className="rounded-full border border-border px-3 py-2 font-mono text-[10px] text-muted-foreground">{tag}</span>)}</div></div> : null}
            </div>
            <div className="mt-auto flex flex-wrap gap-2 pt-5">
              {project.repo ? <a href={project.repo} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-full border border-border px-4 text-xs hover:border-[var(--primary)]">Source code <ArrowUpRight className="h-3.5 w-3.5"/></a> : null}
              {project.live ? <a href={project.live} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[var(--primary)] px-4 text-xs text-[var(--primary-foreground)]">Open live project <ExternalLink className="h-3.5 w-3.5"/></a> : null}
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  )
}
