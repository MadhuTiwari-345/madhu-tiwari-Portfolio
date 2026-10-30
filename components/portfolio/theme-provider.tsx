"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export type ThemeName = "sunset" | "midnight" | "obsidian" | "matrix"

type ThemeContextValue = {
  theme: ThemeName
  setTheme: (t: ThemeName) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const themes: ThemeName[] = ["sunset", "midnight", "obsidian", "matrix"]
const legacyThemes: Record<string, ThemeName> = {
  cyberpunk: "midnight",
  cute: "obsidian",
  ocean: "matrix",
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>("sunset")

  useEffect(() => {
    const stored = window.localStorage.getItem("portfolio-theme")
    const nextTheme = stored && themes.includes(stored as ThemeName)
      ? (stored as ThemeName)
      : stored ? legacyThemes[stored] : undefined

    if (nextTheme) {
      setThemeState(nextTheme)
      document.documentElement.setAttribute("data-theme", nextTheme)
      window.localStorage.setItem("portfolio-theme", nextTheme)
    } else {
      document.documentElement.setAttribute("data-theme", "sunset")
    }
  }, [])

  const setTheme = (t: ThemeName) => {
    setThemeState(t)
    document.documentElement.setAttribute("data-theme", t)
    try {
      window.localStorage.setItem("portfolio-theme", t)
    } catch {}
  }

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}
