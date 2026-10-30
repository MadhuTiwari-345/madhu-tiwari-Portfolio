import type { Metadata } from "next"
import { Space_Grotesk, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/portfolio/theme-provider"
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

const previewImage =
  "https://raw.githubusercontent.com/MadhuTiwari-345/MadhuTiwari-345/main/girl-coder.png"

export const metadata: Metadata = {
  metadataBase: new URL("https://madhu-tiwari-portfolio.vercel.app"),
  alternates: { canonical: "/" },
  title: "Madhu Tiwari | Full Stack & AI Developer",
  description:
    "Madhu Tiwari is a Computer Science student in New Delhi, India, building full-stack products, backend systems, and practical AI applications.",
  keywords: [
    "Madhu Tiwari",
    "Madhu Tiwari portfolio",
    "Full Stack Developer",
    "AI and ML Developer",
    "Backend Engineer",
    "Computer Science Student",
    "New Delhi",
    "Next.js",
    "React",
    "Spring Boot",
  ],
  authors: [{ name: "Madhu Tiwari", url: "https://github.com/MadhuTiwari-345" }],
  creator: "Madhu Tiwari",
  openGraph: {
    title: "Madhu Tiwari | Full Stack & AI Developer",
    description:
      "Explore Madhu Tiwari’s work across full-stack development, backend engineering, and practical AI.",
    url: "https://madhu-tiwari-portfolio.vercel.app",
    siteName: "Madhu Tiwari",
    type: "website",
    images: [
      {
        url: previewImage,
        width: 1200,
        height: 630,
        alt: "Madhu Tiwari, Computer Science student and developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Madhu Tiwari | Full Stack & AI Developer",
    description:
      "Full-stack development, backend engineering, and practical AI by Madhu Tiwari.",
    images: [previewImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
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
        <ThemeProvider>{children}</ThemeProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
