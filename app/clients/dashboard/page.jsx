'use client'
import React, { useState } from 'react';
import {
  LayoutDashboard,
  ShoppingCart,
  CreditCard,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Plus,
  Download,
  FileText,
  Settings,
  LogOut,
  User,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  DollarSign,
  Package,
  Activity
} from 'lucide-react';

const page = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const clientName = "Alexandra Mitchell";
  const clientEmail = "alex.mitchell@company.com";
  const clientAvatar = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face";

  const stats = [
    {
      title: "Total Orders",
      value: "1,284",
      change: "+12.5%",
      trend: "up",
      icon: ShoppingCart,
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Active Orders",
      value: "42",
      change: "+3.2%",
      trend: "up",
      icon: Package,
      color: "bg-amber-50 text-amber-600"
    },
    {
      title: "Completed Orders",
      value: "1,198",
      change: "+8.7%",
      trend: "up",
      icon: CheckCircle2,
      color: "bg-emerald-50 text-emerald-600"
    },
    {
      title: "Total Spent",
      value: "$48,295",
      change: "+24.1%",
      trend: "up",
      icon: DollarSign,
      color: "bg-violet-50 text-violet-600"
    }
  ];

  const recentOrders = [
    { id: "#ORD-2024-001", product: "Premium Web Design Package", date: "Jun 5, 2024", amount: "$2,450", status: "In Progress", statusColor: "bg-amber-100 text-amber-700" },
    { id: "#ORD-2024-002", product: "SEO Optimization Service", date: "Jun 3, 2024", amount: "$1,200", status: "Completed", statusColor: "bg-emerald-100 text-emerald-700" },
    { id: "#ORD-2024-003", product: "Content Marketing Strategy", date: "May 28, 2024", amount: "$3,800", status: "Completed", statusColor: "bg-emerald-100 text-emerald-700" },
    { id: "#ORD-2024-004", product: "Brand Identity Design", date: "May 25, 2024", amount: "$4,500", status: "In Review", statusColor: "bg-blue-100 text-blue-700" },
    { id: "#ORD-2024-005", product: "Social Media Management", date: "May 20, 2024", amount: "$1,800", status: "Completed", statusColor: "bg-emerald-100 text-emerald-700" }
  ];

  const recentPayments = [
    { id: "#PAY-2024-089", description: "Invoice #INV-4521", date: "Jun 5, 2024", amount: "$2,450", method: "Credit Card", status: "Paid" },
    { id: "#PAY-2024-088", description: "Invoice #INV-4518", date: "Jun 3, 2024", amount: "$1,200", method: "Bank Transfer", status: "Paid" },
    { id: "#PAY-2024-087", description: "Invoice #INV-4515", date: "May 28, 2024", amount: "$3,800", method: "Credit Card", status: "Paid" },
    { id: "#PAY-2024-086", description: "Invoice #INV-4512", date: "May 25, 2024", amount: "$4,500", method: "PayPal", status: "Pending" }
  ];

  const quickActions = [
    { title: "New Order", description: "Place a new service order", icon: Plus, color: "bg-blue-600 hover:bg-blue-700" },
    { title: "Download Reports", description: "Export your data & analytics", icon: Download, color: "bg-slate-700 hover:bg-slate-800" },
    { title: "View Invoices", description: "Access all billing documents", icon: FileText, color: "bg-emerald-600 hover:bg-emerald-700" },
    { title: "Support Ticket", description: "Get help from our team", icon: AlertCircle, color: "bg-amber-600 hover:bg-amber-700" }
  ];

  const activityTimeline = [
    { time: "2 hours ago", title: "Order #ORD-2024-001 updated", description: "Status changed to \"In Progress\"", icon: Package, color: "bg-blue-500" },
    { time: "5 hours ago", title: "Payment received", description: "$2,450 via Credit Card", icon: CreditCard, color: "bg-emerald-500" },
    { time: "1 day ago", title: "New invoice generated", description: "Invoice #INV-4521 for $2,450", icon: FileText, color: "bg-violet-500" },
    { time: "2 days ago", title: "Order completed", description: "SEO Optimization Service delivered", icon: CheckCircle2, color: "bg-emerald-500" },
    { time: "3 days ago", title: "Account settings updated", description: "Profile information changed", icon: Settings, color: "bg-slate-500" },
    { time: "1 week ago", title: "New order placed", description: "Premium Web Design Package", icon: ShoppingCart, color: "bg-blue-500" }
  ];

  const notifications = [
    { title: "Order Update", message: "Your order #ORD-2024-001 is now in progress", time: "2 hours ago", read: false },
    { title: "Payment Confirmed", message: "Payment of $2,450 has been received", time: "5 hours ago", read: false },
    { title: "New Invoice", message: "Invoice #INV-4521 is ready for download", time: "1 day ago", read: true },
    { title: "System Maintenance", message: "Scheduled maintenance on June 10", time: "2 days ago", read: true }
  ];

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'invoices', label: 'Invoices', icon: FileText },
    { id: 'activity', label: 'Activity', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">ClientHub</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 rounded-lg hover:bg-slate-100">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${activeTab === item.id ? 'text-blue-600' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-100">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <Menu className="w-5 h-5 text-slate-600" />
            </button>
            <div className="hidden md:flex items-center gap-2 bg-slate-50 rounded-xl px-4 py-2 border border-slate-200">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search orders, invoices..."
                className="bg-transparent border-none outline-none text-sm text-slate-700 placeholder-slate-400 w-64"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setProfileDropdownOpen(false);
                }}
                className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <Bell className="w-5 h-5 text-slate-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900">Notifications</h3>
                    <span className="text-xs text-blue-600 font-medium cursor-pointer hover:underline">Mark all read</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notif, idx) => (
                      <div key={idx} className={`px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-50 last:border-0 ${!notif.read ? 'bg-blue-50/50' : ''}`}>
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${!notif.read ? 'bg-blue-500' : 'bg-slate-300'}`} />
                          <div>
                            <p className="text-sm font-medium text-slate-900">{notif.title}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{notif.message}</p>
                            <p className="text-xs text-slate-400 mt-1">{notif.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-3 border-t border-slate-100 text-center">
                    <button className="text-sm text-blue-600 font-medium hover:underline">View all notifications</button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setProfileDropdownOpen(!profileDropdownOpen);
                  setNotificationsOpen(false);
                }}
                className="flex items-center gap-3 pl-2 pr-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <img
                  src={clientAvatar}
                  alt={clientName}
                  className="w-8 h-8 rounded-full object-cover border border-slate-200"
                />
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-slate-900 leading-tight">{clientName}</p>
                  <p className="text-xs text-slate-500 leading-tight">{clientEmail}</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-sm font-semibold text-slate-900">{clientName}</p>
                    <p className="text-xs text-slate-500">{clientEmail}</p>
                  </div>
                  <div className="p-2">
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                      <User className="w-4 h-4 text-slate-400" />
                      Profile
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                      <Settings className="w-4 h-4 text-slate-400" />
                      Settings
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors">
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
              Welcome back, <span className="text-blue-600">{clientName.split(' ')[0]}</span>
            </h1>
            <p className="text-slate-500 mt-1">Here is what's happening with your account today.</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-5 lg:p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-2.5 rounded-xl ${stat.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                      <TrendIcon className="w-3 h-3" />
                      {stat.change}
                    </div>
                  </div>
                  <p className="text-2xl lg:text-3xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-sm text-slate-500 mt-1">{stat.title}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
            {/* Recent Orders */}
            <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Recent Orders</h2>
                  <p className="text-sm text-slate-500 mt-0.5">Latest orders placed on your account</p>
                </div>
                <button className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Order ID</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Product</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Date</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {recentOrders.map((order, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{order.product}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 hidden sm:table-cell">{order.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{order.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${order.statusColor}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-1">Quick Actions</h2>
              <p className="text-sm text-slate-500 mb-5">Frequently used actions</p>
              <div className="space-y-3">
                {quickActions.map((action, idx) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={idx}
                      className="w-full flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all duration-200 group"
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white transition-transform group-hover:scale-105 ${action.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="text-left flex-1">
                        <p className="text-sm font-semibold text-slate-900">{action.title}</p>
                        <p className="text-xs text-slate-500">{action.description}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6 mt-6">
            {/* Recent Payments */}
            <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Recent Payments</h2>
                  <p className="text-sm text-slate-500 mt-0.5">Latest transactions on your account</p>
                </div>
                <button className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Payment ID</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Description</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Date</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Method</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {recentPayments.map((payment, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{payment.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{payment.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 hidden sm:table-cell">{payment.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{payment.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 hidden md:table-cell">{payment.method}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                            payment.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {payment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Activity Timeline */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Activity Timeline</h2>
                  <p className="text-sm text-slate-500 mt-0.5">Recent account activity</p>
                </div>
                <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
                  <MoreHorizontal className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              <div className="relative">
                <div className="absolute left-5 top-0 bottom-0 w-px bg-slate-200"></div>
                <div className="space-y-6">
                  {activityTimeline.map((activity, idx) => {
                    const Icon = activity.icon;
                    return (
                      <div key={idx} className="relative flex gap-4">
                        <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm flex-shrink-0 ${activity.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 pt-1">
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="text-sm font-medium text-slate-900">{activity.title}</p>
                          </div>
                          <p className="text-sm text-slate-500">{activity.description}</p>
                          <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-8 pt-6 border-t border-slate-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
              <p>© 2024 ClientHub. All rights reserved.</p>
              <div className="flex items-center gap-6">
                <button className="hover:text-slate-700 transition-colors">Privacy Policy</button>
                <button className="hover:text-slate-700 transition-colors">Terms of Service</button>
                <button className="hover:text-slate-700 transition-colors">Help Center</button>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default page;