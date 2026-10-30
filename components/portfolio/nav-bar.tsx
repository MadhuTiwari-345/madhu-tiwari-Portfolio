"use client"

import { useEffect, useState } from "react"
import { ThemeSwitcher } from "./theme-switcher"
import { LetsTalkButton } from "./lets-talk"
import Link from "next/link"
import { BriefcaseBusiness } from "lucide-react"

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-3"}`}>
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-2xl border border-border/70 bg-background/85 px-3 py-3 shadow-lg shadow-black/5 backdrop-blur-xl sm:px-4">
          <div className="flex items-center justify-between gap-3">
            <a href="#top" className="flex shrink-0 items-center gap-2.5 rounded-full px-1 py-1" data-cursor-label="home">
              <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-[var(--primary)]/50 bg-background shadow-md shadow-[var(--primary)]/20">
                <img src="https://raw.githubusercontent.com/MadhuTiwari-345/MadhuTiwari-345/main/girl-coder.png" alt="" aria-hidden="true" className="h-full w-full object-cover object-center" />
              </span>
              <span className="hidden font-mono text-xs font-semibold uppercase tracking-[0.16em] sm:inline">madhu.tiwari</span>
            </a>

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
                <a key={link.href} href={link.href} data-cursor-label={link.label.toLowerCase()} className="shrink-0 rounded-full px-3 py-2 font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:bg-[color-mix(in_oklch,var(--primary)_12%,transparent)] hover:text-foreground sm:text-[10px]">
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
  )
}
