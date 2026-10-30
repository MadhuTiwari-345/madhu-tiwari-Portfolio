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
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className={`mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 transition-all duration-300 md:px-8 ${scrolled ? "" : ""}`}>
        <div className="flex min-w-0 items-center justify-between gap-3">
        <a
          href="#top"
          className="glass-pill flex items-center gap-2 rounded-full px-3 py-1.5"
          data-cursor-label="home"
        >
          <span
            className="relative flex h-6 w-6 items-center justify-center rounded-full"
            style={{
              background: "linear-gradient(135deg, var(--primary), var(--accent))",
            }}
            aria-hidden
          >
            <span className="font-mono text-[10px] font-bold text-[var(--primary-foreground)]">
              MT
            </span>
          </span>
          <span className="hidden font-mono text-xs uppercase tracking-widest sm:inline">
            madhu.tiwari
          </span>
        </a>

        <nav className="glass-pill hidden min-w-0 items-center gap-0.5 self-center overflow-x-auto rounded-full px-1.5 py-1 md:flex md:max-w-full 2xl:ml-4 2xl:mr-auto 2xl:self-auto">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-cursor-label={l.label.toLowerCase()}
              className="shrink-0 rounded-full px-2.5 py-1.5 text-[10px] font-medium text-muted-foreground uppercase tracking-wider transition-colors hover:text-foreground 2xl:px-3 2xl:text-xs"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/recruiter" className="inline-flex items-center gap-1.5 rounded-full border border-border px-2 py-2 font-mono text-[9px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-[var(--primary)] hover:text-foreground sm:px-3 sm:text-[10px]" aria-label="Open recruiter view"><BriefcaseBusiness className="h-3.5 w-3.5" /><span className="hidden sm:inline">Recruiter view</span></Link>
          <ThemeSwitcher />
          <LetsTalkButton compact align="right" />
        </div>
      </div>
    </header>
  )
}
