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
  const buildingRefs = useRef<(THREE.Group | null)[]>([])
  const [hovered, setHovered] = useState<number | null>(null)
  const { rows, cols, buildings } = useMemo(() => {
    // A compact, square-ish city reads like a miniature skyline instead of a stretched heatmap.
    const cols = 22
    const rows = 15
    const buildings: { x: number; z: number; h: number; activity: number; seed: number; width: number; occupied: boolean }[] = []
    for (let x = 0; x < cols; x++) {
      for (let z = 0; z < rows; z++) {
        const activity = grid[x]?.[z] ?? 0
        const seed = (x * 37 + z * 19 + x * z * 3) % 23
        // Build a complete miniature skyline. GitHub activity subtly raises and lights buildings,
        // while deterministic variation keeps the city visible even when the API has few events.
        const centerDistance = Math.hypot(x - (cols - 1) / 2, z - (rows - 1) / 2)
        const cluster = Math.max(0, 1 - centerDistance / 13)
        const variation = ((seed * 7 + x * 11 + z * 5) % 17) / 16
        const h = 0.34 + variation * 1.05 + cluster * 0.85 + Math.min(activity, 5) * 0.12
        const occupied = seed % 11 > 1 && !(x % 6 === 0 && z % 5 === 0)
        const width = 0.22 + (seed % 4) * 0.018
        buildings.push({
          x: x - (cols - 1) / 2,
          z: z - (rows - 1) / 2,
          h,
          activity,
          seed,
          width,
          occupied,
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
      <gridHelper args={[Math.max(cols * 0.43, rows * 0.43), 22, "#8b5cf6", "#4c3676"]} position={[0, -0.054, 0]} />
      {buildings.map((b, i) => {
        if (!b.occupied) return null
        const palette = ["#b78cff", "#d2a6ff", "#9360f5", "#e0c0ff", "#bd8cff", "#a98bff", "#c8b2ff"]
        const color = palette[b.seed % palette.length]
        const w = b.width
        const d = b.width
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
              <meshStandardMaterial color={color} roughness={0.2} metalness={0.42} transparent opacity={0.68} emissive={color} emissiveIntensity={hovered === i ? 0.58 : b.activity > 0 ? 0.32 : 0.22} />
            </mesh>
            <lineSegments position={[0, b.h / 2, 0]}>
              <edgesGeometry args={[new THREE.BoxGeometry(w + 0.008, b.h + 0.008, d + 0.008)]} />
              <lineBasicMaterial color="#e9c8ff" transparent opacity={0.82} />
            </lineSegments>
            {b.seed % 5 === 0 && b.h > 1.1 && (
              <mesh position={[0, b.h + 0.13, 0]}>
                <cylinderGeometry args={[0.009, 0.018, 0.26, 5]} />
                <meshBasicMaterial color="#f3d8ff" />
              </mesh>
            )}
            {b.h > 0.72 && (
              <>
                <mesh position={[0, b.h * 0.42, d / 2 + 0.006]}>
                  <boxGeometry args={[w * 0.48, 0.055, 0.014]} />
                  <primitive object={windowMaterial} attach="material" />
                </mesh>
                <mesh position={[0, b.h * 0.72, d / 2 + 0.006]}>
                  <boxGeometry args={[w * 0.42, 0.045, 0.012]} />
                  <primitive object={windowMaterial} attach="material" />
                </mesh>
              </>
            )}
            {b.h > 1.45 && (
              <mesh position={[0, b.h + 0.07, 0]} castShadow>
                <boxGeometry args={[w * 0.28, 0.14, d * 0.28]} />
                <meshBasicMaterial color="#f5d0fe" />
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
      <Canvas camera={{ position: [9, 10, 12], fov: 34 }} dpr={[1, 1.5]} shadows>
        <color attach="background" args={["#080f2a"]} />
        
        <ambientLight intensity={0.52} />
        <directionalLight position={[5, 12, 6]} intensity={1.5} color="#e9d5ff" castShadow />
        <pointLight position={[-5, 5, -3]} intensity={8} distance={20} color="#a855f7" />
        <pointLight position={[5, 4, 4]} intensity={6} distance={18} color="#f0abfc" />
        <pointLight position={[0, 3, 0]} intensity={3.5} distance={13} color="#c084fc" />
        <GitHubCity grid={grid} />
      </Canvas>
    </div>
  )
}
