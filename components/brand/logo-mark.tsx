/** Dấu hiệu SIPVY (giọt trà + lá). Vẽ bằng SVG nên sắc nét ở mọi kích thước. */
export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} aria-hidden="true" focusable="false">
      <rect width="128" height="128" rx="34" fill="#2f4b16" />
      <path d="M30 78C30 46 54 28 92 30C94 66 76 94 46 94C38 94 30 90 30 78Z" fill="#8fcb3c" />
      <path d="M40 86C54 70 68 56 84 44" stroke="#2f4b16" strokeWidth="5" strokeLinecap="round" fill="none" />
      <circle cx="92" cy="92" r="13" fill="#ffab76" />
    </svg>
  )
}
