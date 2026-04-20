"use client"

import { useEffect, useState } from "react"
import { ThemeSwitcher } from "./theme-switcher"
import { LetsTalkButton } from "./lets-talk"

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Work" },
  { href: "#skills", label: "Stack" },
  { href: "#experience", label: "Journey" },
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
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-all duration-300 md:px-8 ${
          scrolled ? "" : ""
        }`}
      >
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

        <nav className="glass-pill hidden items-center gap-1 rounded-full px-2 py-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-cursor-label={l.label.toLowerCase()}
              className="rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <LetsTalkButton compact align="right" />
        </div>
      </div>
    </header>
  )
}
