"use client"

import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Download, Github, Linkedin, Mail, MapPin, Printer } from "lucide-react"

const experience = [
  {
    role: "Full-stack Developer",
    organization: "ARVIQ Digital Solution · Self-employed · Remote",
    period: "Mar 2026 to Present",
    detail: "Build full-stack applications end-to-end, from user interfaces to backend APIs, for independent client projects.",
  },
  {
    role: "Growth Marketing Intern",
    organization: "PHICSIT InfoTech Pvt. Ltd. · Part-time · Remote",
    period: "May 2026 to Jul 2026",
    detail: "Supported brand awareness and user acquisition through social campaigns, market research and cross-functional execution.",
  },
  {
    role: "Data Analytics Job Simulation",
    organization: "Deloitte Australia · Forage · Remote",
    period: "Apr 2026",
    detail: "Built KPI dashboards in Tableau and worked on financial modelling in Excel as part of a job simulation.",
  },
  {
    role: "Open-Source Contributor",
    organization: "GSSoC '25 · SWOC '26 · ECWoC '26 · OSCG '26 · Apertre 3.0",
    period: "2025 to Present",
    detail: "Contribute to community-driven software projects, collaborate through GitHub workflows, and work across frontend and backend codebases.",
  },
]

const projects = [
  {
    name: "Lex AI",
    type: "LegalTech · Full-stack SaaS",
    description: "Legal intelligence platform for contract drafting, clause-level risk scoring, RAG-powered case-law research and matter workflows.",
    stack: "React · TypeScript · Node.js · PostgreSQL · Drizzle · Clerk",
    live: "https://lex-intelligence-beta.vercel.app/",
    repo: "https://github.com/MadhuTiwari-345/Lex-Intelligence",
  },
  {
    name: "Kisan OS",
    type: "AgriTech · Information platform",
    description: "Farmer-first dashboard bringing weather, crop advisory, marketplace prices and government-scheme information into one interface.",
    stack: "React · Node.js · Firebase · REST APIs",
    live: "https://kisanosprojectcheck.vercel.app/",
    repo: "https://github.com/MadhuTiwari-345/Kisan-OS",
  },
  {
    name: "FemtoGuard",
    type: "AI · Fraud prevention",
    description: "Prototype that analyzes scam patterns in voice and text and guides users toward safer responses.",
    stack: "Python · FastAPI · Gemini · React · Cloud Run",
    live: "https://femtoguard.vercel.app/",
    repo: "https://github.com/MadhuTiwari-345/FemtoGuard",
  },
  {
    name: "MicroClimate",
    type: "ClimateTech · Data visualization",
    description: "Hyper-local climate intelligence experience combining weather conditions, forecasting, anomaly detection and risk scoring.",
    stack: "React · Vite · FastAPI · Three.js",
    live: "https://microclimate-ten.vercel.app/",
    repo: "https://github.com/MadhuTiwari-345/MicroClimate",
  },
  {
    name: "RISC-V Instruction Set Explorer",
    type: "Developer tooling · Analysis workbench",
    description: "Offline-first workbench to parse instructions, cross-reference ISA extensions and explore instruction relationships.",
    stack: "Python · JavaScript · Data visualization · Unit testing",
    live: "https://risc-v-instruction-explorer.vercel.app/",
    repo: "https://github.com/MadhuTiwari-345/RISC-V-instruction-explorer",
  },
]

const skillGroups = [
  { title: "Languages", items: "Java, Python, JavaScript, TypeScript, SQL" },
  { title: "Frontend", items: "React, Next.js, HTML, CSS, Tailwind CSS" },
  { title: "Backend", items: "Spring Boot, Node.js, FastAPI, REST APIs" },
  { title: "Data & Platforms", items: "PostgreSQL, MongoDB, Firebase, Git, GitHub, Docker, Vercel, Google Cloud Run" },
  { title: "Engineering", items: "Data structures & algorithms, database systems, API design, system design, applied AI" },
]

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-[var(--primary)] underline-offset-4 hover:underline print:text-black">{children}<ArrowUpRight className="h-3.5 w-3.5 print:hidden"/></a>
}

