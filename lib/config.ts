/**
 * Cấu hình chung của trang tĩnh. Đặt qua biến môi trường lúc build (xem README):
 *  - NEXT_PUBLIC_SITE_URL      : https://ten-mien-cua-ban.vn   (dùng cho canonical, sitemap, JSON-LD)
 *  - NEXT_PUBLIC_BASE_PATH     : "" nếu dùng tên miền riêng; "/sipvy-page" nếu dùng user.github.io/sipvy-page
 *  - NEXT_PUBLIC_ORDER_ENDPOINT: URL Web App của Google Apps Script (nhận đơn hàng / liên hệ / đăng ký tin)
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "")
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ""
export const FORM_ENDPOINT = process.env.NEXT_PUBLIC_ORDER_ENDPOINT || ""

/** Thêm basePath cho đường dẫn file tĩnh dùng trong <img>/<a href> thường (Link và Image đã tự xử lý). */
export function withBase(path: string): string {
  return path.startsWith("/") ? `${BASE_PATH}${path}` : path
}
