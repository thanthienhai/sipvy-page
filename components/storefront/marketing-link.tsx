"use client"

import Link, { type LinkProps } from "next/link"
import type { AnchorHTMLAttributes, ReactNode } from "react"

import { Button, type ButtonProps } from "@/components/ui/button"
import { track } from "@/lib/analytics"

interface MarketingLinkBaseProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick">,
    Pick<LinkProps, "href" | "replace" | "scroll"> {
  children: ReactNode
  /** Short, non-personal CTA name, e.g. "Xem các gói quà". */
  label: string
  /** Placement on the page, e.g. "gift_hero". */
  location?: string
}

function trackCta(label: string, href: LinkProps["href"], location?: string) {
  track("marketing_cta", { label, href: typeof href === "string" ? href : (href.pathname ?? ""), location })
}

/** Plain anchor that reports a CTA click (`sipvy:marketing_cta`). Never wrap a Button in it. */
export default function MarketingLink({ children, label, location, href, ...props }: MarketingLinkBaseProps) {
  return (
    <Link href={href} {...props} onClick={() => trackCta(label, href, location)}>
      {children}
    </Link>
  )
}

type MarketingButtonLinkProps = MarketingLinkBaseProps & Pick<ButtonProps, "variant" | "size">

/** Button-styled link: renders a single <a> (Button `asChild`), never <a><button>. */
export function MarketingButtonLink({ children, label, location, href, variant, size, className, ...props }: MarketingButtonLinkProps) {
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <Link href={href} {...props} onClick={() => trackCta(label, href, location)}>
        {children}
      </Link>
    </Button>
  )
}
