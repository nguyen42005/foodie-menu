const utils = {
  // Function 1: Format price to VND (Params + Return)
  formatCurrency: function(amount) {
    if (amount === undefined || amount === null) return "0 ₫";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  },

  // Generate random rating between 4.0 and 5.0
  getRandomRating: function() {
    return (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1);
  },

  // Function 2: Validate form data (Params + Return)
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

  // Function 3: Get status badge HTML (Params + Return)
  getStatusBadge: function(isAvailable) {
    let badgeClass = isAvailable ? "bg-success" : "bg-danger";
    let text = isAvailable ? "Còn phục vụ" : "Hết món";
    // Using Vanilla JS style return
    return `<span class="badge ${badgeClass} rounded-pill px-3">${text}</span>`;
  },

  // Show Toast notification using Vanilla JS + Bootstrap
  showToast: function(message, type = "success") {
    // Thao tác DOM thuần (Requirement 1.5)
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
    
    // Bootstrap Toast Component
    const toast = new bootstrap.Toast(toastElement);
    toast.show();

    toastElement.addEventListener("hidden.bs.toast", function() {
      toastElement.remove();
    });
  }
};
