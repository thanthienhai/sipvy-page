import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowRight, Check, type LucideIcon } from "lucide-react"

import PageHeader from "@/components/storefront/page-header"
import StorefrontContainer from "@/components/storefront/storefront-container"
import SupportNav from "@/components/storefront/support-nav"
import { cn } from "@/lib/utils"

const POLICIES = [
  { href: "/chinh-sach-van-chuyen", title: "Chính sách vận chuyển", summary: "Giao 2–5 ngày, miễn phí từ 500.000₫" },
  { href: "/chinh-sach-doi-tra", title: "Chính sách đổi trả", summary: "Đổi hoặc hoàn tiền trong 7 ngày" },
  { href: "/chinh-sach-bao-mat", title: "Chính sách bảo mật", summary: "Cách SIPVY bảo vệ dữ liệu của bạn" },
  { href: "/dieu-khoan", title: "Điều khoản sử dụng", summary: "Tài khoản, đặt hàng và thanh toán" },
] as const

type PolicyHref = (typeof POLICIES)[number]["href"]

export interface PolicySection {
  title: string
  /** Shorter label for the table of contents; defaults to `title`. */
  tocLabel?: string
  paragraphs?: ReactNode[]
  bullets?: ReactNode[]
  /** Extra content rendered before paragraphs/bullets (e.g. fee tiles). */
  lead?: ReactNode
}

export interface PolicySummaryItem {
  value: string
  label: string
  /** One dark, highlighted tile per page. */
  featured?: boolean
}

interface PolicyLink {
  href: string
  label: string
}

interface PolicyPageProps {
  href: PolicyHref
  title: string
  description: string
  pathLabel: string
  icon: LucideIcon
  readingTime: string
  effectiveDate?: string
  summary: PolicySummaryItem[]
  /** Page-specific visual block between the summary and the full text. */
  highlight?: ReactNode
  sections: PolicySection[]
  help: { title: string; description: string; primary: PolicyLink; secondary: PolicyLink }
}

const sectionId = (index: number) => `muc-${index + 1}`

