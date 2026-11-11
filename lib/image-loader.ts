import { BASE_PATH } from "@/lib/config"

// Xuất tĩnh không có máy chủ tối ưu ảnh: ảnh nội bộ giữ nguyên (+ basePath),
// ảnh Unsplash thì xin đúng kích thước qua tham số của họ.
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (/^https?:\/\//.test(src)) {
    if (src.includes("images.unsplash.com")) {
      const sep = src.includes("?") ? "&" : "?"
      return `${src}${sep}auto=format&fit=crop&w=${width}&q=${quality || 75}`
    }
    return src
  }
  return `${BASE_PATH}${src}`
}
