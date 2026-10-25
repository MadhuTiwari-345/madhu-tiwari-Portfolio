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
  const buildingRefs = useRef<(THREE.Group | null)[]>([])
  const [hovered, setHovered] = useState<number | null>(null)
  const { rows, cols, buildings } = useMemo(() => {
    // A compact, square-ish city reads like a miniature skyline instead of a stretched heatmap.
    const cols = 22
    const rows = 15
    const buildings: { x: number; z: number; h: number; activity: number; seed: number; tower: boolean }[] = []
    for (let x = 0; x < cols; x++) {
      for (let z = 0; z < rows; z++) {
        const week = Math.min(52, Math.floor((x / (cols - 1)) * 52))
        const day = Math.min(6, Math.floor((z / (rows - 1)) * 7))
        const activity = grid[week]?.[day] ?? 0
        const seed = (x * 37 + z * 19 + x * z * 3) % 23
        // Give the city a designed skyline even when GitHub's public event feed is quiet.
        // Real activity adds height to buildings in the corresponding contribution region.
        const neighborhood = Math.max(0, 1 - Math.abs(x - 10.5) / 13) * 0.2
        const base = 0.24 + (seed / 23) * 0.95 + neighborhood
        const h = base + activity * 1.55
        buildings.push({
          x: x - (cols - 1) / 2,
          z: z - (rows - 1) / 2,
          h,
          activity,
          seed,
          tower: seed === 2 || seed === 7 || seed === 15 || (x % 6 === 2 && z % 5 === 1),
        })
      }
    }
    return { rows, cols, buildings }
  }, [grid])

  const baseMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#211633", roughness: 0.82, metalness: 0.18
  }), [])
  const windowMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: "#ffc8ff", toneMapped: false
  }), [])

  useEffect(() => () => {
    baseMaterial.dispose()
    windowMaterial.dispose()
  }, [baseMaterial, windowMaterial])

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.16) * 0.055 + state.pointer.x * 0.045
      group.current.rotation.x = -state.pointer.y * 0.025
      group.current.position.y = -0.48 + Math.sin(t * 0.7) * 0.035
    }

    // Smoothly pop the building under the cursor and gently push the camera closer.
    buildingRefs.current.forEach((building, index) => {
      if (!building) return
      const target = hovered === index ? 1.32 : 1
      const lift = hovered === index ? 0.18 : 0
      building.scale.x = THREE.MathUtils.damp(building.scale.x, target, 12, delta)
      building.scale.z = THREE.MathUtils.damp(building.scale.z, target, 12, delta)
      building.position.y = THREE.MathUtils.damp(building.position.y, lift, 12, delta)
    })
    const camera = state.camera
    const target = hovered === null ? new THREE.Vector3(9, 10, 12) : new THREE.Vector3(7.8, 8.8, 10.5)
    camera.position.lerp(target, 1 - Math.exp(-delta * 2.8))
    camera.lookAt(0, 0, 0)
  })

  return (
    <group ref={group} position={[0, -0.48, 0]}>
      <mesh position={[0, -0.16, 0]} receiveShadow>
        <boxGeometry args={[cols * 0.43 + 0.7, 0.2, rows * 0.43 + 0.7]} />
        <primitive object={baseMaterial} attach="material" />
      </mesh>
      {buildings.map((b, i) => {
        const palette = ["#8b5cf6", "#a78bfa", "#c084fc", "#7c3aed", "#e879f9", "#b4a0ff"]
        const color = palette[b.seed % palette.length]
        const w = b.tower ? 0.25 : 0.31
        const d = b.tower ? 0.25 : 0.31
        return (
          <group
            key={i}
            ref={(node) => { buildingRefs.current[i] = node }}
            position={[b.x * 0.43, 0, b.z * 0.43]}
            onPointerOver={(event) => {
              event.stopPropagation()
              setHovered(i)
              document.body.style.cursor = "pointer"
            }}
            onPointerOut={() => {
              setHovered((current) => current === i ? null : current)
              document.body.style.cursor = "default"
            }}
          >
            <mesh position={[0, b.h / 2, 0]} castShadow receiveShadow>
              <boxGeometry args={[w, b.h, d]} />
              <meshStandardMaterial color={color} roughness={0.48} metalness={0.2} emissive={color} emissiveIntensity={hovered === i ? 0.62 : b.activity > 0 ? 0.22 : 0.08} />
            </mesh>
            {b.h > 0.65 && (
              <>
                <mesh position={[0, b.h * 0.62, d / 2 + 0.006]}>
                  <boxGeometry args={[w * 0.34, 0.055, 0.012]} />
                  <primitive object={windowMaterial} attach="material" />
                </mesh>
                {b.h > 1.25 && (
                  <mesh position={[0, b.h + 0.08, 0]} castShadow>
                    <boxGeometry args={[0.045, 0.16, 0.045]} />
                    <meshBasicMaterial color="#f5d0fe" />
                  </mesh>
                )}
              </>
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
      <Canvas camera={{ position: [9, 10, 12], fov: 34 }} dpr={[1, 1.5]} shadows>
        <color attach="background" args={["#110d20"]} />
        <fog attach="fog" args={["#110d20", 13, 24]} />
        <ambientLight intensity={0.72} />
        <directionalLight position={[5, 10, 6]} intensity={1.8} color="#e9d5ff" castShadow />
        <pointLight position={[-5, 5, -3]} intensity={28} distance={18} color="#a855f7" />
        <pointLight position={[5, 4, 4]} intensity={22} distance={16} color="#f0abfc" />
        <GitHubCity grid={grid} />
      </Canvas>
    </div>
  )
}
