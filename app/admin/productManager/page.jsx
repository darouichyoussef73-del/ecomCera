// "use client";
// import React from "react";
// import { useState } from "react";
// import {
//   Search,
//   Plus,
//   Filter,
//   ChevronDown,
//   ChevronLeft,
//   ChevronRight,
//   Eye,
//   Pencil,
//   Trash2,
//   X,
//   Package,
//   CheckCircle2,
//   XCircle,
//   AlertTriangle,
//   DollarSign,
//   ShoppingBag,
//   TrendingUp,
//   Box,
//   Tag,
//   Grid3X3,
//   Layers,
//   MoreHorizontal,
//   ArrowUpDown,
//   Download,
//   Image as ImageIcon,
// } from "lucide-react";
// import Link from "next/link";

// const page = () => {
// const [searchQuery, setSearchQuery] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('all');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [sortBy, setSortBy] = useState('name');
//   const [sortOrder, setSortOrder] = useState('asc');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [productToDelete, setProductToDelete] = useState(null);
//   const itemsPerPage = 8;

//   const [products, setProducts] = useState([]);
//   const [loadingProducts, setLoadingProducts] = useState(false);
//   const [fetchError, setFetchError] = useState(null);

//   const fetchProducts = async () => {
//     setLoadingProducts(true);
//     setFetchError(null);
//     try {
//       const res = await fetch('http://127.0.0.1:8000/api/admin/products?per_page=1000');
//       const data = await res.json();

//       const list = data.data || data;
//       setProducts(list);
//     } catch (err) {
//       setFetchError('Failed to load products');
//     } finally {
//       setLoadingProducts(false);
//     }
//   };

//   React.useEffect(() => {
//     fetchProducts();
//   }, []);

//   const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];

//   const filteredProducts = products.filter(product => {
//     const name = (product.name || '').toString().toLowerCase();
//     const sku = (product.sku || '').toString().toLowerCase();
//     const matchesSearch = name.includes(searchQuery.toLowerCase()) || sku.includes(searchQuery.toLowerCase());

//     const matchesCategory = categoryFilter === 'all' || (product.category || '') === categoryFilter;

//     const statusFilterLower = (statusFilter || 'all').toString().toLowerCase();
//     const status = (product.status || '').toString().toLowerCase();
//     const stock = Number(product.stock || 0);

//     let matchesStatus = true;
//     if (statusFilterLower === 'all') {
//       matchesStatus = true;
//     } else if (statusFilterLower === 'active') {
//       // Active should mean status is active AND there is stock available
//       matchesStatus = status === 'active' && stock > 0;
//     } else if (statusFilterLower === 'out of stock') {
//       matchesStatus = stock === 0 || status === 'out of stock';
//     } else if (statusFilterLower === 'low stock') {
//       matchesStatus = (stock > 0 && stock <= 10) || status === 'low stock';
//     } else if (statusFilterLower === 'inactive') {
//       matchesStatus = status === 'inactive';
//     } else {
//       matchesStatus = status === statusFilterLower;
//     }

//     return matchesSearch && matchesCategory && matchesStatus;
//   });

//   const sortedProducts = [...filteredProducts].sort((a, b) => {
//     let aVal = a[sortBy];
//     let bVal = b[sortBy];
//     if (typeof aVal === 'string') aVal = aVal.toLowerCase();
//     if (typeof bVal === 'string') bVal = bVal.toLowerCase();
//     if (sortOrder === 'asc') return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
//     return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
//   });

//   const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
//   const paginatedProducts = sortedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   const handleSort = (field) => {
//     if (sortBy === field) {
//       setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSortBy(field);
//       setSortOrder('asc');
//     }
//   };

//   const handleDelete = (product) => {
//     setProductToDelete(product);
//     setShowDeleteModal(true);
//   };

//   const confirmDelete = () => {
//     // call API to delete, then update local state
//     const doDelete = async () => {
//       if (!productToDelete) return;
//       try {
//         const res = await fetch(`http://127.0.0.1:8000/api/admin/products/${productToDelete.id}`, { method: 'DELETE' });
//         if (res.ok || res.status === 204) {
//           setProducts(prev => prev.filter(p => p.id !== productToDelete.id));
//         }
//       } catch (err) {
//         // ignore for now
//       } finally {
//         setShowDeleteModal(false);
//         setProductToDelete(null);
//       }
//     };
//     doDelete();
//   };