export function RecruiterView() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-5 pb-16 pt-8 sm:px-8 lg:px-10 print:max-w-none print:px-0 print:py-0">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-[var(--primary)] hover:text-foreground"><ArrowLeft className="h-4 w-4"/> Back to MADHU.OS</Link>
          <button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-[var(--primary-foreground)] transition-transform hover:-translate-y-0.5"><Printer className="h-4 w-4"/> Print / Save PDF</button>
        </div>

        <article className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl print:overflow-visible print:rounded-none print:border-0 print:bg-white print:text-black print:shadow-none">
          <header className="relative border-b border-border p-7 sm:p-10 print:border-black/20 print:p-0 print:pb-6">
            <div aria-hidden className="pointer-events-none absolute right-0 top-0 h-48 w-72 opacity-20 blur-3xl print:hidden" style={{background:"radial-gradient(circle, var(--primary), transparent 70%)"}}/>
            <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[.28em] text-[var(--primary)] print:text-black">Professional profile / 2026</p>
                <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl print:text-4xl">Madhu Tiwari</h1>
                <p className="mt-3 max-w-2xl text-lg font-medium text-muted-foreground print:text-black">Full-Stack Developer · AI &amp; ML Enthusiast</p>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground print:text-black">
                  Computer &amp; Data Science undergraduate focused on building dependable full-stack products, backend services and practical AI-enabled applications.
                </p>
              </div>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground print:text-black">
                <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-[var(--primary)] print:hidden"/> New Delhi, India</span>
                <a className="inline-flex items-center gap-2 hover:text-foreground" href="mailto:mt1499961@gmail.com"><Mail className="h-4 w-4 text-[var(--primary)] print:hidden"/> mt1499961@gmail.com</a>
                <ExternalLink href="https://github.com/MadhuTiwari-345">GitHub profile</ExternalLink>
                <ExternalLink href="https://www.linkedin.com/in/madhu-tiwari-833ab1326/">LinkedIn profile</ExternalLink>
              </div>
            </div>
            <div className="mt-7 flex flex-wrap gap-2">
              {["Full-stack development","Backend engineering","Applied AI","Open source"].map((tag)=><span key={tag} className="rounded-full border border-border bg-background px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground print:border-black/20 print:bg-white print:text-black">{tag}</span>)}
            </div>
          </header>

          <div className="grid gap-9 p-7 sm:p-10 lg:grid-cols-[1.4fr_.8fr] print:grid-cols-[1.4fr_.8fr] print:gap-7 print:p-0 print:pt-6">
            <div className="space-y-9">
              <section>
                <SectionTitle>Selected projects</SectionTitle>
                <div className="mt-4 space-y-4">
                  {projects.map((project)=>(
                    <div key={project.name} className="break-inside-avoid rounded-2xl border border-border bg-background/70 p-4 print:rounded-none print:border-0 print:border-b print:border-black/15 print:bg-white print:px-0 print:py-3">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div><h3 className="font-semibold">{project.name}</h3><p className="mt-0.5 text-xs text-[var(--primary)] print:text-black">{project.type}</p></div>
                        <div className="flex gap-3 print:hidden"><ExternalLink href={project.live}>Live</ExternalLink><ExternalLink href={project.repo}>Code</ExternalLink></div>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground print:text-black">{project.description}</p>
                      <p className="mt-2 font-mono text-[10px] leading-5 text-muted-foreground print:text-black"><span className="font-semibold">Stack:</span> {project.stack}</p>
                      <p className="mt-1 hidden text-[9px] text-black print:block">{project.live} · {project.repo}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <SectionTitle>Experience &amp; contributions</SectionTitle>
                <div className="mt-4 space-y-5">
                  {experience.map((item)=>(
                    <div key={item.role} className="break-inside-avoid border-l-2 border-[var(--primary)] pl-4">
                      <div className="flex flex-wrap items-baseline justify-between gap-2"><h3 className="font-semibold">{item.role}</h3><span className="font-mono text-[10px] text-muted-foreground print:text-black">{item.period}</span></div>
                      <p className="mt-1 text-xs text-[var(--primary)] print:text-black">{item.organization}</p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground print:text-black">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="space-y-8">
              <section>
                <SectionTitle>Technical skills</SectionTitle>
                <div className="mt-4 space-y-4">
                  {skillGroups.map((group)=><div key={group.title}><h3 className="text-xs font-semibold uppercase tracking-wider">{group.title}</h3><p className="mt-1.5 text-sm leading-6 text-muted-foreground print:text-black">{group.items}</p></div>)}
                </div>
              </section>
              <section>
                <SectionTitle>Education</SectionTitle>
                <div className="mt-4">
                  <h3 className="font-semibold">B.Tech in Computer &amp; Data Science (AI &amp; ML)</h3>
                  <p className="mt-1 text-sm text-muted-foreground print:text-black">Maharishi University of Information Technology, Noida</p>
                  <p className="mt-2 font-mono text-[10px] text-muted-foreground print:text-black">Aug 2024 to Aug 2028 · CGPA 7.88 through Semester IV</p>
                </div>
              </section>
              <section>
                <SectionTitle>Selected recognition</SectionTitle>
                <ul className="mt-4 list-disc space-y-2 pl-4 text-sm leading-6 text-muted-foreground print:text-black">
                  <li>EliteHack 1.0: Hackathon Finalist</li>
                  <li>McKinsey &amp; Company Forward Program (2025)</li>
                  <li>Open-source contributor across five community programs</li>
                  <li>Deloitte Australia Data Analytics Job Simulation (Forage)</li>
                </ul>
              </section>
              <section className="rounded-2xl border border-border bg-background p-4 print:rounded-none print:border print:border-black/20 print:bg-white">
                <p className="font-mono text-[10px] uppercase tracking-[.2em] text-muted-foreground print:text-black">Interested in</p>
                <p className="mt-2 text-sm leading-6">Software engineering internships, full-stack development, backend engineering and practical AI projects.</p>
              </section>
            </aside>
          </div>
          <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-7 py-5 text-xs text-muted-foreground sm:px-10 print:mt-5 print:border-black/20 print:px-0 print:text-black">
            <span>Madhu Tiwari · New Delhi, India</span>
            <span>Portfolio: madhu-tiwari-portfolio.vercel.app</span>
          </footer>
        </article>
        <p className="mt-4 text-center text-xs text-muted-foreground print:hidden">A focused, printable profile. The experimental MADHU.OS portfolio remains unchanged.</p>
      </div>
    </main>
  )
}

function SectionTitle({children}:{children:React.ReactNode}) {
  return <h2 className="border-b border-border pb-2 font-mono text-[10px] font-semibold uppercase tracking-[.24em] text-muted-foreground print:border-black/20 print:text-black">{children}</h2>
}
