import { FORM_ENDPOINT } from "@/lib/config"

export type FormKind = "order" | "contact" | "newsletter"

/**
 * Gửi dữ liệu form tới Google Apps Script Web App (xem apps-script/Code.gs).
 *
 * Apps Script không trả header CORS cho trình duyệt, nên dùng `mode: "no-cors"` với
 * `text/plain` (một "simple request", không cần preflight). Hệ quả: không đọc được
 * phản hồi, nên coi như thành công nếu mạng không lỗi. Việc kiểm tra dữ liệu thật
 * sự (bắt buộc điền, chống spam) vừa làm ở trình duyệt vừa làm lại trong Code.gs.
 */
export async function submitForm(kind: FormKind, data: Record<string, unknown>): Promise<void> {
  if (!FORM_ENDPOINT) {
    throw new Error("Biểu mẫu chưa được cấu hình. Vui lòng liên hệ trực tiếp qua hotline hoặc Zalo.")
  }
  await fetch(FORM_ENDPOINT, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ kind, submittedAt: new Date().toISOString(), page: location.pathname, ...data }),
  })
}
