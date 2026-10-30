"use client"

import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { ScanningButton } from "./scanning-button"
import { BlurReveal } from "./blur-reveal"
import { LetsTalkButton } from "./lets-talk"
import { Github, Linkedin, MapPin, Sparkles } from "lucide-react"

const ParticleHero = dynamic(() => import("./particle-hero").then((m) => m.ParticleHero), {
  ssr: false,
})

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden px-0 pt-40 pb-14 sm:pt-40 sm:pb-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, color-mix(in oklch, var(--primary) 18%, transparent) 0%, transparent 70%)",
        }}
      />
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-50" />
      <div aria-hidden className="hero-orbit-scene pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="hero-orbit hero-orbit-one" />
        <div className="hero-orbit hero-orbit-two" />
        <div className="hero-orbit-core" />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <ParticleHero />
      </div>

      <motion.div
        aria-hidden
        className="hero-float-chip hero-chip-left hidden xl:flex"
        initial={{ opacity: 0, x: -18, rotateY: 12 }}
        animate={{ opacity: 1, x: 0, rotateY: 7 }}
        transition={{ duration: 0.9, delay: 0.55 }}
      >
        <span className="hero-chip-top"><span className="hero-chip-dot" /> CAPABILITY</span>
        <span className="hero-chip-title">AI / ML</span>
        <span className="hero-chip-sub">Learning systems</span>
        <span className="hero-chip-line"><span /></span>
      </motion.div>
      <motion.div
        aria-hidden
        className="hero-float-chip hero-chip-right hidden xl:flex"
        initial={{ opacity: 0, x: 18, rotateY: -12 }}
        animate={{ opacity: 1, x: 0, rotateY: -7 }}
        transition={{ duration: 0.9, delay: 0.75 }}
      >
        <span className="hero-chip-top"><span className="hero-chip-dot" /> IN PRACTICE</span>
        <span className="hero-chip-title">FULL STACK</span>
        <span className="hero-chip-sub">From idea to ship</span>
        <span className="hero-chip-line"><span /></span>
      </motion.div>

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-5 pt-2 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-7 flex w-fit max-w-[calc(100vw-2rem)] flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 rounded-2xl border border-border/70 bg-background/80 px-4 py-3 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-foreground shadow-lg shadow-black/10 backdrop-blur-xl sm:mb-9 sm:rounded-full sm:text-[11px]"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--primary)]" />
          <MapPin className="h-3 w-3" />
          <span className="whitespace-nowrap">New Delhi, India</span>
          <span aria-hidden className="opacity-50">·</span>
          <span className="whitespace-nowrap">Open to roles</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex max-w-full flex-wrap items-baseline justify-center gap-x-3 text-balance font-display text-[clamp(2.55rem,7vw,4.8rem)] leading-[1.08] font-bold tracking-[-0.045em]"
        >
          <span className="text-muted-foreground/80">I’m</span>
          <span
            className="bg-gradient-to-br bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, var(--foreground) 0%, var(--primary) 55%, var(--accent) 100%)",
            }}
          >
            Madhu Tiwari
          </span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.75, delay: 0.22 }}
          className="mt-7 max-w-2xl text-balance text-xl font-semibold leading-tight tracking-tight sm:mt-8 sm:text-2xl md:text-3xl"
        >
          <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
            <BlurReveal />
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.34 }}
          className="mt-5 max-w-xl px-2 text-pretty text-sm leading-7 text-muted-foreground sm:px-0 sm:text-base sm:leading-8"
        >
          Computer & Data Science student building full-stack products and practical AI systems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.42 }}
          className="mt-7 flex flex-wrap items-center justify-center gap-2 sm:mt-8 sm:gap-3"
        >
          {["AI & ML", "Full Stack", "Backend Engineering"].map((item, index) => (
            <motion.span
              key={item}
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.52 + index * 0.1, duration: 0.4 }}
              whileHover={{ y: -3, scale: 1.04 }}
              className="rounded-full border border-[var(--primary)]/25 bg-[var(--primary)]/[0.06] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-muted-foreground sm:text-[10px]"
            >
              {item}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.52 }}
          className="hero-actions mt-9 flex w-full flex-wrap items-center justify-center gap-2 sm:mt-10 sm:gap-3"
        >
          <LetsTalkButton />
          <ScanningButton
            asLink
            href="#projects"
            variant="outline"
            icon={<Sparkles className="h-4 w-4" />}
            data-cursor-label="see work"
          >
            See the work
          </ScanningButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-5 flex items-center gap-4 text-muted-foreground/80"
        >
          <a href="https://github.com/MadhuTiwari-345" target="_blank" rel="noreferrer" aria-label="GitHub" className="rounded-full p-2 transition-colors hover:text-foreground">
            <Github className="h-4 w-4" />
          </a>
          <a href="https://www.linkedin.com/in/madhu-tiwari-833ab1326/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-full p-2 transition-colors hover:text-foreground">
            <Linkedin className="h-4 w-4" />
          </a>
        </motion.div>
      </div>

      <div aria-hidden className="absolute bottom-6 left-6 hidden font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70 md:block">
        <div>lat 28.6139</div>
        <div>lon 77.2090</div>
      </div>
      <div aria-hidden className="absolute right-6 bottom-6 hidden font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70 md:block">
        <div>sys online</div>
        <div className="flex items-center justify-end gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--primary)]" />
          v 2026.04
        </div>
      </div>
    </section>
  )
}
