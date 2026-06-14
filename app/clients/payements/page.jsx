'use client'
import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  CreditCard, 
  Wallet, 
  Landmark, 
  ChevronLeft, 
  ChevronRight, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ArrowUpRight,
  ArrowDownRight,
  Receipt,
  MoreHorizontal,
  Calendar,
  DollarSign,
  CreditCard as CardIcon,
  Landmark as BankIcon,
  Smartphone
} from 'lucide-react';

const   page = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // Mock transactions data
  const transactions = [
    {
      id: 'TXN-4521',
      date: '2026-06-10',
      orderId: 'ORD-7829',
      method: 'Credit Card •••• 4242',
      methodType: 'card',
      amount: 189.97,
      status: 'Completed',
      description: 'Wireless Headphones Pro + Accessories'
    },
    {
      id: 'TXN-4522',
      date: '2026-06-09',
      orderId: 'ORD-7830',
      method: 'PayPal',
      methodType: 'paypal',
      amount: 349.99,
      status: 'Completed',
      description: 'Smart Watch Series 5'
    },
    {
      id: 'TXN-4523',
      date: '2026-06-09',
      orderId: 'ORD-7831',
      method: 'Bank Transfer',
      methodType: 'bank',
      amount: 267.50,
      status: 'Pending',
      description: 'Mechanical Keyboard Bundle'
    },
    {
      id: 'TXN-4524',
      date: '2026-06-08',
      orderId: 'ORD-7832',
      method: 'Credit Card •••• 4242',
      methodType: 'card',
      amount: 399.98,
      status: 'Completed',
      description: 'Portable Monitor 15.6" x2'
    },
    {
      id: 'TXN-4525',
      date: '2026-06-08',
      orderId: 'ORD-7833',
      method: 'PayPal',
      methodType: 'paypal',
      amount: 89.98,
      status: 'Failed',
      description: 'Bluetooth Speaker + Power Bank'
    },
    {
      id: 'TXN-4526',
      date: '2026-06-07',
      orderId: 'ORD-7834',
      method: 'Credit Card •••• 4242',
      methodType: 'card',
      amount: 74.97,
      status: 'Completed',
      description: 'Laptop Stand Aluminum x3'
    },
    {
      id: 'TXN-4527',
      date: '2026-06-07',
      orderId: 'ORD-7835',
      method: 'Bank Transfer',
      methodType: 'bank',
      amount: 159.98,
      status: 'Pending',
      description: 'Noise Cancelling Earbuds + Charger'
    },
    {
      id: 'TXN-4528',
      date: '2026-06-06',
      orderId: 'ORD-7836',
      method: 'Credit Card •••• 4242',
      methodType: 'card',
      amount: 64.98,
      status: 'Completed',
      description: 'Gaming Mouse RGB + Bungee'
    },
    {
      id: 'TXN-4529',
      date: '2026-06-05',
      orderId: 'ORD-7837',
      method: 'PayPal',
      methodType: 'paypal',
      amount: 129.98,
      status: 'Completed',
      description: '4K Webcam + Ring Light'
    },
    {
      id: 'TXN-4530',
      date: '2026-06-05',
      orderId: 'ORD-7838',
      method: 'Credit Card •••• 4242',
      methodType: 'card',
      amount: 78.95,
      status: 'Failed',
      description: 'USB Hub 7-in-1 + HDMI Cables'
    },
    {
      id: 'TXN-4531',
      date: '2026-06-04',
      orderId: 'ORD-7839',
      method: 'Bank Transfer',
      methodType: 'bank',
      amount: 249.99,
      status: 'Completed',
      description: 'Standing Desk Converter'
    },
    {
      id: 'TXN-4532',
      date: '2026-06-04',
      orderId: 'ORD-7840',
      method: 'Credit Card •••• 4242',
      methodType: 'card',
      amount: 389.98,
      status: 'Pending',
      description: 'Ergonomic Chair + Foot Rest'
    }
  ];

  const statusOptions = ['All', 'Completed', 'Pending', 'Failed'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Failed':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />;
      case 'Pending':
        return <Clock className="w-3.5 h-3.5 mr-1.5" />;
      case 'Failed':
        return <XCircle className="w-3.5 h-3.5 mr-1.5" />;
      default:
        return null;
    }
  };

  const getMethodIcon = (type) => {
    switch (type) {
      case 'card':
        return <CardIcon className="w-4 h-4 text-indigo-600" />;
      case 'paypal':
        return <Smartphone className="w-4 h-4 text-blue-600" />;
      case 'bank':
        return <BankIcon className="w-4 h-4 text-emerald-600" />;
      default:
        return <CreditCard className="w-4 h-4 text-gray-600" />;
    }
  };

  // Statistics
  const stats = useMemo(() => {
    const total = transactions.length;
    const thisMonth = transactions
      .filter(t => t.status === 'Completed')
      .reduce((sum, t) => sum + t.amount, 0);
    const pending = transactions.filter(t => t.status === 'Pending').length;
    const successful = transactions.filter(t => t.status === 'Completed').length;
    return { total, thisMonth, pending, successful };
  }, []);

  // Filter and search
  const filteredTransactions = useMemo(() => {
    return transactions.filter(txn => {
      const matchesStatus = statusFilter === 'All' || txn.status === statusFilter;
      const matchesSearch = 
        txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        txn.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        txn.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        txn.method.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [searchQuery, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Saved payment methods
  const savedMethods = [
    {
      id: 1,
      type: 'card',
      name: 'Visa ending in 4242',
      details: 'Expires 12/28',
      isDefault: true,
      icon: <CardIcon className="w-5 h-5 text-white" />
    },
    {
      id: 2,
      type: 'paypal',
      name: 'PayPal',
      details: 'fouad@example.com',
      isDefault: false,
      icon: <Smartphone className="w-5 h-5 text-white" />
    },
    {
      id: 3,
      type: 'bank',
      name: 'Chase Bank',
      details: '•••• 8891',
      isDefault: false,
      icon: <BankIcon className="w-5 h-5 text-white" />
    }
  ];

  const getMethodBgColor = (type) => {
    switch (type) {
      case 'card':
        return 'bg-indigo-500';
      case 'paypal':
        return 'bg-blue-500';
      case 'bank':
        return 'bg-emerald-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              Payments
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              Manage transactions, invoices, and payment methods
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-all shadow-md shadow-gray-900/20">
              <Receipt className="w-4 h-4" />
              New Payment
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 bg-indigo-50 rounded-xl">
                <Receipt className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                All Time
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-sm text-gray-500 mt-0.5">Total Payments</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 bg-emerald-50 rounded-xl">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                June 2026
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.thisMonth)}</p>
            <p className="text-sm text-gray-500 mt-0.5">This Month</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 bg-amber-50 rounded-xl">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                Awaiting
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            <p className="text-sm text-gray-500 mt-0.5">Pending</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 bg-emerald-50 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                Success Rate
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.successful}</p>
            <p className="text-sm text-gray-500 mt-0.5">Successful</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Transactions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search transactions, orders..."
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                  <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  {statusOptions.map((status) => (
                    <button
                      key={status}
                      onClick={() => { setStatusFilter(status); setCurrentPage(1); }}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                        statusFilter === status
                          ? 'bg-gray-900 text-white shadow-md shadow-gray-900/20'
                          : 'bg-gray-50 text-gray-600 border border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Transaction
                      </th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Method
                      </th>
                      <th className="text-right py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="text-center py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="text-right py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {paginatedTransactions.length > 0 ? (
                      paginatedTransactions.map((txn) => (
                        <tr key={txn.id} className="hover:bg-gray-50/50 transition-colors group">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center">
                                <Receipt className="w-4 h-4 text-gray-600" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-900">{txn.id}</p>
                                <p className="text-xs text-gray-500">{txn.orderId}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <p className="text-sm text-gray-700">{formatDate(txn.date)}</p>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              {getMethodIcon(txn.methodType)}
                              <span className="text-sm text-gray-700">{txn.method}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <p className="text-sm font-semibold text-gray-900">
                              {formatCurrency(txn.amount)}
                            </p>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(txn.status)}`}>
                              {getStatusIcon(txn.status)}
                              {txn.status}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center justify-end gap-1">
                              <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="View Receipt">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" title="Download Invoice">
                                <Download className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-16 text-center">
                          <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                              <Search className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">No transactions found</h3>
                            <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {filteredTransactions.length > 0 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">
                    Showing <span className="font-medium text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                    <span className="font-medium text-gray-900">
                      {Math.min(currentPage * itemsPerPage, filteredTransactions.length)}
                    </span>{' '}
                    of <span className="font-medium text-gray-900">{filteredTransactions.length}</span>
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${
                          currentPage === page
                            ? 'bg-gray-900 text-white shadow-md shadow-gray-900/20'
                            : 'text-gray-600 hover:bg-gray-50 border border-transparent hover:border-gray-200'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
              {paginatedTransactions.length > 0 ? (
                paginatedTransactions.map((txn) => (
                  <div key={txn.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                          <Receipt className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{txn.id}</p>
                          <p className="text-xs text-gray-500">{txn.orderId}</p>
                        </div>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(txn.status)}`}>
                        {txn.status}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(txn.date)}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        {getMethodIcon(txn.methodType)}
                        {txn.method}
                      </div>
                      <p className="text-lg font-bold text-gray-900">{formatCurrency(txn.amount)}</p>
                    </div>

                    <div className="flex gap-2 pt-3 border-t border-gray-100">
                      <button className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors">
                        <Eye className="w-4 h-4" />
                        Receipt
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors">
                        <Download className="w-4 h-4" />
                        Invoice
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">No transactions found</h3>
                  <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Spending Overview Placeholder */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-900">Spending Overview</h3>
                <select className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-gray-600 focus:outline-none">
                  <option>This Month</option>
                  <option>Last Month</option>
                  <option>This Year</option>
                </select>
              </div>
              
              {/* Chart Placeholder */}
              <div className="relative h-48 bg-gradient-to-b from-gray-50 to-white rounded-xl border border-gray-100 flex items-end justify-between px-4 pb-4 gap-2">
                {[35, 55, 40, 70, 45, 60, 80, 50, 65, 75, 55, 85].map((height, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div 
                      className={`w-full rounded-t-md transition-all ${i === 11 ? 'bg-indigo-500' : 'bg-indigo-200'}`}
                      style={{ height: `${height}%` }}
                    />
                  </div>
                ))}
                <div className="absolute top-4 left-4">
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.thisMonth)}</p>
                  <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
                    <ArrowUpRight className="w-3 h-3" />
                    <span className="font-medium">+12.5%</span>
                    <span className="text-gray-400 ml-1">vs last month</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div className="text-center flex-1">
                  <p className="text-xs text-gray-500 mb-0.5">Income</p>
                  <p className="text-sm font-semibold text-emerald-600">{formatCurrency(2840.50)}</p>
                </div>
                <div className="w-px h-8 bg-gray-200" />
                <div className="text-center flex-1">
                  <p className="text-xs text-gray-500 mb-0.5">Expenses</p>
                  <p className="text-sm font-semibold text-red-600">{formatCurrency(1845.20)}</p>
                </div>
              </div>
            </div>

            {/* Saved Payment Methods */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-900">Payment Methods</h3>
                <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700">
                  + Add New
                </button>
              </div>
              
              <div className="space-y-3">
                {savedMethods.map((method) => (
                  <div 
                    key={method.id} 
                    className={`relative flex items-center gap-3 p-3.5 rounded-xl border transition-all ${
                      method.isDefault 
                        ? 'border-indigo-200 bg-indigo-50/50' 
                        : 'border-gray-100 hover:border-gray-200 bg-white'
                    }`}
                  >
                    <div className={`w-10 h-10 ${getMethodBgColor(method.type)} rounded-xl flex items-center justify-center shadow-sm`}>
                      {method.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-900 truncate">{method.name}</p>
                        {method.isDefault && (
                          <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-100 px-1.5 py-0.5 rounded">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{method.details}</p>
                    </div>
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Summary</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-sm text-gray-600">Avg. Transaction</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{formatCurrency(187.45)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Wallet className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-600">Largest Payment</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{formatCurrency(399.98)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-sm text-gray-600">Last Payment</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">Today</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;