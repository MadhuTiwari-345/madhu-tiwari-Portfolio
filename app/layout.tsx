import type { Metadata } from "next"
import { Space_Grotesk, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/portfolio/theme-provider"
import { MagneticCursor } from "@/components/portfolio/magnetic-cursor"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Madhu Tiwari — Full Stack & AI Developer",
  description:
    "Computer Science student building AI systems, decentralized apps, and full stack products. Based in New Delhi, India.",
  generator: "v0.app",
  keywords: [
    "Madhu Tiwari",
    "Full Stack Developer",
    "AI Developer",
    "Portfolio",
    "Next.js",
    "React",
    "Spring Boot",
  ],
  authors: [{ name: "Madhu Tiwari", url: "https://github.com/MadhuTiwari-345" }],
  openGraph: {
    title: "Madhu Tiwari — Full Stack & AI Developer",
    description: "Immersive portfolio of a CS student building at the edge of AI and full stack.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      data-theme="sunset"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-background text-foreground">
        <ThemeProvider>
          <MagneticCursor />
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
