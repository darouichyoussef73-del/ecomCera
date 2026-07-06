const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

async function handleResponse(res, action) {
  if (!res.ok) {
    const txt = await res.text().catch(() => null);
    throw new Error(txt || `Failed to ${action}`);
  }
  const json = await res.json().catch(() => null);
  return Array.isArray(json) ? json : (json?.data ?? json);
}

export async function loadOrders() {
  const res = await fetch(`${API_BASE}/api/admin/orders`);
  const data = await handleResponse(res, "load orders");

  // try to fetch clients to enrich orders
  let clientsMap = {};
  try {
    const cRes = await fetch(`${API_BASE}/api/admin/clients`);
    const clients = await handleResponse(cRes, "load clients");
    (clients || []).forEach((c) => {
      clientsMap[c.id] = c;
    });
  } catch (e) {
    // ignore client lookup errors
  }

  return (data || []).map((o) => {
    const client = o.client ??
      clientsMap[o.client_id] ?? {
        name: o.client_name ?? "Guest",
        email: o.client_email ?? "",
        phone: "",
        address: "",
      };

    let products = [];
    if (Array.isArray(o.product)) products = o.product;
    else if (typeof o.product === "string") {
      try {
        const parsed = JSON.parse(o.product);
        if (Array.isArray(parsed)) products = parsed;
        else products = [String(parsed)];
      } catch (_e) {
        if (o.product.includes("|"))
          products = o.product.split("|").map((s) => s.trim());
        else if (o.product.includes(","))
          products = o.product.split(",").map((s) => s.trim());
        else if (o.product.trim()) products = [o.product.trim()];
      }
    } else if (o.product == null) products = [];
    else products = [String(o.product)];

    const amount = Number(o.amount ?? 0);
    const payment = o.payment ?? o.payment_status ?? "Unknown";
    const status = o.status ?? "Processing";
    const date = o.date ?? o.created_at ?? null;

    return {
      id: o.id ?? o.order_id ?? null,
      order_id: o.order_id ?? null,
      client,
      products,
      amount,
      payment,
      status,
      date,
      raw: o,
    };
  });
}

export async function updateOrder(id, payload) {
  const res = await fetch(`${API_BASE}/api/admin/orders/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res, "update order");
}

export async function deleteOrder(id) {
  const res = await fetch(`${API_BASE}/api/admin/orders/${id}`, {
    method: "DELETE",
  });
  return handleResponse(res, "delete order");
}

export default { loadOrders, updateOrder, deleteOrder };
