"use client"

import { useTheme, type ThemeName } from "./theme-provider"
import { motion } from "framer-motion"

const themes: { id: ThemeName; label: string; swatch: [string, string]; hint: string }[] = [
  { id: "sunset", label: "Sunset", swatch: ["#171020", "#FF5C9A"], hint: "pink, coral and violet" },
  { id: "midnight", label: "Midnight", swatch: ["#080D1B", "#42D9FF"], hint: "cyan, violet and lime" },
  { id: "obsidian", label: "Obsidian", swatch: ["#111113", "#D65B83"], hint: "rose, blush and gold" },
  { id: "matrix", label: "Matrix", swatch: ["#080D0A", "#55F59A"], hint: "neon mint and lime" },
]

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  return (
    <div
      className="glass-pill flex items-center gap-1 rounded-full p-1"
      role="radiogroup"
      aria-label="Choose color theme"
    >
      {themes.map((t) => {
        const active = theme === t.id
        return (
          <button
            key={t.id}
            role="radio"
            aria-checked={active}
            aria-label={`${t.label} theme, ${t.hint}`}
            data-cursor-label={`theme ${t.label}`}
            onClick={() => setTheme(t.id)}
            className="group relative flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-colors"
          >
            {active && (
              <motion.span
                layoutId="theme-pill-active"
                className="absolute inset-0 rounded-full"
                style={{
                  background: "color-mix(in oklch, var(--primary) 18%, transparent)",
                  border: "1px solid color-mix(in oklch, var(--primary) 55%, transparent)",
                }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative flex items-center gap-1.5">
              <span
                aria-hidden
                className="h-3 w-3 rounded-full ring-1 ring-border"
                style={{
                  background: `linear-gradient(135deg, ${t.swatch[0]} 0%, ${t.swatch[1]} 100%)`,
                }}
              />
              <span
                className={`hidden font-mono uppercase tracking-widest sm:inline ${
                  active ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {t.label}
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
