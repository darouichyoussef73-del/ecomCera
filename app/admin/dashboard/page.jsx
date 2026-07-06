"use client";
import React from "react";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  CreditCard,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Settings,
  LogOut,
  BarChart3,
  Mail,
} from "lucide-react";
import Link from "next/link";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

const page = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  const [stats, setStats] = useState([
    {
      title: "Total Clients",
      value: "—",
      change: "",
      trend: "up",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Total Orders",
      value: "—",
      change: "",
      trend: "up",
      icon: ShoppingCart,
      color: "bg-emerald-500",
    },
    {
      title: "Revenue",
      value: "—",
      change: "",
      trend: "up",
      icon: DollarSign,
      color: "bg-violet-500",
    },
    {
      title: "Pending Payments",
      value: "—",
      change: "",
      trend: "down",
      icon: CreditCard,
      color: "bg-amber-500",
    },
  ]);

  const [orders, setOrders] = useState([]);

  const [clients, setClients] = useState([]);

  // ===== FETCH DASHBOARD DATA =====
  useEffect(() => {
    const storedUserId =
      typeof window !== "undefined" ? localStorage.getItem("userId") : null;
    if (storedUserId) {
      setUserId(storedUserId);
      fetchDashboardData(storedUserId);
    } else {
      setLoading(false);
      setError("User ID not found in localStorage");
    }
  }, []);

  const fetchDashboardData = async (id) => {
    setLoading(true);
    setError(null);
    try {
      // Fetch orders for the user
      const ordersResponse = await fetch(
        `${API_BASE_URL}/admin/orders?user_id=${id}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );

      // Fetch clients for the user
      const clientsResponse = await fetch(
        `${API_BASE_URL}/admin/clients?user_id=${id}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );

      if (!ordersResponse.ok || !clientsResponse.ok) {
        throw new Error("Failed to fetch dashboard data");
      }

      const ordersData = await ordersResponse.json();
      const clientsData = await clientsResponse.json();

      // Process orders data
      const processedOrders = (
        Array.isArray(ordersData) ? ordersData : ordersData.data || []
      )
        .slice(0, 5)
        .map((order) => ({
          id: order.order_id || `ORD-${order.id}`,
          client: order.customer_name || "Unknown",
          product: order.items?.[0]?.product_name || order.product || "Product",
          amount: `$${parseFloat(order.total || 0).toFixed(2)}`,
          status: order.status || "Processing",
        }));

      // Process clients data
      const processedClients = (
        Array.isArray(clientsData) ? clientsData : clientsData.data || []
      )
        .slice(0, 5)
        .map((client) => ({
          name: client.customer_name || client.name || "Unknown",
          email: client.email || "-",
          avatar: (client.customer_name || "U").charAt(0).toUpperCase(),
          status: client.status || "Active",
          orders: client.total_orders || 0,
        }));

      // Calculate stats
      const totalOrders = Array.isArray(ordersData)
        ? ordersData.length
        : ordersData.total || 0;
      const totalClients = Array.isArray(clientsData)
        ? clientsData.length
        : clientsData.total || 0;
      const totalRevenue = (
        Array.isArray(ordersData) ? ordersData : ordersData.data || []
      ).reduce((sum, order) => sum + (parseFloat(order.total) || 0), 0);
      const pendingPayments = (
        Array.isArray(ordersData) ? ordersData : ordersData.data || []
      ).filter((order) => order.payment_status === "pending").length;

      // Update stats
      setStats([
        {
          title: "Total Clients",
          value: totalClients,
          change: "0%",
          trend: "up",
          icon: Users,
          color: "bg-blue-500",
        },
        {
          title: "Total Orders",
          value: totalOrders,
          change: "0%",
          trend: "up",
          icon: ShoppingCart,
          color: "bg-emerald-500",
        },
        {
          title: "Revenue",
          value: `$${totalRevenue.toFixed(2)}`,
          change: "0%",
          trend: "up",
          icon: DollarSign,
          color: "bg-violet-500",
        },
        {
          title: "Pending Payments",
          value: pendingPayments,
          change: "0%",
          trend: "down",
          icon: CreditCard,
          color: "bg-amber-500",
        },
      ]);

      setOrders(processedOrders);
      setClients(processedClients);
    } catch (err) {
      console.error("Failed to fetch dashboard data", err);
      setError(err?.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const activities = [
    {
      icon: CheckCircle,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      title: "Order completed",
      desc: "Order #ORD-001 was marked as completed",
      time: "2 min ago",
    },
    {
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-50",
      title: "New client registered",
      desc: "Lisa Anderson created an account",
      time: "15 min ago",
    },
    {
      icon: CreditCard,
      color: "text-amber-500",
      bg: "bg-amber-50",
      title: "Payment received",
      desc: "Received $299.00 from Sarah Johnson",
      time: "1 hour ago",
    },
    {
      icon: AlertCircle,
      color: "text-red-500",
      bg: "bg-red-50",
      title: "Payment failed",
      desc: "Payment for Order #ORD-005 failed",
      time: "2 hours ago",
    },
    {
      icon: FileText,
      color: "text-violet-500",
      bg: "bg-violet-50",
      title: "Invoice generated",
      desc: "Invoice #INV-042 generated for Enterprise Plan",
      time: "3 hours ago",
    },
  ];

  const chartData = [
    { month: "Jan", value: 4000 },
    { month: "Feb", value: 5200 },
    { month: "Mar", value: 4800 },
    { month: "Apr", value: 6100 },
    { month: "May", value: 5800 },
    { month: "Jun", value: 7200 },
  ];

  const maxValue = Math.max(...chartData.map((d) => d.value));

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-100 text-emerald-700";
      case "Processing":
        return "bg-blue-100 text-blue-700";
      case "Pending":
        return "bg-amber-100 text-amber-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      case "Active":
        return "bg-emerald-100 text-emerald-700";
      case "Inactive":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <>
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 mr-2"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <div className="hidden sm:flex items-center bg-gray-50 rounded-xl px-4 py-2.5 w-72">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search anything..."
              className="bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none w-full"
            />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Welcome back, here's what's happening today.
          </p>
          {error && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}
          {loading && (
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
              Loading dashboard data...
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const TrendIcon =
              stat.trend === "up" ? ArrowUpRight : ArrowDownRight;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-xl`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div
                    className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${stat.trend === "up" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}
                  >
                    <TrendIcon className="w-3 h-3 mr-1" />
                    {stat.change}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{stat.title}</p>
              </div>
            );
          })}
        </div>

        {/* Revenue Chart & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Revenue Overview
                </h2>
                <p className="text-sm text-gray-500">
                  Monthly revenue performance
                </p>
              </div>
              <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-gray-600 outline-none">
                <option>This Year</option>
                <option>Last Year</option>
              </select>
            </div>
            <div className="h-64 flex items-end justify-between space-x-2">
              {chartData.map((item, index) => (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center group"
                >
                  <div className="relative w-full flex justify-center">
                    <div
                      className="w-full max-w-[48px] bg-slate-900 rounded-t-lg transition-all duration-300 group-hover:bg-slate-700"
                      style={{
                        height: `${(item.value / maxValue) * 200}px`,
                      }}
                    ></div>
                    <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap">
                      ${item.value.toLocaleString()}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 mt-2">
                    {item.month}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">
                Recent Activity
              </h2>
              <button className="text-sm text-slate-900 font-medium hover:underline">
                View all
              </button>
            </div>
            <div className="space-y-5">
              {activities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex items-start">
                    <div
                      className={`${activity.bg} p-2 rounded-lg mr-3 mt-0.5`}
                    >
                      <Icon className={`w-4 h-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                        {activity.desc}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Orders & Clients */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Recent Orders
                </h2>
                <p className="text-sm text-gray-500">
                  Latest transactions from your store
                </p>
              </div>
              <button className="text-sm text-slate-900 font-medium hover:underline">
                View all
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-4">
                      Order ID
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-4">
                      Client
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-4 hidden sm:table-cell">
                      Product
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-4">
                      Amount
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-4">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((order, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {order.client}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 hidden sm:table-cell">
                        {order.product}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {order.amount}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Clients */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">
                Recent Clients
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Newly registered users
              </p>
            </div>
            <div className="divide-y divide-gray-100">
              {clients.map((client, index) => (
                <div
                  key={index}
                  className="p-4 flex items-center hover:bg-gray-50/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-bold">
                    {client.avatar}
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {client.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {client.email}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}
                    >
                      {client.status}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">
                      {client.orders} orders
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-100">
              <button className="w-full text-center text-sm font-medium text-slate-900 hover:text-slate-700 transition-colors">
                View all clients
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
