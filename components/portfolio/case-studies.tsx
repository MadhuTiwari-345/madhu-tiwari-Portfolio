"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, ArrowUpRight, BookOpen, Code2, ExternalLink, Layers3, Network } from "lucide-react"
import { projects } from "./projects-data"
import { SectionHeader } from "./about-bento"

type StoryTab = "overview" | "decisions" | "challenges" | "architecture" | "stack"


const engineeringNotes: Record<string, { decisions: string[]; challenges: string[] }> = {
  "PhishBuster": {
    decisions: [
      "Keep the user-facing scan and training simulator in the Next.js experience, with a Node API coordinating threat-intelligence lookups.",
      "Use specialist sources such as VirusTotal and Shodan as signals rather than treating one lookup as a complete verdict.",
      "Keep threat records in MongoDB so scan context can be revisited alongside the learning workflow.",
    ],
    challenges: [
      "External intelligence services can disagree or return incomplete data; a useful result needs to communicate uncertainty instead of presenting every signal as a definitive verdict.",
      "The scan flow depends on third-party response time and availability, so timeouts, partial results and clear loading states are important design concerns.",
    ],
  },
  "Kisan OS": {
    decisions: [
      "Bring weather, crop guidance, market prices and scheme information into one farmer-first interface instead of making users navigate separate services.",
      "Use a Node API layer between the React client and external/data services to keep integration logic out of the UI.",
      "Treat regional-language support as part of the product experience, not a late visual add-on.",
    ],
    challenges: [
      "Different information sources can update on different schedules; the interface needs to make freshness and source context understandable.",
      "Agricultural advice is location- and crop-dependent, so generic results should not be presented as universally applicable guidance.",
    ],
  },
  "FarmChain": {
    decisions: [
      "Represent product movement with smart-contract transactions so participants can inspect a shared traceability record.",
      "Use IPFS for supporting product data while keeping verifiable references connected to the on-chain record.",
      "Expose the flow through a Next.js dashboard and wallet interaction rather than requiring participants to work directly with contract tooling.",
    ],
    challenges: [
      "On-chain writes introduce transaction latency and fees; the experience must distinguish a submitted transaction from a confirmed one.",
      "A ledger can preserve submitted records, but it cannot prove that off-chain information was truthful at the point of entry.",
    ],
  },
  "FemtoGuard": {
    decisions: [
      "Separate the client, FastAPI request layer, speech-to-text step and Gemini risk analysis so each stage has a clear responsibility.",
      "Use the model to help interpret voice and text scam patterns, while keeping the product response focused on practical safety guidance.",
      "Use Cloud Run as the deployment target for the API service.",
    ],
    challenges: [
      "Speech recognition can lose context in noisy audio or with unfamiliar accents; downstream risk analysis must account for imperfect transcripts.",
      "A real-time safety workflow is latency-sensitive, so model and transcription calls need bounded waits and a graceful fallback when a dependency is unavailable.",
    ],
  },
  "Lex AI": {
    decisions: [
      "Use a React and TypeScript client with a Node/Express API boundary, PostgreSQL persistence and Drizzle ORM for structured application data.",
      "Use Clerk for authentication and keep legal research/drafting capabilities behind the authenticated application flow.",
      "Use retrieval-augmented research alongside language models so legal answers can be grounded in retrieved case-law material rather than relying only on model recall.",
    ],
    challenges: [
      "Legal rules vary by jurisdiction; retrieval and generated output need jurisdiction-aware context and clear source traceability.",
      "Contract and matter data is sensitive, so authorization boundaries and careful handling of retrieved context are essential design concerns.",
    ],
  },
  "HirePlane": {
    decisions: [
      "Model the experience around two primary actors—job seekers and employers—rather than treating recruitment as a single generic workflow.",
      "Keep job discovery and employer-side hiring actions connected through one product surface.",
    ],
    challenges: [
      "Candidate and employer workflows have different permissions and information needs; the product must avoid leaking employer-only actions into candidate flows.",
      "Job listings can change while users browse, so stale listings and clear application-state feedback are important edge cases.",
    ],
  },
  "StormCycle": {
    decisions: [
      "Use a React/TypeScript client with a FastAPI service boundary and Firebase-backed application data.",
      "Treat cycle history as a time series and use an LSTM-based prediction component for cycle estimates.",
      "Pair tracking and prediction with an assistant/reporting experience, while positioning outputs as supportive insights rather than diagnosis.",
    ],
    challenges: [
      "Irregular cycles and missing logs make prediction uncertain; the product should communicate estimates as estimates and avoid false precision.",
      "Health-related records require careful access control and privacy handling, and risk-screening language must not be confused with a medical diagnosis.",
    ],
  },
  "MicroClimate": {
    decisions: [
      "Separate the React/Vite visualization layer from the FastAPI service that coordinates weather data and analysis.",
      "Present forecasting and anomaly detection together so users can compare expected conditions with unusual signals.",
      "Use Three.js for the interactive 3D Earth view while keeping data processing outside the rendering layer.",
    ],
    challenges: [
      "Weather feeds can differ in coverage, update cadence and units; normalization is needed before comparing or combining values.",
      "Forecasts and anomaly scores are uncertain outputs, so the interface should preserve timestamps, location context and confidence limits where available.",
    ],
  },
  "RISC-V Instruction Set Explorer": {
    decisions: [
      "Make the workbench offline-first so instruction analysis does not depend on a remote service at runtime.",
      "Use a staged pipeline: parse the instruction data, normalize and cross-reference ISA extensions, then expose relationships in an interactive graph.",
      "Keep a Python CLI alongside the browser experience and validate behavior with the documented 38 browser-run unit tests.",
    ],
    challenges: [
      "Instructions can belong to multiple extensions; overlap detection must avoid duplicating or misclassifying shared instructions.",
      "ISA data needs consistent normalization before cross-referencing, otherwise equivalent names or extension relationships can produce misleading graph results.",
    ],
  },
};


