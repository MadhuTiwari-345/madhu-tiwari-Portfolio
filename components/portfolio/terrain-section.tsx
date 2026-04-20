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
      <SectionHeader index="05" label="commit terrain" title="The shape of a year of building." />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        {/* Terrain */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative h-[420px] overflow-hidden rounded-2xl border border-border bg-card lg:col-span-3"
        >
          <div className="absolute top-4 left-4 z-10 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            github.activity · procedural
          </div>
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--primary)]" />
            live render
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
                landscape
              </div>
              <div className="text-lg font-semibold">Every bar is a day I shipped something.</div>
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
          className="relative flex flex-col overflow-hidden rounded-2xl border border-border p-6 lg:col-span-2"
          style={{
            background:
              "linear-gradient(150deg, color-mix(in oklch, var(--primary) 22%, var(--card)) 0%, var(--card) 70%)",
          }}
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            let&apos;s build
          </div>
          <h3 className="mt-3 text-balance text-3xl font-bold tracking-tight">
            Got a problem worth shipping? Let me know.
          </h3>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
            I am open to internships, freelance work on AI or full stack projects, and the kind of
            late night hackathon team that actually reads the rules.
          </p>

          <div className="mt-6 flex flex-col gap-2">
            <a
              href="mailto:mt1499961@gmail.com"
              data-cursor-label="email"
              className="group flex items-center justify-between rounded-xl border border-border bg-[var(--background-elevated)] px-4 py-3 transition-colors hover:border-[var(--primary)]"
            >
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[var(--primary)]" />
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    email
                  </div>
                  <div className="text-sm font-medium">mt1499961@gmail.com</div>
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
                  <div className="text-sm font-medium">MadhuTiwari-345</div>
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
                  <div className="text-sm font-medium">madhu tiwari</div>
                </div>
              </div>
              <span className="font-mono text-xs text-muted-foreground transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </a>
          </div>

          <div className="mt-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <span>new delhi, india</span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--primary)]" />
              available
            </span>
          </div>
        </motion.div>
      </div>

      <footer className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:flex-row">
        <span>© 2026 Madhu Tiwari · built with next.js, r3f, framer motion</span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
          <span>system v 2026.04 · session secure</span>
        </span>
      </footer>
    </section>
  )
}
