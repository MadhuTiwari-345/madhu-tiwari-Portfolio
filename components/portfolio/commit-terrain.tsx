"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useMemo, useRef, useEffect, useState } from "react"
import * as THREE from "three"

type GitHubEvent = { created_at: string; type: string }

function buildContributionGrid(events: GitHubEvent[], cols = 22, rows = 15) {
  const counts = new Map<string, number>()
  for (const event of events) {
    const date = new Date(event.created_at)
    if (Number.isNaN(date.getTime())) continue
    const key = date.toISOString().slice(0, 10)
    counts.set(key, (counts.get(key) ?? 0) + 1)
  }

  // One building represents one day in the most recent 330-day window.
  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)
  const raw: number[][] = []
  for (let x = 0; x < cols; x++) {
    const column: number[] = []
    for (let z = 0; z < rows; z++) {
      const date = new Date(today)
      date.setUTCDate(today.getUTCDate() - (cols * rows - 1 - (x * rows + z)))
      const value = counts.get(date.toISOString().slice(0, 10)) ?? 0
      column.push(value)
    }
    raw.push(column)
  }
  // Keep actual daily counts. The scene uses sparse buildings rather than a tile for every day.
  return raw
}

function GitHubCity({ grid }: { grid: number[][] }) {
  const group = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState<number | null>(null)

  const { buildings, size } = useMemo(() => {
    const cols = 17
    const rows = 17
    const buildings: { x: number; z: number; h: number; activity: number; seed: number; w: number; d: number; floors: number }[] = []
    for (let x = 0; x < cols; x++) {
      for (let z = 0; z < rows; z++) {
        const seed = (x * 37 + z * 19 + x * z * 3) % 101
        const center = Math.hypot(x - 8, z - 8)
        const district = Math.max(0, 1 - center / 11)
        // A deliberate, stable skyline: GitHub activity changes the glow, never whether the city exists.
        const occupied = seed < 43 || (center < 4.5 && seed < 72)
        if (!occupied) continue
        const activity = grid[Math.min(21, Math.floor(x * 22 / cols))]?.[Math.min(14, Math.floor(z * 15 / rows))] ?? 0
        const variation = ((seed * 13 + x * 7 + z * 11) % 29) / 28
        const h = 0.62 + variation * 1.45 + district * 1.05 + Math.min(activity, 4) * 0.1
        const w = 0.34 + (seed % 4) * 0.045
        const d = 0.34 + ((seed * 3) % 4) * 0.04
        buildings.push({
          x: (x - 8) * 0.72,
          z: (z - 8) * 0.72,
          h, activity, seed, w, d,
          floors: Math.max(2, Math.floor(h / 0.25)),
        })
      }
    }
    return { buildings, size: 12.7 }
  }, [grid])

  const baseMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#111b43", roughness: 0.28, metalness: 0.72,
    emissive: "#26145c", emissiveIntensity: 0.34,
  }), [])

  useEffect(() => () => baseMaterial.dispose(), [baseMaterial])

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.12) * 0.035 + state.pointer.x * 0.025
      group.current.rotation.x = -state.pointer.y * 0.015
      group.current.position.y = -0.5 + Math.sin(t * 0.55) * 0.025
    }
    const camera = state.camera
    const target = hovered === null ? new THREE.Vector3(10.5, 11.8, 13.5) : new THREE.Vector3(9, 10, 11.5)
    camera.position.lerp(target, 1 - Math.exp(-delta * 2.2))
    camera.lookAt(0, 0.35, 0)
  })

  const palette = ["#c4a2ff", "#a78bfa", "#d8b4fe", "#8b7cff", "#e0a8ff", "#a5b4fc"]
  return (
    <group ref={group} position={[0, -0.5, 0]}>
      <mesh position={[0, -0.2, 0]} receiveShadow>
        <boxGeometry args={[size, 0.34, size]} />
        <primitive object={baseMaterial} attach="material" />
      </mesh>
      <mesh position={[0, -0.018, 0]}>
        <boxGeometry args={[size + 0.015, 0.012, size + 0.015]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.55} />
      </mesh>
      {Array.from({ length: 9 }, (_, i) => {
        const offset = -5.6 + i * 1.4
        return (
          <group key={i}>
            <mesh position={[offset, -0.018, 0]}>
              <boxGeometry args={[0.012, 0.009, size - 0.5]} />
              <meshBasicMaterial color="#5541a6" transparent opacity={0.38} />
            </mesh>
            <mesh position={[0, -0.018, offset]}>
              <boxGeometry args={[size - 0.5, 0.009, 0.012]} />
              <meshBasicMaterial color="#5541a6" transparent opacity={0.38} />
            </mesh>
          </group>
        )
      })}
      {buildings.map((b, i) => {
        const color = palette[b.seed % palette.length]
        const activeGlow = b.activity > 0 ? 0.7 : 0.42
        return (
          <group
            key={i}
            position={[b.x, 0, b.z]}
            onPointerOver={(event) => { event.stopPropagation(); setHovered(i); document.body.style.cursor = "pointer" }}
            onPointerOut={() => { setHovered((v) => v === i ? null : v); document.body.style.cursor = "default" }}
          >
            <mesh position={[0, b.h / 2, 0]} castShadow>
              <boxGeometry args={[b.w, b.h, b.d]} />
              <meshStandardMaterial color={color} transparent opacity={0.34} roughness={0.22} metalness={0.62} emissive={color} emissiveIntensity={hovered === i ? 1.1 : activeGlow} />
            </mesh>
            <lineSegments position={[0, b.h / 2, 0]}>
              <edgesGeometry args={[new THREE.BoxGeometry(b.w, b.h, b.d)]} />
              <lineBasicMaterial color={hovered === i ? "#fff0ff" : color} transparent opacity={0.95} />
            </lineSegments>
            {Array.from({ length: Math.max(1, Math.floor(b.h / 0.38)) }, (_, floor) => (
              <mesh key={floor} position={[0, 0.22 + floor * 0.38, b.d / 2 + 0.006]}>
                <boxGeometry args={[b.w * 0.42, 0.035, 0.012]} />
                <meshBasicMaterial color="#f2d7ff" toneMapped={false} />
              </mesh>
            ))}
            {b.h > 1.65 && (
              <>
                <mesh position={[0, b.h + 0.09, 0]}>
                  <boxGeometry args={[b.w * 0.16, 0.18, b.d * 0.16]} />
                  <meshBasicMaterial color="#e9d5ff" toneMapped={false} />
                </mesh>
                <lineSegments position={[0, b.h + 0.09, 0]}>
                  <edgesGeometry args={[new THREE.BoxGeometry(b.w * 0.16, 0.18, b.d * 0.16)]} />
                  <lineBasicMaterial color="#f5d0fe" />
                </lineSegments>
              </>
            )}
            {hovered === i && (
              <mesh position={[0, b.h + 0.24, 0]}>
                <sphereGeometry args={[0.055, 8, 8]} />
                <meshBasicMaterial color="#ffffff" toneMapped={false} />
              </mesh>
            )}
          </group>
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
      <Canvas camera={{ position: [10.5, 11.8, 13.5], fov: 31 }} dpr={[1, 1.5]} shadows>
        <color attach="background" args={["#080f2a"]} />
        
        <ambientLight intensity={0.52} />
        <directionalLight position={[5, 12, 6]} intensity={1.5} color="#e9d5ff" castShadow />
        <pointLight position={[-5, 5, -3]} intensity={8} distance={20} color="#a855f7" />
        <pointLight position={[5, 4, 4]} intensity={7} distance={20} color="#d8a4ff" />
        <pointLight position={[0, 3, 0]} intensity={4.5} distance={15} color="#a78bfa" />
        <GitHubCity grid={grid} />
      </Canvas>
    </div>
  )
}
