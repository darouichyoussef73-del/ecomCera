// import React from 'react'
// import Navbar from '../../components/navbar'
// const page = () => {
//   return (
//     <>
//         <Navbar/>
//       <main className="max-w-full text-black  px-20 py-24">
//         {/* Header */}
//         <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
//           <div>
//             <p className="text-sm text-[#8a8780] uppercase tracking-widest">
//               History
//             </p>
//             <h1 className="font-serif text-5xl md:text-6xl mt-2">
//               Your orders
//             </h1>
//           </div>

//           <div className="flex gap-2 flex-wrap">
//             <button className="px-4 py-2 rounded-full border border-[#ddd6c9] text-sm">
//               All
//             </button>
//             <button className="px-4 py-2 rounded-full border border-[#ddd6c9] text-sm">
//               In transit
//             </button>
//             <button className="px-4 py-2 rounded-full border border-[#ddd6c9] text-sm">
//               Delivered
//             </button>
//           </div>
//         </div>

//         {/* Orders */}
//         <div className="space-y-5">
//           {/* Order 1 */}
//           <article className="bg-white rounded-3xl p-7 shadow-sm">
//             <header className="flex flex-wrap justify-between gap-4 pb-5 border-b border-[#f0eadf]">
//               <div className="flex gap-8 flex-wrap text-sm">
//                 <div>
//                   <p className="text-[#8a8780] text-xs uppercase tracking-widest">
//                     Order
//                   </p>
//                   <p className="font-medium mt-1">#LM-1042</p>
//                 </div>

//                 <div>
//                   <p className="text-[#8a8780] text-xs uppercase tracking-widest">
//                     Placed
//                   </p>
//                   <p className="font-medium mt-1">Jun 2, 2026</p>
//                 </div>

//                 <div>
//                   <p className="text-[#8a8780] text-xs uppercase tracking-widest">
//                     Total
//                   </p>
//                   <p className="font-medium mt-1">$803.84</p>
//                 </div>
//               </div>

//               <span className="px-4 py-2 rounded-full bg-amber-100 text-amber-800 text-xs font-medium">
//                 In transit
//               </span>
//             </header>

//             <div className="flex flex-wrap justify-between items-center gap-4 pt-5">
//               <div className="flex gap-2 flex-wrap">
//                 <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#ece6dc] to-[#c9a772]" />
//                 <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#d4cdbf] to-[#3a322b]" />
//                 <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#f0eadf] to-[#8a7a66]" />
//                 <div className="w-14 h-14 rounded-xl bg-[#ece6dc] flex items-center justify-center text-xs text-[#8a8780]">
//                   +1
//                 </div>
//               </div>

//               <div className="flex gap-2 flex-wrap">
//                 <button className="px-4 py-2 rounded-full bg-[#0f0f10] text-white text-sm">
//                   Track order
//                 </button>
//                 <button className="px-4 py-2 rounded-full border border-[#ddd6c9] text-sm">
//                   Invoice
//                 </button>
//                 <button className="px-4 py-2 rounded-full border border-[#ddd6c9] text-sm">
//                   Reorder
//                 </button>
//               </div>
//             </div>
//           </article>

//           {/* Order 2 */}
//           <article className="bg-white rounded-3xl p-7 shadow-sm">
//             <header className="flex flex-wrap justify-between gap-4 pb-5 border-b border-[#f0eadf]">
//               <div className="flex gap-8 flex-wrap text-sm">
//                 <div>
//                   <p className="text-[#8a8780] text-xs uppercase tracking-widest">
//                     Order
//                   </p>
//                   <p className="font-medium mt-1">#LM-1029</p>
//                 </div>

//                 <div>
//                   <p className="text-[#8a8780] text-xs uppercase tracking-widest">
//                     Placed
//                   </p>
//                   <p className="font-medium mt-1">May 18, 2026</p>
//                 </div>