type DebugStory = { issue: string; cause: string; fix: string; verification: string };

const verifiedDebugStories: Record<string, DebugStory[]> = {
  "MicroClimate": [{
    issue: "The deployed Vercel app opened to a blank page.",
    cause: "services/geminiService.ts created the Gemini client immediately from process.env.API_KEY. In the browser deployment, that key was not available at module initialization, so startup threw before the interface could render.",
    fix: "Changed Gemini client creation to be lazy, so the service is initialized only when the feature is invoked instead of crashing the app during startup.",
    verification: "The fix was committed as 8bee0af; the subsequent Vercel deployment reached READY.",
  }],
  "StormCycle": [{
    issue: "The first Vercel deployment failed during npm install.",
    cause: "The dependency tree had a React 19 peer-dependency conflict, and react-is was missing.",
    fix: "Resolved the dependency conflict and added the missing react-is dependency so installation could complete.",
    verification: "The deployment progressed past the install failure. A separate browser startup issue still needed to be fixed.",
  }, {
    issue: "After deployment, the app rendered a blank screen in the browser.",
    cause: "Gemini initialization threw: An API Key must be set when running in a browser. The client was being initialized before a browser-available key was configured.",
    fix: "Prevented Gemini initialization from crashing the app at startup by deferring client creation until the AI feature is used.",
    verification: "The blank-screen startup crash was addressed. The AI feature itself still requires its API key to be configured; frontend deployment alone did not verify the full backend, Firebase and AI workflow.",
  }],
};

function jumpToCaseStudies() {
  document.getElementById("case-studies")?.scrollIntoView({ behavior: "smooth", block: "start" })
}

export function CaseStudyPreview() {
  return (
    <a href="#case-studies" className="group mt-3 flex items-center justify-between gap-3 rounded-xl border border-border bg-background/70 p-3 transition-colors hover:border-[var(--primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]">
      <span className="flex min-w-0 items-center gap-2"><BookOpen className="h-4 w-4 shrink-0 text-[var(--primary)]"/><span className="min-w-0"><span className="block font-mono text-[9px] uppercase tracking-widest text-muted-foreground">case study / preview</span><span className="block text-xs text-foreground">Explore the thinking behind the builds</span></span></span>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--primary)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"/>
    </a>
  )
}

