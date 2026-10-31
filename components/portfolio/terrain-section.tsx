"use client"

import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Phone } from "lucide-react"
import { SectionHeader } from "./about-bento"
import { ScanningButton } from "./scanning-button"

const CommitTerrain = dynamic(() => import("./commit-terrain").then((m) => m.CommitTerrain), {
  ssr: false,
})

export function TerrainSection() {
  return (
    <section id="contact" className="relative mx-auto w-full max-w-7xl px-4 pt-24 pb-16 md:px-8">
      <SectionHeader label="commit terrain" title="The shape of a year of building." />

      <div className="grid min-w-0 grid-cols-1 items-stretch gap-5 lg:grid-cols-12 lg:gap-6">
        {/* Terrain */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative isolate h-[340px] min-w-0 overflow-hidden rounded-2xl border border-border bg-card sm:h-[390px] lg:col-span-7 lg:h-full lg:min-h-[500px]"
        >
          <div className="absolute top-4 left-4 z-10 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            github.activity · cityscape
          </div>
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--primary)]" />
            live github data
          </div>
          <CommitTerrain />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 110%, transparent 40%, var(--card) 80%)",
            }}
          />
          <div className="absolute right-4 bottom-4 left-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                contribution city
              </div>
              <div className="text-lg font-semibold">A city built from my GitHub activity.</div>
            </div>
            <ScanningButton
              asLink
              href="https://github.com/MadhuTiwari-345"
              target="_blank"
              rel="noreferrer"
              variant="outline"
              icon={<Github className="h-3.5 w-3.5" />}
              data-cursor-label="github profile"
            >
              Visit profile
            </ScanningButton>
          </div>
        </motion.div>

        {/* Contact card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border p-5 sm:p-7 lg:col-span-5 lg:p-8"
          style={{
            background:
              "linear-gradient(150deg, color-mix(in oklch, var(--primary) 22%, var(--card)) 0%, var(--card) 70%)",
          }}
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            let&apos;s build
          </div>
          <h3 className="mt-3 max-w-[16ch] text-balance text-2xl font-bold leading-[1.12] tracking-tight sm:text-3xl">
            Got a problem worth shipping? Let me know.
          </h3>
          <p className="mt-3 max-w-prose text-pretty text-sm leading-relaxed text-muted-foreground">
            I am open to internships, freelance work on AI or full stack projects, and the kind of
            late night hackathon team that actually reads the rules.
          </p>

          <div className="mt-6 flex min-w-0 flex-col gap-2.5">
            <a
              href="mailto:mt1499961@gmail.com"
              data-cursor-label="email"
              className="group flex min-w-0 items-center justify-between gap-3 rounded-xl border border-border bg-[var(--background-elevated)] px-3.5 py-3 transition-colors hover:border-[var(--primary)] sm:px-4"
            >
              <div className="flex min-w-0 items-center gap-3">
                <Mail className="h-4 w-4 text-[var(--primary)]" />
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    email
                  </div>
                  <div className="break-all text-sm font-medium">mt1499961@gmail.com</div>
                </div>
              </div>
              <span className="font-mono text-xs text-muted-foreground transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </a>
            <a
              href="tel:+917011547973"
              data-cursor-label="phone"
              className="group flex items-center justify-between rounded-xl border border-border bg-[var(--background-elevated)] px-4 py-3 transition-colors hover:border-[var(--primary)]"
            >
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[var(--primary)]" />
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    phone
                  </div>
                  <div className="text-sm font-medium">+91 70115 47973</div>
                </div>
              </div>
              <span className="font-mono text-xs text-muted-foreground transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </a>
            <a
              href="https://github.com/MadhuTiwari-345"
              target="_blank"
              rel="noreferrer"
              data-cursor-label="github"
              className="group flex items-center justify-between rounded-xl border border-border bg-[var(--background-elevated)] px-4 py-3 transition-colors hover:border-[var(--primary)]"
            >
              <div className="flex items-center gap-3">
                <Github className="h-4 w-4 text-[var(--primary)]" />
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    github
                  </div>
                  <div className="truncate text-sm font-medium">MadhuTiwari-345</div>
                </div>
              </div>
              <span className="font-mono text-xs text-muted-foreground transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </a>
            <a
              href="https://www.linkedin.com/in/madhu-tiwari-833ab1326/"
              target="_blank"
              rel="noreferrer"
              data-cursor-label="linkedin"
              className="group flex items-center justify-between rounded-xl border border-border bg-[var(--background-elevated)] px-4 py-3 transition-colors hover:border-[var(--primary)]"
            >
              <div className="flex items-center gap-3">
                <Linkedin className="h-4 w-4 text-[var(--primary)]" />
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    linkedin
                  </div>
                  <div className="truncate text-sm font-medium">madhu tiwari</div>
                </div>
              </div>
              <span className="font-mono text-xs text-muted-foreground transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-4 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground sm:text-[10px]">
            <span>new delhi, india</span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--primary)]" />
              available
            </span>
          </div>
        </motion.div>
      </div>

      <footer className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-center font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground sm:flex-row sm:text-left sm:text-[10px] sm:tracking-[0.25em]">
        <span>© 2026 Madhu Tiwari · built with next.js, r3f, framer motion</span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
          <span>system v 2026.04 · session secure</span>
        </span>
      </footer>
    </section>
  )
}
