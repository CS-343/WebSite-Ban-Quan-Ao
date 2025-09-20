# Fashion Store - Website Bán Quần Áo

Đây là một website bán quần áo đơn giản, hỗ trợ đăng nhập, đăng ký tài khoản, và xem danh sách sản phẩm.

## Tính năng

- Xem danh sách sản phẩm thời trang.
- Đăng nhập/Đăng xuất tài khoản người dùng.
- Đăng ký tài khoản mới (qua API).
- Lưu trữ thông tin người dùng bằng file JSON.
- Mã hóa mật khẩu với bcrypt.
- Giao diện responsive, hiện đại.

## Cấu trúc thư mục

```
.
├── hashPassword.js         # Script tạo hash mật khẩu
├── index.html              # Trang chủ website
├── script.js               # Xử lý logic phía client (login/logout)
├── server.js               # Server Node.js (Express) xử lý API
├── styles.css              # Giao diện website
├── users.json              # Lưu thông tin tài khoản người dùng
├── package.json            # Thông tin và dependencies Node.js
├── QuanLyBanQuanAo.sql     # Cấu trúc CSDL (tham khảo)
├── *.jpg                   # Ảnh sản phẩm
```

## Cài đặt & Chạy thử

1. **Cài đặt dependencies:**

   ```sh
   npm install
   ```

2. **Chạy server:**

   ```sh
   node server.js
   ```

   Server sẽ chạy tại [http://localhost:3000](http://localhost:3000)

3. **Mở website:**

   - Mở file `index.html` bằng trình duyệt (nên dùng Live Server extension trên VS Code để tránh lỗi CORS khi fetch API).

## API

- **POST /api/login**  
  Đăng nhập với `{ "username": "...", "password": "..." }`

- **POST /api/register**  
  Đăng ký tài khoản mới với `{ "username": "...", "password": "..." }`

## Tài khoản mẫu

```json
[
  {
    "username": "Duy",
    "password": "$2b$10$5To3ngAiQ/1OExYec5Ov7ulkb6g5adJRO/jikrcu4mCOFHMm9sX0y"
  },
  {
    "username": "NguyenDuy",
    "password": "$2b$10$GaKvLYGkcJlFmi5MRENmCuzUZJUd89NIiOIDUeEaPIrxJuQW.E2ny"
  }
]
```
> Mật khẩu gốc: `Duy2510` (cho user Duy), `NguyenDuy0214` (cho user NguyenDuy)

## Ghi chú

- Để tạo hash mật khẩu mới, chạy file [`hashPassword.js`](hashPassword.js).
- File [`QuanLyBanQuanAo.sql`](QuanLyBanQuanAo.sql) chỉ là tham khảo cho thiết kế CSDL, chưa kết nối vào website.
- Nếu muốn phát triển thêm, có thể mở rộng chức năng giỏ hàng, đặt hàng, quản lý sản phẩm, v.v.

---

Made with 💙 by Fashion Store Team