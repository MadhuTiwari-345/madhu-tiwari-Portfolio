"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useMemo, useRef, useEffect, useState } from "react"
import * as THREE from "three"

function getCssVar(name: string, fallback = "#ff6b5b") {
  if (typeof window === "undefined") return fallback
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return v || fallback
}

function sampleTextPoints(text: string, count: number) {
  // Render the text on an offscreen canvas and sample non-transparent pixels.
  const canvas = document.createElement("canvas")
  const w = 900
  const h = 280
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext("2d")!
  ctx.fillStyle = "#fff"
  ctx.font = "bold 200px 'Space Grotesk', system-ui, sans-serif"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText(text, w / 2, h / 2)
  const data = ctx.getImageData(0, 0, w, h).data
  const points: { x: number; y: number }[] = []
  for (let y = 0; y < h; y += 4) {
    for (let x = 0; x < w; x += 4) {
      const i = (y * w + x) * 4
      if (data[i + 3] > 128) {
        points.push({ x: x - w / 2, y: -(y - h / 2) })
      }
    }
  }
  // Normalize to world units
  const scale = 0.025
  const out: THREE.Vector3[] = points.map((p) => new THREE.Vector3(p.x * scale, p.y * scale, 0))
  // Resample to desired count
  if (out.length === 0) return []
  const result: THREE.Vector3[] = []
  for (let i = 0; i < count; i++) {
    result.push(out[i % out.length].clone())
  }
  // Shuffle
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

function Particles({ count = 2200, text = "MADHU" }: { count?: number; text?: string }) {
  const pointsRef = useRef<THREE.Points>(null)
  const { viewport, mouse } = useThree()
  const [color, setColor] = useState("#ff6b5b")
  const [accent, setAccent] = useState("#ffb347")

  useEffect(() => {
    const update = () => {
      setColor(getCssVar("--primary", "#ff6b5b"))
      setAccent(getCssVar("--accent", "#ffb347"))
    }
    update()
    const obs = new MutationObserver(update)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] })
    return () => obs.disconnect()
  }, [])

  // Base (scattered) and target (text-shaped) positions
  const { basePositions, targetPositions } = useMemo(() => {
    const base: THREE.Vector3[] = []
    for (let i = 0; i < count; i++) {
      base.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 24,
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8,
        ),
      )
    }
    const target = sampleTextPoints(text, count)
    return { basePositions: base, targetPositions: target }
  }, [count, text])

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    basePositions.forEach((v, i) => {
      arr[i * 3] = v.x
      arr[i * 3 + 1] = v.y
      arr[i * 3 + 2] = v.z
    })
    return arr
  }, [basePositions, count])

  const colors = useMemo(() => {
    const arr = new Float32Array(count * 3)
    const c1 = new THREE.Color(color)
    const c2 = new THREE.Color(accent)
    for (let i = 0; i < count; i++) {
      const mix = Math.random()
      const c = c1.clone().lerp(c2, mix)
      arr[i * 3] = c.r
      arr[i * 3 + 1] = c.g
      arr[i * 3 + 2] = c.b
    }
    return arr
  }, [count, color, accent])

  const mouseVec = useRef(new THREE.Vector2(0, 0))

  useFrame((state, delta) => {
    if (!pointsRef.current) return
    const geom = pointsRef.current.geometry as THREE.BufferGeometry
    const attr = geom.getAttribute("position") as THREE.BufferAttribute
    const arr = attr.array as Float32Array

    // Smooth mouse in viewport units
    const mx = (mouse.x * viewport.width) / 2
    const my = (mouse.y * viewport.height) / 2
    mouseVec.current.lerp(new THREE.Vector2(mx, my), 0.08)

    // Influence falls off with distance
    const time = state.clock.getElapsedTime()

    for (let i = 0; i < count; i++) {
      const ix = i * 3
      const base = basePositions[i]
      const target = targetPositions[i] ?? base

      const bx = base.x + Math.sin(time * 0.3 + i * 0.01) * 0.15
      const by = base.y + Math.cos(time * 0.25 + i * 0.01) * 0.1
      const bz = base.z

      // Distance from mouse to this particle's base position
      const dx = mouseVec.current.x - bx
      const dy = mouseVec.current.y - by
      const dist = Math.sqrt(dx * dx + dy * dy)
      const influence = Math.max(0, 1 - dist / 6)

      const tx = bx + (target.x - bx) * influence
      const ty = by + (target.y - by) * influence
      const tz = bz + (target.z - bz) * influence

      arr[ix] += (tx - arr[ix]) * 0.08
      arr[ix + 1] += (ty - arr[ix + 1]) * 0.08
      arr[ix + 2] += (tz - arr[ix + 2]) * 0.08
    }
    attr.needsUpdate = true

    pointsRef.current.rotation.y = Math.sin(time * 0.1) * 0.05
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export function ParticleHero() {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 55 }} dpr={[1, 1.8]}>
        <ambientLight intensity={0.4} />
        <Particles count={2400} text="MADHU" />
      </Canvas>
    </div>
  )
}
