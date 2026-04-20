"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useMemo, useRef, useEffect, useState } from "react"
import * as THREE from "three"

function getCssVar(name: string, fallback: string) {
  if (typeof window === "undefined") return fallback
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return v || fallback
}

// Stable pseudo-random terrain data representing contribution activity across a year.
function buildContributionGrid(weeks = 53, days = 7, seed = 42) {
  const data: number[][] = []
  let s = seed
  const rand = () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
  for (let w = 0; w < weeks; w++) {
    const row: number[] = []
    for (let d = 0; d < days; d++) {
      // Combine a global trend with randomness to make it feel organic.
      const trend = 0.4 + 0.6 * Math.sin((w / weeks) * Math.PI * 1.4)
      const weekendDip = d === 0 || d === 6 ? 0.55 : 1
      const spike = rand() < 0.07 ? 1.6 : 1
      const v = Math.max(0, Math.min(1, trend * weekendDip * rand() * spike))
      row.push(v)
    }
    data.push(row)
  }
  return data
}

function Terrain() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const [primary, setPrimary] = useState("#ff6b5b")
  const [accent, setAccent] = useState("#ffb347")
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

  const grid = useMemo(() => buildContributionGrid(), [])
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
