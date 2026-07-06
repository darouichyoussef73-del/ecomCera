"use client";
import React from "react";
import { useState } from "react";
import {
  DollarSign,
  CreditCard,
  Clock,
  RefreshCcw,
  Search,
  Filter,
  Wallet,
  MoreHorizontal,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import * as paymentsController from "@/app/lib/controllers/paymentsController";

const page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const stats = [
    {
      title: "Total Revenue",
      value: "$124,592.00",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Monthly Revenue",
      value: "$18,420.00",
      change: "+8.2%",
      trend: "up",
      icon: CreditCard,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Pending Payments",
      value: "$8,240.00",
      change: "-3.1%",
      trend: "down",
      icon: Clock,
      color: "bg-amber-50 text-amber-600",
    },
    {
      title: "Refunded Payments",
      value: "$2,180.00",
      change: "+1.4%",
      trend: "up",
      icon: RefreshCcw,
      color: "bg-rose-50 text-rose-600",
    },
  ];

  const [transactions, setTransactions] = useState([]);

  const [loadingPayments, setLoadingPayments] = useState(false);
  const [paymentsError, setPaymentsError] = useState(null);

  const refreshPayments = async () => {
    setLoadingPayments(true);
    setPaymentsError(null);
    try {
      const data = await paymentsController.loadPayments();
      setTransactions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load payments", err);
      setPaymentsError(err?.message || String(err));
      setTransactions([]);
    } finally {
      setLoadingPayments(false);
    }
  };

  React.useEffect(() => {
    refreshPayments();
  }, []);

  const chartData = [
    { month: "Aug", revenue: 42000, expenses: 28000 },
    { month: "Sep", revenue: 48000, expenses: 32000 },
    { month: "Oct", revenue: 52000, expenses: 30000 },
    { month: "Nov", revenue: 49000, expenses: 35000 },
    { month: "Dec", revenue: 58000, expenses: 38000 },
    { month: "Jan", revenue: 64000, expenses: 42000 },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Refunded":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Failed":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <CheckCircle2 className="w-3.5 h-3.5" />;
      case "Failed":
        return <XCircle className="w-3.5 h-3.5" />;
      case "Pending":
        return <Clock className="w-3.5 h-3.5" />;
      default:
        return <AlertCircle className="w-3.5 h-3.5" />;
    }
  };

  const maxRevenue = Math.max(...chartData.map((d) => d.revenue));

  return (
    <>
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-6 ">
        {/* Header */}

        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                  <Wallet className="w-4 h-4 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Payements</h1>
              </div>
            </div>
          </div>
        </header>
        {/* Stats Grid */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className={`p-2.5 rounded-lg ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                      stat.trend === "up"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-rose-50 text-rose-700"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {stat.change}
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500 font-medium">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {stat.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Revenue Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Revenue Overview
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Monthly revenue vs expenses
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-gray-900"></span>
                  <span className="text-sm text-gray-600">Revenue</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-gray-300"></span>
                  <span className="text-sm text-gray-600">Expenses</span>
                </div>
              </div>
            </div>
            <div className="relative h-64 flex items-end justify-between gap-2 md:gap-4 px-2">
              {chartData.map((item, index) => (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center gap-2 group"
                >
                  <div className="w-full flex items-end gap-1 md:gap-1.5 h-52">
                    <div
                      className="flex-1 bg-gray-200 rounded-t-md transition-all duration-300 group-hover:bg-gray-300 relative"
                      style={{
                        height: `${(item.expenses / maxRevenue) * 100}%`,
                      }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        ${(item.expenses / 1000).toFixed(1)}k
                      </div>
                    </div>
                    <div
                      className="flex-1 bg-gray-900 rounded-t-md transition-all duration-300 group-hover:bg-gray-800 relative"
                      style={{
                        height: `${(item.revenue / maxRevenue) * 100}%`,
                      }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        ${(item.revenue / 1000).toFixed(1)}k
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-gray-500">
                    {item.month}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-4">
                Payment Methods
              </h3>
              <div className="space-y-4">
                {[
                  {
                    method: "Credit Card",
                    percentage: 65,
                    color: "bg-gray-900",
                  },
                  { method: "PayPal", percentage: 20, color: "bg-gray-600" },
                  {
                    method: "Bank Transfer",
                    percentage: 10,
                    color: "bg-gray-400",
                  },
                  { method: "Other", percentage: 5, color: "bg-gray-300" },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-gray-700 font-medium">
                        {item.method}
                      </span>
                      <span className="text-gray-500">{item.percentage}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full transition-all duration-500`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-4">
                Transaction Status
              </h3>
              <div className="flex items-center justify-center">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#111827"
                      strokeWidth="3"
                      strokeDasharray="75, 100"
                      className="transition-all duration-1000"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#9ca3af"
                      strokeWidth="3"
                      strokeDasharray="15, 100"
                      strokeDashoffset="-75"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">
                      2,451
                    </span>
                    <span className="text-xs text-gray-500">Total</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-900"></span>
                  <span className="text-xs text-gray-600">Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-400"></span>
                  <span className="text-xs text-gray-600">Pending</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {[
                  {
                    action: "Payment received",
                    detail: "From Sarah Johnson",
                    time: "2 min ago",
                    icon: DollarSign,
                    color: "text-emerald-600 bg-emerald-50",
                  },
                  {
                    action: "Refund processed",
                    detail: "To James Brown",
                    time: "15 min ago",
                    icon: RefreshCcw,
                    color: "text-blue-600 bg-blue-50",
                  },
                  {
                    action: "Payment failed",
                    detail: "From William Miller",
                    time: "1 hour ago",
                    icon: XCircle,
                    color: "text-rose-600 bg-rose-50",
                  },
                  {
                    action: "New subscription",
                    detail: "Emma Williams",
                    time: "3 hours ago",
                    icon: CreditCard,
                    color: "text-gray-600 bg-gray-50",
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${activity.color}`}>
                      <activity.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {activity.detail}
                      </p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent Transactions
                </h2>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search transactions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent w-full sm:w-64"
                    />
                  </div>
                  <button className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                    <Filter className="w-4 h-4" />
                    Filter
                  </button>
                </div>
              </div>
            </div>

            {loadingPayments ? (
              <div className="p-12 flex items-center justify-center">
                <RefreshCcw className="animate-spin w-6 h-6 text-gray-500" />
                <span className="ml-3 text-sm text-gray-500">
                  Loading payments...
                </span>
              </div>
            ) : paymentsError ? (
              <div className="p-6">
                <div className="bg-rose-50 border border-rose-100 text-rose-700 p-4 rounded-lg">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-sm">
                      Error loading payments: {paymentsError}
                    </div>
                    <div>
                      <button
                        onClick={refreshPayments}
                        className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-rose-700 bg-white border border-rose-100 rounded-lg hover:bg-rose-50"
                      >
                        Retry
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : transactions.length === 0 ? (
              <div className="p-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Wallet className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  No payments found
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  There are no payments to display. Try refreshing or create a
                  payment.
                </p>
                <button
                  onClick={refreshPayments}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Refresh
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                      <th className="text-left py-3.5 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Transaction ID
                      </th>
                      <th className="text-left py-3.5 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="text-left py-3.5 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="text-left py-3.5 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Method
                      </th>
                      <th className="text-left py-3.5 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="text-left py-3.5 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="text-right py-3.5 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {transactions.map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="hover:bg-gray-50/50 transition-colors group"
                      >
                        <td className="py-4 px-6">
                          <span className="text-sm font-mono font-medium text-gray-900">
                            {transaction.id}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-600">
                              {transaction.customer
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {transaction.customer}
                              </p>
                              <p className="text-xs text-gray-500">
                                {transaction.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-sm font-semibold text-gray-900">
                            $
                            {transaction.amount.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                            })}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-sm text-gray-600">
                            {transaction.method}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-sm text-gray-600">
                            {transaction.date}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(transaction.status)}`}
                          >
                            {getStatusIcon(transaction.status)}
                            {transaction.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Showing 1-8 of 2,451 transactions
              </p>
              <div className="flex items-center gap-2">
                <button
                  className="px-3 py-1.5 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                  disabled
                >
                  Previous
                </button>
                <button className="px-3 py-1.5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