//                 <div>
//                   <p className="text-[#8a8780] text-xs uppercase tracking-widest">
//                     Total
//                   </p>
//                   <p className="font-medium mt-1">$148.00</p>
//                 </div>
//               </div>

//               <span className="px-4 py-2 rounded-full bg-green-100 text-green-800 text-xs font-medium">
//                 Delivered
//               </span>
//             </header>

//             <div className="flex justify-between items-center gap-4 pt-5">
//               <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#ece6dc] to-[#c9a772]" />

//               <div className="flex gap-2 flex-wrap">
//                 <button className="px-4 py-2 rounded-full border border-[#ddd6c9] text-sm">
//                   Track order
//                 </button>
//                 <button className="px-4 py-2 rounded-full border border-[#ddd6c9] text-sm">
//                   Invoice
//                 </button>
//                 <button className="px-4 py-2 rounded-full bg-[#0f0f10] text-white text-sm">
//                   Reorder
//                 </button>
//               </div>
//             </div>
//           </article>

//           {/* Order 3 */}
//           <article className="bg-white rounded-3xl p-7 shadow-sm">
//             <header className="flex flex-wrap justify-between gap-4 pb-5 border-b border-[#f0eadf]">
//               <div className="flex gap-8 flex-wrap text-sm">
//                 <div>
//                   <p className="text-[#8a8780] text-xs uppercase tracking-widest">
//                     Order
//                   </p>
//                   <p className="font-medium mt-1">#LM-1017</p>
//                 </div>

//                 <div>
//                   <p className="text-[#8a8780] text-xs uppercase tracking-widest">
//                     Placed
//                   </p>
//                   <p className="font-medium mt-1">May 3, 2026</p>
//                 </div>

//                 <div>
//                   <p className="text-[#8a8780] text-xs uppercase tracking-widest">
//                     Total
//                   </p>
//                   <p className="font-medium mt-1">$92.00</p>
//                 </div>
//               </div>

//               <span className="px-4 py-2 rounded-full bg-green-100 text-green-800 text-xs font-medium">
//                 Delivered
//               </span>
//             </header>

//             <div className="flex justify-between items-center gap-4 pt-5">
//               <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#f0eadf] to-[#8a7a66]" />

//               <div className="flex gap-2 flex-wrap">
//                 <button className="px-4 py-2 rounded-full border border-[#ddd6c9] text-sm">
//                   Invoice
//                 </button>
//                 <button className="px-4 py-2 rounded-full bg-[#0f0f10] text-white text-sm">
//                   Reorder
//                 </button>
//               </div>
//             </div>
//           </article>

//           {/* Order 4 */}
//           <article className="bg-white rounded-3xl p-7 shadow-sm">
//             <header className="flex flex-wrap justify-between gap-4 pb-5 border-b border-[#f0eadf]">
//               <div className="flex gap-8 flex-wrap text-sm">
//                 <div>
//                   <p className="text-[#8a8780] text-xs uppercase tracking-widest">
//                     Order
//                   </p>
//                   <p className="font-medium mt-1">#LM-0998</p>
//                 </div>

//                 <div>
//                   <p className="text-[#8a8780] text-xs uppercase tracking-widest">
//                     Placed
//                   </p>
//                   <p className="font-medium mt-1">Apr 14, 2026</p>
//                 </div>

//                 <div>
//                   <p className="text-[#8a8780] text-xs uppercase tracking-widest">
//                     Total
//                   </p>
//                   <p className="font-medium mt-1">$420.00</p>
//                 </div>
//               </div>

//               <span className="px-4 py-2 rounded-full bg-stone-200 text-stone-700 text-xs font-medium">
//                 Cancelled
//               </span>
//             </header>

//             <div className="flex justify-between items-center gap-4 pt-5">
//               <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#d4cdbf] to-[#3a322b]" />

//               <div className="flex gap-2 flex-wrap">
//                 <button className="px-4 py-2 rounded-full border border-[#ddd6c9] text-sm">
//                   Refund details
//                 </button>
//                 <button className="px-4 py-2 rounded-full bg-[#0f0f10] text-white text-sm">
//                   Reorder
//                 </button>
//               </div>
//             </div>
//           </article>
//         </div>
//       </main>

