const components = {
    renderHeader: (activePage = 'index') => {
        const headerHtml = `
            <nav class="navbar navbar-expand-lg sticky-top glass-navbar">
                <div class="container h-20">
                    <a class="navbar-brand text-primary fw-bold fs-3" href="index.html">FoodieMenu</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav mx-auto gap-4">
                            <li class="nav-item">
                                <a class="nav-link ${activePage === 'index' ? 'active' : ''}" href="index.html">Trang chủ</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link ${activePage === 'menu' ? 'active' : ''}" href="menu.html">Thực đơn</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Combo</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Liên hệ</a>
                            </li>
                        </ul>
                        <div class="d-flex gap-3">
                            <a href="admin.html" class="btn btn-outline-primary rounded-pill px-4 ${activePage === 'admin' ? 'd-none' : ''}">Quản trị</a>
                            <button class="btn btn-primary rounded-pill px-4">Đăng nhập</button>
                        </div>
                    </div>
                </div>
            </nav>
        `;
        $('body').prepend(headerHtml);
    },

    renderFooter: () => {
        const footerHtml = `
            <footer class="footer-premium pt-5 pb-4 mt-auto">
                <div class="container">
                    <div class="row g-5">
                        <div class="col-lg-4 col-md-6">
                            <div class="footer-logo mb-4">FoodieMenu</div>
                            <p class="footer-text mb-4">Hành trình khám phá ẩm thực tinh túy. Chúng tôi cam kết mang đến những món ăn không chỉ ngon miệng mà còn tràn đầy đam mê và sự sáng tạo.</p>
                            <div class="footer-social d-flex gap-3">
                                <a href="#"><i class="fab fa-facebook-f"></i></a>
                                <a href="#"><i class="fab fa-instagram"></i></a>
                                <a href="#"><i class="fab fa-tiktok"></i></a>
                                <a href="#"><i class="fab fa-youtube"></i></a>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-6">
                            <h5 class="footer-heading mb-4">Khám Phá</h5>
                            <ul class="list-unstyled footer-links">
                                <li><a href="index.html">Trang chủ</a></li>
                                <li><a href="menu.html">Thực đơn</a></li>
                                <li><a href="#">Combo đặc biệt</a></li>
                                <li><a href="#">Khuyến mãi</a></li>
                            </ul>
                        </div>
                        <div class="col-lg-2 col-md-6">
                            <h5 class="footer-heading mb-4">Thông Tin</h5>
                            <ul class="list-unstyled footer-links">
                                <li><a href="#">Về chúng tôi</a></li>
                                <li><a href="#">Chính sách bảo mật</a></li>
                                <li><a href="#">Điều khoản dịch vụ</a></li>
                                <li><a href="#">Tuyển dụng</a></li>
                            </ul>
                        </div>
                        <div class="col-lg-4 col-md-6">
                            <h5 class="footer-heading mb-4">Liên Hệ</h5>
                            <ul class="list-unstyled footer-contact">
                                <li><i class="fas fa-map-marker-alt me-3"></i>Số 1, Phố Xốm, Phường Phú Lãm, Quận Hà Đông, Hà Nội</li>
                                <li><i class="fas fa-phone-alt me-3"></i> +84 123 456 789</li>
                                <li><i class="fas fa-envelope me-3"></i> dungbeo2133@gmail.com</li>
                                <li><i class="fas fa-clock me-3"></i> Thứ 2 - Chủ Nhật: 09:00 - 22:00</li>
                            </ul>
                        </div>
                    </div>
                    <hr class="footer-divider my-4">
                    <div class="row align-items-center">
                        <div class="col-md-6 text-center text-md-start">
                            <p class="footer-copyright mb-0">© 2026 FoodieMenu. Thiết kế bởi Antigravity AI.</p>
                        </div>
                        <div class="col-md-6 text-center text-md-end mt-3 mt-md-0">
                            <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" width="30" class="me-2">
                            <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="Mastercard" width="30" class="me-2">
                            <img src="https://img.icons8.com/color/48/000000/paypal.png" alt="Paypal" width="30">
                        </div>
                    </div>
                </div>
            </footer>
        `;
        $('body').append(footerHtml);
    }
};
