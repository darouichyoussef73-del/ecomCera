

'use client'
import React, { useState, useEffect, useMemo } from 'react';
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
  ArrowUpDown,
  Loader2,
  AlertCircle,
  User,
  X,
  MapPin,
  CreditCard,
  Calendar,
  Hash,
  Tag,
  ChevronDown,
  ChevronUp,
  ImageIcon,
} from 'lucide-react';
import NavbarClient from '@/app/components/navbarClients';
import Link from 'next/link';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Normalize order data to match what the UI expects
const normalizeOrder = (order) => {
  return {
    id: order.id,
    order_id: order.order_id || order.order_number || order.reference || `#${order.id}`,
    date: order.date || order.created_at || order.order_date || order.placed_at,
    product: order.items
      ? order.items.map((item) => item.product_name || item.name || "Product")
      : [order.product || "Product"],
    product_images: order.items
      ? order.items.map((item) => item.product_image || item.image || item.thumbnail || item.photo || null)
      : [order.product_image || order.image || order.thumbnail || null],
    amount: order.amount || order.total || order.total_amount || order.price || 0,
    status: order.status || 'Processing',
    user_id: order.user_id || order.userId || order.client_id || order.clientId,
    client_id: order.client_id || order.clientId || order.user_id || order.userId,
    // Additional fields for detail popup
    shipping_address: order.shipping_address || order.address || order.delivery_address || '',
    payment_method: order.payment_method || order.payment_type || 'N/A',
    items: order.items || [],
    notes: order.notes || order.customer_note || '',
    tracking_number: order.tracking_number || order.tracking || '',
    estimated_delivery: order.estimated_delivery || order.delivery_date || '',
    // Include any other fields that might exist
    ...order
  };
};

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

  // Popup state
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupLoading, setPopupLoading] = useState(false);
  const [popupError, setPopupError] = useState(null);
  const [expandedItems, setExpandedItems] = useState(false);

  // Image preview state
  const [previewImage, setPreviewImage] = useState(null);

  // Get user data from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (err) {
        // console.error('Failed to parse user data from localStorage:', err);
        setError('User session invalid. Please log in again.');
        setLoading(false);
      }
    } else {
      setError('Please log in to view your orders.');
      setLoading(false);
    }
  }, []);

  // Fetch orders from API when user is available
  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');

      const response = await fetch(`${API_BASE_URL}/admin/orders`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Session expired. Please log in again.');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Raw API response:', data);
      
      // Handle Laravel's typical wrapped response: { data: [...] }
      const ordersArray = Array.isArray(data) ? data : (data.data || data.orders || []);
      console.log('Orders array:', ordersArray);
      
      if (ordersArray.length > 0) {
        console.log('First order keys:', Object.keys(ordersArray[0]));
        console.log('First order:', ordersArray[0]);
      }
      
      setOrders(ordersArray);
    } catch (err) {
      setError(err.message || 'Failed to fetch orders');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

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

  const getStatusStep = (status) => {
    const steps = ['Processing', 'Shipped', 'Delivered'];
    const currentIndex = steps.indexOf(status);
    if (currentIndex === -1) return -1;
    return currentIndex;
  };

  // Filter orders to show only those belonging to the logged-in user
  const userOrders = useMemo(() => {
    if (!user || !user.id) return [];
    const normalized = orders.map(normalizeOrder);
    // console.log('User ID from localStorage:', user.id);
    // console.log('Normalized orders sample:', normalized.slice(0, 3));
    return normalized.filter(order => order.user_id === user.id || order.client_id === user.id);
  }, [orders, user]);

  // Statistics based on user's orders only
  const stats = useMemo(() => {
    const total = userOrders.length;
    const processing = userOrders.filter(o => o.status === 'Processing').length;
    const shipped = userOrders.filter(o => o.status === 'Shipped').length;
    const delivered = userOrders.filter(o => o.status === 'Delivered').length;
    const cancelled = userOrders.filter(o => o.status === 'Cancelled').length;
    return { total, processing, shipped, delivered, cancelled };
  }, [userOrders]);

  // Sorting handler
  const handleSort = (key) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Filter, search, and sort
  const filteredOrders = useMemo(() => {
    let result = userOrders.filter(order => {
      const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
      const matchesSearch = 
        (order.order_id || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (Array.isArray(order.product) 
          ? order.product.join(' ').toLowerCase().includes(searchQuery.toLowerCase())
          : (order.product || '').toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesStatus && matchesSearch;
    });

    // Sort
    result.sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (sortConfig.key === 'date') {
        return sortConfig.direction === 'asc' 
          ? new Date(aVal) - new Date(bVal)
          : new Date(bVal) - new Date(aVal);
      }

      if (sortConfig.key === 'amount') {
        return sortConfig.direction === 'asc' 
          ? parseFloat(aVal) - parseFloat(bVal)
          : parseFloat(bVal) - parseFloat(aVal);
      }

      if (typeof aVal === 'string') {
        return sortConfig.direction === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      return 0;
    });

    return result;
  }, [userOrders, searchQuery, statusFilter, sortConfig]);

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

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '-';
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const formatDateTime = (dateStr) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '-';
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    const num = parseFloat(amount);
    return isNaN(num) ? '$0.00' : `$${num.toFixed(2)}`;
  };

  // View order details with popup
  const handleViewOrder = async (id) => {
    setPopupLoading(true);
    setPopupError(null);
    setShowPopup(true);
    setExpandedItems(false);
    setPreviewImage(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });
      
      if (!response.ok) throw new Error('Failed to fetch order details');
      
      const data = await response.json();
      const orderData = data.data || data;
      setSelectedOrder(normalizeOrder(orderData));
    } catch (err) {
      console.error('Error fetching order details:', err);
      setPopupError(err.message || 'Failed to load order details');
      // Fallback: show from local data
      const localOrder = userOrders.find(o => o.id === id);
      if (localOrder) setSelectedOrder(localOrder);
    } finally {
      setPopupLoading(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedOrder(null);
    setPopupError(null);
    setPreviewImage(null);
  };

  // Close popup on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (previewImage) {
          setPreviewImage(null);
        } else {
          closePopup();
        }
      }
    };
    if (showPopup) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [showPopup, previewImage]);

  // Helper to get image URL for an item
  const getItemImage = (order, index) => {
    if (!order) return null;
    if (Array.isArray(order.product_images) && order.product_images[index]) {
      return order.product_images[index];
    }
    if (order.items && order.items[index] && (order.items[index].product_image || order.items[index].image)) {
      return order.items[index].product_image || order.items[index].image;
    }
    return null;
  };

  // Not logged in state
  if (!user && !loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center max-w-md">
          <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-indigo-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Not Logged In</h3>
          <p className="text-sm text-gray-500 mb-4">Please log in to view your orders.</p>
         <Link 
                      href="/pages/acountCreation" 
                      className="rounded-full bg-white text-black font-bold text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 hover:bg-black hover:text-white transition border border-gray-200"
                    >
                      Log In
                    </Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 border border-red-100 shadow-sm text-center max-w-md">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load orders</h3>
          <p className="text-sm text-gray-500 mb-4">{error}</p>
          <button 
            onClick={fetchOrders}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Image Preview Overlay */}
      {previewImage && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
             onClick={() => setPreviewImage(null)}>
          <button 
            onClick={() => setPreviewImage(null)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img 
            src={previewImage} 
            alt="Product preview" 
            className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Order Details Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={closePopup}
          />
          
          {/* Modal Content */}
          <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                  <Package className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Order Details</h2>
                  <p className="text-sm text-gray-500">
                    {selectedOrder?.order_id || 'Loading...'}
                  </p>
                </div>
              </div>
              <button
                onClick={closePopup}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
              {popupLoading ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-3" />
                  <p className="text-gray-500 text-sm">Loading order details...</p>
                </div>
              ) : popupError && !selectedOrder ? (
                <div className="flex flex-col items-center justify-center py-16 px-6">
                  <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                  </div>
                  <p className="text-gray-500 text-sm text-center">{popupError}</p>
                </div>
              ) : selectedOrder ? (
                <div className="p-6 space-y-6">
                  {/* Product Images Gallery */}
                  {(() => {
                    const images = Array.isArray(selectedOrder.product_images) 
                      ? selectedOrder.product_images.filter(Boolean)
                      : [];
                    if (images.length === 0 && selectedOrder.items) {
                      selectedOrder.items.forEach(item => {
                        if (item.product_image || item.image || item.thumbnail) {
                          images.push(item.product_image || item.image || item.thumbnail);
                        }
                      });
                    }
                    
                    if (images.length > 0) {
                      return (
                        <div className="space-y-3">
                          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Product Images
                          </h3>
                          <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                            {images.map((img, idx) => (
                              <button
                                key={idx}
                                onClick={() => setPreviewImage(img)}
                                className="relative aspect-square rounded-2xl overflow-hidden border border-gray-200 hover:border-indigo-400 hover:shadow-md transition-all group"
                              >
                                <img 
                                  src={img} 
                                  alt={`Product ${idx + 1}`}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                  }}
                                />
                                <div className="absolute inset-0 hidden items-center justify-center bg-gray-50">
                                  <ImageIcon className="w-6 h-6 text-gray-300" />
                                </div>
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })()}

                  {/* Status Banner */}
                  <div className={`rounded-2xl p-4 border ${getStatusColor(selectedOrder.status)}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(selectedOrder.status)}
                        <span className="font-semibold">{selectedOrder.status}</span>
                      </div>
                      <span className="text-xs opacity-75">
                        Updated {formatDate(selectedOrder.date)}
                      </span>
                    </div>
                    
                    {/* Progress Steps */}
                    {selectedOrder.status !== 'Cancelled' && (
                      <div className="mt-4 flex items-center gap-2">
                        {[ 'Processing', 'Shipped', 'Delivered'].map((step, idx) => {
                          const currentStep = getStatusStep(selectedOrder.status);
                          const isActive = idx <= currentStep;
                          const isCurrent = idx === currentStep;
                          
                          return (
                            <React.Fragment key={step}>
                              <div className={`flex-1 h-2 rounded-full transition-colors ${
                                isActive ? 'bg-current opacity-30' : 'bg-gray-200'
                              }`} />
                              {idx < 3 && (
                                <div className={`w-2 h-2 rounded-full ${
                                  isActive ? 'bg-current' : 'bg-gray-200'
                                }`} />
                              )}
                            </React.Fragment>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Order Info Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-xs font-medium text-gray-500 uppercase">Order Date</span>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">
                        {formatDateTime(selectedOrder.date)}
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <CreditCard className="w-4 h-4 text-gray-400" />
                        <span className="text-xs font-medium text-gray-500 uppercase">Payment</span>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">
                        {selectedOrder.payment_method}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Hash className="w-4 h-4 text-gray-400" />
                        <span className="text-xs font-medium text-gray-500 uppercase">Order ID</span>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">
                        #{selectedOrder.id}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Tag className="w-4 h-4 text-gray-400" />
                        <span className="text-xs font-medium text-gray-500 uppercase">Tracking</span>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">
                        {selectedOrder.tracking_number || 'N/A'}
                      </p>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  {selectedOrder.shipping_address && (
                    <div className="bg-gray-50 rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-xs font-medium text-gray-500 uppercase">Shipping Address</span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {selectedOrder.shipping_address}
                      </p>
                    </div>
                  )}

                  {/* Products / Items */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                        Order Items
                      </h3>
                      {Array.isArray(selectedOrder.product) && selectedOrder.product.length > 2 && (
                        <button
                          onClick={() => setExpandedItems(!expandedItems)}
                          className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                          {expandedItems ? (
                            <>Show Less <ChevronUp className="w-3 h-3" /></>
                          ) : (
                            <>Show All ({selectedOrder.product.length}) <ChevronDown className="w-3 h-3" /></>
                          )}
                        </button>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      {(Array.isArray(selectedOrder.product) 
                        ? (expandedItems ? selectedOrder.product : selectedOrder.product.slice(0, 2))
                        : [selectedOrder.product]
                      ).map((product, idx) => {
                        const itemImage = getItemImage(selectedOrder, idx);
                        return (
                          <div key={idx} className="flex items-center gap-4 bg-gray-50 rounded-2xl p-3">
                            {/* Product Image */}
                            <button
                              onClick={() => itemImage && setPreviewImage(itemImage)}
                              className={`w-16 h-16 rounded-xl flex-shrink-0 overflow-hidden border border-gray-200 ${
                                itemImage ? 'cursor-pointer hover:border-indigo-400 hover:shadow-md' : ''
                              } transition-all`}
                            >
                              {itemImage ? (
                                <img 
                                  src={itemImage} 
                                  alt={product}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                  }}
                                />
                              ) : null}
                              <div className={`w-full h-full items-center justify-center bg-gray-100 ${itemImage ? 'hidden' : 'flex'}`}>
                                <Package className="w-6 h-6 text-gray-400" />
                              </div>
                            </button>
                            
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {product}
                              </p>
                              {selectedOrder.items && selectedOrder.items[idx] && (
                                <p className="text-xs text-gray-500 mt-0.5">
                                  Qty: {selectedOrder.items[idx].quantity || 1} × {formatCurrency(selectedOrder.items[idx].price || selectedOrder.amount)}
                                </p>
                              )}
                            </div>
                            
                            {itemImage && (
                              <button
                                onClick={() => setPreviewImage(itemImage)}
                                className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                title="View image"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        );
                      })}
                      {!expandedItems && Array.isArray(selectedOrder.product) && selectedOrder.product.length > 2 && (
                        <p className="text-xs text-gray-400 text-center py-1">
                          +{selectedOrder.product.length - 2} more items
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Total */}
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Subtotal</span>
                      <span className="text-sm text-gray-700">{formatCurrency(selectedOrder.amount * 0.9)}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm text-gray-500">Tax & Shipping</span>
                      <span className="text-sm text-gray-700">{formatCurrency(selectedOrder.amount * 0.1)}</span>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                      <span className="text-base font-bold text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-indigo-600">
                        {formatCurrency(selectedOrder.amount)}
                      </span>
                    </div>
                  </div>

                  {/* Notes */}
                  {selectedOrder.notes && (
                    <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
                      <p className="text-xs font-medium text-amber-700 uppercase mb-1">Customer Note</p>
                      <p className="text-sm text-amber-800">{selectedOrder.notes}</p>
                    </div>
                  )}

                  {/* Actions */}
                  {/* <div className="flex gap-3 pt-2">
                    <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
                      <Download className="w-4 h-4" />
                      Download Invoice
                    </button>
                    {selectedOrder.status === 'Processing' && (
                      <button 
                        onClick={() => {
                          closePopup();
                          handleDeleteOrder(selectedOrder.id);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors"
                      >
                        <XCircle className="w-4 h-4" />
                        Cancel Order
                      </button>
                    )}
                  </div> */}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <video
            src="/videos/order.mp4"
            poster="/images/hero1.jpeg"
            autoPlay muted loop playsInline
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
        <div className="relative z-10 container mx-auto px-6 lg:px-12 min-h-screen flex items-end pb-16">
          <div className="grid lg:grid-cols-2 gap-12 w-full items-end">
            <div className="max-w-2xl mb-10">
              <h1 className="text-5xl md:text-7xl font-bold text-black leading-tight tracking-tight">
                Shape your creativity.
              </h1>
              <p className="mt-6 text-lg md:text-xl text-black/80 max-w-xl">
                A welcoming pottery studio designed to inspire creativity, build skills, and
                craft beautiful, lasting ceramics.
              </p>
            </div>
            <div className="flex flex-col lg:items-end gap-6">
              <div className="max-w-sm rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-6">
                <p className="text-black text-lg">"Every piece feels like a small work of art crafted with soul and precision."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="min-h-screen p-4 md:p-6 lg:p-8">
        <NavbarClient/>
        
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-8 mt-20">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                  My Orders
                </h1>
                {user && (
                  <p className="text-sm text-gray-500 mt-1">
                    Welcome back, <span className="font-medium text-gray-700">{user.name || user.email || 'User'}</span>
                  </p>
                )}
              </div>

              {/* Search */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-800" />
                <input
                  type="text"
                  placeholder="Search order ID, product..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-10 pr-4 py-2.5 text-gray-800 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
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
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
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
                <div className="p-2.5 bg-blue-50 rounded-xl">
                  <Truck className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                  Transit
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.shipped}</p>
              <p className="text-sm text-gray-500 mt-0.5">Shipped</p>
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
                    <th 
                      className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700 select-none"
                      onClick={() => handleSort('order_id')}
                    >
                      <div className="flex items-center gap-1">
                        Order ID <ArrowUpDown className={`w-3 h-3 ${sortConfig.key === 'order_id' ? 'text-indigo-600' : ''}`} />
                      </div>
                    </th>
                    <th 
                      className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700 select-none"
                      onClick={() => handleSort('date')}
                    >
                      <div className="flex items-center gap-1">
                        Date <ArrowUpDown className={`w-3 h-3 ${sortConfig.key === 'date' ? 'text-indigo-600' : ''}`} />
                      </div>
                    </th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th 
                      className="text-right py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700 select-none"
                      onClick={() => handleSort('amount')}
                    >
                      <div className="flex items-center justify-end gap-1">
                        Amount <ArrowUpDown className={`w-3 h-3 ${sortConfig.key === 'amount' ? 'text-indigo-600' : ''}`} />
                      </div>
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
                    paginatedOrders.map((order) => {
                      const firstImage = Array.isArray(order.product_images) && order.product_images[0]
                        ? order.product_images[0]
                        : (order.items && order.items[0] && (order.items[0].product_image || order.items[0].image));
                      return (
                        <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 bg-indigo-50 rounded-lg flex items-center justify-center">
                                <Package className="w-4 h-4 text-indigo-600" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-900">{order.order_id}</p>
                                <p className="text-xs text-gray-500">#{order.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <p className="text-sm text-gray-700">{formatDate(order.date)}</p>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              {firstImage && (
                                <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                                  <img 
                                    src={firstImage} 
                                    alt=""
                                    className="w-full h-full object-cover"
                                    onError={(e) => e.target.parentElement.style.display = 'none'}
                                  />
                                </div>
                              )}
                              <p className="text-sm text-gray-700 max-w-xs truncate" title={Array.isArray(order.product) ? order.product.join(', ') : order.product}>
                                {Array.isArray(order.product) ? order.product.join(', ') : order.product}
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <p className="text-sm font-semibold text-gray-900">
                              {formatCurrency(order.amount)}
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
                              <button 
                                onClick={() => handleViewOrder(order.id)}
                                className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" 
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-16 text-center">
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
              paginatedOrders.map((order) => {
                const firstImage = Array.isArray(order.product_images) && order.product_images[0]
                  ? order.product_images[0]
                  : (order.items && order.items[0] && (order.items[0].product_image || order.items[0].image));
                return (
                  <div key={order.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                          <Package className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{order.order_id}</p>
                          <p className="text-xs text-gray-500">{formatDate(order.date)}</p>
                        </div>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-3">
                        {firstImage && (
                          <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                            <img 
                              src={firstImage} 
                              alt=""
                              className="w-full h-full object-cover"
                              onError={(e) => e.target.parentElement.style.display = 'none'}
                            />
                          </div>
                        )}
                        <p className="text-sm text-gray-700 font-medium line-clamp-2">
                          {Array.isArray(order.product) ? order.product.join(', ') : order.product}
                        </p>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Amount:</span>
                        <span className="font-semibold text-gray-900">{formatCurrency(order.amount)}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-3 border-t border-gray-100">
                      <button 
                        onClick={() => handleViewOrder(order.id)}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                      {/* <button className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors">
                        <Download className="w-4 h-4" />
                        Invoice
                      </button> */}
                      {/* <button 
                        onClick={() => handleDeleteOrder(order.id)}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
                      >
                        <XCircle className="w-4 h-4" />
                        Delete
                      </button> */}
                    </div>
                  </div>
                );
              })
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
    </>
  );
};

export default OrdersPage;