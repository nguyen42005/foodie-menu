document.addEventListener('DOMContentLoaded', function() {
    // Chèn các thành phần dùng chung
    components.renderHeader('index');
    components.renderFooter();

    const featuredContainer = document.getElementById('featuredContainer');

    init();

    function init() {
        // Lấy danh sách món ăn để hiển thị 6 món nổi bật hàng đầu
        api.getAllDishes()
            .then(dishes => {
                // Lọc các món Bán chạy và lấy tối đa 6 món
                const featured = dishes
                    .filter(d => d.isBestSeller)
                    .slice(0, 6);
                
                // Nếu ít hơn 6 món bán chạy, có thể thêm các món ngẫu nhiên?
                // Hoặc chỉ hiển thị những gì có sẵn.
                // Tôi sẽ chỉ giữ các món bán chạy vào lúc này.
                renderFeaturedDishes(featured);
            })
            .catch(err => {
                console.error("Failed to load featured dishes", err);
                featuredContainer.innerHTML = '<p class="text-center text-muted">Không thể tải món ăn nổi bật lúc này.</p>';
            });
    }

    function renderFeaturedDishes(dishes) {
        featuredContainer.innerHTML = '';
        for (let i = 0; i < dishes.length; i++) {
            const dish = dishes[i];
            const col = document.createElement('div');
            col.className = 'col-md-4 fade-in-item';
            col.style.animationDelay = (i * 0.1) + 's';
            
            col.innerHTML = `
                <div class="card h-100 shadow-sm border-0" style="border-radius: 1.5rem; overflow: hidden;" onclick="window.location.href='menu.html'">
                    <div style="height: 250px; overflow: hidden;">
                        <img src="${dish.image}" class="w-100 h-100 object-fit-cover" alt="${dish.name}" onerror="this.src='https://placehold.co/600x400?text=Food'">
                    </div>
                    <div class="card-body p-4 text-center">
                        <div class="text-warning mb-2">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                        <h4 class="fw-bold">${dish.name}</h4>
                        <p class="text-muted small line-clamp-2">${dish.description || 'Hương vị tuyệt hảo khó quên.'}</p>
                        <div class="fs-4 fw-bold text-primary mb-3">${utils.formatCurrency(dish.price)}</div>
                        <a href="menu.html" class="btn btn-outline-primary rounded-pill px-4">Thưởng thức ngay</a>
                    </div>
                </div>
            `;
            featuredContainer.appendChild(col);
        }
    }
});
