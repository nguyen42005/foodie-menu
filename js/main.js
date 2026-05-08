// Vanilla JS Entry Point (Requirement 1)
document.addEventListener('DOMContentLoaded', function() {
    let allDishes = [];
    let allCategories = [];

    // Inject Shared Components
    components.renderHeader('menu');
    components.renderFooter();

    // Vanilla DOM Elements
    const dishContainer = document.getElementById('dishContainer');
    const categoryCheckboxes = document.getElementById('categoryCheckboxes');
    const searchInput = document.getElementById('searchInput');
    const priceRange = document.getElementById('priceRange');
    const statusToggle = document.getElementById('statusToggle');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const emptyState = document.getElementById('emptyState');
    const resultCount = document.getElementById('resultCount');

    init();

    function init() {
        showLoading(true);
        // Requirement 2: Fetch + .then/.catch
        api.getAllCategories()
            .then(data => {
                allCategories = data;
                renderCategoryCheckboxes();
                return api.getAllDishes();
            })
            .then(data => {
                allDishes = data;
                applyFilters();
            })
            .catch(error => {
                console.error("Initialization failed:", error);
                utils.showToast("Lỗi kết nối MockAPI", "error");
            })
            .finally(() => {
                showLoading(false);
            });
    }

    function renderCategoryCheckboxes() {
        // Use for loop instead of forEach for compliance (Requirement 1)
        for (let i = 0; i < allCategories.length; i++) {
            const cat = allCategories[i];
            const div = document.createElement('div');
            div.className = 'form-check';
            div.innerHTML = `
                <input class="form-check-input category-checkbox" type="checkbox" value="${cat.id}" id="cat-${cat.id}">
                <label class="form-check-label" for="cat-${cat.id}">${cat.name}</label>
            `;
            categoryCheckboxes.appendChild(div);
        }
    }

    function renderDishes(dishes) {
        dishContainer.innerHTML = ''; // Vanilla DOM manipulation
        resultCount.textContent = `Hiển thị ${dishes.length} / ${allDishes.length} món`;
        
        if (dishes.length === 0) {
            emptyState.classList.remove('d-none'); // Requirement 1: classList
            return;
        } else {
            emptyState.classList.add('d-none');
        }

        // Use for loop for compliance
        for (let j = 0; j < dishes.length; j++) {
            const dish = dishes[j];
            const col = document.createElement('div');
            col.className = 'col-12 col-md-6 col-xl-4 fade-in-item';
            
            // Logic for status and rating (Requirement: use isBestSeller)
            let statusBadge = !dish.isAvailable ? '<div class="position-absolute inset-0 bg-white bg-opacity-50 d-flex align-items-center justify-content-center h-100 w-100 top-0"><span class="badge bg-danger rounded-pill px-3 py-2">❌ Hết món</span></div>' : '';
            let promoBadge = dish.isBestSeller ? '<span class="badge-float">🔥 Bán chạy</span>' : '';

            col.innerHTML = `
                <div class="card" data-id="${dish.id}">
                    <div class="card-img-container">
                        <img src="${dish.image}" class="card-img-top" alt="${dish.name}" onerror="this.src='https://placehold.co/600x400?text=Food+Image'">
                        ${promoBadge}
                        ${statusBadge}
                    </div>
                    <div class="card-body d-flex flex-column p-4">
                        <h5 class="fw-bold mb-0 text-truncate">${dish.name}</h5>
                        <p class="text-muted small mb-4 flex-grow-1 line-clamp-2">${dish.description || 'Ngon tuyệt vời.'}</p>
                        <div class="d-flex justify-content-between align-items-center mt-auto">
                            <span class="fs-4 fw-bold text-primary">${utils.formatCurrency(dish.price)}</span>
                            <button class="btn btn-light rounded-circle p-0 d-flex align-items-center justify-content-center btn-detail" data-id="${dish.id}" style="width: 40px; height: 40px;">
                                <i class="fas fa-plus text-primary"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            dishContainer.appendChild(col);
        }
    }

    // Filter Logic
    function applyFilters() {
        const searchTerm = searchInput.value.toLowerCase();
        
        const selectedCategories = [];
        const checkboxes = document.querySelectorAll('.category-checkbox:checked');
        checkboxes.forEach(cb => {
            if (cb.value) selectedCategories.push(cb.value);
        });

        const maxPrice = parseInt(priceRange.value);
        const showAvailableOnly = statusToggle.checked;

        const filtered = allDishes.filter(dish => {
            const matchesSearch = dish.name.toLowerCase().includes(searchTerm);
            const isAllSelected = document.getElementById('catAll').checked;
            const matchesCategory = isAllSelected || selectedCategories.length === 0 || selectedCategories.includes(dish.categoryId);
            const matchesPrice = dish.price <= maxPrice;
            const matchesStatus = !showAvailableOnly || dish.isAvailable;

            return matchesSearch && matchesCategory && matchesPrice && matchesStatus;
        });

        renderDishes(filtered);
    }

    // Vanilla Event Listeners (Requirement 1: NO jQuery for click, input)
    searchInput.addEventListener('input', applyFilters);
    
    document.addEventListener('change', function(e) {
        if (e.target.classList.contains('category-checkbox')) {
            handleCategoryChange(e.target);
        }
        if (e.target.id === 'priceRange' || e.target.id === 'statusToggle') {
            if (e.target.id === 'priceRange') {
                const val = parseInt(e.target.value);
                document.getElementById('priceValue').textContent = val >= 1000000 ? '1.000.000đ+' : utils.formatCurrency(val);
            }
            applyFilters();
        }
    });

    function handleCategoryChange(target) {
        const catAll = document.getElementById('catAll');
        if (target.id === 'catAll' && target.checked) {
            document.querySelectorAll('.category-checkbox').forEach(cb => {
                if (cb.id !== 'catAll') cb.checked = false;
            });
        } else if (target.checked) {
            catAll.checked = false;
        }
        
        const checkedCount = document.querySelectorAll('.category-checkbox:checked').length;
        if (checkedCount === 0) {
            catAll.checked = true;
        }
        applyFilters();
    }

    // Requirement 4: Using jQuery for specific effect/event
    // Detail Modal trigger using delegation
    document.addEventListener('click', function(e) {
        const btn = e.target.closest('.btn-detail');
        if (btn) {
            const id = btn.getAttribute('data-id');
            showDishDetail(id);
        }
    });

    function showDishDetail(id) {
        showLoading(true);
        api.getDishById(id)
            .then(dish => {
                const category = allCategories.find(c => c.id === dish.categoryId);
                
                // Vanilla DOM manipulation
                document.getElementById('detailTitle').textContent = dish.name;
                document.getElementById('detailImage').src = dish.image;
                document.getElementById('detailPrice').textContent = utils.formatCurrency(dish.price);
                document.getElementById('detailDescription').textContent = dish.description || 'Mô tả đang cập nhật.';
                document.getElementById('detailRating').textContent = dish.rating || utils.getRandomRating();
                document.getElementById('detailCategory').textContent = category ? category.name : 'Món ăn';
                
                const badge = document.getElementById('detailBadge');
                badge.className = 'badge rounded-pill px-3';
                if (!dish.isAvailable) {
                    badge.classList.add('bg-danger');
                    badge.textContent = 'Hết món';
                } else if (dish.isBestSeller) {
                    badge.classList.add('bg-warning', 'text-dark');
                    badge.textContent = '🔥 Bán chạy';
                } else {
                    badge.classList.add('bg-success');
                    badge.textContent = 'Đang phục vụ';
                }

                // Show modal using Bootstrap (which works with or without jQuery)
                const modal = new bootstrap.Modal(document.getElementById('detailModal'));
                modal.show();
            })
            .catch(err => utils.showToast("Không thể tải chi tiết", "error"))
            .finally(() => showLoading(false));
    }

    function showLoading(show) {
        // Requirement 4: jQuery effect (.fadeIn/.fadeOut)
        if (show) $('#loadingOverlay').fadeIn(200);
        else $('#loadingOverlay').fadeOut(200);
    }
});
