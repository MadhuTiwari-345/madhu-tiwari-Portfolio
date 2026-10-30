"use client"

import { motion } from "framer-motion"

const words = ["Build.", "Ship.", "Improve."]

export function BlurReveal() {
  return (
    <span
      aria-label={words.join(" ")}
      className="inline-flex flex-wrap justify-center gap-x-3"
    >
      {words.map((word, index) => (
        <motion.span
          key={word}
          aria-hidden="true"
          initial={{ opacity: 0, y: 14, filter: "blur(9px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.65, delay: 0.18 + index * 0.13, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}
