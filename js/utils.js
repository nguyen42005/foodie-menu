const utils = {
  // Hàm 1: Định dạng giá tiền sang VND (Tham số + Trả về)
  formatCurrency: function(amount) {
    if (amount === undefined || amount === null) return "0 ₫";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  },

  // Tạo đánh giá ngẫu nhiên từ 4.0 đến 5.0
  getRandomRating: function() {
    return (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1);
  },

  // Hàm 2: Kiểm tra dữ liệu biểu mẫu (Tham số + Trả về)
  validateForm: function(data) {
    const errors = {};
    if (!data.name || data.name.trim() === "") {
      errors.name = "Tên món không được để trống";
    }
    if (!data.price || isNaN(data.price) || data.price <= 0) {
      errors.price = "Giá món phải lớn hơn 0";
    }
    if (!data.image || !data.image.startsWith("http")) {
      errors.image = "URL ảnh phải bắt đầu bằng http/https";
    }
    return errors;
  },

  // Hàm 3: Lấy mã HTML của nhãn trạng thái (Tham số + Trả về)
  getStatusBadge: function(isAvailable) {
    let badgeClass = isAvailable ? "bg-success" : "bg-danger";
    let text = isAvailable ? "Còn phục vụ" : "Hết món";
    // Sử dụng kiểu trả về Vanilla JS
    return `<span class="badge ${badgeClass} rounded-pill px-3">${text}</span>`;
  },

  // Hiển thị thông báo Toast sử dụng Vanilla JS + Bootstrap
  showToast: function(message, type = "success") {
    // Thao tác DOM thuần (Yêu cầu 1.5)
    let toastContainer = document.getElementById("toastContainer");
    if (!toastContainer) {
      toastContainer = document.createElement("div");
      toastContainer.id = "toastContainer";
      toastContainer.className = "toast-container position-fixed bottom-0 end-0 p-3";
      document.body.appendChild(toastContainer);
    }

    const toastId = "toast-" + Date.now();
    const bgColor = type === "success" ? "bg-primary" : "bg-danger";
    
    const toastHtml = `
      <div id="${toastId}" class="toast align-items-center text-white ${bgColor} border-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body fw-bold">
            ${message}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    `;

    toastContainer.insertAdjacentHTML("beforeend", toastHtml);
    const toastElement = document.getElementById(toastId);
    
    // Thành phần Toast của Bootstrap
    const toast = new bootstrap.Toast(toastElement);
    toast.show();

    toastElement.addEventListener("hidden.bs.toast", function() {
      toastElement.remove();
    });
  }
};
