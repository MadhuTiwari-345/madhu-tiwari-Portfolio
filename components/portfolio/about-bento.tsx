"use client"

import { motion } from "framer-motion"
import { BookOpen, Code2, Coffee, Cpu, Sparkles, Trophy } from "lucide-react"

const stats = [
  { icon: Code2, label: "Projects shipped", value: "12+" },
  { icon: Trophy, label: "Hackathon finalist", value: "EliteHack 1.0" },
  { icon: BookOpen, label: "Coursework", value: "AI · DSA · DB" },
  { icon: Cpu, label: "Focus", value: "AI + Systems" },
]

export function AboutBento() {
  return (
    <section id="about" className="relative mx-auto w-full max-w-7xl px-4 py-24 md:px-8">
      <SectionHeader index="01" label="the architect" title="A CS student who ships." />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:grid-rows-2">
        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 md:col-span-4 md:row-span-2"
        >
          <div
            aria-hidden
            className="absolute -top-20 -right-20 h-60 w-60 rounded-full opacity-30 blur-3xl"
            style={{ background: "var(--primary)" }}
          />
          <div className="relative">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              about.txt
            </div>
            <h3 className="mt-3 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
              I am a <span className="text-[var(--primary)]">full stack</span> builder who is slowly
              falling in love with applied AI.
            </h3>
            <div className="mt-4 space-y-3 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
              <p>
                I study Computer &amp; Data Science (AI &amp; ML) at Maharishi University of
                Information Technology, Noida. Current SGPA 7.82, which I keep nudging up between
                open source pull requests and hackathon nights.
              </p>
              <p>
                I love the unglamorous part of software: sketching system diagrams, arguing about
                database indexes, and making an API feel obvious. On the weekends I contribute to
                open source through{" "}
                <span className="font-medium text-foreground">GSSoC</span>,{" "}
                <span className="font-medium text-foreground">SWOC</span>, and{" "}
                <span className="font-medium text-foreground">ECWOC</span>, and play way too much
                basketball.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.08 }}
                  className="rounded-xl border border-border bg-[var(--background-elevated)] p-3"
                >
                  <s.icon className="h-4 w-4 text-[var(--primary)]" />
                  <div className="mt-2 text-sm font-semibold">{s.value}</div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Now playing */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 md:col-span-2"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            currently
          </div>
          <div className="mt-3 flex items-start gap-3">
            <div
              className="mt-1 h-2 w-2 animate-pulse rounded-full"
              style={{ background: "var(--primary)" }}
            />
            <div>
              <div className="text-sm font-semibold">Contributing to SWOC 2026 &amp; ECWOC</div>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Reviewing PRs, improving docs, and shipping small but meaningful features to
                community driven repos.
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-start gap-3">
            <Sparkles className="mt-0.5 h-4 w-4 text-[var(--accent)]" />
            <div>
              <div className="text-sm font-semibold">Studying agents &amp; retrieval</div>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Finished the Google × Kaggle AI Agent Intensive. Now building small agents that are
                actually useful, not just demos.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Coffee card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border p-5 md:col-span-2"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in oklch, var(--primary) 18%, var(--card)) 0%, var(--card) 100%)",
          }}
        >
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <Coffee className="h-3 w-3" /> fuel.log
          </div>
          <div>
            <div className="text-3xl font-bold">
              <span className="text-[var(--primary)]">247</span>
              <span className="text-sm text-muted-foreground"> cups</span>
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              Since I started treating coffee as a build dependency.
            </div>
          </div>
          <div className="mt-3 flex gap-1">
            {Array.from({ length: 14 }).map((_, i) => (
              <div
                key={i}
                className="h-6 flex-1 rounded-sm"
                style={{
                  background:
                    i < 11
                      ? "color-mix(in oklch, var(--primary) 70%, transparent)"
                      : "color-mix(in oklch, var(--primary) 18%, transparent)",
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function SectionHeader({
  index,
  label,
  title,
}: {
  index: string
  label: string
  title: string
}) {
  return (
    <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <span className="rounded-full border border-border px-2 py-0.5">{index}</span>
          <span>/ {label}</span>
        </div>
        <h2 className="mt-3 text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </div>
      <div
        aria-hidden
        className="hidden h-px flex-1 sm:ml-8 sm:block"
        style={{ background: "color-mix(in oklch, var(--primary) 40%, transparent)" }}
      />
    </div>
  )
}
