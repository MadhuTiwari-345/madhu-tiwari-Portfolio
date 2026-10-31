"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ScanningButton } from "./scanning-button"
import { BlurReveal } from "./blur-reveal"
import { LetsTalkButton } from "./lets-talk"
import { ArrowDownRight, ArrowUpRight, Code2, Layers3, MapPin, Workflow } from "lucide-react"

const stack = [
  { label: "Frontend", value: "React · Next.js · TypeScript" },
  { label: "Backend", value: "Node.js · Spring Boot · REST APIs" },
  { label: "Data & AI", value: "Python · PostgreSQL · MongoDB · AI" },
]

const process = [
  { number: "01", title: "Understand", detail: "Start with the real problem." },
  { number: "02", title: "Design", detail: "Shape a clear, maintainable system." },
  { number: "03", title: "Build", detail: "Implement, test and refine." },
  { number: "04", title: "Ship", detail: "Deploy, learn and improve." },
]

export function Hero() {
  const [panel, setPanel] = useState<"stack" | "process">("stack")

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden px-4 pb-16 pt-44 sm:px-6 sm:pt-48 lg:px-8"
    >
      <div aria-hidden className="hero-paper-grid pointer-events-none absolute inset-0" />
      <div aria-hidden className="hero-color-wash pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_.92fr] lg:gap-16">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-border bg-card/80 px-4 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground shadow-sm backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
            </span>
            <MapPin className="h-3 w-3" />
            New Delhi, India
            <span className="text-border">/</span>
            Open to opportunities
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.06 }}
            className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary)]"
          >
            Full-stack development · Applied AI
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="max-w-3xl text-balance font-display text-[clamp(3.2rem,7.4vw,6.4rem)] font-bold leading-[0.98] tracking-[-0.065em]"
          >
            Thoughtful code.
            <br />
            <span className="hero-title-accent">Useful products.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.24 }}
            className="mt-7 max-w-xl"
          >
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              I’m Madhu Tiwari, a Computer Science student building full-stack experiences, reliable backend systems and practical AI applications.
            </p>
            <div className="mt-5 flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.13em] text-foreground/80">
              <span className="h-px w-8 bg-[var(--secondary)]" />
              <BlurReveal />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.38 }}
            className="hero-actions mt-9 flex flex-wrap items-center gap-3"
          >
            <LetsTalkButton />
            <ScanningButton
              asLink
              href="#projects"
              variant="outline"
              icon={<ArrowUpRight className="h-4 w-4" />}
              data-cursor-label="explore projects"
            >
              Explore projects
            </ScanningButton>
          </motion.div>

          <motion.a
            href="#about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            className="mt-12 inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            A little more about me <ArrowDownRight className="h-3.5 w-3.5" />
          </motion.a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 26, rotate: 1.5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
          className="hero-workbench group relative mx-auto w-full max-w-[520px] overflow-hidden rounded-[1.7rem] border border-border bg-card shadow-[0_28px_90px_-48px_rgba(24,36,68,.32)] lg:ml-auto"
        >
          <div className="flex items-center justify-between border-b border-border/80 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ef8b78]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#e9bd62]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#76b99a]" />
              </div>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">madhu / workspace</span>
            </div>
            <span className="rounded-full bg-[var(--accent)]/10 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-wider text-[var(--accent)]">Live profile</span>
          </div>

          <div className="p-5 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">What I work with</p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">The build toolkit<span className="text-[var(--secondary)]">.</span></h2>
              </div>
              <div className="rounded-2xl bg-[var(--primary)]/10 p-3 text-[var(--primary)]">
                <Code2 className="h-6 w-6" />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 rounded-xl bg-[var(--muted)]/70 p-1" role="group" aria-label="Explore my approach">
              <button
                type="button"
                aria-pressed={panel === "stack"}
                onClick={() => setPanel("stack")}
                className={`rounded-lg px-3 py-2.5 text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] ${panel === "stack" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                <span className="inline-flex items-center gap-2"><Layers3 className="h-3.5 w-3.5" /> Stack</span>
              </button>
              <button
                type="button"
                aria-pressed={panel === "process"}
                onClick={() => setPanel("process")}
                className={`rounded-lg px-3 py-2.5 text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] ${panel === "process" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                <span className="inline-flex items-center gap-2"><Workflow className="h-3.5 w-3.5" /> How I build</span>
              </button>
            </div>

            <div className="mt-5 min-h-[228px]" role="tabpanel">
              {panel === "stack" ? (
                <motion.div key="stack" initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.22 }} className="space-y-3">
                  {stack.map((item, index) => (
                    <div key={item.label} className="rounded-xl border border-border/80 bg-background/70 p-4 transition-colors hover:border-[var(--primary)]/45">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-semibold">{item.label}</span>
                        <span className="font-mono text-[9px] text-muted-foreground">0{index + 1}</span>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.value}</p>
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div key="process" initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.22 }} className="space-y-2">
                  {process.map((item, index) => (
                    <div key={item.number} className="flex items-center gap-4 rounded-xl border border-border/80 bg-background/70 p-3.5 transition-colors hover:border-[var(--secondary)]/50">
                      <span className="font-mono text-xs font-bold text-[var(--secondary)]">{item.number}</span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold">{item.title}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{item.detail}</p>
                      </div>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground/60" />
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-border/80 pt-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.13em] text-muted-foreground">Curiosity into working software</span>
              <span className="h-1.5 w-12 overflow-hidden rounded-full bg-[var(--muted)]">
                <span className="block h-full w-3/4 rounded-full bg-[var(--accent)]" />
              </span>
            </div>
          </div>
          <div aria-hidden className="hero-workbench-edge pointer-events-none absolute inset-x-0 top-0 h-px" />
        </motion.div>
      </div>
    </section>
  )
}
