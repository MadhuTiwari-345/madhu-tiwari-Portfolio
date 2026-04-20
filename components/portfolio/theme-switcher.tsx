"use client"

import { useTheme, type ThemeName } from "./theme-provider"
import { motion } from "framer-motion"

const themes: { id: ThemeName; label: string; swatch: [string, string]; hint: string }[] = [
  { id: "sunset", label: "Sunset", swatch: ["#ff6b5b", "#ffb347"], hint: "warm + coral" },
  { id: "cyberpunk", label: "Cyber", swatch: ["#ff3ea5", "#3ee0ff"], hint: "neon magenta" },
  { id: "cute", label: "Cute", swatch: ["#ff85a2", "#c8a8ff"], hint: "pink + lavender" },
  { id: "ocean", label: "Ocean", swatch: ["#ff7a59", "#5ec9d6"], hint: "coral + teal" },
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