//   const getStatusStyles = (status) => {
//     const s = (status || '').toLowerCase();
//     switch (s) {
//       case 'active': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
//       case 'inactive': return 'bg-gray-50 text-gray-600 border-gray-200';
//       case 'out of stock': return 'bg-red-50 text-red-700 border-red-200';
//       case 'low stock': return 'bg-amber-50 text-amber-700 border-amber-200';
//       default: return 'bg-gray-50 text-gray-600 border-gray-200';
//     }
//   };

//   const getStatusIcon = (status) => {
//     const s = (status || '').toLowerCase();
//     switch (s) {
//       case 'active': return <CheckCircle2 className="w-3.5 h-3.5" />;
//       case 'inactive': return <XCircle className="w-3.5 h-3.5" />;
//       case 'out of stock': return <XCircle className="w-3.5 h-3.5" />;
//       case 'low stock': return <AlertTriangle className="w-3.5 h-3.5" />;
//       default: return null;
//     }
//   };

//   const getStockColor = (stock, status) => {
//     if (status === 'Out of Stock') return 'text-red-600';
//     if (stock <= 10) return 'text-amber-600';
//     return 'text-emerald-600';
//   };

//   // Normalize data and compute accurate counts/revenue
//   const totalProducts = products.length;
//   const activeCount = products.filter(p => (p.status || '').toString().toLowerCase() === 'active').length;
//   const outOfStockCount = products.filter(p => Number(p.stock || 0) === 0 || (p.status || '').toString().toLowerCase() === 'out of stock').length;
//   const revenue = products.reduce((sum, p) => {
//     const stock = Number(p.stock || 0);
//     const price = Number(p.price || 0);
//     return sum + stock * price;
//   }, 0);

//   const stats = [
//     { label: 'Total Products', value: totalProducts, icon: Package, color: 'bg-slate-900 text-white' },
//     { label: 'Active Products', value: activeCount, icon: CheckCircle2, color: 'bg-emerald-50 text-emerald-600' },
//     { label: 'Out of Stock', value: outOfStockCount, icon: AlertTriangle, color: 'bg-red-50 text-red-600' },
//     { label: 'Revenue', value: `$${revenue.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}`, icon: DollarSign, color: 'bg-blue-50 text-blue-600' },
//   ];

//   return (
//     <>
//       {/* Header */}
//       <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center gap-3">
//               <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
//                 <ShoppingBag className="w-4 h-4 text-white" />
//               </div>
//               <h1 className="text-xl font-bold text-gray-900">Products</h1>
//             </div>
//             <div className="flex items-center gap-3">
//               <Link
//                 href="/admin/productManager/addProduct"
//                 className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-sm"
//               >
//                 <Plus className="w-4 h-4" />
//                 <span className="hidden sm:inline">Add Product</span>
//                 <span className="sm:hidden">Add</span>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:pr-8 py-8">
//         {/* Stats Cards */}

//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//           {stats.map((stat, index) => {
//             const Icon = stat.icon;
//             return (
//               <div
//                 key={index}
//                 className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
//               >
//                 <div className="flex items-center justify-between mb-3">
//                   <div
//                     className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}
//                   >
//                     <Icon className="w-5 h-5" />
//                   </div>
//                   <TrendingUp className="w-4 h-4 text-gray-400" />
//                 </div>
//                 <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
//                 <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
//               </div>
//             );
//           })}
//         </div>

