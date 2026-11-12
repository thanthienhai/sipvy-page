import type { CSSProperties } from "react"

/** Màu Tết: đỏ son, vàng kim, vàng mai, hồng đào. */
export const TET = {
  red: "#a30f1b",
  redDeep: "#6d0a12",
  gold: "#f2c14e",
  goldSoft: "#fbe3a1",
  cream: "#fff7e6",
  mai: "#f7c52b",
  dao: "#f48fb1",
} as const

const PETAL_ANGLES = [0, 72, 144, 216, 288]

/** Hoa mai 5 cánh (miền Nam). */
export function MaiFlower({ x, y, r = 16, color = TET.mai }: { x: number; y: number; r?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {PETAL_ANGLES.map((a) => (
        <ellipse key={a} cx="0" cy={-r * 0.62} rx={r * 0.5} ry={r * 0.62} fill={color} transform={`rotate(${a})`} />
      ))}
      <circle r={r * 0.3} fill="#e8741c" />
      {PETAL_ANGLES.map((a) => (
        <circle key={a} cx="0" cy={-r * 0.16} r={r * 0.045} fill="#7a3b0c" transform={`rotate(${a + 36})`} />
      ))}
    </g>
  )
}

function Bud({ x, y, color = TET.mai }: { x: number; y: number; color?: string }) {
  return <circle cx={x} cy={y} r="5" fill={color} opacity="0.9" />
}

/** Cành mai, tựa vào góc trên bên phải; lật bằng className scale-x-[-1] cho góc trái. */
export function MaiBranch({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 360 300" className={className} style={style} aria-hidden="true" focusable="false">
      <g fill="none" stroke="#4a2a14" strokeLinecap="round">
        <path d="M360 40 C290 50 240 90 190 130 C150 162 110 170 60 215" strokeWidth="7" />
        <path d="M262 82 C250 52 262 28 290 8" strokeWidth="4" />
        <path d="M200 124 C206 160 190 190 168 214" strokeWidth="3.5" />
        <path d="M120 164 C108 138 112 112 88 94" strokeWidth="3" />
        <path d="M60 215 C46 232 30 238 12 262" strokeWidth="3.5" />
      </g>
      <MaiFlower x={290} y={14} r={20} />
      <MaiFlower x={246} y={58} r={16} />
      <MaiFlower x={206} y={116} r={22} />
      <MaiFlower x={166} y={216} r={17} />
      <MaiFlower x={92} y={96} r={15} />
      <MaiFlower x={128} y={176} r={19} />
      <MaiFlower x={60} y={212} r={14} />
      <MaiFlower x={14} y={262} r={13} />
      <Bud x={322} y={62} />
      <Bud x={232} y={98} />
      <Bud x={150} y={150} />
      <Bud x={76} y={178} />
    </svg>
  )
}

/** Cành đào (miền Bắc): hoa hồng 5 cánh nhỏ hơn. */
export function DaoBranch({ className, style }: { className?: string; style?: CSSProperties }) {
  const flowers = [
    [300, 28, 15],
    [250, 70, 13],
    [208, 118, 17],
    [160, 150, 13],
    [118, 190, 15],
    [84, 226, 12],
  ] as const
  return (
    <svg viewBox="0 0 360 300" className={className} style={style} aria-hidden="true" focusable="false">
      <g fill="none" stroke="#4a2a14" strokeLinecap="round">
        <path d="M360 24 C300 40 250 70 206 120 C170 160 120 180 80 240" strokeWidth="6" />
        <path d="M250 70 C240 44 250 24 276 6" strokeWidth="3.5" />
        <path d="M160 150 C140 130 140 108 118 90" strokeWidth="3" />
      </g>
      {flowers.map(([x, y, r]) => (
        <MaiFlower key={`${x}-${y}`} x={x} y={y} r={r} color={TET.dao} />
      ))}
    </svg>
  )
}

