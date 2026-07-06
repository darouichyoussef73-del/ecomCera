const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

async function handleResponse(res, action) {
  if (!res.ok) {
    const txt = await res.text().catch(() => null);
    throw new Error(txt || `Failed to ${action}`);
  }
  const json = await res.json().catch(() => null);
  return Array.isArray(json) ? json : (json?.data ?? json);
}

export async function loadPayments() {
  const res = await fetch(`${API_BASE}/api/admin/payments`);
  const data = await handleResponse(res, "load payments");
  return (data || []).map((p) => {
    const client = p.client ?? p.user ?? null;
    const customer = client?.name ?? p.customer ?? "Guest";
    const email = client?.email ?? p.email ?? "";
    const amount = Number(p.amount ?? 0);
    const method = p.method ?? "Unknown";
    const status = p.status ?? "Unknown";
    const date = p.date ?? p.created_at ?? null;
    return {
      id: p.id,
      amount,
      method,
      status,
      date,
      customer,
      email,
      raw: p,
    };
  });
}

export async function createPayment(payload) {
  const res = await fetch(`${API_BASE}/api/admin/payments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res, "create payment");
}

export async function updatePayment(id, payload) {
  const res = await fetch(`${API_BASE}/api/admin/payments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res, "update payment");
}

export async function deletePayment(id) {
  const res = await fetch(`${API_BASE}/api/admin/payments/${id}`, {
    method: "DELETE",
  });
  return handleResponse(res, "delete payment");
}

export default { loadPayments, createPayment, updatePayment, deletePayment };