//         {/* Filters & Search */}
//         <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-6">
//           <div className="p-4 sm:p-6 border-b border-gray-100">
//             <div className="flex flex-col lg:flex-row gap-4">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search by name or SKU..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
//                 />
//               </div>
//               <div className="flex gap-3 flex-wrap">
//                 <div className="relative">
//                   <select
//                     value={categoryFilter}
//                     onChange={(e) => setCategoryFilter(e.target.value)}
//                     className="appearance-none pl-9 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 cursor-pointer"
//                   >
//                     {categories.map((cat) => (
//                       <option key={cat} value={cat}>
//                         {cat === "all" ? "All Categories" : cat}
//                       </option>
//                     ))}
//                   </select>
//                   <Grid3X3 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
//                   <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
//                 </div>
//                 <div className="relative">
//                   <select
//                     value={statusFilter}
//                     onChange={(e) => setStatusFilter(e.target.value)}
//                     className="appearance-none pl-9 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 cursor-pointer"
//                   >
//                     <option value="all">All Status</option>
//                     <option value="Active">Active</option>
//                     <option value="Inactive">Inactive</option>
//                     <option value="Low Stock">Low Stock</option>
//                     <option value="Out of Stock">Out of Stock</option>
//                   </select>
//                   <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
//                   <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Product Table */}
//           <div className="overflow-x-auto">
//             {paginatedProducts.length > 0 ? (
//               <table className="w-full">
//                 <thead>
//                   <tr className="bg-gray-50/50 border-b border-gray-100">
//                     <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                       <button
//                         onClick={() => handleSort("name")}
//                         className="flex items-center gap-1 hover:text-gray-700 transition-colors"
//                       >
//                         Product
//                         <ArrowUpDown className="w-3.5 h-3.5" />
//                       </button>
//                     </th>
//                     <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
//                       SKU
//                     </th>
//                     <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">
//                       Category
//                     </th>
//                     <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                       <button
//                         onClick={() => handleSort("stock")}
//                         className="flex items-center gap-1 hover:text-gray-700 transition-colors"
//                       >
//                         Stock
//                         <ArrowUpDown className="w-3.5 h-3.5" />
//                       </button>
//                     </th>
//                     <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                       <button
//                         onClick={() => handleSort("price")}
//                         className="flex items-center gap-1 hover:text-gray-700 transition-colors"
//                       >
//                         Price
//                         <ArrowUpDown className="w-3.5 h-3.5" />
//                       </button>
//                     </th>
//                     <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                       Status
//                     </th>
//                     <th className="px-4 sm:px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-100">
//                   {paginatedProducts.map((product) => (
//                     <tr
//                       key={product.id}
//                       className="hover:bg-gray-50/50 transition-colors group"
//                     >
//                       <td className="px-4 sm:px-6 py-4">
//                         <div className="flex items-center gap-3">
//                           <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0">
//                             <img
//                               src={product.image}
//                               alt={product.name}
//                               className="w-full h-full object-cover"
//                               onError={(e) => {
//                                 e.target.style.display = "none";
//                                 e.target.parentElement.innerHTML =
//                                   '<div class="w-full h-full flex items-center justify-center text-gray-400"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>';
//                               }}
//                             />
//                           </div>
//                           <div className="min-w-0">
//                             <p className="text-sm font-semibold text-gray-900 truncate">
//                               {product.name}
//                             </p>
//                             <p className="text-xs text-gray-500 md:hidden">
//                               {product.sku}
//                             </p>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-4 sm:px-6 py-4 text-sm text-gray-600 hidden md:table-cell">
//                         <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded-md">
//                           {product.sku}
//                         </span>
//                       </td>
//                       <td className="px-4 sm:px-6 py-4 hidden lg:table-cell">
//                         <span className="inline-flex items-center gap-1.5 text-sm text-gray-600">
//                           <Tag className="w-3.5 h-3.5 text-gray-400" />
//                           {product.category}
//                         </span>
//                       </td>
//                       <td className="px-4 sm:px-6 py-4">
//                         <div className="flex items-center gap-2">
//                           <Box className="w-3.5 h-3.5 text-gray-400" />
//                           <span
//                             className={`text-sm font-medium ${getStockColor(product.stock, product.status)}`}
//                           >
//                             {product.stock}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="px-4 sm:px-6 py-4">
//                         <span className="text-sm font-semibold text-gray-900">
//                           ${parseFloat(product.price).toFixed(2)}
//                         </span>
//                       </td>
//                       <td className="px-4 sm:px-6 py-4">
//                         <span
//                           className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusStyles(product.status)}`}
//                         >
//                           {getStatusIcon(product.status)}
//                           {product.status}
//                         </span>
//                       </td>
//                       <td className="px-4 sm:px-6 py-4">
//                         <div className="flex items-center justify-end gap-1">
//                           <button
//                             className="p-2 rounded-lg text-gray-400 hover:text-slate-900 hover:bg-gray-100 transition-all"
//                             title="View"
//                           >
//                             <Eye className="w-4 h-4" />
//                           </button>
//                           <button
//                             className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
//                             title="Edit"
//                           >
//                             <Pencil className="w-4 h-4" />
//                           </button>
//                           <button
//                             onClick={() => handleDelete(product)}
//                             className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"
//                             title="Delete"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             ) : (
//               <div className="flex flex-col items-center justify-center py-16 px-4">
//                 <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
//                   <Package className="w-8 h-8 text-gray-400" />
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-1">
//                   No products found
//                 </h3>
//                 <p className="text-sm text-gray-500 mb-4">
//                   Try adjusting your search or filters
//                 </p>
//                 <button
//                   onClick={() => {
//                     setSearchQuery("");
//                     setCategoryFilter("all");
//                     setStatusFilter("all");
//                   }}
//                   className="text-sm font-medium text-slate-900 hover:underline"
//                 >
//                   Clear all filters
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-t border-gray-100">
//               <p className="text-sm text-gray-500 hidden sm:block">
//                 Showing{" "}
//                 <span className="font-medium text-gray-900">
//                   {(currentPage - 1) * itemsPerPage + 1}
//                 </span>{" "}
//                 to{" "}
//                 <span className="font-medium text-gray-900">
//                   {Math.min(currentPage * itemsPerPage, sortedProducts.length)}
//                 </span>{" "}
//                 of{" "}
//                 <span className="font-medium text-gray-900">
//                   {sortedProducts.length}
//                 </span>{" "}
//                 products
//               </p>
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//                   disabled={currentPage === 1}
//                   className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
//                 >
//                   <ChevronLeft className="w-4 h-4" />
//                 </button>
//                 {Array.from({ length: totalPages }, (_, i) => i + 1).map(
//                   (page) => (
//                     <button
//                       key={page}
//                       onClick={() => setCurrentPage(page)}
//                       className={`min-w-[36px] h-9 px-3 rounded-lg text-sm font-medium transition-colors ${
//                         currentPage === page
//                           ? "bg-slate-900 text-white"
//                           : "text-gray-600 hover:bg-gray-50 border border-gray-200"
//                       }`}
//                     >
//                       {page}
//                     </button>
//                   ),
//                 )}
//                 <button
//                   onClick={() =>
//                     setCurrentPage((p) => Math.min(totalPages, p + 1))
//                   }
//                   disabled={currentPage === totalPages}
//                   className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
//                 >
//                   <ChevronRight className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && productToDelete && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//           <div
//             className="absolute inset-0 bg-black/40"
//             onClick={() => setShowDeleteModal(false)}
//           />
//           <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-semibold text-gray-900">
//                 Delete Product
//               </h3>
//               <button
//                 onClick={() => setShowDeleteModal(false)}
//                 className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
//               >
//                 <X className="w-5 h-5 text-gray-400" />
//               </button>
//             </div>
//             <div className="flex items-center gap-4 mb-6">
//               <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0">
//                 <img
//                   src={productToDelete.image }
//                   alt={productToDelete.name}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">
//                   Are you sure you want to delete{" "}
//                   <span className="font-semibold text-gray-900">
//                     {productToDelete.name}
//                   </span>
//                   ? This action cannot be undone.
//                 </p>
//               </div>
//             </div>
//             <div className="flex gap-3 justify-end">
//               <button
//                 onClick={() => setShowDeleteModal(false)}
//                 className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmDelete}
//                 className="px-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-sm"
//               >
//                 Delete Product
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default page;
"use client";
import React from "react";
import { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Pencil,
  Trash2,
  X,
  Package,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Box,
  Tag,
  Grid3X3,
  Layers,
  MoreHorizontal,
  ArrowUpDown,
  Download,
  Image as ImageIcon,
  Save,
  Loader2,
} from "lucide-react";
import Link from "next/link";

