"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export type ThemeName = "sunset" | "cyberpunk" | "cute" | "ocean"

type ThemeContextValue = {
  theme: ThemeName
  setTheme: (t: ThemeName) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>("sunset")

  useEffect(() => {
    const stored = (typeof window !== "undefined" ? window.localStorage.getItem("portfolio-theme") : null) as
      | ThemeName
      | null
    if (stored && ["sunset", "cyberpunk", "cute", "ocean"].includes(stored)) {
      setThemeState(stored)
      document.documentElement.setAttribute("data-theme", stored)
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
