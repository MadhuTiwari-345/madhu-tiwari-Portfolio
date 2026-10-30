"use client"

import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { ScanningButton } from "./scanning-button"
import { LetsTalkButton } from "./lets-talk"
import { ArrowDown, Github, Linkedin, MapPin } from "lucide-react"

const ParticleHero = dynamic(() => import("./particle-hero").then((m) => m.ParticleHero), {
  ssr: false,
})

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden px-0 pt-28 pb-16 sm:pt-32 sm:pb-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, color-mix(in oklch, var(--primary) 18%, transparent) 0%, transparent 70%)",
        }}
      />
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-40" />
      <div aria-hidden className="hero-orbit-scene pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="hero-orbit hero-orbit-one" />
        <div className="hero-orbit hero-orbit-two" />
        <div className="hero-orbit-core" />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <ParticleHero />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:mb-10 sm:text-xs"
        >
          <MapPin className="h-3.5 w-3.5 text-[var(--primary)]" />
          <span>New Delhi, India</span>
          <span className="opacity-40">·</span>
          <span>Open to opportunities</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.08 }}
          className="text-balance font-display text-[clamp(3rem,8vw,5.75rem)] leading-[0.98] font-bold tracking-[-0.055em]"
        >
          <span className="block text-muted-foreground/75">Hi, I’m</span>
          <span
            className="block bg-gradient-to-br bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, var(--foreground) 0%, var(--primary) 55%, var(--accent) 100%)",
            }}
          >
            Madhu Tiwari.
          </span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-7 max-w-3xl text-balance text-xl font-medium leading-snug tracking-tight sm:mt-8 sm:text-2xl md:text-3xl"
        >
          I build thoughtful products across{" "}
          <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text font-semibold text-transparent">
            software and AI.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-5 max-w-2xl text-pretty text-sm leading-7 text-muted-foreground sm:mt-6 sm:text-base sm:leading-8"
        >
          Computer Science student focused on full-stack development, backend systems, and practical AI. I enjoy turning complex ideas into useful, reliable experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.42 }}
          className="mt-9 flex w-full flex-wrap items-center justify-center gap-3 sm:mt-10"
        >
          <LetsTalkButton />
          <ScanningButton
            asLink
            href="#projects"
            variant="outline"
            data-cursor-label="see work"
          >
            Explore my work
          </ScanningButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.58 }}
          className="mt-7 flex items-center justify-center gap-5 text-muted-foreground"
        >
          <a
            href="https://github.com/MadhuTiwari-345"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="rounded-full p-2 transition-colors hover:text-foreground"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/madhu-tiwari-833ab1326/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="rounded-full p-2 transition-colors hover:text-foreground"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-14 flex flex-col items-center text-muted-foreground/60 sm:mt-16"
          aria-hidden
        >
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </motion.div>
      </div>
    </section>
  )
}