const page = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const itemsPerPage = 8;

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  // Product Detail Modal State
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [savingProduct, setSavingProduct] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const fetchProducts = async () => {
    setLoadingProducts(true);
    setFetchError(null);
    try {
      const res = await fetch('http://127.0.0.1:8000/api/admin/products?per_page=1000');
      const data = await res.json();

      const list = data.data || data;
      setProducts(list);
    } catch (err) {
      setFetchError('Failed to load products');
    } finally {
      setLoadingProducts(false);
    }
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];

  const filteredProducts = products.filter(product => {
    const name = (product.name || '').toString().toLowerCase();
    const sku = (product.sku || '').toString().toLowerCase();
    const matchesSearch = name.includes(searchQuery.toLowerCase()) || sku.includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === 'all' || (product.category || '') === categoryFilter;

    const statusFilterLower = (statusFilter || 'all').toString().toLowerCase();
    const status = (product.status || '').toString().toLowerCase();
    const stock = Number(product.stock || 0);

    let matchesStatus = true;
    if (statusFilterLower === 'all') {
      matchesStatus = true;
    } else if (statusFilterLower === 'active') {
      matchesStatus = status === 'active' && stock > 0;
    } else if (statusFilterLower === 'out of stock') {
      matchesStatus = stock === 0 || status === 'out of stock';
    } else if (statusFilterLower === 'low stock') {
      matchesStatus = (stock > 0 && stock <= 10) || status === 'low stock';
    } else if (statusFilterLower === 'inactive') {
      matchesStatus = status === 'inactive';
    } else {
      matchesStatus = status === statusFilterLower;
    }

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];
    if (typeof aVal === 'string') aVal = aVal.toLowerCase();
    if (typeof bVal === 'string') bVal = bVal.toLowerCase();
    if (sortOrder === 'asc') return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
  });

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleDelete = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    const doDelete = async () => {
      if (!productToDelete) return;
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/admin/products/${productToDelete.id}`, { method: 'DELETE' });
        if (res.ok || res.status === 204) {
          setProducts(prev => prev.filter(p => p.id !== productToDelete.id));
        }
      } catch (err) {
        // ignore for now
      } finally {
        setShowDeleteModal(false);
        setProductToDelete(null);
      }
    };
    doDelete();
  };

  // Open product detail modal
  const openProductDetail = (product, editMode = false) => {
    setSelectedProduct(product);
    setEditForm({ ...product });
    setIsEditing(editMode);
    setSaveError(null);
    setShowDetailModal(true);
  };

  // Close product detail modal
  const closeProductDetail = () => {
    setShowDetailModal(false);
    setSelectedProduct(null);
    setEditForm({});
    setIsEditing(false);
    setSaveError(null);
  };

  // Handle form field changes
  const handleEditChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  // Save product changes
  const handleSaveProduct = async () => {
    if (!selectedProduct) return;
    setSavingProduct(true);
    setSaveError(null);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/admin/products/${selectedProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });
      if (res.ok) {
        const updated = await res.json();
        setProducts(prev => prev.map(p => p.id === selectedProduct.id ? { ...p, ...editForm } : p));
        setSelectedProduct({ ...selectedProduct, ...editForm });
        setIsEditing(false);
      } else {
        const errData = await res.json().catch(() => ({}));
        setSaveError(errData.message || 'Failed to save product');
      }
    } catch (err) {
      setSaveError('Network error. Please try again.');
    } finally {
      setSavingProduct(false);
    }
  };

  const getStatusStyles = (status) => {
    const s = (status || '').toLowerCase();
    switch (s) {
      case 'active': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'inactive': return 'bg-gray-50 text-gray-600 border-gray-200';
      case 'out of stock': return 'bg-red-50 text-red-700 border-red-200';
      case 'low stock': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    const s = (status || '').toLowerCase();
    switch (s) {
      case 'active': return <CheckCircle2 className="w-3.5 h-3.5" />;
      case 'inactive': return <XCircle className="w-3.5 h-3.5" />;
      case 'out of stock': return <XCircle className="w-3.5 h-3.5" />;
      case 'low stock': return <AlertTriangle className="w-3.5 h-3.5" />;
      default: return null;
    }
  };

  const getStockColor = (stock, status) => {
    if (status === 'Out of Stock') return 'text-red-600';
    if (stock <= 10) return 'text-amber-600';
    return 'text-emerald-600';
  };

  const totalProducts = products.length;
  const activeCount = products.filter(p => (p.status || '').toString().toLowerCase() === 'active').length;
  const outOfStockCount = products.filter(p => Number(p.stock || 0) === 0 || (p.status || '').toString().toLowerCase() === 'out of stock').length;
  const revenue = products.reduce((sum, p) => {
    const stock = Number(p.stock || 0);
    const price = Number(p.price || 0);
    return sum + stock * price;
  }, 0);

  const stats = [
    { label: 'Total Products', value: totalProducts, icon: Package, color: 'bg-slate-900 text-white' },
    { label: 'Active Products', value: activeCount, icon: CheckCircle2, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Out of Stock', value: outOfStockCount, icon: AlertTriangle, color: 'bg-red-50 text-red-600' },
    { label: 'Revenue', value: `$${revenue.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}`, icon: DollarSign, color: 'bg-blue-50 text-blue-600' },
  ];

  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Products</h1>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/admin/productManager/addProduct"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Product</span>
                <span className="sm:hidden">Add</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:pr-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <TrendingUp className="w-4 h-4 text-gray-400" />
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
                  placeholder="Search by name or SKU..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
                />
              </div>
              <div className="flex gap-3 flex-wrap">
                <div className="relative">
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="appearance-none pl-9 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 cursor-pointer"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat === "all" ? "All Categories" : cat}
                      </option>
                    ))}
                  </select>
                  <Grid3X3 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="appearance-none pl-9 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 cursor-pointer"
                  >
                    <option value="all">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Product Table */}
          <div className="overflow-x-auto">
            {paginatedProducts.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      <button
                        onClick={() => handleSort("name")}
                        className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                      >
                        Product
                        <ArrowUpDown className="w-3.5 h-3.5" />
                      </button>
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      SKU
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                      Category
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      <button
                        onClick={() => handleSort("stock")}
                        className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                      >
                        Stock
                        <ArrowUpDown className="w-3.5 h-3.5" />
                      </button>
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      <button
                        onClick={() => handleSort("price")}
                        className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                      >
                        Price
                        <ArrowUpDown className="w-3.5 h-3.5" />
                      </button>
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-gray-50/50 transition-colors group"
                    >
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.parentElement.innerHTML =
                                  '<div class="w-full h-full flex items-center justify-center text-gray-400"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>';
                              }}
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                              {product.name}
                            </p>
                            <p className="text-xs text-gray-500 md:hidden">
                              {product.sku}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-600 hidden md:table-cell">
                        <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded-md">
                          {product.sku}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 hidden lg:table-cell">
                        <span className="inline-flex items-center gap-1.5 text-sm text-gray-600">
                          <Tag className="w-3.5 h-3.5 text-gray-400" />
                          {product.category}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Box className="w-3.5 h-3.5 text-gray-400" />
                          <span
                            className={`text-sm font-medium ${getStockColor(product.stock, product.status)}`}
                          >
                            {product.stock}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <span className="text-sm font-semibold text-gray-900">
                          ${parseFloat(product.price).toFixed(2)}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusStyles(product.status)}`}
                        >
                          {getStatusIcon(product.status)}
                          {product.status}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          {/* View button - opens detail modal in view mode */}
                          <button
                            onClick={() => openProductDetail(product, false)}
                            className="p-2 rounded-lg text-gray-400 hover:text-slate-900 hover:bg-gray-100 transition-all"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {/* Edit button - opens detail modal in edit mode */}
                          <button
                            onClick={() => openProductDetail(product, true)}
                            className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product)}
                            className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Package className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  No products found
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Try adjusting your search or filters
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setCategoryFilter("all");
                    setStatusFilter("all");
                  }}
                  className="text-sm font-medium text-slate-900 hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-t border-gray-100">
              <p className="text-sm text-gray-500 hidden sm:block">
                Showing{" "}
                <span className="font-medium text-gray-900">
                  {(currentPage - 1) * itemsPerPage + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium text-gray-900">
                  {Math.min(currentPage * itemsPerPage, sortedProducts.length)}
                </span>{" "}
                of{" "}
                <span className="font-medium text-gray-900">
                  {sortedProducts.length}
                </span>{" "}
                products
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`min-w-[36px] h-9 px-3 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === page
                          ? "bg-slate-900 text-white"
                          : "text-gray-600 hover:bg-gray-50 border border-gray-200"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Detail / Edit Modal */}
      {showDetailModal && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={closeProductDetail}
          />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
                  {isEditing ? (
                    <Pencil className="w-5 h-5 text-white" />
                  ) : (
                    <Eye className="w-5 h-5 text-white" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {isEditing ? "Edit Product" : "Product Details"}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {isEditing ? "Make changes and save" : "View product information"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </button>
                ) : (
                  <button
                    onClick={handleSaveProduct}
                    disabled={savingProduct}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-60"
                  >
                    {savingProduct ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    {savingProduct ? "Saving..." : "Save"}
                  </button>
                )}
                <button
                  onClick={closeProductDetail}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Error Banner */}
            {saveError && (
              <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  {saveError}
                </p>
              </div>
            )}

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Product Image */}
              <div className="flex justify-center">
                <div className="w-32 h-32 rounded-2xl bg-gray-100 overflow-hidden border border-gray-200">
                  <img
                    src={editForm.image || selectedProduct.image}
                    alt={editForm.name || selectedProduct.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentElement.innerHTML =
                        '<div class="w-full h-full flex items-center justify-center text-gray-400"><svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>';
                    }}
                  />
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">
                    Product Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.name || ''}
                      onChange={(e) => handleEditChange('name', e.target.value)}
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900"
                    />
                  ) : (
                    <p className="text-sm font-semibold text-gray-900">{selectedProduct.name}</p>
                  )}
                </div>

                {/* SKU */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">
                    SKU
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.sku || ''}
                      onChange={(e) => handleEditChange('sku', e.target.value)}
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 font-mono focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900"
                    />
                  ) : (
                    <span className="inline-block font-mono text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-700">
                      {selectedProduct.sku}
                    </span>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">
                    Category
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.category || ''}
                      onChange={(e) => handleEditChange('category', e.target.value)}
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900"
                    />
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-sm text-gray-600">
                      <Tag className="w-3.5 h-3.5 text-gray-400" />
                      {selectedProduct.category}
                    </span>
                  )}
                </div>

                {/* Price */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">
                    Price
                  </label>
                  {isEditing ? (
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={editForm.price || ''}
                        onChange={(e) => handleEditChange('price', e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900"
                      />
                    </div>
                  ) : (
                    <p className="text-sm font-semibold text-gray-900">
                      ${parseFloat(selectedProduct.price).toFixed(2)}
                    </p>
                  )}
                </div>

                {/* Stock */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">
                    Stock
                  </label>
                  {isEditing ? (
                    <div className="relative">
                      <Box className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        min="0"
                        value={editForm.stock || ''}
                        onChange={(e) => handleEditChange('stock', e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900"
                      />
                    </div>
                  ) : (
                    <p className={`text-sm font-semibold ${getStockColor(selectedProduct.stock, selectedProduct.status)}`}>
                      {selectedProduct.stock} units
                    </p>
                  )}
                </div>

                {/* Status */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">
                    Status
                  </label>
                  {isEditing ? (
                    <select
                      value={editForm.status || ''}
                      onChange={(e) => handleEditChange('status', e.target.value)}
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 cursor-pointer"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Low Stock">Low Stock</option>
                      <option value="Out of Stock">Out of Stock</option>
                    </select>
                  ) : (
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusStyles(selectedProduct.status)}`}>
                      {getStatusIcon(selectedProduct.status)}
                      {selectedProduct.status}
                    </span>
                  )}
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">
                    Description
                  </label>
                  {isEditing ? (
                    <textarea
                      rows={3}
                      value={editForm.description || ''}
                      onChange={(e) => handleEditChange('description', e.target.value)}
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 resize-none"
                      placeholder="Enter product description..."
                    />
                  ) : (
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {selectedProduct.description || "No description available."}
                    </p>
                  )}
                </div>

                {/* Image URL */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">
                    Image URL
                  </label>
                  {isEditing ? (
                    <div className="relative">
                      <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={editForm.image || ''}
                        onChange={(e) => handleEditChange('image', e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900"
                        placeholder="https://..."
                      />
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400 truncate">{selectedProduct.image || "No image"}</p>
                  )}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                {isEditing && (
                  <button
                    onClick={() => {
                      setEditForm({ ...selectedProduct });
                      setIsEditing(false);
                      setSaveError(null);
                    }}
                    className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                )}
                <button
                  onClick={closeProductDetail}
                  className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Close
                </button>
                {isEditing && (
                  <button
                    onClick={handleSaveProduct}
                    disabled={savingProduct}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-60"
                  >
                    {savingProduct ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    {savingProduct ? "Saving..." : "Save Changes"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowDeleteModal(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Delete Product
              </h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                <img
                  src={productToDelete.image }
                  alt={productToDelete.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-gray-900">
                    {productToDelete.name}
                  </span>
                  ? This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-sm"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default page;