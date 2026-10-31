"use client"

import { useEffect, useState, type MouseEvent } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { LetsTalkButton } from "./lets-talk"
import Link from "next/link"
import { BriefcaseBusiness, X } from "lucide-react"

const profileImage = "https://avatars.githubusercontent.com/u/194702672?v=4"
const links = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Work" },
  { href: "#engineering", label: "Build" },
  { href: "#skills", label: "Stack" },
  { href: "#experience", label: "Journey" },
  { href: "#console", label: "Console" },
  { href: "#contact", label: "Contact" },
]

export function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [logoExpanded, setLogoExpanded] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((section): section is HTMLElement => Boolean(section))
      .sort((a, b) => a.offsetTop - b.offsetTop)

    const updateActiveSection = () => {
      const headerHeight = document.querySelector("header")?.getBoundingClientRect().height ?? 72
      const readingLine = headerHeight + 44
      let current = ""
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= readingLine) current = section.id
      }
      setActiveSection(current)
    }

    updateActiveSection()
    window.addEventListener("scroll", updateActiveSection, { passive: true })
    window.addEventListener("resize", updateActiveSection)
    return () => {
      window.removeEventListener("scroll", updateActiveSection)
      window.removeEventListener("resize", updateActiveSection)
    }
  }, [])

  const navigateToSection = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault()
    const target = document.getElementById(href.slice(1))
    if (!target) return
    const headerHeight = document.querySelector("header")?.getBoundingClientRect().height ?? 72
    const anchor = href === "#top" ? target : (target.firstElementChild as HTMLElement | null) ?? target
    const top = anchor.getBoundingClientRect().top + window.scrollY - headerHeight - 18
    setActiveSection(target.id)
    window.history.pushState(null, "", href)
    window.scrollTo({
      top: Math.max(0, top),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    })
  }

  useEffect(() => {
    if (!logoExpanded) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLogoExpanded(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [logoExpanded])

  return (
    <>
      <motion.div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)]" style={{ scaleX: progress }} />
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 lg:px-8">
        <div className={`mx-auto max-w-[1440px] rounded-2xl border border-border/80 bg-[color-mix(in_oklch,var(--background)_92%,white)] shadow-[0_8px_30px_-22px_rgba(24,36,68,.28)] backdrop-blur-xl transition-all duration-300 ${scrolled ? "px-3 py-2 sm:px-5" : "px-3 py-3 sm:px-5"}`}>
          <div className="flex min-h-10 items-center justify-between gap-3">
            <div className="flex shrink-0 items-center gap-2.5">
              <button type="button" onClick={() => setLogoExpanded(true)} className="h-8 w-8 shrink-0 overflow-hidden rounded-full border border-border bg-card shadow-sm transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]" aria-label="Expand profile picture">
                <img src={profileImage} alt="Madhu Tiwari" className="h-full w-full object-cover object-center" />
              </button>
              <a href="#top" onClick={(event) => navigateToSection(event, "#top")} className="whitespace-nowrap px-1 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground">madhu.tiwari</a>
            </div>

            <nav aria-label="Main navigation" className="hidden min-w-0 items-center justify-center gap-1 lg:flex">
              {links.map((link) => (
                <a key={link.href} href={link.href} onClick={(event) => navigateToSection(event, link.href)} aria-current={activeSection === link.href.slice(1) ? "location" : undefined} className={"whitespace-nowrap rounded-full px-2.5 py-2 font-mono text-[9px] font-medium uppercase tracking-[0.09em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] " + (activeSection === link.href.slice(1) ? "bg-[var(--primary)]/10 text-[var(--primary)]" : "text-muted-foreground hover:bg-black/[0.035] hover:text-foreground")}>
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <Link href="/recruiter" className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 font-mono text-[9px] uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:border-[var(--primary)] hover:text-foreground" aria-label="Open recruiter view">
                <BriefcaseBusiness className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Recruiter view</span>
              </Link>
              <div className="hidden sm:block"><LetsTalkButton compact align="right" /></div>
            </div>
          </div>

          <nav aria-label="Mobile navigation" className="mt-2 flex items-center gap-1 overflow-x-auto border-t border-border/70 pt-2 lg:hidden">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={(event) => navigateToSection(event, link.href)} aria-current={activeSection === link.href.slice(1) ? "location" : undefined} className={"shrink-0 rounded-full px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.1em] transition-colors " + (activeSection === link.href.slice(1) ? "bg-[var(--primary)]/10 text-[var(--primary)]" : "text-muted-foreground hover:text-foreground")}>
                {link.label}
              </a>
            ))}
            <div className="ml-auto shrink-0 sm:hidden"><LetsTalkButton compact align="right" /></div>
          </nav>
        </div>
      </header>

      {logoExpanded && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-6 backdrop-blur-md" role="dialog" aria-modal="true" aria-label="Expanded profile picture" onClick={() => setLogoExpanded(false)}>
          <button type="button" onClick={() => setLogoExpanded(false)} className="absolute right-5 top-5 rounded-full border border-white/30 bg-black/40 p-2 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" aria-label="Close expanded profile picture">
            <X className="h-5 w-5" />
          </button>
          <img src={profileImage} alt="Madhu Tiwari" className="max-h-[min(82vh,720px)] max-w-[min(88vw,720px)] rounded-2xl border border-white/20 object-contain shadow-2xl" onClick={(event) => event.stopPropagation()} />
        </div>
      )}
    </>
  )
}
