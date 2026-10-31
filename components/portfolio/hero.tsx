"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ScanningButton } from "./scanning-button"
import { BlurReveal } from "./blur-reveal"
import { LetsTalkButton } from "./lets-talk"
import { ArrowDownRight, ArrowUpRight, Code2, Layers3, MapPin, Workflow, Braces, Database, Sparkles } from "lucide-react"

const stack = [
  { label: "Frontend", value: "React · Next.js · TypeScript", icon: Code2 },
  { label: "Backend", value: "Node.js · Spring Boot · REST APIs", icon: Braces },
  { label: "Data & AI", value: "Python · PostgreSQL · MongoDB · AI", icon: Database },
]

const process = [
  { number: "01", title: "Understand", detail: "Start with the real problem.", target: "about" },
  { number: "02", title: "Design", detail: "Shape a clear, maintainable system.", target: "engineering" },
  { number: "03", title: "Build", detail: "Implement, test and refine.", target: "projects" },
  { number: "04", title: "Ship", detail: "Deploy, learn and improve.", target: "experience" },
]

function jumpTo(id: string) {
  const target = document.getElementById(id)
  if (!target) return
  const header = document.querySelector("header")?.getBoundingClientRect().height ?? 72
  const heading = (target.firstElementChild as HTMLElement | null) ?? target
  const top = heading.getBoundingClientRect().top + window.scrollY - header - 18
  window.history.pushState(null, "", `#${id}`)
  window.scrollTo({
    top: Math.max(0, top),
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
  })
}

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const [panel, setPanel] = useState<"stack" | "process">("stack")

  return (
    <section
      id="top"
      className="hero-section relative flex min-h-[min(820px,92svh)] w-full items-center overflow-hidden px-5 pb-16 pt-32 sm:px-8 lg:px-10 lg:pb-20 lg:pt-36"
    >
      <div aria-hidden className="hero-paper-grid pointer-events-none absolute inset-0" />
      <div aria-hidden className="hero-color-wash pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1240px] items-center gap-12 lg:grid-cols-[1.08fr_.82fr] lg:gap-16 xl:gap-24">
        <div className="max-w-[690px]">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-border/80 bg-card/80 px-4 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.13em] text-muted-foreground shadow-sm backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-35" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
            </span>
            <MapPin className="h-3 w-3" />
            New Delhi, India
            <span className="mx-0.5 text-border">/</span>
            Open to opportunities
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.06, ease }}
            className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--primary)] sm:text-xs"
          >
            Full-stack development <span className="px-1.5 text-[var(--secondary)]">·</span> Applied AI
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12, ease }}
            className="max-w-[720px] text-balance font-display text-[clamp(3.35rem,6.1vw,5.65rem)] font-bold leading-[.99] tracking-[-0.065em]"
          >
            Thoughtful code.
            <br />
            <span className="hero-title-accent">Useful products.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="mt-7 max-w-[570px]"
          >
            <p className="text-[15px] leading-[1.8] text-muted-foreground sm:text-[17px]">
              I’m Madhu Tiwari, a Computer Science student building full-stack experiences, reliable backend systems and practical AI applications.
            </p>
            <div className="mt-5 flex items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground/75">
              <span className="h-px w-8 bg-[var(--secondary)]" />
              <BlurReveal />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.38, ease }}
            className="hero-actions mt-8 flex flex-wrap items-center gap-3"
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
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-7 inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-[var(--primary)]"
          >
            A little more about me <ArrowDownRight className="h-3.5 w-3.5" />
          </motion.a>
        </div>

        <motion.aside
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.2, ease }}
          className="hero-workbench relative mx-auto w-full max-w-[460px] lg:ml-auto"
          aria-label="Interactive overview of my toolkit and workflow"
        >
          <div className="mb-4 flex items-center justify-between px-1">
            <div className="flex items-center gap-2 text-[var(--primary)]">
              <Sparkles className="h-4 w-4" />
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.17em]">A practical approach</span>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">01 / 02</span>
          </div>

          <div className="overflow-hidden rounded-[1.4rem] border border-border bg-card/95 shadow-[0_24px_70px_-42px_rgba(24,36,68,.28)] backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-border/80 px-5 py-4 sm:px-6">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">Madhu Tiwari</p>
                <h2 className="mt-1 text-lg font-semibold tracking-tight">How ideas become products</h2>
              </div>
              <div className="rounded-xl bg-[var(--primary)]/8 p-2.5 text-[var(--primary)]">
                <Code2 className="h-5 w-5" />
              </div>
            </div>

            <div className="p-4 sm:p-5">
              <div className="grid grid-cols-2 gap-1 rounded-xl bg-[var(--muted)]/80 p-1" role="group" aria-label="Choose toolkit or process">
                <button
                  type="button"
                  aria-pressed={panel === "stack"}
                  onClick={() => setPanel("stack")}
                  className={`relative rounded-lg px-3 py-2.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] ${panel === "stack" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {panel === "stack" && <motion.span layoutId="hero-tab" className="absolute inset-0 rounded-lg bg-card shadow-sm" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                  <span className="relative inline-flex items-center gap-2"><Layers3 className="h-3.5 w-3.5" /> My stack</span>
                </button>
                <button
                  type="button"
                  aria-pressed={panel === "process"}
                  onClick={() => setPanel("process")}
                  className={`relative rounded-lg px-3 py-2.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] ${panel === "process" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {panel === "process" && <motion.span layoutId="hero-tab" className="absolute inset-0 rounded-lg bg-card shadow-sm" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                  <span className="relative inline-flex items-center gap-2"><Workflow className="h-3.5 w-3.5" /> My process</span>
                </button>
              </div>

              <div className="mt-4 min-h-[218px]">
                <AnimatePresence mode="wait" initial={false}>
                  {panel === "stack" ? (
                    <motion.div key="stack" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }} className="space-y-2.5">
                      {stack.map((item, index) => {
                        const Icon = item.icon
                        return (
                          <motion.button
                            type="button"
                            onClick={() => jumpTo("skills")}
                            key={item.label}
                            initial={{ opacity: 0, x: 12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.055, duration: 0.28 }}
                            className="group/row flex w-full items-center gap-3 rounded-xl border border-border/75 bg-background/65 px-3.5 py-3.5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--primary)]/40 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                            aria-label={`Explore ${item.label} skills`}
                          >
                            <span className="rounded-lg bg-[var(--primary)]/8 p-2 text-[var(--primary)]"><Icon className="h-4 w-4" /></span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-[13px] font-semibold">{item.label}</span>
                              <span className="mt-1 block text-[11px] leading-relaxed text-muted-foreground">{item.value}</span>
                            </span>
                            <span className="font-mono text-[9px] text-muted-foreground/70">0{index + 1}</span>
                          </motion.button>
                        )
                      })}
                    </motion.div>
                  ) : (
                    <motion.div key="process" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }} className="space-y-1">
                      {process.map((item, index) => (
                        <motion.button type="button" onClick={() => jumpTo(item.target)} key={item.number} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.045, duration: 0.25 }} className="group/process flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors hover:bg-[var(--muted)]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]">
                          <span className="font-mono text-[10px] font-semibold text-[var(--secondary)]">{item.number}</span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-[13px] font-semibold">{item.title}</span>
                            <span className="mt-0.5 block text-[11px] text-muted-foreground">{item.detail}</span>
                          </span>
                          <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/60 transition-transform group-hover/process:-translate-y-0.5 group-hover/process:translate-x-0.5" />
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-border/80 px-5 py-3.5 sm:px-6">
              <span className="text-[11px] text-muted-foreground">Curiosity, turned into working software.</span>
              <span className="h-1.5 w-10 overflow-hidden rounded-full bg-[var(--muted)]">
                <motion.span className="block h-full rounded-full bg-[var(--accent)]" animate={{ width: panel === "stack" ? "72%" : "100%" }} transition={{ duration: 0.35 }} />
              </span>
            </div>
          </div>
          <div aria-hidden className="pointer-events-none absolute -bottom-5 -right-4 -z-10 h-28 w-28 rounded-full bg-[var(--primary)]/10 blur-3xl" />
        </motion.aside>
      </div>
    </section>
  )
}
