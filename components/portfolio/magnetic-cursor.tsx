"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function MagneticCursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 220, damping: 22, mass: 0.4 })
  const ringY = useSpring(y, { stiffness: 220, damping: 22, mass: 0.4 })
  const dotX = useSpring(x, { stiffness: 500, damping: 30 })
  const dotY = useSpring(y, { stiffness: 500, damping: 30 })

  const [hovering, setHovering] = useState(false)
  const [label, setLabel] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)
  const touchRef = useRef(false)

  useEffect(() => {
    // Disable on touch devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches
    if (isTouch) {
      touchRef.current = true
      return
    }
    document.documentElement.classList.add("cursor-none")

    const onMove = (e: MouseEvent) => {
      setVisible(true)
      x.set(e.clientX)
      y.set(e.clientY)
      const target = e.target as HTMLElement | null
      if (!target) return
      const interactive = target.closest<HTMLElement>(
        "a, button, [role=button], input, textarea, select, [data-magnetic]",
      )
      if (interactive) {
        setHovering(true)
        const l = interactive.getAttribute("data-cursor-label")
        setLabel(l)
      } else {
        setHovering(false)
        setLabel(null)
      }
    }

    const onLeave = () => setVisible(false)

    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseleave", onLeave)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseleave", onLeave)
      document.documentElement.classList.remove("cursor-none")
    }
  }, [x, y])

  if (touchRef.current) return null

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
      >
        <motion.div
          animate={{
            width: hovering ? 56 : 28,
            height: hovering ? 56 : 28,
            borderWidth: hovering ? 1 : 1.5,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="rounded-full border border-foreground"
        />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
      >
        <div
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: "var(--primary)" }}
        />
      </motion.div>
      {label ? (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed top-0 left-0 z-[9999]"
          style={{
            x: ringX,
            y: ringY,
            translateX: "24px",
            translateY: "20px",
          }}
        >
          <div className="glass-pill rounded-full px-3 py-1 text-[10px] font-mono uppercase tracking-widest">
            {label}
          </div>
        </motion.div>
      ) : null}
    </>
  )
}
