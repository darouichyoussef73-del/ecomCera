
"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  X,
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  CreditCard,
  AlertTriangle,
  Calendar,
  DollarSign,
  User,
  MapPin,
  Phone,
  Mail,
  Box,
  ArrowUpDown,
  Loader2,
  AlertCircle,
  Printer,
  Download,
} from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

const Page = () => {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [ordersError, setOrdersError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [sortKey, setSortKey] = useState("date");
  const [sortDir, setSortDir] = useState("desc");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [updating, setUpdating] = useState(false);

  // ===== FETCH ORDERS FROM REST API =====
  const fetchOrders = async () => {
    setLoadingOrders(true);
    setOrdersError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/admin/orders`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const ordersData = Array.isArray(data) ? data : data.data || data.orders || [];
      setOrders(ordersData);
    } catch (err) {
      console.error("Failed to load orders", err);
      setOrdersError(err?.message || String(err));
      setOrders([]);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, paymentFilter, sortKey, sortDir]);

  // ===== MAP DATABASE ORDER TO UI FORMAT =====
  const mapOrderToUI = (order) => {
    if (!order) return null;

    return {
      id: order.order_id || `ORD-${order.id}`,
      dbId: order.id,
      client: {
        name: order.customer_name || "Unknown",
        email: order.customer_email || "-",
        phone: order.customer_phone || "-",
        address: [order.shipping_address, order.city, order.country, order.zip_code]
          .filter(Boolean)
          .join(", ") || "-",
      },
      products: order.items
        ? order.items.map((item) => item.product_name || item.name || "Product")
        : [order.product || "Product"],
      date: order.created_at
        ? new Date(order.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "-",
      created_at: order.created_at,
      amount: parseFloat(order.total) || 0,
      subtotal: parseFloat(order.subtotal) || 0,
      shipping: parseFloat(order.shipping) || 0,
      tax: parseFloat(order.tax) || 0,
      discount: parseFloat(order.discount) || 0,
      payment: order.payment_status
        ? order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)
        : "Pending",
      payment_method: order.payment_method || "-",
      status: order.status || "Processing",
      user_id: order.user_id,
      coupon_code: order.coupon_code,
      notes: order.notes,
      items: order.items || [],
    };
  };

  // ===== FILTER & SORT =====
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const q = searchQuery.trim().toLowerCase();
      if (q) {
        const orderId = String(o.order_id || o.id || "").toLowerCase();
        const customerName = (o.customer_name || "").toLowerCase();
        const customerEmail = (o.customer_email || "").toLowerCase();
        if (!orderId.includes(q) && !customerName.includes(q) && !customerEmail.includes(q)) {
          return false;
        }
      }
      if (statusFilter !== "all" && o.status !== statusFilter) return false;
      if (paymentFilter !== "all" && o.payment_status !== paymentFilter.toLowerCase()) return false;
      return true;
    });
  }, [orders, searchQuery, statusFilter, paymentFilter]);

  const sortedOrders = useMemo(() => {
    return [...filteredOrders].sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      if (sortKey === "amount") {
        return dir * ((parseFloat(a.total) || 0) - (parseFloat(b.total) || 0));
      }
      if (sortKey === "id") {
        return dir * ((a.id || 0) - (b.id || 0));
      }
      if (sortKey === "date") {
        return dir * (new Date(a.created_at || 0) - new Date(b.created_at || 0));
      }
      const va = String(a[sortKey] || "").toLowerCase();
      const vb = String(b[sortKey] || "").toLowerCase();
      if (va < vb) return dir * -1;
      if (va > vb) return dir * 1;
      return 0;
    });
  }, [filteredOrders, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sortedOrders.length / itemsPerPage));
  const paginatedOrders = sortedOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const uiOrders = useMemo(() => {
    return paginatedOrders.map(mapOrderToUI);
  }, [paginatedOrders]);

  const stats = useMemo(() => {
    const total = orders.length;
    const revenue = orders.reduce((s, o) => s + (parseFloat(o.total) || 0), 0);
    const pending = orders.filter((o) => o.status === "Processing" || o.status === "Pending").length;
    const cancelled = orders.filter((o) => o.status === "Cancelled").length;
    return [
      { icon: Package, color: "bg-blue-50 text-blue-600", value: total, label: "Total Orders" },
      { icon: DollarSign, color: "bg-emerald-50 text-emerald-600", value: `$${revenue.toFixed(2)}`, label: "Total Revenue" },
      { icon: Clock, color: "bg-amber-50 text-amber-600", value: pending, label: "Pending Orders" },
      { icon: XCircle, color: "bg-rose-50 text-rose-600", value: cancelled, label: "Cancelled Orders" },
    ];
  }, [orders]);

  function handleSort(key) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  // ===== UPDATE ORDER STATUS (FIXED) =====
  const handleUpdateStatus = async (orderId, newStatus) => {
    if (!newStatus || newStatus === selectedOrder?.status) {
      setSelectedOrder(null);
      return;
    }

    setUpdating(true);
    try {
      const response = await fetch(`${API_BASE_URL}/admin/orders/${orderId}`, {
        method: "PUT", // or PATCH if your route uses patch
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      // Log the raw response for debugging
      const responseText = await response.text();
      console.log("Update response:", response.status, responseText);

      if (!response.ok) {
        let errorMsg = `Server error: ${response.status}`;
        try {
          const errorData = JSON.parse(responseText);
          errorMsg = errorData.message || errorData.error || errorMsg;
        } catch (e) {}
        throw new Error(errorMsg);
      }

      await fetchOrders();
      setSelectedOrder(null);
    } catch (err) {
      console.error("Failed to update order", err);
      alert("Failed to update order: " + err.message);
    } finally {
      setUpdating(false);
    }
  };

  // ===== DELETE ORDER =====
  const handleDeleteOrder = async (orderId) => {
    if (!confirm("Delete this order? This action cannot be undone.")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/admin/orders/${orderId}`, {
        method: "DELETE",
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete: ${response.status}`);
      }

      await fetchOrders();
      setSelectedOrder(null);
    } catch (err) {
      console.error("Failed to delete order", err);
      alert("Failed to delete order: " + err.message);
    }
  };

  // ===== PRINT ORDER =====
  const handlePrintOrder = () => {
    window.print();
  };

  // ===== STYLES =====
  const getPaymentStyles = (p) => {
    switch (p) {
      case "Paid":
      case "Completed":
      case "paid":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Pending":
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Failed":
      case "failed":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusStyles = (s) => {
    switch (s) {
      case "Delivered":
        return "border-emerald-100 text-emerald-700 bg-emerald-50";
      case "Shipped":
        return "border-sky-100 text-sky-600 bg-sky-50";
      case "Processing":
        return "border-amber-100 text-amber-700 bg-amber-50";
      case "Cancelled":
        return "border-rose-100 text-rose-700 bg-rose-50";
      default:
        return "border-gray-100 text-gray-700 bg-gray-50";
    }
  };

  const getStatusIcon = (s) => {
    switch (s) {
      case "Delivered":
        return <CheckCircle2 className="w-3.5 h-3.5" />;
      case "Shipped":
        return <Truck className="w-3.5 h-3.5" />;
      case "Processing":
        return <Clock className="w-3.5 h-3.5" />;
      case "Cancelled":
        return <XCircle className="w-3.5 h-3.5" />;
      default:
        return <AlertTriangle className="w-3.5 h-3.5" />;
    }
  };

  const timelineSteps = [
    { label: "Processing", completed: false },
    { label: "Shipped", completed: false },
    { label: "Out for Delivery", completed: false },
    { label: "Delivered", completed: false },
  ];

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                <Package className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Orders</h1>
            </div>
            <button
              onClick={fetchOrders}
              disabled={loadingOrders}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
              title="Refresh"
            >
              <Clock className={`w-4 h-4 text-gray-600 ${loadingOrders ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-6">
          <div className="p-4 sm:p-6 border-b border-gray-100">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by order ID or customer name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
                />
              </div>
              <div className="flex gap-3 flex-wrap">
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="appearance-none pl-9 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 cursor-pointer"
                  >
                    <option value="all">All Status</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Processing">Processing</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  <Truck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                <div className="relative">
                  <select
                    value={paymentFilter}
                    onChange={(e) => setPaymentFilter(e.target.value)}
                    className="appearance-none pl-9 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 cursor-pointer"
                  >
                    <option value="all">All Payments</option>
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Failed">Failed</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto">
            {loadingOrders && (
              <div className="p-8 text-center flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 text-slate-600 animate-spin" />
                <p className="text-gray-500 text-sm">Loading orders...</p>
              </div>
            )}

            {ordersError && !loadingOrders && (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load orders</h3>
                <p className="text-sm text-gray-500 mb-4">{ordersError}</p>
                <button
                  onClick={fetchOrders}
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}

            {!loadingOrders && !ordersError && paginatedOrders.length > 0 && (
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      <button onClick={() => handleSort("id")} className="flex items-center gap-1 hover:text-gray-700 transition-colors">
                        Order ID <ArrowUpDown className={`w-3.5 h-3.5 ${sortKey === "id" ? "text-slate-900" : ""}`} />
                      </button>
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Products</th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      <button onClick={() => handleSort("date")} className="flex items-center gap-1 hover:text-gray-700 transition-colors">
                        Date <ArrowUpDown className={`w-3.5 h-3.5 ${sortKey === "date" ? "text-slate-900" : ""}`} />
                      </button>
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      <button onClick={() => handleSort("amount")} className="flex items-center gap-1 hover:text-gray-700 transition-colors">
                        Amount <ArrowUpDown className={`w-3.5 h-3.5 ${sortKey === "amount" ? "text-slate-900" : ""}`} />
                      </button>
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Payment</th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 sm:px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {uiOrders.map((order) => (
                    <tr key={order.dbId} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 sm:px-6 py-4">
                        <span className="text-sm font-semibold text-slate-900 font-mono">{order.id}</span>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-bold shrink-0">
                            {order.client.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "?"}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{order.client.name}</p>
                            <p className="text-xs text-gray-500 truncate lg:hidden">{order.client.email}</p>
                            {order.user_id && <p className="text-xs text-indigo-500">User #{order.user_id}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 hidden lg:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {order.products.map((product, i) => (
                            <span key={i} className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                              {product}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center gap-1.5 text-sm text-gray-600">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          {order.date}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <span className="text-sm font-semibold text-gray-900">${order.amount.toFixed(2)}</span>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getPaymentStyles(order.payment)}`}>
                          <CreditCard className="w-3 h-3" />
                          {order.payment}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusStyles(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-right">
                        <button
                          onClick={() => { setSelectedOrder(order); setSelectedStatus(order.status); }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-900 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {!loadingOrders && !ordersError && paginatedOrders.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Package className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">No orders found</h3>
                <p className="text-sm text-gray-500 mb-4">Try adjusting your search or filters</p>
                <button
                  onClick={() => { setSearchQuery(""); setStatusFilter("all"); setPaymentFilter("all"); }}
                  className="text-sm font-medium text-slate-900 hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          {totalPages > 1 && !loadingOrders && !ordersError && (
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-t border-gray-100">
              <p className="text-sm text-gray-500 hidden sm:block">
                Showing <span className="font-medium text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
                <span className="font-medium text-gray-900">{Math.min(currentPage * itemsPerPage, sortedOrders.length)}</span> of{" "}
                <span className="font-medium text-gray-900">{sortedOrders.length}</span> orders
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`min-w-[36px] h-9 px-3 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === page ? "bg-slate-900 text-white" : "text-gray-600 hover:bg-gray-50 border border-gray-200"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Detail Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 overflow-y-auto">
            <div className="absolute inset-0 bg-black/40" onClick={() => !updating && setSelectedOrder(null)} />
            <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full mb-8">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{selectedOrder.id}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">Placed on {selectedOrder.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={handlePrintOrder} className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Print">
                    <Printer className="w-4 h-4 text-gray-500" />
                  </button>
                  <button onClick={() => !updating && setSelectedOrder(null)} disabled={updating} className="p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50">
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6">
                {/* Status Timeline */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Order Status</h4>
                  <div className="flex items-center justify-between">
                    {timelineSteps.map((step, index) => (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          selectedOrder.status === "Delivered" && index <= 3 ||
                          selectedOrder.status === "Shipped" && index <= 1 ||
                          selectedOrder.status === "Processing" && index === 0
                            ? "bg-emerald-500 text-white"
                            : selectedOrder.status === "Cancelled"
                              ? "bg-red-100 text-red-400"
                              : "bg-gray-100 text-gray-400"
                        }`}>
                          {selectedOrder.status === "Cancelled" && index >= 2 ? <XCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                        </div>
                        <p className={`text-xs font-medium mt-2 ${
                          selectedOrder.status === "Delivered" && index <= 3 ||
                          selectedOrder.status === "Shipped" && index <= 1 ||
                          selectedOrder.status === "Processing" && index === 0
                            ? "text-emerald-600"
                            : "text-gray-400"
                        }`}>{step.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Customer Info */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Customer</h4>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white text-sm font-bold shrink-0">
                      {selectedOrder.client.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "?"}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-900">{selectedOrder.client.name}</p>
                      {selectedOrder.user_id && <p className="text-xs text-indigo-600 font-medium">Registered User ID: {selectedOrder.user_id}</p>}
                      <p className="text-xs text-gray-500 flex items-center gap-1.5"><Mail className="w-3 h-3" />{selectedOrder.client.email}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1.5"><Phone className="w-3 h-3" />{selectedOrder.client.phone}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1.5"><MapPin className="w-3 h-3" />{selectedOrder.client.address}</p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Order Items</h4>
                  <div className="space-y-2">
                    {selectedOrder.items && selectedOrder.items.length > 0 ? (
                      selectedOrder.items.map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                              <Box className="w-4 h-4 text-gray-400" />
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-900">{item.product_name || item.name || "Product"}</span>
                              <p className="text-xs text-gray-500">SKU: {item.product_sku || "-"}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-medium text-gray-900">${(parseFloat(item.total) || 0).toFixed(2)}</span>
                            <p className="text-xs text-gray-500">Qty: {item.quantity || 1} × ${(parseFloat(item.price) || 0).toFixed(2)}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      selectedOrder.products.map((product, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                              <Box className="w-4 h-4 text-gray-400" />
                            </div>
                            <span className="text-sm font-medium text-gray-900">{product}</span>
                          </div>
                          <span className="text-sm text-gray-500">Qty: 1</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Payment Summary */}
                <div className="border-t border-gray-100 pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm"><span className="text-gray-500">Subtotal</span><span className="text-gray-900">${selectedOrder.subtotal.toFixed(2)}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-gray-500">Shipping</span><span className="text-gray-900">${selectedOrder.shipping.toFixed(2)}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-gray-500">Tax</span><span className="text-gray-900">${selectedOrder.tax.toFixed(2)}</span></div>
                    {selectedOrder.discount > 0 && (
                      <div className="flex justify-between text-sm"><span className="text-gray-500">Discount</span><span className="text-rose-600">-${selectedOrder.discount.toFixed(2)}</span></div>
                    )}
                    {selectedOrder.coupon_code && (
                      <div className="flex justify-between text-sm"><span className="text-gray-500">Coupon</span><span className="text-emerald-600 text-xs font-medium bg-emerald-50 px-2 py-0.5 rounded-full">{selectedOrder.coupon_code}</span></div>
                    )}
                    <div className="flex justify-between text-base font-semibold pt-2 border-t border-gray-100">
                      <span className="text-gray-900">Total</span>
                      <span className="text-gray-900">${selectedOrder.amount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Status Badges */}
                <div className="flex flex-wrap gap-3">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusStyles(selectedOrder.status)}`}>
                    {getStatusIcon(selectedOrder.status)}{selectedOrder.status}
                  </span>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${getPaymentStyles(selectedOrder.payment)}`}>
                    <CreditCard className="w-3 h-3" />{selectedOrder.payment} • {selectedOrder.payment_method}
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between gap-3 p-6 border-t border-gray-100">
                <button
                  onClick={() => setSelectedOrder(null)}
                  disabled={updating}
                  className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
                >
                  Close
                </button>
                <div className="flex items-center gap-2">
                  <select
                    value={selectedStatus || selectedOrder.status}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    disabled={updating}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white disabled:opacity-50"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  <button
                    onClick={() => handleUpdateStatus(selectedOrder.dbId, selectedStatus)}
                    disabled={updating || !selectedStatus || selectedStatus === selectedOrder.status}
                    className="px-4 py-2.5 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
                  >
                    {updating ? <><Loader2 className="w-3.5 h-3.5 animate-spin" />Saving...</> : "Save"}
                  </button>
                  <button
                    onClick={() => handleDeleteOrder(selectedOrder.dbId)}
                    disabled={updating}
                    className="px-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-sm disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Page;