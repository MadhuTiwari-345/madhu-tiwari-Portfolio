"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useMemo, useRef, useEffect, useState } from "react"
import * as THREE from "three"

function getCssVar(name: string, fallback: string) {
  if (typeof window === "undefined") return fallback
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return v || fallback
}

type GitHubEvent = { created_at: string; type: string }

// Use real public GitHub events when available; empty days remain visible as low bars.
function buildContributionGrid(events: GitHubEvent[], weeks = 53, days = 7) {
  const counts = new Map<string, number>()
  for (const event of events) {
    const date = new Date(event.created_at)
    if (Number.isNaN(date.getTime())) continue
    const key = date.toISOString().slice(0, 10)
    counts.set(key, (counts.get(key) ?? 0) + 1)
  }
  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)
  const start = new Date(today)
  start.setUTCDate(today.getUTCDate() - (weeks * days - 1))
  start.setUTCDate(start.getUTCDate() - start.getUTCDay())
  const data: number[][] = []
  let max = 1
  const raw: number[][] = []
  for (let w = 0; w < weeks; w++) {
    const row: number[] = []
    for (let d = 0; d < days; d++) {
      const date = new Date(start)
      date.setUTCDate(start.getUTCDate() + w * 7 + d)
      const value = counts.get(date.toISOString().slice(0, 10)) ?? 0
      row.push(value)
      max = Math.max(max, value)
    }
    raw.push(row)
  }
  for (const row of raw) data.push(row.map((value) => value === 0 ? 0.025 : 0.18 + 0.82 * (value / max)))
  return data
}

/* previous deterministic fallback removed: the terrain now reflects real public events */

function Terrain() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const [primary, setPrimary] = useState("#ff6b5b")
  const [accent, setAccent] = useState("#ffb347")
  const [events, setEvents] = useState<GitHubEvent[]>([])
  const { mouse } = useThree()

  useEffect(() => {
    const update = () => {
      setPrimary(getCssVar("--primary", "#ff6b5b"))
      setAccent(getCssVar("--accent", "#ffb347"))
    }
    update()
    const obs = new MutationObserver(update)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const response = await fetch("https://api.github.com/users/MadhuTiwari-345/events?per_page=100", {
          headers: { Accept: "application/vnd.github+json" },
        })
        if (!response.ok) throw new Error(`GitHub API returned ${response.status}`)
        const result = await response.json()
        if (active && Array.isArray(result)) setEvents(result.filter((event) => event?.created_at && event?.type))
      } catch {
        // Keep the canvas alive if GitHub rate-limits or the network is unavailable.
      }
    }
    void load()
    const interval = window.setInterval(load, 5 * 60 * 1000)
    return () => { active = false; window.clearInterval(interval) }
  }, [])

  const grid = useMemo(() => buildContributionGrid(events), [events])
  const weeks = grid.length
  const days = grid[0].length
  const total = weeks * days

  // keep weeks/days referenced for downstream logic; no per-instance colors needed.
  void primary
  void accent

  useFrame((state) => {
    const mesh = meshRef.current
    if (!mesh) return
    const t = state.clock.getElapsedTime()
    const dummy = new THREE.Object3D()
    const cellW = 0.35
    const cellD = 0.35
    const originX = -(weeks * cellW) / 2
    const originZ = -(days * cellD) / 2

    let idx = 0
    for (let w = 0; w < weeks; w++) {
      for (let d = 0; d < days; d++) {
        const v = grid[w][d]
        const wave = Math.sin(t * 0.8 + w * 0.2 + d * 0.3) * 0.08
        const mouseBoost =
          Math.max(
            0,
            1 -
              Math.hypot(
                w / weeks - (mouse.x * 0.5 + 0.5),
                d / days - (1 - (mouse.y * 0.5 + 0.5)),
              ) *
                4,
          ) * 0.4
        const h = Math.max(0.05, v * 2 + wave + mouseBoost)
        dummy.position.set(originX + w * cellW, h / 2, originZ + d * cellD)
        dummy.scale.set(cellW * 0.85, h, cellD * 0.85)
        dummy.updateMatrix()
        mesh.setMatrixAt(idx, dummy.matrix)
        idx++
      }
    }
    mesh.instanceMatrix.needsUpdate = true
    mesh.rotation.y = Math.sin(t * 0.15) * 0.2
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, total]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={primary}
        emissive={accent}
        emissiveIntensity={0.25}
        roughness={0.35}
        metalness={0.2}
      />
    </instancedMesh>
  )
}

export function CommitTerrain() {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 6, 10], fov: 45 }} dpr={[1, 1.8]}>
        <color attach="background" args={["#00000000"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1.2} />
        <directionalLight position={[-5, 4, -5]} intensity={0.5} color="#ffb347" />
        <Terrain />
      </Canvas>
    </div>
  )
}
