<<<<<<< HEAD
# 🍜 FoodieMenu - Hệ thống Quản lý Thực đơn Nhà hàng

Dự án website quản lý thực đơn nhà hàng cao cấp, thực hiện theo yêu cầu học phần FIT4015 – Thiết kế và Lập trình Front-End.

## 🚀 Tính năng chính

### 🌐 Trang Public (Khách hàng)
- **Hiển thị Thực đơn**: Danh sách món ăn đẹp mắt sử dụng Bootstrap Card.
- **Tìm kiếm Real-time**: Tìm kiếm món ăn theo tên ngay khi nhập.
- **Lọc theo Danh mục**: Phân loại món ăn (Món chính, Đồ uống, Tráng miệng...).
- **Lọc theo Giá**: Tìm món ăn theo các khoảng giá (Dưới 50k, 50-100k, Trên 100k).
- **Xem Chi tiết**: Modal hiển thị thông tin chi tiết, hình ảnh lớn và đánh giá.
- **Responsive**: Giao diện tối ưu cho Mobile, Tablet và Desktop.

### ⚙️ Trang Admin (Quản trị)
- **Quản lý CRUD**: Thêm, Sửa, Xóa món ăn.
- **Bảng điều khiển**: Hiển thị danh sách món ăn dạng bảng chuyên nghiệp.
- **Validation**: Kiểm tra dữ liệu đầu vào (Tên không rỗng, giá > 0, URL ảnh hợp lệ).
- **Thông báo**: Toast notification cho các hành động thành công hoặc thất bại.
- **Trạng thái**: Bật/tắt trạng thái phục vụ của món ăn.

## 🛠️ Công nghệ sử dụng
- **Ngôn ngữ**: HTML5, CSS3 (Vanilla CSS), JavaScript thuần.
- **Framework & Thư viện**:
  - Bootstrap 5 (Layout, Components, Responsive).
  - jQuery (DOM Manipulation, Events, AJAX).
  - Font Awesome 6 (Icons).
  - Google Fonts (Outfit).
- **Dữ liệu**: Fetch API kết hợp MockAPI.io.

## 📦 Cấu trúc thư mục
```txt
foodie-menu/
├── index.html      # Trang chủ công cộng
├── admin.html      # Trang quản trị
├── css/
│   └── style.css   # Custom styles & Animations
├── js/
│   ├── api.js      # Gọi API (Fetch & $.ajax)
│   ├── main.js     # Logic trang chủ
│   ├── admin.js    # Logic trang admin
│   └── utils.js    # Hàm tiện ích (format, validate)
└── README.md       # Tài liệu dự án
```

## 📖 Hướng dẫn chạy dự án
1. Đảm bảo bạn có kết nối internet để tải Bootstrap, jQuery và API.
2. Mở file `index.html` bằng trình duyệt (hoặc dùng Live Server trong VS Code).
3. Truy cập vào menu "QUẢN TRỊ" trên Navbar để quản lý món ăn.

## 🔗 Liên kết
- **MockAPI**: [https://69fdd9ad30ad0a6fd1c19249.mockapi.io/api/v1/](https://69fdd9ad30ad0a6fd1c19249.mockapi.io/api/v1/)
- **GitHub**: https://github.com/nguyen42005/foodie-menu.git
- **Vercel**: https://foodie-menu-pi.vercel.app/

---
Thiết kế bởi **Nguyễn Tiến Dũng **.