/** Lồng đèn đỏ treo, có dây và tua. */
export function Lantern({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 80 170" className={className} style={style} aria-hidden="true" focusable="false">
      <line x1="40" y1="0" x2="40" y2="30" stroke={TET.gold} strokeWidth="2" />
      <rect x="28" y="28" width="24" height="9" rx="2" fill={TET.gold} />
      <ellipse cx="40" cy="78" rx="34" ry="42" fill={TET.red} />
      <ellipse cx="40" cy="78" rx="20" ry="42" fill="none" stroke={TET.redDeep} strokeWidth="2" />
      <ellipse cx="40" cy="78" rx="6" ry="42" fill="none" stroke={TET.redDeep} strokeWidth="2" />
      <path d="M12 56 Q40 70 68 56 M10 80 Q40 94 70 80 M12 102 Q40 116 68 102" fill="none" stroke={TET.gold} strokeOpacity="0.55" strokeWidth="1.5" />
      <rect x="28" y="118" width="24" height="9" rx="2" fill={TET.gold} />
      <g stroke={TET.gold} strokeWidth="2" strokeLinecap="round">
        <line x1="34" y1="127" x2="34" y2="164" />
        <line x1="40" y1="127" x2="40" y2="170" />
        <line x1="46" y1="127" x2="46" y2="164" />
      </g>
    </svg>
  )
}

/** Đồng tiền xưa: tròn, lỗ vuông. */
export function Coin({ className, size = 28 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <circle cx="16" cy="16" r="14" fill={TET.gold} stroke="#c8932a" strokeWidth="2" />
      <rect x="11" y="11" width="10" height="10" fill={TET.redDeep} stroke="#c8932a" strokeWidth="1.5" />
    </svg>
  )
}

/** Bao lì xì. */
export function RedEnvelope({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 160" className={className} aria-hidden="true" focusable="false">
      <rect x="6" y="6" width="108" height="148" rx="10" fill={TET.red} stroke={TET.gold} strokeWidth="3" />
      <path d="M6 16 Q60 86 114 16" fill={TET.redDeep} stroke={TET.gold} strokeWidth="2" />
      <circle cx="60" cy="84" r="20" fill={TET.gold} />
      <text x="60" y="93" textAnchor="middle" fontSize="26" fontWeight="700" fill={TET.redDeep} fontFamily="serif">
        福
      </text>
      <circle cx="60" cy="84" r="24" fill="none" stroke={TET.goldSoft} strokeWidth="1.5" strokeDasharray="3 3" />
    </svg>
  )
}

/** Dải hoa văn lặp (ô vuông lồng, gợi hoạ tiết cửa sổ & gốm Bát Tràng). */
export function PatternStrip({ className, tone = "gold" }: { className?: string; tone?: "gold" | "red" }) {
  const stroke = tone === "gold" ? TET.gold : TET.red
  return (
    <svg className={className} width="100%" height="18" aria-hidden="true" focusable="false">
      <defs>
        <pattern id={`tet-strip-${tone}`} width="36" height="18" patternUnits="userSpaceOnUse">
          <path d="M0 9 L9 0 L18 9 L9 18 Z" fill="none" stroke={stroke} strokeWidth="1.4" />
          <path d="M18 9 L27 0 L36 9 L27 18 Z" fill="none" stroke={stroke} strokeWidth="1.4" />
          <circle cx="9" cy="9" r="2" fill={stroke} />
          <circle cx="27" cy="9" r="2" fill={stroke} />
        </pattern>
      </defs>
      <rect width="100%" height="18" fill={`url(#tet-strip-${tone})`} />
    </svg>
  )
}

/** Nền hoa văn cánh sen/vảy cá mờ, dùng làm lớp phủ cho khối đỏ. */
export const LATTICE_BG =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'><g fill='none' stroke='%23f2c14e' stroke-opacity='0.16' stroke-width='1.4'><circle cx='28' cy='28' r='14'/><circle cx='0' cy='0' r='14'/><circle cx='56' cy='0' r='14'/><circle cx='0' cy='56' r='14'/><circle cx='56' cy='56' r='14'/></g></svg>\")"

/** Câu đối đỏ chữ vàng: dọc trên màn rộng, ngang trên điện thoại. */
export function Couplet({ text, className }: { text: string; className?: string }) {
  return (
    <div
      className={`rounded-md border-2 border-[#f2c14e] bg-[#a30f1b] px-3 py-4 text-center text-sm font-semibold leading-relaxed text-[#fbe3a1] shadow-lg md:[writing-mode:vertical-rl] md:px-4 md:py-6 md:text-base md:tracking-[0.25em] ${className ?? ""}`}
    >
      {text}
    </div>
  )
}
