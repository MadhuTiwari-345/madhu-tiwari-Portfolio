"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useMemo, useRef, useEffect, useState } from "react"
import * as THREE from "three"

type GitHubEvent = { created_at: string; type: string }

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
  const raw: number[][] = []
  let max = 1
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
  return raw.map(row => row.map(value => value === 0 ? 0 : 0.18 + 0.82 * value / max))
}

function GitHubCity({ grid }: { grid: number[][] }) {
  const group = useRef<THREE.Group>(null)
  const { rows, cols, buildings } = useMemo(() => {
    const rows = grid[0]?.length ?? 7
    const cols = grid.length
    const buildings: { x: number; z: number; h: number; activity: number; seed: number }[] = []
    for (let x = 0; x < cols; x++) {
      for (let z = 0; z < rows; z++) {
        const activity = grid[x][z]
        // The city grid represents GitHub's 53-week by 7-day activity pattern.
        buildings.push({
          x: x - (cols - 1) / 2,
          z: z - (rows - 1) / 2,
          h: activity === 0 ? 0.12 : 0.3 + activity * 1.9,
          activity,
          seed: (x * 17 + z * 31) % 11,
        })
      }
    }
    return { rows, cols, buildings }
  }, [grid])

  const buildingMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#ff8a65",
    roughness: 0.72,
    metalness: 0.08,
  }), [])
  const windowMaterial = useMemo(() => new THREE.MeshBasicMaterial({ color: "#ffe7ad" }), [])
  const baseMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#211832", roughness: 0.85, metalness: 0.12
  }), [])

  useEffect(() => () => {
    buildingMaterial.dispose()
    windowMaterial.dispose()
    baseMaterial.dispose()
  }, [buildingMaterial, windowMaterial, baseMaterial])

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.getElapsedTime()
    group.current.rotation.y = Math.sin(t * 0.12) * 0.035
    group.current.position.y = Math.sin(t * 0.7) * 0.035
  })

  return (
    <group ref={group} position={[0, -0.65, 0]}>
      <mesh position={[0, -0.13, 0]} receiveShadow>
        <boxGeometry args={[cols * 0.42 + 0.65, 0.18, rows * 0.78 + 0.8]} />
        <primitive object={baseMaterial} attach="material" />
      </mesh>
      {buildings.map((b, i) => {
        const warm = b.activity > 0
        const color = warm ? (b.seed % 3 === 0 ? "#ffb36b" : "#e87555") : "#493451"
        return (
          <group key={i} position={[b.x * 0.42, 0, b.z * 0.78]}>
            <mesh position={[0, b.h / 2, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.32, b.h, 0.58]} />
              <meshStandardMaterial color={color} roughness={0.68} metalness={0.05} />
            </mesh>
            {warm && b.h > 0.55 && (
              <mesh position={[0, b.h * 0.56, 0.296]}>
                <boxGeometry args={[0.09, 0.06, 0.012]} />
                <primitive object={windowMaterial} attach="material" />
              </mesh>
            )}
          </group>
        )
      })}
      {/* A few taller landmark towers give the skyline a recognizable city silhouette. */}
      {[8, 24, 39, 47].map((column, i) => {
        const b = buildings[column * rows + ((i * 2 + 1) % rows)]
        if (!b || b.activity === 0) return null
        return (
          <mesh key={column} position={[b.x * 0.42, b.h + 0.38 + i * 0.08, b.z * 0.78]} castShadow>
            <boxGeometry args={[0.2, 0.8 + i * 0.16, 0.25]} />
            <meshStandardMaterial color={i % 2 ? "#ff9b70" : "#f3b36a"} roughness={0.55} />
          </mesh>
        )
      })}
    </group>
  )
}

export function CommitTerrain() {
  const [events, setEvents] = useState<GitHubEvent[]>([])
  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const response = await fetch("https://api.github.com/users/MadhuTiwari-345/events?per_page=100", {
          headers: { Accept: "application/vnd.github+json" },
        })
        if (!response.ok) throw new Error("GitHub activity unavailable")
        const result = await response.json()
        if (active && Array.isArray(result)) setEvents(result.filter((event) => event?.created_at && event?.type))
      } catch {
        // Keep the city rendering even when GitHub temporarily rate-limits requests.
      }
    }
    void load()
    const interval = window.setInterval(load, 5 * 60 * 1000)
    return () => { active = false; window.clearInterval(interval) }
  }, [])

  const grid = useMemo(() => buildContributionGrid(events), [events])

  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 9, 16], fov: 39 }} dpr={[1, 1.5]} shadows>
        <color attach="background" args={["#171022"]} />
        <fog attach="fog" args={["#171022", 11, 25]} />
        <ambientLight intensity={1.05} />
        <directionalLight position={[5, 11, 7]} intensity={2.1} color="#ffe7cf" castShadow />
        <pointLight position={[-7, 4, -3]} intensity={45} distance={20} color="#c58bff" />
        <pointLight position={[7, 3, 5]} intensity={35} distance={18} color="#ff8a65" />
        <GitHubCity grid={grid} />
      </Canvas>
    </div>
  )
}
