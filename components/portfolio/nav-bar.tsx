"use client"

import { useEffect, useState } from "react"
import { ThemeSwitcher } from "./theme-switcher"
import { Mail, Phone } from "lucide-react"

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
          <a
            href="mailto:mt1499961@gmail.com"
            data-cursor-label="email"
            aria-label="Email Madhu at mt1499961@gmail.com"
            className="glass-pill flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-colors hover:text-[var(--primary)]"
          >
            <Mail className="h-3.5 w-3.5 text-[var(--primary)]" />
            <span className="hidden md:inline">mt1499961@gmail.com</span>
            <span className="md:hidden">Email</span>
          </a>
          <a
            href="tel:+917011547973"
            data-cursor-label="call"
            aria-label="Call Madhu at +91 7011547973"
            className="glass-pill hidden items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-colors hover:text-[var(--primary)] sm:flex"
          >
            <Phone className="h-3.5 w-3.5 text-[var(--primary)]" />
            <span className="hidden md:inline">+91 70115 47973</span>
            <span className="md:hidden">Call</span>
          </a>
        </div>
      </div>
    </header>
  )
}
