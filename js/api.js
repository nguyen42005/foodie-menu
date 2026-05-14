const BASE_URL = "https://69fdd9ad30ad0a6fd1c19249.mockapi.io/api/v1/";

const api = {
  // Lấy tất cả món ăn sử dụng Fetch với .then/.catch (Yêu cầu 2)
  getAllDishes: () => {
    return fetch(`${BASE_URL}dishes`)
      .then(response => {
        if (!response.ok) throw new Error("Failed to fetch dishes");
        return response.json();
      })
      .catch(error => {
        console.error("Error in getAllDishes:", error);
        throw error;
      });
  },

  // Lấy món ăn theo ID sử dụng Fetch
  getDishById: (id) => {
    return fetch(`${BASE_URL}dishes/${id}`)
      .then(response => {
        if (!response.ok) throw new Error("Failed to fetch dish detail");
        return response.json();
      })
      .catch(error => {
        console.error("Error in getDishById:", error);
        throw error;
      });
  },

  // Tạo món ăn mới sử dụng Fetch
  createDish: (dishData) => {
    return fetch(`${BASE_URL}dishes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dishData),
    })
      .then(response => {
        if (!response.ok) throw new Error("Failed to create dish");
        return response.json();
      })
      .catch(error => {
        console.error("Error in createDish:", error);
        throw error;
      });
  },

  // Cập nhật món ăn sử dụng Fetch
  updateDish: (id, dishData) => {
    return fetch(`${BASE_URL}dishes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dishData),
    })
      .then(response => {
        if (!response.ok) throw new Error("Failed to update dish");
        return response.json();
      })
      .catch(error => {
        console.error("Error in updateDish:", error);
        throw error;
      });
  },

  // Xóa món ăn sử dụng Fetch
  deleteDish: (id) => {
    return fetch(`${BASE_URL}dishes/${id}`)
      .then(res => {
        // Yêu cầu 2: Trình bày đầy đủ các thao tác CRUD
        return fetch(`${BASE_URL}dishes/${id}`, { method: "DELETE" });
      })
      .then(response => {
        if (!response.ok) throw new Error("Failed to delete dish");
        return response.json();
      })
      .catch(error => {
        console.error("Error in deleteDish:", error);
        throw error;
      });
  },

  // Lấy tất cả danh mục sử dụng jQuery AJAX (Yêu cầu 4: $.ajax)
  getAllCategories: () => {
    return Promise.resolve($.ajax({
      url: `${BASE_URL}categories`,
      method: "GET",
      dataType: "json"
    }));
  },

  // Tạo danh mục mới sử dụng Fetch
  createCategory: (data) => {
    return fetch(`${BASE_URL}categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(res => res.json());
  },

  // Cập nhật danh mục sử dụng Fetch
  updateCategory: (id, data) => {
    return fetch(`${BASE_URL}categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(res => res.json());
  },

  // Xóa danh mục sử dụng Fetch
  deleteCategory: (id) => {
    return fetch(`${BASE_URL}categories/${id}`, {
      method: "DELETE"
    }).then(res => res.json());
  }
};