export default function PolicyPage({
  href,
  title,
  description,
  pathLabel,
  icon: Icon,
  readingTime,
  effectiveDate = "06/10/2026",
  summary,
  highlight,
  sections,
  help,
}: PolicyPageProps) {
  const related = POLICIES.filter((policy) => policy.href !== href)

  return (
    <article className="bg-stone-50/70">
      <PageHeader
        variant="warm"
        breadcrumbs={[{ href: "/", label: "Trang chủ" }, { label: "Chính sách" }, { label: pathLabel }]}
        eyebrow={
          <span className="inline-flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-950 text-amber-300">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            Chính sách
          </span>
        }
        title={title}
        description={description}
        meta={
          <ul className="flex flex-wrap gap-2 text-[13px] text-stone-700">
            <li className="rounded-full border border-stone-200 bg-white px-3 py-1.5">Phiên bản 1.0</li>
            <li className="rounded-full border border-stone-200 bg-white px-3 py-1.5">
              Hiệu lực: <time dateTime="2026-10-06">{effectiveDate}</time>
            </li>
            <li className="rounded-full border border-stone-200 bg-white px-3 py-1.5">{readingTime}</li>
          </ul>
        }
      />
      <SupportNav current={href} />

      <StorefrontContainer className="pt-10 md:pt-12">
        <section aria-labelledby="policy-summary">
          <h2 id="policy-summary" className="mb-4 text-sm font-semibold uppercase tracking-[0.08em] text-stone-500">
            Tóm tắt nhanh
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {summary.map((item) => (
              <li
                key={item.value}
                className={cn("rounded-2xl p-5", item.featured ? "bg-green-950 text-white" : "border border-stone-200 bg-white")}
              >
                <p className={cn("text-xl font-bold tracking-tight", item.featured ? "text-amber-300" : "text-green-950")}>{item.value}</p>
                <p className={cn("mt-1 text-sm leading-6", item.featured ? "text-green-100" : "text-stone-600")}>{item.label}</p>
              </li>
            ))}
          </ul>
        </section>

        {highlight && <div className="mt-10 md:mt-12">{highlight}</div>}
      </StorefrontContainer>

      <StorefrontContainer className="grid gap-8 pt-12 md:pt-14 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12">
        <nav aria-label="Mục lục" className="h-fit lg:sticky lg:top-24">
          <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-stone-500">Mục lục</p>
          <ol className="flex flex-col border-l-2 border-stone-200">
            {sections.map((section, index) => (
              <li key={section.title}>
                <a
                  href={`#${sectionId(index)}`}
                  className="-ml-0.5 block border-l-2 border-transparent px-3.5 py-2.5 text-sm text-stone-600 transition-colors hover:border-green-700 hover:text-green-950"
                >
                  {section.tocLabel ?? section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="storefront-readable max-w-3xl space-y-10">
          {sections.map((section, index) => (
            <section key={section.title} id={sectionId(index)} aria-labelledby={`${sectionId(index)}-h`} className="scroll-mt-24">
              <p className="text-[13px] font-bold text-green-700" aria-hidden="true">{String(index + 1).padStart(2, "0")}</p>
              <h2 id={`${sectionId(index)}-h`} className="mt-1 text-2xl font-semibold tracking-tight text-stone-950">{section.title}</h2>
              {section.lead && <div className="mt-4">{section.lead}</div>}
              {section.paragraphs?.map((paragraph, i) => (
                <p key={i} className="mt-3 text-base leading-7 text-stone-700 md:leading-[1.75]">{paragraph}</p>
              ))}
              {section.bullets && <PolicyChecklist items={section.bullets} className="mt-3" />}
            </section>
          ))}
        </div>
      </StorefrontContainer>

      <StorefrontContainer className="pt-14 md:pt-16">
        <section aria-labelledby="policy-help" className="flex flex-wrap items-center justify-between gap-5 rounded-3xl bg-green-950 p-6 text-white md:p-10">
          <div className="max-w-xl">
            <h2 id="policy-help" className="text-2xl font-semibold tracking-tight">{help.title}</h2>
            <p className="mt-2 text-[15px] leading-6 text-green-100">{help.description}</p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <PolicyCta link={help.primary} primary />
            <PolicyCta link={help.secondary} />
          </div>
        </section>
      </StorefrontContainer>

      <StorefrontContainer className="pb-16 pt-12 md:pb-20">
        <nav aria-labelledby="policy-related">
          <h2 id="policy-related" className="mb-4 text-lg font-semibold text-stone-950">Chính sách liên quan</h2>
          <ul className="grid gap-3 md:grid-cols-3">
            {related.map((policy) => (
              <li key={policy.href}>
                <Link
                  href={policy.href}
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-stone-200 bg-white p-5 transition-colors hover:border-green-700"
                >
                  <span>
                    <span className="block font-semibold text-stone-950">{policy.title}</span>
                    <span className="mt-1 block text-[13px] text-stone-500">{policy.summary}</span>
                  </span>
                  <ArrowRight className="h-[18px] w-[18px] shrink-0 text-green-800 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </StorefrontContainer>
    </article>
  )
}

function PolicyCta({ link, primary = false }: { link: PolicyLink; primary?: boolean }) {
  const className = cn(
    "flex h-12 items-center rounded-xl px-5 text-[15px] font-semibold transition-colors",
    primary ? "bg-amber-300 text-stone-900 hover:bg-amber-200" : "bg-white/10 text-white hover:bg-white/20",
  )
  // tel:/mailto: are not routes, so they skip next/link.
  return link.href.startsWith("/") ? (
    <Link href={link.href} className={className}>{link.label}</Link>
  ) : (
    <a href={link.href} className={className}>{link.label}</a>
  )
}

export function PolicyChecklist({ items, className }: { items: ReactNode[]; className?: string }) {
  return (
    <ul className={cn("space-y-2.5", className)}>
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-base leading-7 text-stone-700">
          <Check className="mt-1 h-[18px] w-[18px] shrink-0 text-green-700" strokeWidth={2.4} aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/** White card for the page-specific highlight block. */
export function PolicyPanel({ title, titleId, children, className }: { title: string; titleId: string; children: ReactNode; className?: string }) {
  return (
    <section aria-labelledby={titleId} className={cn("rounded-3xl border border-stone-200 bg-white p-5 md:p-9", className)}>
      <h2 id={titleId} className="text-[22px] font-semibold tracking-tight text-stone-950">{title}</h2>
      {children}
    </section>
  )
}

/** Numbered horizontal process; the last step is accented. */
export function PolicySteps({ steps }: { steps: { title: string; description: string }[] }) {
  return (
    <ol className={cn("mt-6 grid gap-6 sm:grid-cols-2", steps.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4")}>
      {steps.map((step, index) => {
        const last = index === steps.length - 1
        return (
          <li key={step.title} className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2.5">
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                  last ? "bg-amber-300 text-amber-950" : "bg-green-950 text-white",
                )}
              >
                {index + 1}
              </span>
              {!last && <span className="h-0.5 flex-1 bg-green-200" aria-hidden="true" />}
            </div>
            <h3 className="text-base font-semibold text-stone-950">{step.title}</h3>
            <p className="text-sm leading-6 text-stone-600">{step.description}</p>
          </li>
        )
      })}
    </ol>
  )
}

export function PolicyNote({ icon: Icon, tone = "amber", children }: { icon: LucideIcon; tone?: "amber" | "orange"; children: ReactNode }) {
  return (
    <p
      className={cn(
        "mt-6 flex items-start gap-2.5 rounded-2xl px-4 py-3.5 text-sm leading-6",
        tone === "amber" ? "bg-amber-50 text-amber-900" : "bg-orange-50 text-orange-900",
      )}
    >
      <Icon className="mt-0.5 h-[18px] w-[18px] shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </p>
  )
}

/** Side-by-side list card ("Được hỗ trợ" / "Không áp dụng", "Bạn" / "SIPVY"). */
export function PolicyListCard({
  title,
  icon: Icon,
  items,
  tone,
}: {
  title: string
  icon: LucideIcon
  items: string[]
  tone: "positive" | "neutral"
}) {
  const positive = tone === "positive"
  return (
    <div className={cn("rounded-3xl p-6", positive ? "border border-green-200 bg-green-50" : "border border-stone-200 bg-white")}>
      <h3 className={cn("flex items-center gap-2.5 text-[17px] font-semibold", positive ? "text-green-950" : "text-stone-950")}>
        <span
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full",
            positive ? "bg-green-800 text-white" : "bg-stone-200 text-stone-700",
          )}
        >
          <Icon className="h-4 w-4" strokeWidth={2.6} aria-hidden="true" />
        </span>
        {title}
      </h3>
      <ul className={cn("mt-4 list-disc space-y-2 pl-5 text-[15px] leading-6", positive ? "text-green-900" : "text-stone-700")}>
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  )
}
