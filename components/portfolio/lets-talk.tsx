"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion } from "framer-motion"
import { Check, Copy, Mail, MessageCircle, Phone, X } from "lucide-react"
import { ScanningButton } from "./scanning-button"

const EMAIL = "mt1499961@gmail.com"
const PHONE_DISPLAY = "+91 70115 47973"
const PHONE_TEL = "+917011547973"

type ChannelProps = {
  icon: React.ReactNode
  label: string
  value: string
  href: string
  copyValue: string
  cursorLabel: string
}

function Channel({ icon, label, value, href, copyValue, cursorLabel }: ChannelProps) {
  const [copied, setCopied] = useState(false)

  const onCopy = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(copyValue)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // no-op
    }
  }

  return (
    <a
      href={href}
      data-cursor-label={cursorLabel}
      className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-[var(--background-elevated)] px-3 py-2.5 text-left transition-colors hover:border-[var(--primary)]"
    >
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[color-mix(in_oklch,var(--primary)_18%,transparent)] text-[var(--primary)]">
          {icon}
        </span>
        <div className="min-w-0">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {label}
          </div>
          <div className="truncate text-sm font-medium">{value}</div>
        </div>
      </div>
      <button
        type="button"
        onClick={onCopy}
        aria-label={`Copy ${label}`}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </a>
  )
}

type LetsTalkButtonProps = {
  /** Compact pill style for dense surfaces like the nav bar. */
  compact?: boolean
  /** Horizontal anchor for the popover relative to the trigger. */
  align?: "left" | "center" | "right"
}

const POPOVER_WIDTH = 340
const POPOVER_GAP = 12
const VIEWPORT_PADDING = 16

export function LetsTalkButton({ compact = false, align = "left" }: LetsTalkButtonProps = {}) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [coords, setCoords] = useState<{ top: number; left: number; arrowLeft: number } | null>(
    null,
  )
  const triggerRef = useRef<HTMLDivElement | null>(null)
  const popoverRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Position the popover relative to the trigger, kept inside the viewport.
  useLayoutEffect(() => {
    if (!open) return

    const update = () => {
      const el = triggerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const viewportW = window.innerWidth

      // Preferred x based on alignment
      let left: number
      if (align === "right") {
        left = rect.right - POPOVER_WIDTH
      } else if (align === "center") {
        left = rect.left + rect.width / 2 - POPOVER_WIDTH / 2
      } else {
        left = rect.left
      }

      // Clamp into viewport
      left = Math.max(VIEWPORT_PADDING, Math.min(left, viewportW - POPOVER_WIDTH - VIEWPORT_PADDING))

      const top = rect.bottom + POPOVER_GAP

      // Arrow horizontal position within the popover, pointing at trigger center
      const triggerCenterX = rect.left + rect.width / 2
      const arrowLeft = Math.max(18, Math.min(POPOVER_WIDTH - 18, triggerCenterX - left))

      setCoords({ top, left, arrowLeft })
    }

    update()
    window.addEventListener("scroll", update, true)
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update, true)
      window.removeEventListener("resize", update)
    }
  }, [open, align])

  // Close on outside click + Escape
  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node
      if (triggerRef.current?.contains(t)) return
      if (popoverRef.current?.contains(t)) return
      setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", onClick)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onClick)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  const popover = coords && mounted
    ? createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              ref={popoverRef}
              role="dialog"
              aria-label="Contact details"
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="fixed z-[100] overflow-hidden rounded-2xl border border-border bg-[var(--card)]/95 p-4 text-left shadow-2xl backdrop-blur-xl"
              style={{
                top: coords.top,
                left: coords.left,
                width: POPOVER_WIDTH,
                background:
                  "linear-gradient(150deg, color-mix(in oklch, var(--primary) 14%, var(--card)) 0%, var(--card) 65%)",
              }}
            >
              {/* arrow pointing at trigger */}
              <span
                aria-hidden
                className="absolute -top-1.5 h-3 w-3 rotate-45 border-l border-t border-border bg-[var(--card)]"
                style={{ left: coords.arrowLeft - 6 }}
              />

              {/* header */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-balance text-base font-semibold tracking-tight">
                    Let&apos;s build something.
                  </h3>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    Tap a channel to reach me directly.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close contact details"
                  data-cursor-label="close"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-[var(--primary)] hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="mt-3 flex flex-col gap-2">
                <Channel
                  icon={<Mail className="h-4 w-4" />}
                  label="email"
                  value={EMAIL}
                  href={`mailto:${EMAIL}`}
                  copyValue={EMAIL}
                  cursorLabel="email"
                />
                <Channel
                  icon={<Phone className="h-4 w-4" />}
                  label="phone"
                  value={PHONE_DISPLAY}
                  href={`tel:${PHONE_TEL}`}
                  copyValue={PHONE_DISPLAY}
                  cursorLabel="phone"
                />
              </div>

              {/* footer */}
              <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                <span>new delhi, india</span>
                <span className="flex items-center gap-1.5 text-[var(--primary)]">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inset-0 animate-ping rounded-full bg-[var(--primary)] opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
                  </span>
                  available
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )
    : null

  return (
    <div ref={triggerRef} className="relative inline-block">
      {compact ? (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          data-cursor-label="lets talk"
          aria-expanded={open}
          aria-haspopup="dialog"
          className="glass-pill flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-colors hover:text-[var(--primary)]"
        >
          <MessageCircle className="h-3.5 w-3.5 text-[var(--primary)]" />
          <span>Let&apos;s talk</span>
        </button>
      ) : (
        <ScanningButton
          onClick={() => setOpen((v) => !v)}
          variant="primary"
          icon={<MessageCircle className="h-4 w-4" />}
          data-cursor-label="lets talk"
          aria-expanded={open}
          aria-haspopup="dialog"
        >
          Let&apos;s talk
        </ScanningButton>
      )}

      {popover}
    </div>
  )
}
