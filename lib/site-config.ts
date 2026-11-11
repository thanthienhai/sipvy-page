/**
 * Brand-level content that must be backed by real data before it is shown.
 *
 * Anything flagged `isPlaceholder: true` is NOT rendered by storefront pages
 * (use `publishable()`); flip the flag to false only after the figure,
 * testimonial, person or certificate has been verified with the business owner
 * and, ideally, moved to the database / CMS.
 */

export interface Placeholdable {
  isPlaceholder: boolean
}

/** Drops unverified placeholder entries so they never reach the page. */
export function publishable<T extends Placeholdable>(items: readonly T[]): T[] {
  return items.filter((item) => !item.isPlaceholder)
}

export const SITE_CONTACT = {
  hotline: "0362 023 048",
  hotlineHref: "tel:0362023048",
  email: "sipvy@sipvy.com",
  // Mon–Sat; keep in sync with the footer and /lien-he.
  supportHours: "8:00 - 22:00",
  sundayHours: "9:00 - 18:00",
} as const

export interface ProofStat extends Placeholdable {
  value: string
  label: string
}

// TODO(content): replace with verified figures (orders / CRM) before enabling.
export const PROOF_STATS: Record<"customers" | "businessClients" | "years" | "teaTypes" | "regions", ProofStat> = {
  customers: { value: "10.000+", label: "Khách hàng tin tưởng", isPlaceholder: true },
  businessClients: { value: "300+", label: "Doanh nghiệp đã phục vụ", isPlaceholder: true },
  years: { value: "10+", label: "Năm kinh nghiệm", isPlaceholder: true },
  teaTypes: { value: "50+", label: "Loại trà cao cấp", isPlaceholder: true },
  regions: { value: "15+", label: "Vùng trồng trà", isPlaceholder: true },
}

export interface Testimonial extends Placeholdable {
  name: string
  role: string
  rating: 1 | 2 | 3 | 4 | 5
  content: string
}

// TODO(content): load real, consented customer reviews (e.g. approved rows from
// the reviews table) instead of these sample quotes.
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Chị Minh Anh",
    role: "Hà Nội",
    rating: 5,
    content: "Trà cổ thụ của SIPVY thật sự khác biệt. Hương vị đậm đà, hậu ngọt sâu. Đóng gói cẩn thận, làm quà biếu rất sang trọng.",
    isPlaceholder: true,
  },
  {
    name: "Anh Tuấn Khang",
    role: "TP.HCM",
    rating: 5,
    content: "Mình đã thử nhiều thương hiệu, SIPVY là một trong những hãng giữ được chất lượng ổn định nhất. Oolong hương lan rất thơm.",
    isPlaceholder: true,
  },
  {
    name: "Cô Thu Hằng",
    role: "Đà Nẵng",
    rating: 5,
    content: "Sen Tây Hồ của SIPVY ướp đúng kiểu truyền thống, mùi sen rất tự nhiên. Giao hàng nhanh, sẽ tiếp tục ủng hộ.",
    isPlaceholder: true,
  },
]

export interface TeamMember extends Placeholdable {
  name: string
  position: string
  description: string
}

// TODO(content): replace with real team members (names, roles, photos).
export const TEAM_MEMBERS: TeamMember[] = [
  { name: "Nguyễn Văn A", position: "Giám đốc điều hành", description: "15 năm kinh nghiệm trong ngành trà, chuyên gia về trà cổ thụ", isPlaceholder: true },
  { name: "Trần Thị B", position: "Trưởng phòng Chất lượng", description: "Thạc sĩ Công nghệ thực phẩm, chuyên về kiểm định chất lượng trà", isPlaceholder: true },
  { name: "Lê Văn C", position: "Trưởng phòng Marketing", description: "Chuyên gia marketing với 10 năm kinh nghiệm xây dựng thương hiệu", isPlaceholder: true },
]

export interface Certification extends Placeholdable {
  label: string
}

// TODO(legal): list only certificates the business can show documentation for.
export const CERTIFICATIONS: Certification[] = [
  { label: "ISO 22000:2018", isPlaceholder: true },
  { label: "HACCP", isPlaceholder: true },
  { label: "Organic Certificate", isPlaceholder: true },
  { label: "VietGAP", isPlaceholder: true },
  { label: "Thương hiệu Quốc gia", isPlaceholder: true },
]
