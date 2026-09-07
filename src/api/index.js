import { products as staticProducts, categories as staticCategories } from '../data/products';

const API_BASE = 'http://localhost:3001';

// Check if API server is available
async function isApiAvailable() {
  try {
    const res = await fetch(API_BASE + '/products', { signal: AbortSignal.timeout(1500) });
    return res.ok;
  } catch {
    return false;
  }
}

// Cache the check result
let apiAvailable = null;

async function checkApi() {
  if (apiAvailable === null) {
    apiAvailable = await isApiAvailable();
  }
  return apiAvailable;
}

export const api = {
  // Products
  async getProducts() {
    if (await checkApi()) {
      const res = await fetch(`${API_BASE}/products`);
      if (res.ok) return res.json();
    }
    // Fallback to static data
    return staticProducts;
  },

  async getProduct(id) {
    if (await checkApi()) {
      const res = await fetch(`${API_BASE}/products/${id}`);
      if (res.ok) return res.json();
    }
    // Fallback to static data
    return staticProducts.find(p => p.id === parseInt(id));
  },

  async getProductsByCategory(category) {
    if (await checkApi()) {
      const res = await fetch(`${API_BASE}/products?category=${encodeURIComponent(category)}`);
      if (res.ok) return res.json();
    }
    // Fallback to static data
    return staticProducts.filter(p => p.category === category);
  },

  async searchProducts(query) {
    if (await checkApi()) {
      const res = await fetch(`${API_BASE}/products?q=${encodeURIComponent(query)}`);
      if (res.ok) return res.json();
    }
    // Fallback to static data
    const q = query.toLowerCase();
    return staticProducts.filter(p =>
      p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  },

  // Categories
  async getCategories() {
    if (await checkApi()) {
      const res = await fetch(`${API_BASE}/categories`);
      if (res.ok) return res.json();
    }
    // Fallback to static data
    return staticCategories;
  },

  // Orders
  async createOrder(orderData) {
    if (await checkApi()) {
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
      if (res.ok) return res.json();
    }
    // Fallback: save to localStorage
    const orders = JSON.parse(localStorage.getItem('elegance_orders') || '[]');
    const order = {
      ...orderData,
      id: `ORD-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };
    orders.push(order);
    localStorage.setItem('elegance_orders', JSON.stringify(orders));
    return order;
  },

  async getOrders() {
    if (await checkApi()) {
      const res = await fetch(`${API_BASE}/orders`);
      if (res.ok) return res.json();
    }
    // Fallback to localStorage
    return JSON.parse(localStorage.getItem('elegance_orders') || '[]');
  }
};
