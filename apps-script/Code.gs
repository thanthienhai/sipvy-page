/**
 * SIPVY – nhận đơn hàng / liên hệ / đăng ký tin từ trang tĩnh, ghi vào Google Sheet.
 *
 * Cách dùng (chi tiết trong README.md):
 *  1. Tạo một Google Sheet mới, mở Tiện ích mở rộng → Apps Script, dán toàn bộ file này.
 *  2. (Tuỳ chọn) điền NOTIFY_EMAIL để nhận email mỗi khi có đơn/liên hệ mới.
 *  3. Triển khai → Triển khai mới → Loại: Ứng dụng web
 *       - Thực thi dưới tên: Tôi
 *       - Ai có quyền truy cập: Bất kỳ ai
 *  4. Copy URL Web App (đuôi /exec) → đặt vào NEXT_PUBLIC_ORDER_ENDPOINT khi build.
 *
 * Mỗi lần sửa code phải "Triển khai → Quản lý bản triển khai → Chỉnh sửa → Phiên bản mới",
 * nếu không URL /exec vẫn chạy bản cũ.
 */

const NOTIFY_EMAIL = "" // ví dụ "sipvy@sipvy.com"; để trống = không gửi email

const SHEETS = {
  order: {
    name: "Đơn hàng",
    header: ["Thời gian", "Mã tham chiếu", "Họ tên", "Số điện thoại", "Email", "Địa chỉ", "Ghi chú",
             "Thanh toán", "Sản phẩm", "Tạm tính", "Phí giao hàng", "Tổng dự kiến", "Đồng ý xử lý dữ liệu", "Trạng thái"],
  },
  contact: {
    name: "Liên hệ",
    header: ["Thời gian", "Họ tên", "Email", "Số điện thoại", "Chủ đề", "Nội dung", "Trang gửi"],
  },
  newsletter: {
    name: "Đăng ký nhận tin",
    header: ["Thời gian", "Email", "Nguồn", "Đồng ý nhận email", "Trang gửi"],
  },
}

function doPost(e) {
  const lock = LockService.getScriptLock()
  try {
    lock.waitLock(20000)
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}")

    // Ô ẩn (honeypot): người thật không điền. Bot điền => bỏ qua nhưng vẫn trả về như thành công.
    if (data.website) return json_({ ok: true })

    const kind = String(data.kind || "")
    if (!SHEETS[kind]) return json_({ ok: false, error: "kind không hợp lệ" })

    let row, subject, body
    if (kind === "order") {
      const c = data.customer || {}
      const items = Array.isArray(data.items) ? data.items : []
      const t = data.totals || {}
      if (!c.name || !c.phone || !c.address || !items.length) return json_({ ok: false, error: "thiếu dữ liệu đơn hàng" })
      if (data.consent !== true) return json_({ ok: false, error: "chưa đồng ý xử lý dữ liệu" })
      const itemsText = items
        .map(function (i) { return i.name + " (" + i.weight + (i.boxType ? ", " + i.boxType : "") + ") x" + i.quantity + " = " + i.lineTotal })
        .join("\n")
      row = [now_(), data.reference, c.name, c.phone, c.email || "", c.address, c.note || "",
             data.payment === "bank" ? "Chuyển khoản" : "COD", itemsText, t.subtotal, t.shipping, t.total, "Có", "Mới"]
      subject = "Đơn hàng mới " + data.reference
      body = [c.name, c.phone, c.address, "", itemsText, "", "Tổng dự kiến: " + t.total].join("\n")
    } else if (kind === "contact") {
      if (!data.name || !data.email || !data.message) return json_({ ok: false, error: "thiếu dữ liệu liên hệ" })
      row = [now_(), data.name, data.email, data.phone || "", data.subject || "", data.message, data.page || ""]
      subject = "Liên hệ mới từ " + data.name
      body = [data.name, data.email, data.phone || "", "", data.message].join("\n")
    } else {
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(data.email || ""))) return json_({ ok: false, error: "email không hợp lệ" })
      if (data.consent !== true) return json_({ ok: false, error: "chưa đồng ý nhận email" })
      row = [now_(), data.email, data.source || "website", "Có", data.page || ""]
    }

    sheet_(kind).appendRow(row.map(safe_))
    if (NOTIFY_EMAIL && body) MailApp.sendEmail(NOTIFY_EMAIL, "[SIPVY] " + subject, body)
    return json_({ ok: true })
  } catch (err) {
    return json_({ ok: false, error: String(err) })
  } finally {
    try { lock.releaseLock() } catch (ignore) {}
  }
}

/** Mở URL /exec bằng trình duyệt để kiểm tra Web App đang chạy. */
function doGet() {
  return json_({ ok: true, service: "sipvy-forms" })
}

function sheet_(kind) {
  const cfg = SHEETS[kind]
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  let sh = ss.getSheetByName(cfg.name)
  if (!sh) {
    sh = ss.insertSheet(cfg.name)
    sh.appendRow(cfg.header)
    sh.setFrozenRows(1)
    sh.getRange(1, 1, 1, cfg.header.length).setFontWeight("bold")
  }
  return sh
}

// Chặn "formula injection": ô bắt đầu bằng = + - @ sẽ bị Sheets hiểu là công thức.
function safe_(v) {
  if (typeof v !== "string") return v
  return /^[=+\-@]/.test(v) ? "'" + v : v
}

function now_() {
  return Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "yyyy-MM-dd HH:mm:ss")
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON)
}
