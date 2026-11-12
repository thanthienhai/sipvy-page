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


// ---- Định vị "trà cho người trẻ": bỏ từ so sánh tuyệt đối, công dụng sức khỏe (xem docs/brand-guideline.md).
// Chỉ áp dụng khi build; data/seed-data.json (nguồn) giữ nguyên.
const nfc = (t) => String(t).normalize("NFC")
const re = (parts, flags) => new RegExp(parts.map(nfc).join(""), flags)
const STRIP_WORDS = re([String.raw`\s+(Thượng Hạng|Cao Cấp|Tinh Xảo)`], "g")
const MAU_SO = re([String.raw`\s+Mẫu\s+Số\s+(\d+)$`])
const SO = re([String.raw`\s+Số\s+(\d+)$`])
const cleanName = (name) =>
  nfc(name)
    .replace(STRIP_WORDS, "")
    .replace(MAU_SO, " Mẫu $1")
    .replace(SO, " — Loại $1")
    .trim()

const DESCRIPTION_BY_CATEGORY = {
  "tra-shan-tuyet": "Trà Shan Tuyết hái từ những cây chè cổ thụ trên núi cao Tây Bắc. Vị đậm, hậu ngọt, dễ pha một ấm hay một bình lớn.",
  "tra-xanh": "Trà xanh Tân Cương Thái Nguyên với hương cốm non, vị chát nhẹ và hậu ngọt. Pha nhanh, hợp uống lúc làm việc.",
  "tra-o-long": "Trà Ô Long lên men bán phần, hương hoa cỏ nhẹ và vị ngọt dịu. Uống nóng hay ủ lạnh đều hợp.",
  "tra-sen": "Trà Sen ướp thủ công với hoa sen tươi, hương sen thanh nhẹ. Một món trà Việt dễ uống cho buổi chiều.",
  "tra-thao-moc": "Trà thảo mộc hương thơm nhẹ, không chứa trà, dễ uống vào buổi tối. Hãm nóng và thưởng thức chậm.",
}
const ADVICE = re([String.raw`\s*Sự lựa chọn hoàn hảo cho không gian trà đạo\.`])
const cleanDescription = (text, categoryId) =>
  DESCRIPTION_BY_CATEGORY[categoryId] ??
  nfc(text || "")
    .replace(ADVICE, "")
    .replace(nfc("Bộ chén tống cao cấp"), nfc("Bộ chén tống"))
    .replace(nfc("chế tác thủ công tinh xảo"), nfc("chế tác thủ công"))
    .trim()
const cleanSpec = (spec) => ({ ...spec, value: nfc(spec.value).replace(/^100%\s+/, "").replace(nfc("Gốm sứ cao cấp/Tử sa"), nfc("Gốm sứ / Tử sa")) })

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
    name: cleanName(p.name),
    slug: p.slug,
    description: cleanDescription(p.shortDescription, p.categoryId),
    shortDescription: cleanDescription(p.shortDescription, p.categoryId),
    price: Math.min(...variants.map((v) => v.price)),
    originalPrice: p.originalPrice,
    origin: spec(["Xuất xứ"]),
    shelfLife: spec(["Hạn sử dụng", "HSD"]),
    storageInstructions: spec(["Bảo quản"]),
    images: [...new Set(p.images.map((url) => fixImage(url, p.categoryId)))].map((url, i) => ({
      id: `${p.slug}:img${i}`,
      url,
      alt: cleanName(p.name),
      isPrimary: i === 0,
    })),
    category: catBySlug[p.categoryId],
    weight: variants,
    variants,
    inStock: true,
    stockQuantity: 100,
    specifications: (p.specifications ?? []).map(cleanSpec),
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