export function CaseStudies() {
  const [activeTitle, setActiveTitle] = useState(projects[0]?.title ?? "")
  const [tab, setTab] = useState<StoryTab>("overview")
  const project = projects.find((item) => item.title === activeTitle) ?? projects[0]
  const nodeNames = Object.fromEntries(project.architecture.nodes.map((node) => [node.id, node.label]))

  return (
    <section id="case-studies" className="relative mx-auto w-full max-w-7xl scroll-mt-24 px-4 py-20 md:px-8">
      <SectionHeader index="03" label="build stories / case studies" title="The thinking behind the things I build." />
      <p className="mb-7 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        Explore each project through its product goal, documented architecture, technology choices and engineering trade-offs. Verified debugging stories are included where your development history records the actual issue, root cause, fix and verification. Projects without a documented incident are clearly marked rather than given invented war stories.
      </p>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]">
        <div className="flex min-w-0 flex-col gap-2">
          {projects.map((item, index) => {
            const active = item.title === project.title
            return (
              <button key={item.title} type="button" onClick={() => { setActiveTitle(item.title); setTab("overview") }} aria-pressed={active} className={`flex min-h-[66px] items-center gap-3 rounded-xl border p-3 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] ${active ? "border-[var(--primary)] bg-[var(--primary)]/10" : "border-border bg-card hover:border-[var(--primary)]/50"}`}>
                <span className="font-mono text-[10px] text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                <span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold">{item.title}</span><span className="mt-1 block truncate text-xs text-muted-foreground">{item.tagline}</span></span>
                <ArrowUpRight className={`h-4 w-4 shrink-0 ${active ? "text-[var(--primary)]" : "text-muted-foreground"}`}/>
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.article key={project.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: .2 }} className="flex min-w-0 flex-col rounded-2xl border border-border bg-card p-5 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-[9px] uppercase tracking-[.22em] text-muted-foreground">project file / {project.year}</span>
              <span className="rounded-lg border border-border bg-background p-2"><BookOpen className="h-4 w-4 text-[var(--primary)]"/></span>
            </div>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">{project.title}</h3>
            <p className="mt-1 text-sm text-[var(--primary)]">{project.tagline}</p>
            <div className="mt-5 grid grid-cols-3 gap-2">
              {[{ label:"Mapped nodes", value:project.architecture.nodes.length },{ label:"Connections", value:project.architecture.edges.length },{ label:"Stack items", value:project.tags.length }].map((stat)=><div key={stat.label} className="rounded-xl border border-border bg-background p-3"><div className="text-xl font-semibold tabular-nums">{stat.value}</div><div className="mt-1 font-mono text-[8px] uppercase tracking-wider text-muted-foreground">{stat.label}</div></div>)}
            </div>
            <div className="mt-5 grid grid-cols-5 rounded-xl border border-border bg-background p-1">
              {(["overview","decisions","challenges","architecture","stack"] as const).map((item)=><button key={item} type="button" onClick={()=>setTab(item)} aria-pressed={tab===item} className={`min-h-9 rounded-lg font-mono text-[9px] uppercase tracking-widest transition-colors ${tab===item ? "bg-[var(--primary)]/15 text-foreground" : "text-muted-foreground hover:text-foreground"}`}>{item}</button>)}
            </div>
            <div className="mt-4 min-h-[190px]">
              {tab === "overview" ? <div className="rounded-xl border border-border bg-background p-4"><div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-muted-foreground"><Layers3 className="h-3.5 w-3.5 text-[var(--primary)]"/> product brief</div><h4 className="mt-3 text-sm font-semibold">What this build is</h4><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p><p className="mt-4 text-xs text-muted-foreground">This summary reflects the project description currently published in the portfolio.</p></div> : null}
              {tab === "decisions" ? <div className="rounded-xl border border-border bg-background p-4"><div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-muted-foreground"><Code2 className="h-3.5 w-3.5 text-[var(--primary)]"/> engineering decisions</div><p className="mt-2 text-xs leading-relaxed text-muted-foreground">Design rationale grounded in the project description, listed stack and mapped architecture.</p><ul className="mt-3 space-y-3">{(engineeringNotes[project.title]?.decisions ?? []).map((item,index)=><li key={index} className="flex gap-3 text-sm leading-relaxed"><span className="font-mono text-[10px] text-[var(--primary)]">D{index+1}</span><span>{item}</span></li>)}</ul></div> : null}
              {tab === "challenges" ? <div className="space-y-4">
                <div className="rounded-xl border border-border bg-background p-4">
                  <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-muted-foreground"><Layers3 className="h-3.5 w-3.5 text-[var(--primary)]"/> verified debugging log</div>
                  {verifiedDebugStories[project.title]?.length ? <div className="mt-3 space-y-4">{verifiedDebugStories[project.title].map((story,index)=><div key={index} className="space-y-2 border-l-2 border-[var(--primary)]/40 pl-3">
                    <div className="font-mono text-[9px] uppercase tracking-widest text-[var(--primary)]">incident {String(index+1).padStart(2,"0")}</div>
                    <p className="text-sm font-semibold">{story.issue}</p>
                    <p className="text-xs leading-relaxed text-muted-foreground"><strong className="text-foreground">Root cause: </strong>{story.cause}</p>
                    <p className="text-xs leading-relaxed text-muted-foreground"><strong className="text-foreground">Fix: </strong>{story.fix}</p>
                    <p className="text-xs leading-relaxed text-muted-foreground"><strong className="text-foreground">Verification: </strong>{story.verification}</p>
                  </div>)}</div> : <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Development context: this project was built alongside B.Tech semester coursework, assignments and university attendance commitments, with additional time shared across open-source contribution programs and hackathon deadlines. These competing commitments shaped the available build time; they are workload constraints, not technical failures.</p>}
                </div>
                <div className="rounded-xl border border-border bg-background p-4">
                  <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">engineering constraints to consider</div>
                  <ul className="mt-3 space-y-3">{(engineeringNotes[project.title]?.challenges ?? []).map((item,index)=><li key={index} className="flex gap-3 text-xs leading-relaxed text-muted-foreground"><span className="font-mono text-[10px] text-[var(--primary)]">C{index+1}</span><span>{item}</span></li>)}</ul>
                </div>
              </div> : null}
              {tab === "architecture" ? <div className="rounded-xl border border-border bg-background p-4"><div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-muted-foreground"><Network className="h-3.5 w-3.5 text-[var(--primary)]"/> mapped system flow</div><ol className="mt-3 space-y-2">{project.architecture.edges.map((edge,index)=><li key={index} className="flex min-w-0 items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs"><span className="font-mono text-[9px] text-[var(--primary)]">{String(index+1).padStart(2,"0")}</span><span className="min-w-0 flex-1 truncate">{nodeNames[edge.from] ?? edge.from}</span><ArrowRight className="h-3 w-3 shrink-0 text-muted-foreground"/><span className="min-w-0 flex-1 truncate text-right">{nodeNames[edge.to] ?? edge.to}</span></li>)}</ol><p className="mt-3 text-[10px] text-muted-foreground">Architecture connections as represented in the portfolio map; not a live runtime trace.</p></div> : null}
              {tab === "stack" ? <div className="rounded-xl border border-border bg-background p-4"><div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-muted-foreground"><Code2 className="h-3.5 w-3.5 text-[var(--primary)]"/> listed technologies</div><div className="mt-3 flex flex-wrap gap-2">{project.tags.map(tag=><span key={tag} className="rounded-full border border-border px-3 py-2 font-mono text-[10px] text-muted-foreground">{tag}</span>)}</div></div> : null}
            </div>
            <div className="mt-auto flex flex-wrap gap-2 pt-5">
              {project.repo ? <a href={project.repo} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-full border border-border px-4 text-xs hover:border-[var(--primary)]">Source code <ArrowUpRight className="h-3.5 w-3.5"/></a> : null}
              {project.live ? <a href={project.live} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[var(--primary)] px-4 text-xs text-[var(--primary-foreground)]">Open live project <ExternalLink className="h-3.5 w-3.5"/></a> : null}
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  )
}
