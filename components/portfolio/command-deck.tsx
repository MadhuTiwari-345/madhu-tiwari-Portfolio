"use client"

import { useMemo, useState } from "react"
import type { FormEvent } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, Command, Github, Linkedin, Mail, Terminal } from "lucide-react"
import { SectionHeader } from "./about-bento"
import { MiniSystemMapPreview } from "./system-map"
import { CaseStudyPreview } from "./case-studies"

type CommandResult = {
  command: string
  lines: string[]
  links?: { label: string; href: string }[]
}

const commandMap: Record<string, CommandResult> = {
  help: {
    command: "help",
    lines: [
      "MADHU.OS // available commands",
      "about       : a quick introduction",
      "projects    : selected things I've built",
      "stack       : tools I work with",
      "journey     : experience and open source",
      "contact     : start a conversation",
      "github      : open my public code",
      "map         : navigate the portfolio system",
      "case-study  : explore project build stories",
      "clear       : clear this terminal",
    ],
  },
  about: {
    command: "about",
    lines: [
      "Madhu Tiwari // New Delhi, India",
      "Computer & Data Science student (AI & ML) at MUIT Noida.",
      "I build full-stack products and explore practical AI systems.",
      "Current focus: backend engineering, system design, and shipping useful software.",
    ],
  },
  projects: {
    command: "projects",
    lines: [
      "SELECTED BUILDS // open the Work section for details",
      "01  PhishBuster     : phishing detection + training",
      "02  Kisan OS        : farmer-first information dashboard",
      "03  FarmChain       : decentralized agri supply chain",
      "04  FemtoGuard      : AI-assisted fraud defense",
      "05  Lex AI          : legal intelligence platform",
      "06  HirePlane       : job discovery + recruitment",
      "07  StormCycle      : cycle tracking + health insights",
      "08  MicroClimate    : hyper-local climate intelligence",
      "09  RISC-V Explorer : instruction-set analysis workbench",
    ],
    links: [{ label: "Explore project cards", href: "#projects" }],
  },
  stack: {
    command: "stack",
    lines: [
      "LANGUAGES     Java · Python · JavaScript · SQL",
      "FRONTEND      React · Next.js · Tailwind CSS",
      "BACKEND       Spring Boot · Node.js · REST APIs",
      "DATA          PostgreSQL · MongoDB · Firebase",
      "PRACTICE      Git · testing · API design · system design",
      "AI            AI agents · applied machine learning",
    ],
  },
  journey: {
    command: "journey",
    lines: [
      "BUILD LOG // 2025 to now",
      "Open-source contributor across GSSoC, SWOC, ECWoC, OSCG and Apertre.",
      "Full-stack developer at ARVIQ Digital Solution (Mar 2026 to present).",
      "Growth Marketing Intern at PHICSIT InfoTech (May to Jul 2026).",
      "B.Tech Computer & Data Science (AI & ML), MUIT Noida (2024 to 2028).",
    ],
    links: [{ label: "View full journey", href: "#experience" }],
  },
  contact: {
    command: "contact",
    lines: [
      "CHANNEL OPEN // open to internships, freelance work and collaborations.",
      "Email: mt1499961@gmail.com",
      "LinkedIn: linkedin.com/in/madhu-tiwari-833ab1326",
    ],
    links: [
      { label: "Send an email", href: "mailto:mt1499961@gmail.com" },
      { label: "Connect on LinkedIn", href: "https://www.linkedin.com/in/madhu-tiwari-833ab1326/" },
    ],
  },
  "case-study": {
    command: "case-study",
    lines: ["PROJECT CASE STUDIES", "Explore each build through its project brief, mapped architecture and listed technology stack."],
    links: [{ label: "Open case study explorer", href: "#case-studies" }],
  },
  map: {
    command: "map",
    lines: ["MADHU.OS / SYSTEM TOPOLOGY", "Eight connected destinations. Select a node to inspect and jump into that section."],
    links: [{ label: "Open interactive system map", href: "#system-map" }],
  },
  github: {
    command: "github",
    lines: [
      "SOURCE CONTROL // public repositories, issues and contributions.",
      "Opening GitHub profile in a new tab…",
    ],
    links: [{ label: "github.com/MadhuTiwari-345", href: "https://github.com/MadhuTiwari-345" }],
  },
}

const suggestions = ["projects", "stack", "journey", "map", "case-study", "contact"]

