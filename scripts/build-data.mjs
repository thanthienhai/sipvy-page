// Chuyển data/seed-data.json (nguồn gốc từ hệ thống SIPVY) sang data/products.json
// đúng kiểu `Product` mà giao diện đang dùng. Chạy: npm run build:data
import { readFileSync, writeFileSync } from "node:fs"

const seed = JSON.parse(readFileSync(new URL("../data/seed-data.json", import.meta.url), "utf8"))
const NOW = "2026-01-01T00:00:00.000Z"

// Ảnh trong dữ liệu seed gốc là ảnh Unsplash mẫu: phần lớn đã chết (404), phần còn sống thì sai chủ đề
// (ví dụ ảnh nước ép cho trà). Thay bằng ảnh có sẵn của SIPVY trong /public theo danh mục.
// Khi có ảnh sản phẩm thật: bỏ ảnh vào public/products/ rồi sửa trường images trong data/seed-data.json
// thành "/products/ten-anh.jpg" (đường dẫn bắt đầu bằng "/" được giữ nguyên).
const FALLBACK_BY_CATEGORY = {
  "tra-shan-tuyet": "/san-pham-noi-bat/co-thu.jpg",
  "tra-o-long": "/san-pham-noi-bat/o-long.jpg",
  "tra-sen": "/san-pham-noi-bat/sen-tay-ho.jpeg",
  "tra-xanh": "/san-pham-noi-bat/tra-lai.jpg",
  "tra-thao-moc": "/banner/hieu-ve-tra.jpg",
  "phu-kien-tra": "/placeholder.jpg",
}
const fixImage = (url, categoryId) =>
  url.includes("images.unsplash.com") ? FALLBACK_BY_CATEGORY[categoryId] : url

const categories = seed.categories.map((c) => ({ id: c.slug, name: c.name, slug: c.slug }))
const catBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]))

const products = seed.products.map((p) => {
  const weights = p.weights?.length ? p.weights : [{ weight: "default", price: p.price }]
  const variants = weights.map((w, i) => ({
    id: `${p.slug}:${i}`,
    weight: w.weight,
    boxType: w.boxType || "standard",
    sku: `${p.slug}-${w.weight}-${w.boxType || "standard"}`.toUpperCase().replace(/[^A-Z0-9]+/g, "-"),
    price: w.price,
    originalPrice: w.originalPrice ?? p.originalPrice,
    stockQuantity: 100,
    inStock: true,
    status: "ACTIVE",
  }))
  const spec = (labels) => p.specifications?.find((s) => labels.includes(s.label))?.value
  return {
    id: p.slug,
    name: p.name,
    slug: p.slug,
    description: p.shortDescription,
    shortDescription: p.shortDescription,
    price: Math.min(...variants.map((v) => v.price)),
    originalPrice: p.originalPrice,
    origin: spec(["Xuất xứ"]),
    shelfLife: spec(["Hạn sử dụng", "HSD"]),
    storageInstructions: spec(["Bảo quản"]),
    images: [...new Set(p.images.map((url) => fixImage(url, p.categoryId)))].map((url, i) => ({
      id: `${p.slug}:img${i}`,
      url,
      alt: p.name,
      isPrimary: i === 0,
    })),
    category: catBySlug[p.categoryId],
    weight: variants,
    variants,
    inStock: true,
    stockQuantity: 100,
    specifications: p.specifications ?? [],
    brewingInstructions: p.brewingInstructions ?? [],
    reviews: [],
    relatedProducts: [],
    tags: [],
    featured: false,
    createdAt: NOW,
    updatedAt: NOW,
  }
})

// "Nổi bật" cố định (không random): 2 sản phẩm đầu của mỗi nhóm trà, bỏ phụ kiện.
const seen = {}
for (const p of products) {
  if (p.category.slug === "phu-kien-tra") continue
  seen[p.category.slug] = (seen[p.category.slug] ?? 0) + 1
  if (seen[p.category.slug] <= 2) p.featured = true
}

writeFileSync(new URL("../data/products.json", import.meta.url), JSON.stringify({ categories, products }, null, 2))
console.log(`OK: ${categories.length} danh mục, ${products.length} sản phẩm, ${products.filter((p) => p.featured).length} nổi bật`)
