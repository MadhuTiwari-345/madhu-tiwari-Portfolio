"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { Activity, ArrowUpRight, GitCommitHorizontal, GitFork, GitPullRequest, RefreshCw, Star, Clock3, Github, AlertCircle } from "lucide-react"
import { SectionHeader } from "./about-bento"

type GitHubEvent = {
  id: string
  type: string
  created_at: string
  repo?: { name?: string }
  payload?: { action?: string; commits?: { message?: string }[]; ref?: string; pull_request?: { title?: string }; issue?: { title?: string } }
}

type GitHubRepo = {
  id: number
  name: string
  html_url: string
  description: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
}

const username = "MadhuTiwari-345"
const filters = ["All", "PushEvent", "PullRequestEvent", "IssuesEvent", "CreateEvent"] as const

function eventLabel(event: GitHubEvent) {
  switch (event.type) {
    case "PushEvent": return "Pushed code"
    case "PullRequestEvent": return `${event.payload?.action ?? "Updated"} pull request`
    case "IssuesEvent": return `${event.payload?.action ?? "Updated"} issue`
    case "CreateEvent": return "Created branch or repository"
    case "WatchEvent": return "Starred repository"
    case "ForkEvent": return "Forked repository"
    case "IssueCommentEvent": return "Commented on issue"
    case "PullRequestReviewEvent": return "Reviewed pull request"
    default: return event.type.replace(/Event$/, "").replace(/([A-Z])/g, " $1").trim()
  }
}

function eventIcon(type: string) {
  if (type === "PushEvent") return GitCommitHorizontal
  if (type.includes("PullRequest")) return GitPullRequest
  if (type === "ForkEvent") return GitFork
  return Activity
}

function relativeDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "date unavailable"
  return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(Math.round((date.getTime() - Date.now()) / 86400000), "day")
}

