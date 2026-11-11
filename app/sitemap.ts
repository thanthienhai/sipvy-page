import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/config"
import { getProducts } from "@/lib/data/products"

export const dynamic = "force-static"

// Cập nhật khi nội dung trang tĩnh thay đổi đáng kể. Không dùng "bây giờ": như vậy mỗi lần crawl đều trông như mới.
const LAST_MODIFIED = new Date("2026-11-01T00:00:00.000Z")

const STATIC_ROUTES: { path: string; priority: number }[] = [
  { path: "/", priority: 1.0 },
  { path: "/san-pham", priority: 0.9 },
  { path: "/qua-tang", priority: 0.8 },
  { path: "/qua-tet", priority: 0.8 },
  { path: "/tra-cho-genz", priority: 0.7 },
  { path: "/hieu-ve-tra", priority: 0.7 },
  { path: "/gioi-thieu", priority: 0.5 },
  { path: "/lien-he", priority: 0.5 },
  { path: "/chinh-sach-bao-mat", priority: 0.4 },
  { path: "/chinh-sach-van-chuyen", priority: 0.4 },
  { path: "/chinh-sach-doi-tra", priority: 0.4 },
  { path: "/dieu-khoan", priority: 0.4 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...STATIC_ROUTES.map((r) => ({
      url: `${SITE_URL}${r.path === "/" ? "/" : r.path + "/"}`,
      lastModified: LAST_MODIFIED,
      priority: r.priority,
    })),
    ...getProducts().map((p) => ({
      url: `${SITE_URL}/san-pham/${p.slug}/`,
      lastModified: LAST_MODIFIED,
      priority: 0.6,
    })),
  ]
}
