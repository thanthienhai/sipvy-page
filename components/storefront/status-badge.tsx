import type { LucideIcon } from "lucide-react"
import {
  AlertTriangle,
  BadgeCheck,
  CheckCircle2,
  CircleDollarSign,
  Clock,
  HelpCircle,
  PackageCheck,
  RotateCcw,
  Settings2,
  Truck,
  XCircle,
} from "lucide-react"

import { cn } from "@/lib/utils"

export type StatusKind = "stock" | "order" | "payment"

interface StatusConfig {
  label: string
  icon: LucideIcon
  className: string
}

const tones = {
  success: "border-green-200 bg-green-50 text-green-900",
  warning: "border-amber-200 bg-amber-50 text-amber-900",
  danger: "border-red-200 bg-red-50 text-red-900",
  info: "border-sky-200 bg-sky-50 text-sky-900",
  neutral: "border-stone-200 bg-stone-100 text-stone-800",
}

const STATUS_CONFIG: Record<StatusKind, Record<string, StatusConfig>> = {
  stock: {
    IN_STOCK: { label: "Còn hàng", icon: CheckCircle2, className: tones.success },
    LOW_STOCK: { label: "Sắp hết hàng", icon: AlertTriangle, className: tones.warning },
    OUT_OF_STOCK: { label: "Hết hàng", icon: XCircle, className: tones.neutral },
  },
  order: {
    PENDING: { label: "Chờ xác nhận", icon: Clock, className: tones.warning },
    CONFIRMED: { label: "Đã xác nhận", icon: BadgeCheck, className: tones.info },
    PROCESSING: { label: "Đang chuẩn bị", icon: Settings2, className: tones.info },
    SHIPPED: { label: "Đang giao", icon: Truck, className: tones.info },
    DELIVERED: { label: "Đã giao", icon: PackageCheck, className: tones.success },
    CANCELLED: { label: "Đã huỷ", icon: XCircle, className: tones.danger },
    REFUNDED: { label: "Đã hoàn tiền", icon: RotateCcw, className: tones.neutral },
  },
  payment: {
    PENDING: { label: "Chờ thanh toán", icon: Clock, className: tones.warning },
    PAID: { label: "Đã thanh toán", icon: CircleDollarSign, className: tones.success },
    FAILED: { label: "Thanh toán thất bại", icon: XCircle, className: tones.danger },
    CANCELLED: { label: "Đã huỷ thanh toán", icon: XCircle, className: tones.neutral },
    REFUNDED: { label: "Đã hoàn tiền", icon: RotateCcw, className: tones.neutral },
    PARTIALLY_REFUNDED: { label: "Hoàn tiền một phần", icon: RotateCcw, className: tones.neutral },
    REFUND_REQUIRED: { label: "Cần hoàn tiền", icon: AlertTriangle, className: tones.warning },
  },
}

/** Maps product inventory to a stock status key. */
export function stockStatus(inStock: boolean, quantity?: number | null, lowThreshold = 5): "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK" {
  if (!inStock || (typeof quantity === "number" && quantity <= 0)) return "OUT_OF_STOCK"
  if (typeof quantity === "number" && quantity <= lowThreshold) return "LOW_STOCK"
  return "IN_STOCK"
}

interface StatusBadgeProps {
  kind: StatusKind
  status: string
  /** Replaces the default Vietnamese label (e.g. "Còn hàng (5 bộ)"). */
  label?: string
  className?: string
}

/** Status chip that always carries text AND an icon, never colour alone. */
export default function StatusBadge({ kind, status, label, className }: StatusBadgeProps) {
  const config = STATUS_CONFIG[kind][status] ?? { label: status, icon: HelpCircle, className: tones.neutral }
  const Icon = config.icon
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium", config.className, className)}>
      <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      {label ?? config.label}
    </span>
  )
}
