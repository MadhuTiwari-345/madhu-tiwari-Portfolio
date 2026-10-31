"use client"

import { useEffect, useState } from "react"
import { ThemeSwitcher } from "./theme-switcher"
import { LetsTalkButton } from "./lets-talk"
import Link from "next/link"
import { BriefcaseBusiness, X } from "lucide-react"

const profileImage = "https://avatars.githubusercontent.com/u/194702672?v=4"

const links = [
  { href: "#console", label: "Console" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Work" },
  { href: "#engineering", label: "Engineering" },
  { href: "#skills", label: "Stack" },
  { href: "#experience", label: "Journey" },
  { href: "#github-activity", label: "GitHub" },
  { href: "#contact", label: "Contact" },
]

export function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [logoExpanded, setLogoExpanded] = useState(false)
  const [activeSection, setActiveSection] = useState("top")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const sectionIds = links.map((link) => link.href.slice(1))
    const sections = sectionIds.map((id) => document.getElementById(id)).filter((section): section is HTMLElement => Boolean(section))
    if (!sections.length) return
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: "-18% 0px -68% 0px", threshold: [0, 0.15, 0.35, 0.6] })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

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
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-3"}`}>
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="glass-panel rounded-2xl border border-border/70 bg-background/85 px-3 py-3 shadow-lg shadow-black/5 backdrop-blur-xl sm:px-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex shrink-0 items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setLogoExpanded(true)}
                  className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-[var(--primary)]/50 bg-background shadow-md shadow-[var(--primary)]/20 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                  aria-label="Expand profile picture"
                  data-cursor-label="view photo"
                >
                  <img src={profileImage} alt="Madhu Tiwari" className="h-full w-full object-cover object-center" />
                </button>
                <a href="#top" className="rounded-full px-1 py-1 font-mono text-xs font-semibold uppercase tracking-[0.16em] sm:inline" data-cursor-label="home">
                  madhu.tiwari
                </a>
              </div>

              <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                <Link href="/recruiter" className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:border-[var(--primary)] hover:text-foreground sm:text-[10px]" aria-label="Open recruiter view">
                  <BriefcaseBusiness className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Recruiter view</span>
                </Link>
                <div className="hidden sm:block"><LetsTalkButton compact align="right" /></div>
              </div>
            </div>

            <div className="mt-3 flex flex-col gap-2 border-t border-border/60 pt-3 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
              <nav aria-label="Main navigation" className="flex min-w-0 items-center gap-1 overflow-x-auto pb-1 lg:pb-0">
                {links.map((link) => (
                  <a key={link.href} href={link.href} aria-current={activeSection === link.href.slice(1) ? "location" : undefined} data-cursor-label={link.label.toLowerCase()} className={`shrink-0 rounded-full px-3 py-2 font-mono text-[9px] font-medium uppercase tracking-[0.12em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] sm:text-[10px] ${activeSection === link.href.slice(1) ? "bg-[color-mix(in_oklch,var(--primary)_16%,transparent)] text-foreground shadow-[inset_0_0_0_1px_color-mix(in_oklch,var(--primary)_28%,transparent)]" : "text-muted-foreground hover:bg-[color-mix(in_oklch,var(--primary)_12%,transparent)] hover:text-foreground"}`}`>
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="flex items-center justify-between gap-3 sm:justify-end">
                <div className="sm:hidden"><LetsTalkButton compact align="left" /></div>
                <ThemeSwitcher />
              </div>
            </div>
          </div>
        </div>
      </header>

      {logoExpanded && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-6 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded profile picture"
          onClick={() => setLogoExpanded(false)}
        >
          <button
            type="button"
            onClick={() => setLogoExpanded(false)}
            className="absolute right-5 top-5 rounded-full border border-white/30 bg-black/40 p-2 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Close expanded profile picture"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={profileImage}
            alt="Madhu Tiwari"
            className="max-h-[min(82vh,720px)] max-w-[min(88vw,720px)] rounded-2xl border border-white/20 object-contain shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}
