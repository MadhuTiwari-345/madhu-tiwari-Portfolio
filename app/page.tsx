import { NavBar } from "@/components/portfolio/nav-bar"
import { Hero } from "@/components/portfolio/hero"
import { AboutBento } from "@/components/portfolio/about-bento"
import { ProjectsSection } from "@/components/portfolio/projects-section"
import { SkillsBento } from "@/components/portfolio/skills-bento"
import { ExperienceTimeline } from "@/components/portfolio/experience-timeline"
import { TerrainSection } from "@/components/portfolio/terrain-section"

export default function Page() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-background text-foreground">
      {/* Ambient background glows */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-20 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 20% 0%, color-mix(in oklch, var(--primary) 15%, transparent) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 90% 80%, color-mix(in oklch, var(--accent) 14%, transparent) 0%, transparent 60%)",
        }}
      />
      <div aria-hidden className="bg-grid pointer-events-none fixed inset-0 -z-20 opacity-30" />

      <NavBar />

      <Hero />

      <div className="relative">
        <AboutBento />
        <ProjectsSection />
        <SkillsBento />
        <ExperienceTimeline />
        <TerrainSection />
      </div>
    </main>
  )
}
