const API_BASE = 'http://localhost:3001';

export const api = {
  // Products
  async getProducts() {
    const res = await fetch(`${API_BASE}/products`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  async getProduct(id) {
    const res = await fetch(`${API_BASE}/products/${id}`);
    if (!res.ok) throw new Error('Product not found');
    return res.json();
  },

  async getProductsByCategory(category) {
    const res = await fetch(`${API_BASE}/products?category=${encodeURIComponent(category)}`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  async searchProducts(query) {
    const res = await fetch(`${API_BASE}/products?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error('Failed to search products');
    return res.json();
  },

  // Categories
  async getCategories() {
    const res = await fetch(`${API_BASE}/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  },

  // Orders
  async createOrder(orderData) {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...orderData,
        id: `ORD-${Date.now()}`,
        createdAt: new Date().toISOString(),
        status: 'confirmed'
      })
    });
    if (!res.ok) throw new Error('Failed to create order');
    return res.json();
  },

  async getOrders() {
    const res = await fetch(`${API_BASE}/orders`);
    if (!res.ok) throw new Error('Failed to fetch orders');
    return res.json();
  }
};