//     </>
//   )
// }

// export default page
'use client'
import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Download, 
  Truck, 
  ChevronLeft, 
  ChevronRight, 
  Package, 
  Clock, 
  CheckCircle, 
  XCircle, 
  ShoppingBag,
  MoreHorizontal,
  ArrowUpDown
} from 'lucide-react';

const page = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Mock data
  const orders = [
    {
      id: 'ORD-7829',
      date: '2026-06-09',
      products: ['Wireless Headphones Pro', 'USB-C Cable'],
      quantities: [1, 2],
      total: 189.97,
      status: 'Delivered',
      customer: 'Alex Johnson'
    },
    {
      id: 'ORD-7830',
      date: '2026-06-09',
      products: ['Smart Watch Series 5'],
      quantities: [1],
      total: 349.99,
      status: 'Processing',
      customer: 'Sarah Williams'
    },
    {
      id: 'ORD-7831',
      date: '2026-06-08',
      products: ['Mechanical Keyboard', 'Mouse Pad XL', 'Webcam 4K'],
      quantities: [1, 1, 1],
      total: 267.50,
      status: 'Shipped',
      customer: 'Michael Chen'
    },
    {
      id: 'ORD-7832',
      date: '2026-06-08',
      products: ['Portable Monitor 15.6"'],
      quantities: [2],
      total: 399.98,
      status: 'Processing',
      customer: 'Emily Davis'
    },
    {
      id: 'ORD-7833',
      date: '2026-06-07',
      products: ['Bluetooth Speaker', 'Power Bank 20000mAh'],
      quantities: [1, 1],
      total: 89.98,
      status: 'Cancelled',
      customer: 'James Wilson'
    },
    {
      id: 'ORD-7834',
      date: '2026-06-07',
      products: ['Laptop Stand Aluminum'],
      quantities: [3],
      total: 74.97,
      status: 'Delivered',
      customer: 'Lisa Anderson'
    },
    {
      id: 'ORD-7835',
      date: '2026-06-06',
      products: ['Noise Cancelling Earbuds', 'Wireless Charger'],
      quantities: [1, 1],
      total: 159.98,
      status: 'Shipped',
      customer: 'Robert Taylor'
    },
    {
      id: 'ORD-7836',
      date: '2026-06-06',
      products: ['Gaming Mouse RGB', 'Mouse Bungee'],
      quantities: [1, 1],
      total: 64.98,
      status: 'Processing',
      customer: 'Amanda Martinez'
    },
    {
      id: 'ORD-7837',
      date: '2026-06-05',
      products: ['4K Webcam', 'Ring Light'],
      quantities: [1, 1],
      total: 129.98,
      status: 'Delivered',
      customer: 'David Brown'
    },
    {
      id: 'ORD-7838',
      date: '2026-06-05',
      products: ['USB Hub 7-in-1', 'HDMI Cable 6ft'],
      quantities: [2, 3],
      total: 78.95,
      status: 'Cancelled',
      customer: 'Jessica Lee'
    },
    {
      id: 'ORD-7839',
      date: '2026-06-04',
      products: ['Standing Desk Converter'],
      quantities: [1],
      total: 249.99,
      status: 'Delivered',
      customer: 'Kevin White'
    },
    {
      id: 'ORD-7840',
      date: '2026-06-04',
      products: ['Ergonomic Chair', 'Foot Rest'],
      quantities: [1, 1],
      total: 389.98,
      status: 'Processing',
      customer: 'Nicole Garcia'
    }
  ];

  const statusOptions = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Shipped':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Processing':
        return <Clock className="w-3.5 h-3.5 mr-1.5" />;
      case 'Shipped':
        return <Truck className="w-3.5 h-3.5 mr-1.5" />;
      case 'Delivered':
        return <CheckCircle className="w-3.5 h-3.5 mr-1.5" />;
      case 'Cancelled':
        return <XCircle className="w-3.5 h-3.5 mr-1.5" />;
      default:
        return null;
    }
  };

  // Statistics
  const stats = useMemo(() => {
    const total = orders.length;
    const processing = orders.filter(o => o.status === 'Processing').length;
    const delivered = orders.filter(o => o.status === 'Delivered').length;
    const cancelled = orders.filter(o => o.status === 'Cancelled').length;
    return { total, processing, delivered, cancelled };
  }, []);

  // Filter and search
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
      const matchesSearch = 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.products.some(p => p.toLowerCase().includes(searchQuery.toLowerCase())) ||
        order.customer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [searchQuery, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getTotalQuantity = (quantities) => quantities.reduce((a, b) => a + b, 0);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                Orders Management
              </h1>
              <p className="text-gray-500 mt-1 text-sm">
                Manage and track all your customer orders
              </p>
            </div>
            
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders, products..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Status Filters */}
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center mr-2 text-gray-500">
              <Filter className="w-4 h-4 mr-1.5" />
              <span className="text-sm font-medium">Filter:</span>
            </div>
            {statusOptions.map((status) => (
              <button
                key={status}
                onClick={() => { setStatusFilter(status); setCurrentPage(1); }}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  statusFilter === status
                    ? 'bg-gray-900 text-white shadow-md shadow-gray-900/20'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 bg-indigo-50 rounded-xl">
                <ShoppingBag className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                All Time
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-sm text-gray-500 mt-0.5">Total Orders</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 bg-amber-50 rounded-xl">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                Active
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.processing}</p>
            <p className="text-sm text-gray-500 mt-0.5">Processing</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 bg-emerald-50 rounded-xl">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                Completed
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.delivered}</p>
            <p className="text-sm text-gray-500 mt-0.5">Delivered</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 bg-red-50 rounded-xl">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-full">
                Issues
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.cancelled}</p>
            <p className="text-sm text-gray-500 mt-0.5">Cancelled</p>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
                      Order <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Products
                  </th>
                  <th className="text-center py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Qty
                  </th>
                  <th className="text-right py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Total
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
                {paginatedOrders.length > 0 ? (
                  paginatedOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-indigo-50 rounded-lg flex items-center justify-center">
                            <Package className="w-4 h-4 text-indigo-600" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{order.id}</p>
                            <p className="text-xs text-gray-500">{order.customer}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm text-gray-700">{formatDate(order.date)}</p>
                      </td>
                      <td className="py-4 px-6">
                        <div className="max-w-xs">
                          <p className="text-sm text-gray-700 truncate">
                            {order.products.join(', ')}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {order.products.length} item{order.products.length > 1 ? 's' : ''}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                          {getTotalQuantity(order.quantities)}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <p className="text-sm font-semibold text-gray-900">
                          ${order.total.toFixed(2)}
                        </p>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="View Details">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" title="Download Invoice">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Track Order">
                            <Truck className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-16 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">No orders found</h3>
                        <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {paginatedOrders.length > 0 ? (
            paginatedOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                      <Package className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{order.id}</p>
                      <p className="text-xs text-gray-500">{formatDate(order.date)}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {order.status}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-700 font-medium">{order.customer}</p>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {order.products.join(', ')}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{getTotalQuantity(order.quantities)} items</span>
                    <span className="text-gray-300">|</span>
                    <span className="font-semibold text-gray-900">${order.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors">
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors">
                    <Download className="w-4 h-4" />
                    Invoice
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                    <Truck className="w-4 h-4" />
                    Track
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">No orders found</h3>
              <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredOrders.length > 0 && (
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
              <span className="font-medium text-gray-900">
                {Math.min(currentPage * itemsPerPage, filteredOrders.length)}
              </span>{' '}
              of <span className="font-medium text-gray-900">{filteredOrders.length}</span> results
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
    </div>
  );
};

export default page;