"use client"

import type { ReactNode } from "react"
import { useCallback, useEffect } from "react"
import { motion, useAnimationControls } from "framer-motion"

type MarqueeProps = {
  children: ReactNode
  className?: string
  pauseOnHover?: boolean
}

export function Marquee({ children, className = "", pauseOnHover = false }: MarqueeProps) {
  const controls = useAnimationControls()
  const play = useCallback(() => controls.start({
    x: "-50%",
    transition: { duration: 32, ease: "linear", repeat: Infinity },
  }), [controls])

  useEffect(() => {
    void play()
    return () => controls.stop()
  }, [controls, play])

  return (
    <div className={`group flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] ${className}`}>
      <motion.div
        className="flex w-max shrink-0 items-center gap-[var(--gap,0.75rem)] pr-[var(--gap,0.75rem)]"
        animate={controls}
        onHoverStart={pauseOnHover ? () => controls.stop() : undefined}
        onHoverEnd={pauseOnHover ? () => void play() : undefined}
      >
        <div className="flex shrink-0 items-center gap-[var(--gap,0.75rem)]">{children}</div>
        <div aria-hidden className="flex shrink-0 items-center gap-[var(--gap,0.75rem)]">{children}</div>
      </motion.div>
    </div>
  )
}