export function GitHubActivityPanel() {
  const [events, setEvents] = useState<GitHubEvent[]>([])
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [filter, setFilter] = useState<(typeof filters)[number]>("All")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError("")
    try {
      const [eventResponse, repoResponse] = await Promise.all([
        fetch(`https://api.github.com/users/${username}/events?per_page=100`, { headers: { Accept: "application/vnd.github+json" }, cache: "no-store" }),
        fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=8&type=owner`, { headers: { Accept: "application/vnd.github+json" }, cache: "no-store" }),
      ])
      if (!eventResponse.ok || !repoResponse.ok) throw new Error(eventResponse.status === 403 || repoResponse.status === 403 ? "GitHub's public API rate limit was reached. Try again in a little while." : "GitHub activity could not be loaded right now.")
      const [eventData, repoData] = await Promise.all([eventResponse.json(), repoResponse.json()])
      if (!Array.isArray(eventData) || !Array.isArray(repoData)) throw new Error("GitHub returned an unexpected response.")
      setEvents(eventData.filter((item) => item?.id && item?.type && item?.created_at))
      setRepos(repoData.filter((item) => item?.id && item?.name && item?.html_url))
      setUpdatedAt(new Date())
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to load public GitHub activity.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { void refresh() }, [refresh])

  const filteredEvents = useMemo(() => (filter === "All" ? events : events.filter((event) => event.type === filter)).slice(0, 8), [events, filter])
  const pushCount = events.filter((event) => event.type === "PushEvent").length
  const prCount = events.filter((event) => event.type === "PullRequestEvent").length
  const issueCount = events.filter((event) => event.type === "IssuesEvent").length
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0)

  return (
    <section id="github-activity" className="relative mx-auto w-full max-w-7xl px-4 py-20 md:px-8">
      <SectionHeader index="04" label="source control / live feed" title="A closer look at the public build log." />
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">Recent public GitHub events and recently updated repositories, fetched directly from GitHub. This is an event-feed snapshot—not a replacement for GitHub's official contribution graph.</p>
        <button type="button" onClick={() => void refresh()} disabled={loading} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-border bg-card px-4 text-xs transition-colors hover:border-[var(--primary)] disabled:opacity-50"><RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`}/> Refresh</button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[{label:"Public events",value:events.length,icon:Activity},{label:"Push events",value:pushCount,icon:GitCommitHorizontal},{label:"Pull request events",value:prCount,icon:GitPullRequest},{label:"Stars · recent repos",value:totalStars,icon:Star}].map((item)=><div key={item.label} className="rounded-2xl border border-border bg-card p-4"><div className="flex items-center justify-between gap-2"><item.icon className="h-4 w-4 text-[var(--primary)]"/><span className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground">API snapshot</span></div><div className="mt-3 text-2xl font-semibold tabular-nums">{loading && !events.length ? "—" : item.value}</div><div className="mt-1 text-[10px] text-muted-foreground">{item.label}</div></div>)}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
        <div className="min-w-0 rounded-2xl border border-border bg-card p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2"><div><div className="font-mono text-[9px] uppercase tracking-[.2em] text-muted-foreground">activity stream</div><h3 className="mt-1 text-lg font-semibold">Recent public events</h3></div><a href={`https://github.com/${username}?tab=activity`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-[var(--primary)]">Full activity <ArrowUpRight className="h-3.5 w-3.5"/></a></div>
          <div className="mt-4 flex gap-1.5 overflow-x-auto pb-1">{filters.map((item)=><button key={item} type="button" onClick={()=>setFilter(item)} aria-pressed={filter===item} className={`shrink-0 rounded-full border px-3 py-2 font-mono text-[9px] uppercase tracking-wider ${filter===item ? "border-[var(--primary)] bg-[var(--primary)]/10 text-foreground" : "border-border text-muted-foreground"}`}>{item==="All"?"All":item.replace("Event","")}</button>)}</div>
          {error ? <div role="status" className="mt-4 flex items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 text-xs text-muted-foreground"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500"/>{error}</div> : null}
          <div className="mt-3 divide-y divide-border">
            {filteredEvents.map((event)=>{const Icon=eventIcon(event.type);const detail=event.payload?.commits?.[0]?.message ?? event.payload?.pull_request?.title ?? event.payload?.issue?.title ?? event.payload?.ref;return <div key={event.id} className="flex gap-3 py-3"><span className="mt-0.5 rounded-lg border border-border bg-background p-2"><Icon className="h-3.5 w-3.5 text-[var(--primary)]"/></span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1"><span className="text-xs font-medium">{eventLabel(event)}</span><span className="font-mono text-[9px] text-muted-foreground">{relativeDate(event.created_at)}</span></div><a href={`https://github.com/${event.repo?.name ?? username}`} target="_blank" rel="noreferrer" className="mt-1 inline-block max-w-full truncate text-[11px] text-[var(--primary)] hover:underline">{event.repo?.name ?? username}</a>{detail ? <p className="mt-1 line-clamp-2 text-[10px] leading-relaxed text-muted-foreground">{detail}</p> : null}</div></div>})}
            {!loading && !error && filteredEvents.length===0 ? <p className="py-8 text-center text-xs text-muted-foreground">No events in this category in the currently available feed.</p> : null}
            {loading && !events.length ? <p className="py-8 text-center text-xs text-muted-foreground">Loading public GitHub events…</p> : null}
          </div>
        </div>

        <div className="min-w-0 rounded-2xl border border-border bg-card p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2"><div><div className="font-mono text-[9px] uppercase tracking-[.2em] text-muted-foreground">repository radar</div><h3 className="mt-1 text-lg font-semibold">Recently updated</h3></div><Github className="h-5 w-5 text-[var(--primary)]"/></div>
          <div className="mt-4 grid grid-cols-2 gap-2"><div className="rounded-xl border border-border bg-background p-3"><div className="text-xl font-semibold tabular-nums">{repos.length}</div><div className="text-[9px] text-muted-foreground">Repos in this view</div></div><div className="rounded-xl border border-border bg-background p-3"><div className="text-xl font-semibold tabular-nums">{totalForks}</div><div className="text-[9px] text-muted-foreground">Forks · listed repos</div></div></div>
          <div className="mt-3 space-y-2">
            {repos.map((repo)=> <a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer" className="block rounded-xl border border-border bg-background p-3 transition-colors hover:border-[var(--primary)]"><div className="flex items-start justify-between gap-2"><span className="min-w-0 truncate text-xs font-semibold">{repo.name}</span><ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground"/></div><p className="mt-1 line-clamp-2 min-h-8 text-[10px] leading-relaxed text-muted-foreground">{repo.description || "No repository description provided."}</p><div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[9px] text-muted-foreground"><span className="inline-flex items-center gap-1"><Star className="h-3 w-3"/> {repo.stargazers_count}</span><span className="inline-flex items-center gap-1"><GitFork className="h-3 w-3"/> {repo.forks_count}</span>{repo.language ? <span>{repo.language}</span> : null}<span className="inline-flex items-center gap-1"><Clock3 className="h-3 w-3"/> {relativeDate(repo.updated_at)}</span></div></a>)}
            {!loading && !error && repos.length===0 ? <p className="py-8 text-center text-xs text-muted-foreground">No public repositories were returned.</p> : null}
          </div>
          <p className="mt-3 text-[9px] leading-relaxed text-muted-foreground">Repository totals above cover only the eight repositories shown, not your entire GitHub account. Public API availability and rate limits apply.</p>
        </div>
      </div>
      {updatedAt ? <p className="mt-3 text-right font-mono text-[9px] text-muted-foreground">Last fetched {updatedAt.toLocaleTimeString()}</p> : null}
    </section>
  )
}
