document.addEventListener('DOMContentLoaded', function() {
    let allDishes = [];
    let allCategories = [];
    let dishToDelete = null;
    let categoryToDelete = null;

    // Chèn các thành phần dùng chung
    components.renderHeader('admin');
    components.renderFooter();

    // Các thành phần DOM thuần
    const dishTable = document.getElementById('adminDishTable');
    const categoryTable = document.getElementById('adminCategoryTable');
    const dishForm = document.getElementById('dishForm');
    const categoryForm = document.getElementById('categoryForm');
    
    const btnSaveDish = document.getElementById('btnSaveDish');
    const btnAddDish = document.getElementById('btnAddDish');
    const btnSaveCategory = document.getElementById('btnSaveCategory');
    const btnAddCategory = document.getElementById('btnAddCategory');
    const btnConfirmDelete = document.getElementById('btnConfirmDelete');
    const adminSearchInput = document.getElementById('adminSearchInput');

    // Các thành phần Thống kê
    const statTotal = document.getElementById('statTotal');
    const statActive = document.getElementById('statActive');
    const statCategories = document.getElementById('statCategories');

    // Các Modal Bootstrap
    const dishModal = new bootstrap.Modal(document.getElementById('dishModal'));
    const categoryModal = new bootstrap.Modal(document.getElementById('categoryModal'));
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));

    init();

    function init() {
        showLoading(true);
        // Yêu cầu 2: Chuỗi Fetch (Fetch chain)
        api.getAllCategories()
            .then(data => {
                allCategories = data;
                populateCategoryDropdown();
                renderCategoryTable();
                return api.getAllDishes();
            })
            .then(data => {
                allDishes = data;
                updateStats();
                renderAdminTable(allDishes);
            })
            .catch(error => {
                console.error("Initialization failed:", error);
                utils.showToast("Không thể tải dữ liệu", "error");
            })
            .finally(() => showLoading(false));
    }

    function updateStats() {
        statTotal.textContent = allDishes.length;
        statActive.textContent = allDishes.filter(d => d.isAvailable).length;
        statCategories.textContent = allCategories.length;
    }

    // --- QUẢN LÝ MÓN ĂN ---

    function populateCategoryDropdown() {
        const select = document.getElementById('dishCategory');
        select.innerHTML = '<option value="">Chọn danh mục</option>';
        for (let i = 0; i < allCategories.length; i++) {
            const cat = allCategories[i];
            const option = document.createElement('option');
            option.value = cat.id;
            option.textContent = cat.name;
            select.appendChild(option);
        }
    }

    function renderAdminTable(dishes) {
        dishTable.innerHTML = '';
        for (let j = 0; j < dishes.length; j++) {
            const dish = dishes[j];
            const category = allCategories.find(c => c.id === dish.categoryId);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="ps-4 text-muted small">#${dish.id}</td>
                <td><img src="${dish.image}" style="width: 50px; height: 50px; border-radius: 8px; object-fit: cover;" alt="${dish.name}" onerror="this.src='https://placehold.co/100x100?text=Food'"></td>
                <td class="fw-bold">${dish.name}</td>
                <td><span class="badge bg-light text-dark border">${category ? category.name : 'N/A'}</span></td>
                <td class="fw-bold text-primary">${utils.formatCurrency(dish.price)}</td>
                <td>${utils.getStatusBadge(dish.isAvailable)}</td>
                <td class="pe-4 text-center">
                    <div class="d-flex justify-content-center gap-2">
                        <button class="btn btn-sm btn-light border btn-edit-dish" data-id="${dish.id}">
                            <i class="fas fa-edit text-primary"></i>
                        </button>
                        <button class="btn btn-sm btn-light border btn-delete-dish" data-id="${dish.id}">
                            <i class="fas fa-trash text-danger"></i>
                        </button>
                    </div>
                </td>
            `;
            dishTable.appendChild(row);
        }
    }

    // --- QUẢN LÝ DANH MỤC ---

    function renderCategoryTable() {
        categoryTable.innerHTML = '';
        for (let k = 0; k < allCategories.length; k++) {
            const cat = allCategories[k];
            const dishCount = allDishes.filter(d => d.categoryId === cat.id).length;
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="ps-4 text-muted small">#${cat.id}</td>
                <td class="fw-bold">${cat.name}</td>
                <td class="text-center"><span class="badge bg-primary rounded-pill px-3">${dishCount} món</span></td>
                <td class="pe-4 text-center">
                    <div class="d-flex justify-content-center gap-2">
                        <button class="btn btn-sm btn-light border btn-edit-category" data-id="${cat.id}">
                            <i class="fas fa-edit text-primary"></i>
                        </button>
                        <button class="btn btn-sm btn-light border btn-delete-category" data-id="${cat.id}">
                            <i class="fas fa-trash text-danger"></i>
                        </button>
                    </div>
                </td>
            `;
            categoryTable.appendChild(row);
        }
    }

    // --- TRÌNH LẮNG NGHE SỰ KIỆN ---

    // Lắng nghe sự kiện cho Món ăn
    btnAddDish.addEventListener('click', () => {
        document.getElementById('dishModalTitle').textContent = 'Thêm Món Ăn Mới';
        dishForm.reset();
        document.getElementById('dishId').value = '';
        clearValidation();
        dishModal.show();
    });

    // Lắng nghe sự kiện cho Danh mục
    btnAddCategory.addEventListener('click', () => {
        document.getElementById('categoryModalTitle').textContent = 'Thêm Danh Mục Mới';
        categoryForm.reset();
        document.getElementById('categoryId').value = '';
        categoryModal.show();
    });

    // Tìm kiếm
    adminSearchInput.addEventListener('input', function() {
        const term = this.value.toLowerCase();
        const filtered = allDishes.filter(d => d.name.toLowerCase().includes(term) || d.id.toString().includes(term));
        renderAdminTable(filtered);
    });

    // Ủy quyền cho các Thao tác trong Bảng (Delegation)
    document.addEventListener('click', (e) => {
        const editDish = e.target.closest('.btn-edit-dish');
        const deleteDish = e.target.closest('.btn-delete-dish');
        const editCat = e.target.closest('.btn-edit-category');
        const deleteCat = e.target.closest('.btn-delete-category');

        if (editDish) openEditDish(editDish.dataset.id);
        if (deleteDish) { dishToDelete = deleteDish.dataset.id; categoryToDelete = null; deleteModal.show(); }
        if (editCat) openEditCategory(editCat.dataset.id);
        if (deleteCat) { categoryToDelete = deleteCat.dataset.id; dishToDelete = null; deleteModal.show(); }
    });

    function openEditDish(id) {
        showLoading(true);
        api.getDishById(id)
            .then(dish => {
                document.getElementById('dishModalTitle').textContent = 'Sửa Món Ăn';
                document.getElementById('dishId').value = dish.id;
                document.getElementById('dishName').value = dish.name;
                document.getElementById('dishPrice').value = dish.price;
                document.getElementById('dishCategory').value = dish.categoryId;
                document.getElementById('dishImage').value = dish.image;
                document.getElementById('dishDescription').value = dish.description;
                document.getElementById('dishAvailable').checked = dish.isAvailable;
                document.getElementById('dishBestSeller').checked = dish.isBestSeller || false;
                clearValidation();
                dishModal.show();
            })
            .finally(() => showLoading(false));
    }

    function openEditCategory(id) {
        const cat = allCategories.find(c => c.id === id);
        if (cat) {
            document.getElementById('categoryModalTitle').textContent = 'Sửa Danh Mục';
            document.getElementById('categoryId').value = cat.id;
            document.getElementById('categoryName').value = cat.name;
            categoryModal.show();
        }
    }

    // Lưu Món ăn
    btnSaveDish.addEventListener('click', () => {
        const data = {
            name: document.getElementById('dishName').value,
            price: Number(document.getElementById('dishPrice').value),
            image: document.getElementById('dishImage').value,
            categoryId: document.getElementById('dishCategory').value,
            description: document.getElementById('dishDescription').value,
            isAvailable: document.getElementById('dishAvailable').checked,
            isBestSeller: document.getElementById('dishBestSeller').checked,
            rating: utils.getRandomRating() // Yêu cầu: đánh giá ngẫu nhiên
        };

        const errors = utils.validateForm(data);
        if (Object.keys(errors).length > 0) return showValidationErrors(errors);

        const id = document.getElementById('dishId').value;
        showLoading(true);
        const action = id ? api.updateDish(id, data) : api.createDish(data);
        
        action.then(() => {
            utils.showToast("Đã lưu món ăn!");
            dishModal.hide();
            init();
        }).finally(() => showLoading(false));
    });

    // Lưu Danh mục
    btnSaveCategory.addEventListener('click', () => {
        const name = document.getElementById('categoryName').value;
        if (!name.trim()) return utils.showToast("Tên danh mục không được để trống", "error");

        const id = document.getElementById('categoryId').value;
        showLoading(true);
        const action = id ? api.updateCategory(id, { name }) : api.createCategory({ name });

        action.then(() => {
            utils.showToast("Đã lưu danh mục!");
            categoryModal.hide();
            init();
        }).finally(() => showLoading(false));
    });

    // Xác nhận Xóa
    btnConfirmDelete.addEventListener('click', () => {
        showLoading(true);
        let action;
        if (dishToDelete) action = api.deleteDish(dishToDelete);
        else if (categoryToDelete) action = api.deleteCategory(categoryToDelete);

        if (action) {
            action.then(() => {
                utils.showToast("Đã xóa thành công!");
                deleteModal.hide();
                init();
            }).finally(() => showLoading(false));
        }
    });

    function showValidationErrors(errors) {
        clearValidation();
        if (errors.name) {
            document.getElementById('dishName').classList.add('is-invalid');
            document.getElementById('nameError').textContent = errors.name;
        }
        if (errors.price) {
            document.getElementById('dishPrice').classList.add('is-invalid');
            document.getElementById('priceError').textContent = errors.price;
        }
        if (errors.image) {
            document.getElementById('dishImage').classList.add('is-invalid');
            document.getElementById('imageError').textContent = errors.image;
        }
    }

    function clearValidation() {
        dishForm.querySelectorAll('.form-control').forEach(i => i.classList.remove('is-invalid'));
    }

    function showLoading(show) {
        if (show) $('#loadingOverlay').show();
        else $('#loadingOverlay').fadeOut(200);
    }
});
