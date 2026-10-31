"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Github, ExternalLink, Scan, ChevronDown, ArrowUpRight } from "lucide-react"
import { ScanningButton } from "./scanning-button"

export type ArchNode = {
  id: string
  label: string
  type: "client" | "server" | "db" | "ai" | "external" | "tool"
  x: number // 0..100
  y: number // 0..100
}

export type ArchEdge = { from: string; to: string; label?: string }

export type Project = {
  title: string
  category: string
  tagline: string
  description: string
  buildNote?: string
  tags: string[]
  repo?: string
  live?: string
  year: string
  gradient: [string, string]
  /** tall / wide / square sizing in the bento grid */
  span?: string
  architecture: {
    nodes: ArchNode[]
    edges: ArchEdge[]
  }
  architectureBasis?: string
  previewLabel?: string
  /** optional screenshot rendered in the preview face of the card */
  image?: string
}

const nodeStyles: Record<ArchNode["type"], { label: string; glow: string }> = {
  client: { label: "CLIENT", glow: "var(--primary)" },
  server: { label: "SERVER", glow: "var(--secondary)" },
  db: { label: "DB", glow: "var(--accent)" },
  ai: { label: "AI", glow: "var(--primary)" },
  external: { label: "API", glow: "var(--secondary)" },
  tool: { label: "TOOL", glow: "var(--accent)" },
}

