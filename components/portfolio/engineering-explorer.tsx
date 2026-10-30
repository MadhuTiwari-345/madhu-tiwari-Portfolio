"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, Boxes, Code2, Database, ExternalLink, GitBranch, Github, Network, Server, Sparkles, Workflow } from "lucide-react"
import { projects } from "./projects-data"
import type { ArchNode, Project } from "./project-card-xray"
import { SectionHeader } from "./about-bento"

const typeMeta: Record<ArchNode["type"], { label: string; icon: typeof Code2; detail: string }> = {
  client: { label: "Client", icon: Code2, detail: "User-facing interface or client-side entry point shown in this project's architecture." },
  server: { label: "Service", icon: Server, detail: "Application service or processing layer represented in this project's architecture." },
  db: { label: "Data", icon: Database, detail: "Data store or persistence component represented in this project's architecture." },
  ai: { label: "Intelligence", icon: Sparkles, detail: "AI, model, analysis, or visualization component represented in this project's architecture." },
  external: { label: "Integration", icon: Workflow, detail: "External API, integration, or supporting tool represented in this project's architecture." },
}

function ArchitectureMap({ project, selected, onSelect }: { project: Project; selected: string; onSelect: (id: string) => void }) {
  const nodeMap = Object.fromEntries(project.architecture.nodes.map((node) => [node.id, node]))
  return (
    <div className="relative min-h-[300px] overflow-hidden rounded-2xl border border-border bg-[#100d19] p-3 sm:min-h-[360px] sm:p-5">
      <div aria-hidden className="absolute inset-0 opacity-40" style={{ backgroundImage: "linear-gradient(rgba(192,168,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(192,168,255,.12) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
      <div className="relative flex items-center justify-between gap-2 font-mono text-[9px] uppercase tracking-[.2em] text-white/50">
        <span className="flex items-center gap-2"><Network className="h-3.5 w-3.5 text-fuchsia-300" /> system topology</span>
        <span>{project.architecture.nodes.length} nodes · {project.architecture.edges.length} links</span>
      </div>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        <defs><marker id="explorer-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="3" markerHeight="3" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="#d8a8ff" /></marker></defs>
        {project.architecture.edges.map((edge, index) => {
          const from = nodeMap[edge.from]
          const to = nodeMap[edge.to]
          if (!from || !to) return null
          return <g key={index}>
            <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="#d8a8ff" strokeOpacity=".65" strokeWidth=".38" strokeDasharray="1.5 1.2" markerEnd="url(#explorer-arrow)" vectorEffect="non-scaling-stroke" />
            {edge.label ? <text x={(from.x + to.x) / 2} y={(from.y + to.y) / 2 - 2} fill="#f0d9ff" fontSize="2.5" textAnchor="middle">{edge.label}</text> : null}
          </g>
        })}
      </svg>
      {project.architecture.nodes.map((node) => {
        const active = selected === node.id
        return <button key={node.id} type="button" onClick={() => onSelect(node.id)} aria-pressed={active} className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-lg border px-2 py-1.5 text-left font-mono shadow-lg transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-300 sm:px-3 ${active ? "border-fuchsia-300 bg-fuchsia-300/20 text-white shadow-fuchsia-500/20" : "border-white/20 bg-[#21172e]/95 text-white/80 hover:border-fuchsia-200/70"}`} style={{ left: node.x+"%", top: node.y+"%", maxWidth: "31%" }}>
          <span className="block text-[7px] uppercase tracking-widest text-fuchsia-200/75 sm:text-[8px]">{typeMeta[node.type].label}</span>
          <span className="block break-words text-[8px] leading-tight sm:text-[10px]">{node.label}</span>
        </button>
      })}
      <div className="absolute bottom-3 left-3 font-mono text-[8px] uppercase tracking-widest text-white/35">select a node to inspect</div>
    </div>
  )
}

export function EngineeringExplorer() {
  const [activeTitle, setActiveTitle] = useState(projects[0]?.title ?? "")
  const [selectedNode, setSelectedNode] = useState(projects[0]?.architecture.nodes[0]?.id ?? "")
  const [tab, setTab] = useState<"map" | "stack" | "flow">("map")
  const project = projects.find((item) => item.title === activeTitle) ?? projects[0]
  const node = project.architecture.nodes.find((item) => item.id === selectedNode) ?? project.architecture.nodes[0]
  const meta = node ? typeMeta[node.type] : null
  const Icon = meta?.icon ?? Boxes
  const incoming = project.architecture.edges.filter((edge) => edge.to === node?.id)
  const outgoing = project.architecture.edges.filter((edge) => edge.from === node?.id)
  const nodeNames = Object.fromEntries(project.architecture.nodes.map((item) => [item.id, item.label]))

  function changeProject(title: string) {
    const next = projects.find((item) => item.title === title)
    setActiveTitle(title)
    setSelectedNode(next?.architecture.nodes[0]?.id ?? "")
    setTab("map")
  }

  return (
    <section id="engineering" className="relative mx-auto w-full max-w-7xl px-4 py-20 md:px-8">
      <SectionHeader label="engineering lab" title="Open the hood. Explore how the pieces connect." />
      <p className="mb-7 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">Choose a build, inspect its architecture, and trace the relationships represented in its system map. These diagrams are project-level design views, not live runtime telemetry.</p>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,.8fr)]">
        <div className="min-w-0 space-y-3">
          <div className="flex flex-wrap gap-2">
            {projects.map((item, index) => <button key={item.title} type="button" onClick={() => changeProject(item.title)} aria-pressed={project.title === item.title} className={`min-h-10 rounded-full border px-3 py-2 text-left text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] ${project.title === item.title ? "border-[var(--primary)] bg-[var(--primary)]/10 text-foreground" : "border-border bg-card text-muted-foreground hover:text-foreground"}`}><span className="mr-2 font-mono text-[9px] opacity-50">{String(index + 1).padStart(2,"0")}</span>{item.title}</button>)}
          </div>
          <ArchitectureMap project={project} selected={node?.id ?? ""} onSelect={setSelectedNode} />
        </div>

        <motion.aside key={project.title+"-"+tab+"-"+node?.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex min-w-0 flex-col rounded-2xl border border-border bg-card p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div><div className="font-mono text-[9px] uppercase tracking-[.25em] text-muted-foreground">selected build / {project.year}</div><h3 className="mt-2 text-2xl font-semibold tracking-tight">{project.title}</h3><p className="mt-1 text-sm text-[var(--primary)]">{project.tagline}</p></div>
            <span className="rounded-xl border border-border bg-background p-2"><GitBranch className="h-5 w-5 text-[var(--primary)]" /></span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {[{ label:"Components", value:project.architecture.nodes.length },{ label:"Connections", value:project.architecture.edges.length },{ label:"Technologies", value:project.tags.length }].map((stat)=><div key={stat.label} className="rounded-xl border border-border bg-background p-3"><div className="text-xl font-semibold tabular-nums">{stat.value}</div><div className="mt-1 font-mono text-[8px] uppercase tracking-wider text-muted-foreground">{stat.label}</div></div>)}
          </div>
          <div className="mt-5 grid grid-cols-3 rounded-xl border border-border bg-background p-1">
            {(["map","stack","flow"] as const).map((item)=><button key={item} type="button" onClick={()=>setTab(item)} className={`min-h-9 rounded-lg font-mono text-[9px] uppercase tracking-widest transition-colors ${tab===item ? "bg-[var(--primary)]/15 text-foreground" : "text-muted-foreground hover:text-foreground"}`} aria-pressed={tab===item}>{item}</button>)}
          </div>
          <div className="mt-4 min-h-[150px]">
            {tab === "map" && node && meta ? <div className="rounded-xl border border-border bg-background p-4"><div className="flex items-center gap-2"><Icon className="h-4 w-4 text-[var(--primary)]"/><span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{meta.label} / component detail</span></div><h4 className="mt-2 font-semibold">{node.label}</h4><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{meta.detail}</p><div className="mt-3 space-y-1 font-mono text-[10px] text-muted-foreground"><p>IN ← {incoming.length ? incoming.map(e=>nodeNames[e.from]).join(", ") : "entry point"}</p><p>OUT → {outgoing.length ? outgoing.map(e=>nodeNames[e.to]).join(", ") : "no outgoing connection mapped"}</p></div></div> : null}
            {tab === "stack" ? <div className="flex flex-wrap gap-2">{project.tags.map(tag=><span key={tag} className="rounded-full border border-border bg-background px-3 py-2 font-mono text-[10px] text-muted-foreground">{tag}</span>)}</div> : null}
            {tab === "flow" ? <ol className="space-y-2">{project.architecture.edges.map((edge,index)=><li key={index} className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-xs"><span className="font-mono text-[9px] text-[var(--primary)]">{String(index+1).padStart(2,"0")}</span><span className="min-w-0 flex-1 truncate">{nodeNames[edge.from]}</span><ArrowUpRight className="h-3 w-3 shrink-0 text-muted-foreground"/><span className="min-w-0 flex-1 truncate text-right">{nodeNames[edge.to]}</span></li>)}</ol> : null}
          </div>
          <div className="mt-auto flex flex-wrap gap-2 pt-5">
            {project.repo ? <a href={project.repo} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-full border border-border px-4 text-xs hover:border-[var(--primary)]">Source <ArrowUpRight className="h-3.5 w-3.5"/></a> : null}
            {project.live ? <a href={project.live} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[var(--primary)] px-4 text-xs text-[var(--primary-foreground)]">Live demo <ExternalLink className="h-3.5 w-3.5"/></a> : null}
          </div>
        </motion.aside>
      </div>
    </section>
  )
}
