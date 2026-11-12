// Tạo ảnh minh hoạ + logo + favicon + ảnh chia sẻ (OG) cho nhận diện "trà cho người trẻ".
// Chạy: node scripts/make-brand-assets.mjs   (cần sharp, có sẵn cùng Next.js)
// Ảnh là minh hoạ phẳng, thay bằng ảnh chụp thật khi có (xem docs/brand-guideline.md).
import fs from "node:fs"
import path from "node:path"
import sharp from "sharp"

const root = path.resolve(import.meta.dirname, "..")
const out = (...p) => path.join(root, ...p)
fs.mkdirSync(out("public/art"), { recursive: true })

const C = {
  deep: "#2f4b16", dark: "#447013", mid: "#588f15", lime: "#8fcb3c", soft: "#cdeb9d", mist: "#e6f6cc",
  peach: "#ffab76", coral: "#f56d2a", sand: "#ffe5d4", cream: "#fff7ea", pink: "#ff9db8", blush: "#ffd9e4",
  sun: "#ffd24d", butter: "#fff0b8", white: "#ffffff", ink: "#1f2a12",
}

const svg = (w, h, bg, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-hidden="true"><rect width="${w}" height="${h}" fill="${bg}"/>${body}</svg>`

// Lá nhọn dọc trục x, dài 1 đơn vị = 130px
const leaf = (x, y, rot, s, fill, vein = C.deep, op = 1) =>
  `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" opacity="${op}"><path d="M0 0C40-34 92-34 130 0C92 34 40 34 0 0Z" fill="${fill}"/><path d="M6 0H116" stroke="${vein}" stroke-width="3" stroke-linecap="round" opacity=".55" fill="none"/></g>`
const dot = (x, y, r, fill, op = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" opacity="${op}"/>`
const blob = (cx, cy, r, fill, op = 1) => dot(cx, cy, r, fill, op)

// ---------- Danh mục (1000x1000) ----------
const art = {}

art["cat-shan-tuyet"] = svg(1000, 1000, C.mist, [
  blob(780, 240, 170, C.soft), blob(180, 820, 210, C.soft, 0.7),
  `<path d="M500 930C490 700 520 520 560 330" stroke="${C.deep}" stroke-width="16" stroke-linecap="round" fill="none"/>`,
  leaf(505, 780, -150, 1.5, C.mid), leaf(508, 700, -30, 1.45, C.lime),
  leaf(515, 590, -158, 1.3, C.dark), leaf(522, 520, -22, 1.3, C.mid),
  leaf(540, 430, -145, 1.05, C.lime), leaf(552, 360, -35, 1.05, C.dark),
  leaf(560, 330, -92, 0.9, C.lime),
  ...[[210, 190], [310, 120], [820, 520], [860, 640], [150, 520], [240, 650], [700, 130]].map(([x, y], i) => dot(x, y, 10 + (i % 3) * 5, C.white, 0.9)),
].join(""))

art["cat-xanh"] = svg(1000, 1000, C.soft, [
  blob(220, 200, 150, C.mist), blob(820, 820, 220, C.mist, 0.8),
  ...[-26, 0, 26].map((a) => {
    const rot = a
    return `<g transform="translate(500 900) rotate(${rot})"><path d="M0 0C-6-200 6-380 0-560" stroke="${C.deep}" stroke-width="14" stroke-linecap="round" fill="none"/>${leaf(0, -330, -150, 1.35, C.mid)}${leaf(0, -330, -30, 1.35, C.dark)}${leaf(0, -470, -145, 1, C.lime)}${leaf(0, -470, -35, 1, C.mid)}<path d="M0 -560C-30 -620 30 -650 0 -720C-40 -660 30 -620 0 -560Z" fill="${C.lime}" transform="translate(0 40)"/></g>`
  }),
  dot(120, 520, 14, C.white, 0.9), dot(880, 360, 18, C.white, 0.9), dot(760, 120, 10, C.white, 0.9),
].join(""))

const roll = (x, y, r, fill) =>
  `<g><circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/><path d="M${x} ${y}m0 ${-r * 0.7}a${r * 0.7} ${r * 0.7} 0 1 1 ${-r * 0.5} ${r * 0.5}a${r * 0.4} ${r * 0.4} 0 1 1 ${r * 0.3} ${-r * 0.1}" stroke="${C.deep}" stroke-width="${r * 0.09}" stroke-linecap="round" fill="none" opacity=".55"/></g>`
art["cat-o-long"] = svg(1000, 1000, C.sand, [
  blob(800, 200, 180, "#ffd2b4"), blob(150, 800, 220, "#ffd2b4", 0.7),
  leaf(200, 300, -40, 1.6, C.mid), leaf(780, 760, 150, 1.6, C.lime), leaf(240, 760, 30, 1.2, C.dark),
  roll(430, 470, 130, C.dark), roll(640, 560, 105, C.mid), roll(520, 690, 92, C.lime), roll(360, 650, 70, C.mid),
  dot(820, 400, 14, C.coral, 0.9), dot(180, 520, 12, C.coral, 0.9), dot(700, 300, 10, C.white, 0.9),
].join(""))

const petal = (rot, fill, len = 250, wd = 80) =>
  `<ellipse cx="0" cy="${-len * 0.55}" rx="${wd}" ry="${len * 0.55}" fill="${fill}" transform="rotate(${rot})"/>`
art["cat-sen"] = svg(1000, 1000, C.blush, [
  blob(200, 200, 160, "#ffc2d4"), blob(840, 780, 210, "#ffc2d4", 0.8),
  `<ellipse cx="500" cy="780" rx="360" ry="110" fill="${C.mid}"/><ellipse cx="500" cy="770" rx="300" ry="80" fill="${C.lime}"/>`,
  `<g transform="translate(500 700)">${[-64, -32, 32, 64].map((a) => petal(a, C.pink, 330, 90)).join("")}${[-96, 96].map((a) => petal(a, "#ff7da1", 280, 80)).join("")}${petal(0, "#ffb8cc", 360, 100)}${dot(0, -30, 46, C.sun)}</g>`,
  dot(130, 560, 14, C.white, 0.9), dot(880, 360, 18, C.white, 0.9),
].join(""))

const flower = (x, y, s) =>
  `<g transform="translate(${x} ${y}) scale(${s})">${Array.from({ length: 10 }, (_, i) => `<ellipse cx="0" cy="-92" rx="34" ry="68" fill="${C.white}" transform="rotate(${i * 36})"/>`).join("")}${dot(0, 0, 54, C.sun)}${dot(-10, -10, 14, "#ffe27a")}</g>`
art["cat-thao-moc"] = svg(1000, 1000, C.butter, [
  blob(820, 200, 170, "#ffe58a"), blob(160, 840, 210, "#ffe58a", 0.7),
  leaf(500, 960, -92, 2.6, C.mid, C.deep), leaf(380, 760, -150, 1.4, C.lime), leaf(640, 700, -30, 1.4, C.dark),
  `<path d="M500 960C500 800 480 650 450 470M500 960C520 780 600 640 700 520" stroke="${C.deep}" stroke-width="12" fill="none" stroke-linecap="round"/>`,
  flower(450, 440, 1.2), flower(710, 500, 0.9), flower(250, 560, 0.7),
].join(""))

art["cat-phu-kien"] = svg(1000, 1000, C.cream, [
  blob(840, 200, 170, C.sand), blob(160, 820, 220, C.mist, 0.9),
  // ấm
  `<ellipse cx="470" cy="880" rx="300" ry="34" fill="${C.deep}" opacity=".12"/>`,
  `<path d="M170 560C170 420 290 360 450 360C610 360 730 420 730 560C730 740 620 840 450 840C280 840 170 740 170 560Z" fill="${C.mid}"/>`,
  `<path d="M700 520C830 470 880 540 900 600C780 590 730 620 720 640Z" fill="${C.dark}"/>`,
  `<path d="M200 520C90 480 80 700 210 700" stroke="${C.dark}" stroke-width="40" stroke-linecap="round" fill="none"/>`,
  `<ellipse cx="450" cy="360" rx="150" ry="36" fill="${C.dark}"/><rect x="430" y="290" width="40" height="70" rx="20" fill="${C.lime}"/><circle cx="450" cy="285" r="28" fill="${C.peach}"/>`,
  `<path d="M270 540C290 480 350 450 420 450" stroke="${C.white}" stroke-width="22" stroke-linecap="round" fill="none" opacity=".35"/>`,
  // ly
  `<path d="M620 760h210l-24 120H644Z" fill="${C.peach}"/><rect x="620" y="748" width="210" height="22" rx="11" fill="${C.coral}"/>`,
  dot(130, 300, 14, C.peach), dot(880, 400, 12, C.lime), dot(300, 180, 10, C.lime),
].join(""))

// Minh hoạ lớn dùng cho khối "câu chuyện" (cốc trà đá)
art["story"] = svg(1200, 1200, C.mist, [
  blob(980, 200, 220, C.soft), blob(180, 1020, 260, C.soft, 0.8), blob(160, 240, 90, C.sand),
  `<rect x="808" y="170" width="26" height="560" rx="13" fill="${C.coral}" transform="rotate(14 820 450)"/>`,
  `<path d="M360 330h480l-56 700q-6 60-70 60H486q-64 0-70-60Z" fill="${C.white}" opacity=".9"/>`,
  `<path d="M372 470h456l-44 560q-6 60-70 60H486q-64 0-70-60Z" fill="${C.peach}"/>`,
  `<path d="M372 470h456l-8 90H380Z" fill="${C.coral}" opacity=".35"/>`,
  `<rect x="460" y="560" width="120" height="120" rx="26" fill="${C.white}" opacity=".75" transform="rotate(-12 520 620)"/>`,
  `<rect x="620" y="690" width="110" height="110" rx="24" fill="${C.white}" opacity=".7" transform="rotate(16 675 745)"/>`,
  `<rect x="500" y="820" width="100" height="100" rx="22" fill="${C.white}" opacity=".65" transform="rotate(8 550 870)"/>`,
  leaf(600, 470, -120, 1.1, C.lime), leaf(610, 470, -60, 1.1, C.mid),
  dot(300, 560, 16, C.white, 0.9), dot(940, 900, 20, C.white, 0.9), dot(260, 820, 12, C.coral, 0.8),
].join(""))

// Nền hero (1600x900): hoạ tiết lá nhẹ, dùng với độ mờ
const heroLeaves = [
  [180, 160, -30, 1.4, C.lime], [420, 700, 20, 1.2, C.soft], [1250, 140, 200, 1.5, C.soft], [1420, 640, 150, 1.8, C.lime],
  [800, 780, -160, 1.1, C.soft], [1000, 260, 30, 1.0, C.lime], [120, 560, 160, 1.1, C.soft],
]
art["hero"] = svg(1600, 900, C.mist, [
  blob(1350, 160, 260, C.sand, 0.9), blob(260, 800, 300, C.soft, 0.7), blob(1100, 780, 160, C.blush, 0.8),
  ...heroLeaves.map(([x, y, r, s, f]) => leaf(x, y, r, s, f, C.mid, 0.85)),
  ...[[640, 140], [1180, 420], [320, 380], [1500, 400], [900, 560]].map(([x, y], i) => dot(x, y, 8 + i * 2, C.white, 0.9)),
].join(""))

for (const [name, content] of Object.entries(art)) fs.writeFileSync(out("public/art", `${name}.svg`), content)

// 4 biến thể mỗi danh mục (đổi nền, lật, xoay nhẹ) để lưới sản phẩm không lặp một hình
const BG_ALT = [null, C.sand, C.butter, C.blush, C.mist, C.soft]
const TWEAK = [
  { flip: false, rot: 0, scale: 1 },
  { flip: true, rot: -7, scale: 1.08 },
  { flip: false, rot: 8, scale: 1.04 },
  { flip: true, rot: 5, scale: 1.12 },
]
for (const [name, content] of Object.entries(art)) {
  if (!name.startsWith("cat-")) continue
  const m = content.match(/^(<svg[^>]*>)<rect width="1000" height="1000" fill="(#[0-9a-f]+)"\/>([\s\S]*)<\/svg>$/i)
  if (!m) continue
  TWEAK.forEach((t, i) => {
    const bg = i === 0 ? m[2] : BG_ALT[(i * 2 + name.length) % BG_ALT.length] ?? m[2]
    const tf = `translate(500 500) rotate(${t.rot}) scale(${t.flip ? -t.scale : t.scale} ${t.scale}) translate(-500 -500)`
    fs.writeFileSync(out("public/art", `${name}-v${i + 1}.svg`), `${m[1]}<rect width="1000" height="1000" fill="${bg}"/><g transform="${tf}">${m[3]}</g></svg>`)
  })
}

// ---------- Logo (dấu hiệu: giọt trà + lá) ----------
const mark = (size = 128) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="${size}" height="${size}"><rect width="128" height="128" rx="34" fill="${C.deep}"/><path d="M30 78C30 46 54 28 92 30C94 66 76 94 46 94C38 94 30 90 30 78Z" fill="${C.lime}"/><path d="M40 86C54 70 68 56 84 44" stroke="${C.deep}" stroke-width="5" stroke-linecap="round" fill="none"/><circle cx="92" cy="92" r="13" fill="${C.peach}"/></svg>`
fs.writeFileSync(out("public/logo.svg"), mark())
fs.writeFileSync(out("app/icon.svg"), mark())
await sharp(Buffer.from(mark(512))).png().toFile(out("public/logo.png"))
await sharp(Buffer.from(mark(180))).png().toFile(out("app/apple-icon.png"))

// ---------- Ảnh chia sẻ 1200x630 ----------
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="${C.deep}"/>
<circle cx="1040" cy="120" r="260" fill="${C.dark}"/><circle cx="1100" cy="560" r="170" fill="${C.mid}" opacity=".7"/>
<g transform="translate(840 140) scale(1.05)">${leaf(0, 200, -150, 1.4, C.lime, C.deep)}${leaf(60, 190, -30, 1.4, C.soft, C.deep)}${leaf(20, 100, -120, 1.1, C.mid, C.deep)}<circle cx="170" cy="250" r="22" fill="${C.peach}"/></g>
<g transform="translate(80 110)"><g transform="scale(.85)">${mark(128).replace(/<svg[^>]*>|<\/svg>/g, "")}</g>
<text x="130" y="80" font-family="Arial,Helvetica,sans-serif" font-size="84" font-weight="800" fill="#fff">sipvy</text></g>
<text x="80" y="360" font-family="Arial,Helvetica,sans-serif" font-size="58" font-weight="800" fill="#fff">Trà Việt cho người trẻ</text>
<text x="80" y="430" font-family="Arial,Helvetica,sans-serif" font-size="34" fill="${C.soft}">Dễ pha, dễ uống, hợp nhịp sống mỗi ngày</text>
<rect x="80" y="490" width="250" height="56" rx="28" fill="${C.peach}"/><text x="205" y="528" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="26" font-weight="700" fill="${C.ink}">sipvy.shop</text></svg>`
await sharp(Buffer.from(og)).png().toFile(out("public/og.png"))

console.log("OK:", Object.keys(art).length, "ảnh minh hoạ + logo + favicon + og.png")
