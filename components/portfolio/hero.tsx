"use client"

import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { ScanningButton } from "./scanning-button"
import { LetsTalkButton } from "./lets-talk"
import { ArrowDown, Github, Linkedin, MapPin, Sparkles } from "lucide-react"

const ParticleHero = dynamic(() => import("./particle-hero").then((m) => m.ParticleHero), {
  ssr: false,
})

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden pt-24 pb-12"
    >
      {/* gradient backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, color-mix(in oklch, var(--primary) 18%, transparent) 0%, transparent 70%)",
        }}
      />
      {/* grid */}
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-60" />

      {/* particle canvas */}
      <div aria-hidden className="pointer-events-auto absolute inset-0 -z-10">
        <ParticleHero />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-pill mb-6 flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em]"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--primary)]" />
          <MapPin className="h-3 w-3" />
          <span>New Delhi, India</span>
          <span className="opacity-40">/</span>
          <span>Open to roles</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-balance font-display text-5xl leading-[0.95] font-bold tracking-tight sm:text-7xl md:text-8xl"
        >
          <span className="block text-muted-foreground/70">I am</span>
          <span
            className="block bg-gradient-to-br bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, var(--foreground) 0%, var(--primary) 55%, var(--accent) 100%)",
            }}
          >
            Madhu Tiwari
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Computer Science student at MUIT Noida building at the edge of{" "}
          <span className="font-medium text-foreground">AI, full stack, and systems that scale</span>.
          I like turning fuzzy ideas into shipped products, usually with Next.js, Spring Boot, and a
          stubborn amount of coffee.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
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
          <ScanningButton
            asLink
            href="https://github.com/MadhuTiwari-345"
            target="_blank"
            rel="noreferrer"
            variant="ghost"
            icon={<Github className="h-4 w-4" />}
            data-cursor-label="github"
          >
            GitHub
          </ScanningButton>
          <ScanningButton
            asLink
            href="https://www.linkedin.com/in/madhu-tiwari-833ab1326/"
            target="_blank"
            rel="noreferrer"
            variant="ghost"
            icon={<Linkedin className="h-4 w-4" />}
            data-cursor-label="linkedin"
          >
            LinkedIn
          </ScanningButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-16 flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
        >
          <span>Scroll to enter the system</span>
          <ArrowDown className="h-3 w-3 animate-bounce" />
        </motion.div>
      </div>

      {/* corner HUD */}
      <div
        aria-hidden
        className="absolute bottom-6 left-6 hidden font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:block"
      >
        <div>lat 28.6139</div>
        <div>lon 77.2090</div>
      </div>
      <div
        aria-hidden
        className="absolute right-6 bottom-6 hidden font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:block"
      >
        <div>sys online</div>
        <div className="flex items-center justify-end gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--primary)]" />
          v 2026.04
        </div>
      </div>
    </section>
  )
}
