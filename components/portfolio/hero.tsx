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
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden px-0 pt-24 pb-12 sm:pt-28 sm:pb-16"
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

      {/* Theme-reactive 3D atmosphere */}
      <div aria-hidden className="hero-orbit-scene pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="hero-orbit hero-orbit-one" />
        <div className="hero-orbit hero-orbit-two" />
        <div className="hero-orbit-core" />
      </div>
      {/* Interactive particle canvas */}
      <div aria-hidden className="pointer-events-auto absolute inset-0 -z-10">
        <ParticleHero />
      </div>

      {/* Floating skill cards, restored and positioned outside the centered headline */}
      <motion.div
        aria-hidden
        className="hero-float-chip hero-chip-left hidden 2xl:flex"
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
        className="hero-float-chip hero-chip-right hidden 2xl:flex"
        initial={{ opacity: 0, x: 18, rotateY: -12 }}
        animate={{ opacity: 1, x: 0, rotateY: -7 }}
        transition={{ duration: 0.9, delay: 0.75 }}
      >
        <span className="hero-chip-top"><span className="hero-chip-dot" /> IN PRACTICE</span>
        <span className="hero-chip-title">FULL STACK</span>
        <span className="hero-chip-sub">From idea to ship</span>
        <span className="hero-chip-line"><span /></span>
      </motion.div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-pill mb-6 flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full px-3 py-2 font-mono text-[9px] uppercase tracking-[0.16em] sm:gap-2 sm:px-4 sm:py-1.5 sm:text-[10px] sm:tracking-[0.3em]"
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
          className="text-balance font-display text-[clamp(2.55rem,10vw,3.5rem)] leading-[0.98] font-bold tracking-tight sm:text-7xl md:text-8xl"
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

        <motion.h2
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.75, delay: 0.22 }}
          className="mt-5 max-w-3xl text-balance text-2xl font-semibold leading-tight tracking-tight sm:text-3xl md:text-4xl"
        >
          I turn ideas into{" "}
          <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
            things that actually work.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.34 }}
          className="mt-3 max-w-2xl px-2 text-pretty text-sm leading-7 text-muted-foreground sm:px-0 sm:text-base sm:leading-relaxed"
        >
          I’m Madhu, a Computer Science student who enjoys building products, experimenting with AI,
          and figuring out how things work under the hood. From backend systems to interactive web
          experiences, I like taking an idea from the first line of code to something people can
          actually use.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.42 }}
          className="mb-1 mt-5 flex flex-wrap items-center justify-center gap-2"
        >
          {["AI & ML", "Full Stack", "Backend Engineering"].map((item, index) => (
            <motion.span
              key={item}
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.52 + index * 0.1, duration: 0.4 }}
              whileHover={{ y: -3, scale: 1.04 }}
              className="rounded-full border border-[var(--primary)]/25 bg-[var(--primary)]/[0.06] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground shadow-[0_0_24px_color-mix(in_oklch,var(--primary)_8%,transparent)] sm:text-[10px]"
            >
              {item}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.34 }}
          className="mb-1 mt-5 flex flex-wrap items-center justify-center gap-2"
        >
          {[
            "Ideas into working products",
            "Backend to interface",
            "AI with a real purpose",
          ].map((item, index) => (
            <motion.span
              key={item}
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.48 + index * 0.1, duration: 0.4 }}
              whileHover={{ y: -3, scale: 1.04 }}
              className="rounded-full border border-[var(--primary)]/25 bg-[var(--primary)]/[0.06] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground shadow-[0_0_24px_color-mix(in_oklch,var(--primary)_8%,transparent)] sm:text-[10px]"
            >
              {item}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hero-actions mt-7 flex w-full flex-wrap items-center justify-center gap-2 sm:mt-8 sm:gap-3"
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
          className="mt-10 flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:mt-16"
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