function ArchitectureView({ arch }: { arch: Project["architecture"] }) {
  const nodeById = Object.fromEntries(arch.nodes.map((n) => [n.id, n]))
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[inherit] bg-[var(--background-elevated)]">
      {/* blueprint grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      {/* blueprint title */}
      <div className="absolute top-3 left-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--primary)]" />
        system.map
      </div>
      <div className="absolute top-3 right-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        v1.0
      </div>

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="4"
            markerHeight="4"
            orient="auto"
          >
            <path d="M0,0 L10,5 L0,10 Z" fill="var(--primary)" />
          </marker>
        </defs>
        {arch.edges.map((e, i) => {
          const a = nodeById[e.from]
          const b = nodeById[e.to]
          if (!a || !b) return null
          return (
            <g key={i}>
              <motion.line
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="var(--primary)"
                strokeWidth={0.3}
                strokeDasharray="1 1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.85 }}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.6 }}
                markerEnd="url(#arrow)"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          )
        })}
      </svg>

      {arch.nodes.map((n, i) => {
        const style = nodeStyles[n.type]
        return (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.06, type: "spring", stiffness: 260, damping: 20 }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            <div
              className="rounded-md border px-2 py-1 font-mono text-[9px] uppercase tracking-widest whitespace-nowrap backdrop-blur-sm"
              style={{
                borderColor: "color-mix(in oklch, var(--primary) 50%, transparent)",
                background: "color-mix(in oklch, var(--background) 70%, transparent)",
                boxShadow: `0 0 20px -6px ${style.glow}`,
              }}
            >
              <div className="text-[8px] opacity-60">[{style.label}]</div>
              <div className="text-foreground">{n.label}</div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

function MockPreview({ project }: { project: Project }) {
  const [a, b] = project.gradient

  // If a real screenshot exists, render it with a subtle chrome + scanning shimmer overlay.
  if (project.image) {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-[inherit] bg-[var(--background-elevated)]">
        {/* screenshot */}
        <img
          src={project.image || "/placeholder.svg"}
          alt={`${project.title} interface preview`}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035]"
          loading="lazy"
        />

        {/* gradient vignette so text/badges stay readable */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        <div className="absolute bottom-3 left-3 rounded-full border border-white/25 bg-black/45 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-white/90 backdrop-blur-sm">
          {project.previewLabel ?? project.title.toLowerCase()}
        </div>
      </div>
    )
  }

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-[inherit]"
      style={{ background: `linear-gradient(135deg, ${a} 0%, ${b} 100%)` }}
    >
      {/* faux UI mock */}
      <div className="absolute inset-0 p-4">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/40" />
          <span className="h-2 w-2 rounded-full bg-white/40" />
          <span className="h-2 w-2 rounded-full bg-white/40" />
          <span className="ml-2 font-mono text-[10px] tracking-widest text-white/70 uppercase">
            {project.previewLabel ?? project.title.toLowerCase()}
          </span>
        </div>
        <div className="mt-3 space-y-2">
          <div className="h-2 w-2/3 rounded-full bg-white/30" />
          <div className="h-2 w-1/2 rounded-full bg-white/20" />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="h-10 rounded-lg bg-white/25 backdrop-blur-sm" />
          <div className="h-10 rounded-lg bg-white/15 backdrop-blur-sm" />
          <div className="h-10 rounded-lg bg-white/20 backdrop-blur-sm" />
        </div>
        <div className="mt-3 h-16 rounded-lg bg-white/10 backdrop-blur-sm" />
      </div>

    </div>
  )
}

export function ProjectCardXRay({ project, index = 0 }: { project: Project; index?: number }) {
  const [xray, setXray] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const number = String(index + 1).padStart(2, "0")

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration: 0.42, delay: Math.min(index * 0.035, 0.14), ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-full flex-col"
    >
      <div className="relative overflow-hidden rounded-[1.35rem] border-2 border-border bg-[var(--background-elevated)] p-1.5 shadow-[0_4px_18px_-14px_var(--foreground)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[var(--primary)]/70 group-hover:shadow-[0_22px_55px_-30px_var(--primary)]">
        <div className={`relative w-full overflow-hidden rounded-[1rem] ${index % 4 === 1 ? "aspect-[5/4]" : "aspect-[16/10]"}`}>
          <AnimatePresence initial={false} mode="wait">
            {xray ? (
              <motion.div key="xray" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="absolute inset-0">
                <ArchitectureView arch={project.architecture} />
              </motion.div>
            ) : (
              <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="absolute inset-0">
                <MockPreview project={project} />
              </motion.div>
            )}
          </AnimatePresence>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${project.title} live project in a new tab`}
              className="absolute inset-0 z-[2] rounded-[1rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
            />
          )}
          <div className="pointer-events-none absolute inset-0 z-[1] ring-1 ring-inset ring-black/[0.08]" />
          <div className="pointer-events-none absolute left-3 top-3 z-[3] flex items-center gap-2">
            <span className="rounded-full border border-white/25 bg-black/45 px-2.5 py-1 font-mono text-[9px] tracking-[0.16em] text-white backdrop-blur-md">{number} / 09</span>
            <span className="rounded-full border border-white/25 bg-black/35 px-2.5 py-1 font-mono text-[9px] tracking-[0.12em] text-white/90 backdrop-blur-md">{project.year}</span>
          </div>
          <button
            type="button"
            onClick={() => setXray((value) => !value)}
            aria-pressed={xray}
            aria-label={xray ? "View project preview" : "View project architecture"}
            className="absolute right-3 top-3 z-[4] flex items-center gap-1.5 rounded-full border border-white/25 bg-black/45 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.13em] text-white backdrop-blur-md transition-colors hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Scan className="h-3 w-3" /> {xray ? "Preview" : "X-ray"}
          </button>
        </div>
        <div className="flex items-center justify-between gap-3 px-2.5 pb-1 pt-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.17em] text-muted-foreground">{project.category}</span>
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Project {number}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-1.5 pb-2 pt-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-balance text-xl font-semibold tracking-[-0.04em] text-foreground md:text-[1.45rem]">{project.title}</h3>
          <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--primary)]" />
        </div>
        <p className="mt-1 text-xs font-medium text-[var(--primary)] md:text-sm">{project.tagline}</p>
        <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-muted-foreground">{project.description}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="rounded-full border border-border/80 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">{tag}</span>
          ))}
          {project.tags.length > 4 && <span className="px-1 py-1 font-mono text-[9px] text-muted-foreground">+{project.tags.length - 4}</span>}
        </div>

        <div className="mt-auto pt-4">
          <div className="flex flex-wrap items-center gap-2">
            {project.repo && (
              <ScanningButton asLink href={project.repo} target="_blank" rel="noreferrer" variant="outline" icon={<Github className="h-3.5 w-3.5" />} aria-label={`View ${project.title} source on GitHub`}>
                Source
              </ScanningButton>
            )}
            {project.live && (
              <ScanningButton asLink href={project.live} target="_blank" rel="noreferrer" variant="primary" icon={<ExternalLink className="h-3.5 w-3.5" />} aria-label={`Open ${project.title} live deployment`}>
                Live project
              </ScanningButton>
            )}
            <button type="button" onClick={() => setExpanded((value) => !value)} aria-expanded={expanded} className="ml-auto inline-flex items-center gap-1.5 rounded-full px-2.5 py-2 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]">
              Build notes <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
            </button>
          </div>
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.24 }} className="overflow-hidden">
                <div className="mt-4 border-t border-border/80 pt-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">System components</p>
                      <ul className="space-y-1.5">{project.architecture.nodes.map((node) => <li key={node.id} className="flex items-center gap-2 text-xs text-foreground/80"><span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />{node.label}</li>)}</ul>
                    </div>
                    <div>
                      <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">How pieces connect</p>
                      <ol className="space-y-1.5">{project.architecture.edges.map((edge, edgeIndex) => { const from = project.architecture.nodes.find((node) => node.id === edge.from); const to = project.architecture.nodes.find((node) => node.id === edge.to); if (!from || !to) return null; return <li key={edgeIndex} className="text-xs leading-relaxed text-foreground/75"><span className="text-[var(--primary)]">{from.label}</span><span className="px-1.5 text-muted-foreground">→</span>{to.label}</li> })}</ol>
                    </div>
                  </div>
                  {project.buildNote && <p className="mt-4 border-l-2 border-[var(--primary)]/50 pl-3 text-xs leading-relaxed text-muted-foreground">{project.buildNote}</p>}
                  {project.architectureBasis && <p className="mt-3 text-[10px] leading-relaxed text-muted-foreground/80">Evidence: {project.architectureBasis}</p>}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  )
}
