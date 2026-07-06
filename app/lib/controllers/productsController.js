const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

async function handleResponse(res, action) {
  if (!res.ok) {
    const txt = await res.text().catch(() => null);
    throw new Error(txt || `Failed to ${action}`);
  }
  const json = await res.json().catch(() => null);
  return Array.isArray(json) ? json : (json?.data ?? json);
}

export async function loadProducts() {
  const res = await fetch(`${API_BASE}/api/products`);
  const data = await handleResponse(res, "load products");
  return (data || []).map((item) => ({
    id: item.id,
    name: item.name ?? item.title ?? "",
    sku: item.sku ?? "",
    category: item.category ?? "Uncategorized",
    stock: Number(item.stock ?? 0),
    price: Number(item.price ?? 0),
    status: item.status ?? "Active",
    image_url: item.image ?? item.image_url ?? null,
    ...item,
  }));
}

export async function createProduct(payload) {
  const res = await fetch(`${API_BASE}/api/admin/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res, "create product");
}

export async function updateProduct(id, payload) {
  const res = await fetch(`${API_BASE}/api/admin/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res, "update product");
}

export async function deleteProduct(id) {
  const res = await fetch(`${API_BASE}/api/admin/products/${id}`, {
    method: "DELETE",
  });
  return handleResponse(res, "delete product");
}

export default { loadProducts, createProduct, updateProduct, deleteProduct };