export function CommandDeck() {
  const [value, setValue] = useState("")
  const [history, setHistory] = useState<CommandResult[]>([commandMap.help])
  const [error, setError] = useState("")

  const visibleHistory = useMemo(() => history.slice(-4), [history])

  function runCommand(raw: string) {
    const command = raw.trim().toLowerCase()
    if (!command) return
    setValue("")
    setError("")

    if (command === "clear") {
      setHistory([])
      return
    }

    const result = commandMap[command]
    if (!result) {
      setError(`command not found: ${command}. Try "help" to see what's available.`)
      return
    }

    setHistory((current) => [...current, result])
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    runCommand(value)
  }

  return (
    <section id="console" className="relative mx-auto w-full max-w-7xl px-4 py-20 md:px-8">
      <SectionHeader index="00" label="interactive interface" title="A little command line, a lot about how I build." />

      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="relative min-w-0 overflow-hidden rounded-2xl border border-border bg-[#100d19] text-[#f7efff] shadow-[0_24px_90px_-45px_color-mix(in_oklch,var(--primary)_55%,transparent)]"
        >
          <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-white/[0.035] px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b8a]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffc66d]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#73d9a5]" />
              <span className="ml-2 font-mono text-[10px] tracking-[0.2em] text-white/55">MADHU.OS / TERMINAL</span>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#8ce7bd]">session ready</span>
          </div>

          <div className="flex min-h-[340px] flex-col p-4 sm:p-5">
            <div className="mb-4 flex items-center gap-2 font-mono text-[10px] text-white/45">
              <Terminal className="h-3.5 w-3.5" />
              <span>type a command or choose a shortcut</span>
            </div>

            <div aria-live="polite" aria-relevant="additions text" className="min-h-[205px] space-y-4 font-mono text-[11px] leading-6 sm:text-xs">
              <AnimatePresence initial={false}>
                {visibleHistory.map((entry, index) => (
                  <motion.div
                    key={`${entry.command}-${history.length - visibleHistory.length + index}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-1.5"
                  >
                    <div className="flex items-center gap-2 text-[#ff9bc0]">
                      <span className="text-[#8ce7bd]">madhu@portfolio</span>
                      <span className="text-white/35">~ %</span>
                      <span>{entry.command}</span>
                    </div>
                    {entry.lines.map((line) => (
                      <p key={line} className="break-words text-white/75">{line}</p>
                    ))}
                    {entry.links?.length ? (
                      <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1">
                        {entry.links.map((link) => (
                          <a key={link.href} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined} className="inline-flex items-center gap-1 text-[#ff9bc0] underline-offset-4 hover:underline">
                            {link.label}<ArrowUpRight className="h-3 w-3" />
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </motion.div>
                ))}
              </AnimatePresence>
              {error ? <p role="alert" className="font-mono text-[11px] text-[#ff9b9b]">{error}</p> : null}
            </div>

            <form onSubmit={handleSubmit} className="mt-auto flex min-w-0 items-center gap-2 border-t border-white/10 pt-4">
              <span className="shrink-0 font-mono text-xs text-[#8ce7bd]">➜</span>
              <label htmlFor="portfolio-command" className="sr-only">Enter a portfolio command</label>
              <input
                id="portfolio-command"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                autoComplete="off"
                spellCheck={false}
                placeholder="try: projects"
                className="min-w-0 flex-1 bg-transparent font-mono text-xs text-white outline-none placeholder:text-white/30 focus-visible:ring-0"
              />
              <button type="submit" className="rounded-lg border border-[#ff9bc0]/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-[#ffb2ce] transition-colors hover:bg-[#ff9bc0]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff9bc0]">
                Run
              </button>
            </form>
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="flex min-w-0 flex-col gap-4"
        >
          <div className="relative flex-1 overflow-hidden rounded-2xl border border-border bg-card p-5 sm:p-6">
            <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl" style={{ background: "color-mix(in oklch, var(--primary) 22%, transparent)" }} />
            <div className="relative flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              <Command className="h-3.5 w-3.5 text-[var(--primary)]" />
              quick access
            </div>
            <h3 className="relative mt-3 text-2xl font-semibold tracking-tight">Explore the system.</h3>
            <p className="relative mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
              A tiny, local portfolio assistant. No pretend AI answers, just direct routes to real work, tools and experience.
            </p>
            <div className="relative mt-5 grid grid-cols-2 gap-2">
              {suggestions.map((command) => (
                <button
                  key={command}
                  type="button"
                  onClick={() => runCommand(command)}
                  className="group flex min-h-11 items-center justify-between rounded-xl border border-border bg-background/70 px-3 text-left font-mono text-[10px] uppercase tracking-wider transition-all hover:-translate-y-0.5 hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
                >
                  <span>{command}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </button>
              ))}
              <MiniSystemMapPreview />
              <CaseStudyPreview />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <a href="https://github.com/MadhuTiwari-345" target="_blank" rel="noreferrer" className="flex min-h-16 flex-col justify-between rounded-xl border border-border bg-card p-3 transition-colors hover:border-[var(--primary)]">
              <Github className="h-4 w-4 text-[var(--primary)]" />
              <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/madhu-tiwari-833ab1326/" target="_blank" rel="noreferrer" className="flex min-h-16 flex-col justify-between rounded-xl border border-border bg-card p-3 transition-colors hover:border-[var(--primary)]">
              <Linkedin className="h-4 w-4 text-[var(--primary)]" />
              <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">LinkedIn</span>
            </a>
            <a href="mailto:mt1499961@gmail.com" className="flex min-h-16 flex-col justify-between rounded-xl border border-border bg-card p-3 transition-colors hover:border-[var(--primary)]">
              <Mail className="h-4 w-4 text-[var(--primary)]" />
              <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">Email</span>
            </a>
          </div>
        </motion.aside>
      </div>
    </section>
  )
}
