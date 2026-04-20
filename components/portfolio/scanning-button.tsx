"use client"

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react"
import { cn } from "@/lib/utils"

type Variant = "primary" | "ghost" | "outline"

type ScanningButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  children: ReactNode
  icon?: ReactNode
  asLink?: false
}

type ScanningLinkProps = {
  href: string
  variant?: Variant
  children: ReactNode
  icon?: ReactNode
  asLink: true
  target?: string
  rel?: string
  className?: string
  "data-cursor-label"?: string
  "aria-label"?: string
}

type Props = ScanningButtonProps | ScanningLinkProps

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-[var(--primary)] text-[var(--primary-foreground)] hover:brightness-110 border border-[var(--primary)]",
  ghost:
    "bg-transparent text-foreground hover:bg-[color-mix(in_oklch,var(--primary)_14%,transparent)] border border-transparent hover:border-[color-mix(in_oklch,var(--primary)_40%,transparent)]",
  outline:
    "bg-[color-mix(in_oklch,var(--background-elevated)_60%,transparent)] text-foreground border border-[color-mix(in_oklch,var(--primary)_40%,transparent)] hover:border-[var(--primary)] hover:bg-[color-mix(in_oklch,var(--primary)_12%,transparent)]",
}

export const ScanningButton = forwardRef<HTMLButtonElement, Props>(function ScanningButton(props, ref) {
  const { variant = "outline", children, icon, className } = props as ScanningButtonProps
  const base = cn(
    "scan-line group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-md px-4 py-2 text-sm font-medium tracking-wide transition-all duration-200",
    "before:absolute before:inset-0 before:z-0",
    variantStyles[variant],
    className,
  )

  const inner = (
    <>
      {/* corner brackets (biometric frame) */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-1 left-1 h-2 w-2 border-t border-l border-[var(--primary)] opacity-0 transition-opacity group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute top-1 right-1 h-2 w-2 border-t border-r border-[var(--primary)] opacity-0 transition-opacity group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-1 left-1 h-2 w-2 border-b border-l border-[var(--primary)] opacity-0 transition-opacity group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-1 right-1 h-2 w-2 border-b border-r border-[var(--primary)] opacity-0 transition-opacity group-hover:opacity-100"
      />
      <span className="relative z-10 flex items-center gap-2">
        {icon}
        <span>{children}</span>
      </span>
    </>
  )

  if ((props as ScanningLinkProps).asLink) {
    const { href, target, rel, className: _c, ...rest } = props as ScanningLinkProps
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={base}
        data-cursor-label={(rest as { "data-cursor-label"?: string })["data-cursor-label"]}
        aria-label={(rest as { "aria-label"?: string })["aria-label"]}
      >
        {inner}
      </a>
    )
  }

  const { icon: _icon, variant: _v, className: _c, children: _ch, asLink: _a, ...rest } =
    props as ScanningButtonProps
  return (
    <button ref={ref} className={base} {...rest}>
      {inner}
    </button>
  )
})
