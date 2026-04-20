"use client"

import { useEffect, useRef, useState } from "react"
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
      className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-[var(--background-elevated)] px-4 py-3 text-left transition-colors hover:border-[var(--primary)]"
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
  /** Horizontal anchor for the popover. Defaults to "center". */
  align?: "center" | "right"
}

export function LetsTalkButton({ compact = false, align = "center" }: LetsTalkButtonProps = {}) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement | null>(null)

  // close on outside click + Escape
  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current) return
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false)
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

  const popoverPosition =
    align === "right"
      ? "right-0 top-[calc(100%+0.75rem)]"
      : "left-1/2 top-[calc(100%+0.75rem)] -translate-x-1/2"
  const arrowPosition =
    align === "right" ? "right-5 -top-1.5" : "left-1/2 -top-1.5 -translate-x-1/2"

  return (
    <div ref={wrapRef} className="relative inline-block">
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

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Contact details"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={`absolute z-50 w-[min(92vw,22rem)] overflow-hidden rounded-2xl border border-border bg-[var(--card)]/95 p-4 text-left shadow-2xl backdrop-blur-xl ${popoverPosition}`}
            style={{
              background:
                "linear-gradient(150deg, color-mix(in oklch, var(--primary) 14%, var(--card)) 0%, var(--card) 65%)",
            }}
          >
            {/* arrow */}
            <span
              aria-hidden
              className={`absolute h-3 w-3 rotate-45 border-l border-t border-border bg-[var(--card)] ${arrowPosition}`}
            />

            <div className="flex items-center justify-between">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                direct channels
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close contact details"
                className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-[var(--background-elevated)] hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <h3 className="mt-1 text-balance text-lg font-semibold tracking-tight">
              Reach out directly.
            </h3>

            <div className="mt-4 flex flex-col gap-2">
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

            <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              <span>new delhi, india</span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--primary)]" />
                available
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
