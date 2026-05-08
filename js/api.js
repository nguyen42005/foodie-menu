const BASE_URL = "https://69fdd9ad30ad0a6fd1c19249.mockapi.io/api/v1/";

const api = {
  // Get all dishes using Fetch with .then/.catch (Requirement 2)
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

  // Get dish by ID using Fetch
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

  // Create dish using Fetch
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

  // Update dish using Fetch
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

  // Delete dish using Fetch
  deleteDish: (id) => {
    return fetch(`${BASE_URL}dishes/${id}`)
      .then(res => {
        // Requirement 2: Demonstrate full CRUD
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

  // Get all categories using jQuery AJAX (Requirement 4: $.ajax)
  getAllCategories: () => {
    return Promise.resolve($.ajax({
      url: `${BASE_URL}categories`,
      method: "GET",
      dataType: "json"
    }));
  },

  // Create category using Fetch
  createCategory: (data) => {
    return fetch(`${BASE_URL}categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(res => res.json());
  },

  // Update category using Fetch
  updateCategory: (id, data) => {
    return fetch(`${BASE_URL}categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(res => res.json());
  },

  // Delete category using Fetch
  deleteCategory: (id) => {
    return fetch(`${BASE_URL}categories/${id}`, {
      method: "DELETE"
    }).then(res => res.json());
  }
};
