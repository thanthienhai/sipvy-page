# SIPVY Page

Bản **trang tĩnh** của cửa hàng SIPVY, triển khai trên **GitHub Pages**. Giao diện lấy từ hệ thống SIPVY (Next.js) nhưng không có máy chủ hay cơ sở dữ liệu:

- Sản phẩm đọc từ file JSON, dựng thành HTML lúc build (52 sản phẩm, mỗi sản phẩm một trang).
- Giỏ hàng lưu trong trình duyệt (`localStorage`).
- **Đặt hàng / Liên hệ / Đăng ký nhận tin** gửi qua **Google Apps Script** và ghi vào **Google Sheet**.
- Không có thanh toán online, tài khoản, admin, tồn kho tự động. SIPVY gọi hoặc nhắn xác nhận từng đơn.

## Chạy thử trên máy

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # xuất HTML tĩnh vào thư mục out/
npm run typecheck
```

## Cấu hình (biến lúc build)

| Biến | Ý nghĩa | Ví dụ |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Địa chỉ gốc của site (canonical, sitemap, JSON-LD) | `https://sipvy.vn` |
| `NEXT_PUBLIC_BASE_PATH` | Để **trống** nếu dùng tên miền riêng. Dùng `/sipvy-page` nếu chạy ở `user.github.io/sipvy-page` | `` hoặc `/sipvy-page` |
| `NEXT_PUBLIC_ORDER_ENDPOINT` | URL Web App của Apps Script (bước 1 bên dưới) | `https://script.google.com/macros/s/.../exec` |

Khi chạy local trên Windows (Git Bash), thêm `MSYS_NO_PATHCONV=1` trước lệnh nếu đặt `NEXT_PUBLIC_BASE_PATH`, nếu không Git Bash sẽ đổi `/sipvy-page` thành đường dẫn ổ đĩa.

Trên GitHub, đặt các biến này ở **Settings → Secrets and variables → Actions → Variables** với tên `SITE_URL`, `BASE_PATH`, `ORDER_ENDPOINT` (workflow đã đọc sẵn). Đây là biến công khai (URL nằm trong mã JS của trang), không phải bí mật.

## 1. Nhận đơn bằng Google Apps Script

1. Tạo **Google Sheet** mới, đặt tên tuỳ ý.
2. Mở **Tiện ích mở rộng → Apps Script**, xoá nội dung mặc định, dán toàn bộ [`apps-script/Code.gs`](apps-script/Code.gs).
3. (Tuỳ chọn) điền `NOTIFY_EMAIL` ở đầu file để nhận email mỗi khi có đơn hoặc liên hệ mới.
4. **Triển khai → Triển khai mới → Ứng dụng web**: *Thực thi dưới tên* = **Tôi**, *Ai có quyền truy cập* = **Bất kỳ ai**. Cấp quyền khi Google hỏi.
5. Copy URL kết thúc bằng `/exec` và đặt vào `ORDER_ENDPOINT`. Mở URL đó bằng trình duyệt sẽ thấy `{"ok":true,"service":"sipvy-forms"}`.
6. Mỗi lần sửa `Code.gs` phải **Quản lý bản triển khai → Chỉnh sửa → Phiên bản mới**, nếu không URL cũ vẫn chạy bản cũ.

Script tự tạo 3 tab: `Đơn hàng`, `Liên hệ`, `Đăng ký nhận tin`.

Lưu ý kỹ thuật: trình duyệt gửi bằng `fetch(..., { mode: "no-cors" })` nên **không đọc được phản hồi**. Nếu mạng không lỗi, trang coi như đã gửi. Hãy tự gửi thử một đơn sau khi deploy và kiểm tra Sheet. Nếu `ORDER_ENDPOINT` để trống, form báo "chưa được cấu hình" thay vì giả vờ thành công.

## 2. Đưa lên GitHub Pages

1. Đẩy repo lên GitHub (nhánh `main`).
2. **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Đặt các biến ở mục Cấu hình. Push lên `main` là workflow [`deploy.yml`](.github/workflows/deploy.yml) tự build và deploy.
4. Chưa có tên miền: đặt `BASE_PATH=/sipvy-page` và `SITE_URL=https://<user>.github.io`. Site chạy ở `https://<user>.github.io/sipvy-page/`.

### Gắn tên miền riêng

1. **Settings → Pages → Custom domain**, nhập tên miền (ví dụ `sipvy.vn`), lưu.
2. Ở nhà cung cấp tên miền, tạo bản ghi DNS:
   - Tên miền gốc (`sipvy.vn`): 4 bản ghi **A** tới `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
   - `www`: bản ghi **CNAME** tới `<user>.github.io`.
3. Chờ DNS cập nhật rồi bật **Enforce HTTPS**.
4. Đổi biến: `BASE_PATH` để **trống**, `SITE_URL=https://sipvy.vn`, rồi chạy lại workflow (Actions → Run workflow).

## Sửa nội dung

| Muốn đổi | Sửa ở đâu |
|---|---|
| Sản phẩm, giá, danh mục | `data/seed-data.json`, rồi `npm run build:data` (tạo `data/products.json`) |
| Ảnh sản phẩm | Bỏ ảnh vào `public/products/`, sửa `images` thành `"/products/ten-anh.jpg"` |
| Sản phẩm nổi bật | `scripts/build-data.mjs` (hiện lấy 2 sản phẩm đầu mỗi nhóm trà) |
| Hotline, email, giờ hỗ trợ | `lib/site-config.ts` |
| Chính sách, điều khoản | `app/chinh-sach-*/page.tsx`, `app/dieu-khoan/page.tsx` |
| Phí giao hàng | `lib/shipping.ts` (30.000₫, miễn phí từ 500.000₫) |

## Những thứ khác bản hệ thống đầy đủ

Đã **bỏ**: đăng nhập/đăng ký, tài khoản, thanh toán online, trang quản trị, đánh giá sản phẩm, mục Tin tức, combo, mã khuyến mãi. Các trang `/qua-tet`, `/qua-tang` hiện chưa có combo nên hiển thị "đang cập nhật". Trang sản phẩm không có số tồn kho thật (luôn "còn hàng").

## Cần rà trước khi công bố

- **Ảnh sản phẩm là ảnh mẫu.** Dữ liệu seed gốc dùng ảnh Unsplash (đa số đã chết), nên script thay bằng 6 ảnh có sẵn theo danh mục. Cần ảnh thật.
- **Trang "Trà cho GenZ"**: gợi ý theo tâm trạng đã lấy tên, giá, ảnh từ danh mục thật. Trình tự mix hộp có giá viết cứng đã bị gỡ. Phần mô tả, công thức pha và lời bình trên trang vẫn là nội dung marketing sao từ bản gốc, cần rà.
- **Đăng ký nhận tin**: không có mã giảm giá tự động. SIPVY gửi ưu đãi thủ công từ danh sách trong Sheet.
- **Chính sách bảo mật / điều khoản / đổi trả** đã sửa cho đúng bản tĩnh (không tài khoản, không thanh toán online). Nên nhờ người am hiểu pháp lý đọc lại trước khi công bố.
- Dữ liệu cá nhân (tên, SĐT, địa chỉ) lưu ở Google Sheet của bạn: giới hạn quyền chia sẻ Sheet, và có dòng đồng ý xử lý dữ liệu (đã có trong form).
- Một số nội dung giữ nguyên từ bản gốc ("Sale Quà Tết -20%", mốc ưu đãi theo ngày âm lịch…), hãy chắc chúng còn đúng.
