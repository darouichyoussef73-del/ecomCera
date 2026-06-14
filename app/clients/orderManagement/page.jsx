'use client'
import React, { useState } from 'react';
import {
  ArrowLeft,
  Package,
  Truck,
  CreditCard,
  MapPin,
  Download,
  MessageCircle,
  CheckCircle2,
  Clock,
  ChevronRight,
  Copy,
  Printer,
  HelpCircle,
  Star,
  Minus,
  Plus,
  X
} from 'lucide-react';

const page = () => {
  const [copied, setCopied] = useState(false);

  const order = {
    id: 'ORD-7829',
    date: 'June 9, 2026',
    time: '2:34 PM',
    status: 'Delivered',
    statusDate: 'June 12, 2026',
    paymentMethod: 'Credit Card ending in 4242',
    paymentStatus: 'Paid',
    trackingNumber: '1Z999AA10123456784',
    carrier: 'UPS Ground',
    estimatedDelivery: 'June 12, 2026',
    subtotal: 189.97,
    tax: 15.20,
    shipping: 0.00,
    discount: -10.00,
    grandTotal: 195.17
  };

  const products = [
    {
      id: 1,
      name: 'Wireless Headphones Pro',
      description: 'Active Noise Cancellation, 30h Battery, Spatial Audio',
      sku: 'WHP-2026-BLK',
      quantity: 1,
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
      rating: 4.8,
      reviews: 234
    },
    {
      id: 2,
      name: 'USB-C Cable (6ft, 2-Pack)',
      description: 'Braided Nylon, 100W Fast Charging, Data Sync',
      sku: 'USBC-6FT-2PK-WHT',
      quantity: 2,
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1625153669622-870ee005b33d?w=200&h=200&fit=crop',
      rating: 4.5,
      reviews: 89
    }
  ];

  const shippingAddress = {
    name: 'Fouad Ahmad',
    street: '1234 Innovation Drive, Suite 500',
    city: 'San Francisco',
    state: 'CA',
    zip: '94107',
    country: 'United States',
    phone: '+1 (555) 123-4567'
  };

  const billingAddress = {
    name: 'Fouad Ahmad',
    street: '1234 Innovation Drive, Suite 500',
    city: 'San Francisco',
    state: 'CA',
    zip: '94107',
    country: 'United States'
  };

  const timeline = [
    {
      status: 'Order Placed',
      description: 'Your order has been confirmed',
      date: 'Jun 9, 2:34 PM',
      completed: true,
      icon: <CheckCircle2 className="w-4 h-4" />
    },
    {
      status: 'Processing',
      description: 'Order is being prepared',
      date: 'Jun 9, 5:12 PM',
      completed: true,
      icon: <Clock className="w-4 h-4" />
    },
    {
      status: 'Shipped',
      description: 'Package left our warehouse',
      date: 'Jun 10, 9:45 AM',
      completed: true,
      icon: <Package className="w-4 h-4" />
    },
    {
      status: 'In Transit',
      description: 'Package is on the way',
      date: 'Jun 11, 8:20 AM',
      completed: true,
      icon: <Truck className="w-4 h-4" />
    },
    {
      status: 'Delivered',
      description: 'Package delivered to front door',
      date: 'Jun 12, 11:30 AM',
      completed: true,
      icon: <CheckCircle2 className="w-4 h-4" />
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Shipped':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Processing':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const copyTracking = () => {
    navigator.clipboard.writeText(order.trackingNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <button className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Orders
          </button>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-all shadow-md shadow-gray-900/20">
              <Download className="w-4 h-4" />
              Invoice
            </button>
          </div>
        </div>

        {/* Order Header */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Package className="w-7 h-7 text-indigo-600" />
              </div>
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-xl md:text-2xl font-bold text-gray-900">Order {order.id}</h1>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Placed on {order.date} at {order.time}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 lg:gap-6 text-sm">
              <div className="text-right">
                <p className="text-gray-500">Order Total</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(order.grandTotal)}</p>
              </div>
              <div className="w-px h-10 bg-gray-200 hidden sm:block" />
              <div className="text-right hidden sm:block">
                <p className="text-gray-500">Items</p>
                <p className="text-xl font-bold text-gray-900">{products.reduce((sum, p) => sum + p.quantity, 0)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tracking Timeline */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Timeline</h2>
              <div className="relative">
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200" />
                <div className="space-y-6">
                  {timeline.map((step, index) => (
                    <div key={index} className="relative flex items-start gap-4">
                      <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        step.completed 
                          ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30' 
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        {step.icon}
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="flex items-center justify-between">
                          <h3 className={`text-sm font-semibold ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                            {step.status}
                          </h3>
                          <span className="text-xs text-gray-400">{step.date}</span>
                        </div>
                        <p className={`text-sm mt-0.5 ${step.completed ? 'text-gray-500' : 'text-gray-400'}`}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Items ({products.length})</h2>
              <div className="space-y-4">
                {products.map((product) => (
                  <div key={product.id} className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50/50 rounded-xl border border-gray-100">
                    <div className="w-full sm:w-24 h-24 bg-white rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900">{product.name}</h3>
                          <p className="text-xs text-gray-500 mt-0.5">{product.description}</p>
                          <p className="text-xs text-gray-400 mt-1">SKU: {product.sku}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-sm font-bold text-gray-900">{formatCurrency(product.price * product.quantity)}</p>
                          {product.quantity > 1 && (
                            <p className="text-xs text-gray-500">{formatCurrency(product.price)} each</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                            <span className="text-xs font-medium text-gray-700">{product.rating}</span>
                            <span className="text-xs text-gray-400">({product.reviews})</span>
                          </div>
                          <span className="text-xs text-gray-400">|</span>
                          <span className="text-xs text-gray-500">Qty: {product.quantity}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
                            Buy Again
                          </button>
                          <span className="text-gray-300">|</span>
                          <button className="text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors">
                            Review
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping & Payment Info - Mobile/Desktop stacked */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Shipping Address */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-1.5 bg-blue-50 rounded-lg">
                    <MapPin className="w-4 h-4 text-blue-600" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900">Shipping Address</h3>
                </div>
                <div className="space-y-1 text-sm">
                  <p className="font-medium text-gray-900">{shippingAddress.name}</p>
                  <p className="text-gray-600">{shippingAddress.street}</p>
                  <p className="text-gray-600">{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}</p>
                  <p className="text-gray-600">{shippingAddress.country}</p>
                  <p className="text-gray-500 mt-2">{shippingAddress.phone}</p>
                </div>
              </div>

              {/* Billing Address */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-1.5 bg-indigo-50 rounded-lg">
                    <CreditCard className="w-4 h-4 text-indigo-600" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900">Billing Address</h3>
                </div>
                <div className="space-y-1 text-sm">
                  <p className="font-medium text-gray-900">{billingAddress.name}</p>
                  <p className="text-gray-600">{billingAddress.street}</p>
                  <p className="text-gray-600">{billingAddress.city}, {billingAddress.state} {billingAddress.zip}</p>
                  <p className="text-gray-600">{billingAddress.country}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Payment Method</span>
                    <span className="text-xs font-medium text-gray-700">{order.paymentMethod}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">Payment Status</span>
                    <span className="text-xs font-medium text-emerald-600">{order.paymentStatus}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-5">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-gray-900 font-medium">{formatCurrency(order.subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Tax</span>
                  <span className="text-gray-900 font-medium">{formatCurrency(order.tax)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-emerald-600 font-medium">
                    {order.shipping === 0 ? 'Free' : formatCurrency(order.shipping)}
                  </span>
                </div>
                {order.discount !== 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Discount</span>
                    <span className="text-rose-600 font-medium">{formatCurrency(order.discount)}</span>
                  </div>
                )}
                <div className="pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-gray-900">Grand Total</span>
                    <span className="text-xl font-bold text-gray-900">{formatCurrency(order.grandTotal)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Details */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-5">Shipping Details</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg flex-shrink-0">
                    <Truck className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{order.carrier}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Standard delivery</p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Tracking Number</span>
                    <button 
                      onClick={copyTracking}
                      className="text-xs font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition-colors"
                    >
                      {copied ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-sm font-mono font-medium text-gray-900">{order.trackingNumber}</p>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Estimated Delivery</span>
                  <span className="font-medium text-gray-900">{order.estimatedDelivery}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Delivered On</span>
                  <span className="font-medium text-emerald-600">{order.statusDate}</span>
                </div>
              </div>

              <button className="w-full mt-5 flex items-center justify-center gap-2 py-2.5 bg-blue-50 text-blue-700 rounded-xl text-sm font-medium hover:bg-blue-100 transition-colors">
                <Truck className="w-4 h-4" />
                Track Package
              </button>
            </div>

            {/* Need Help */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h2>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                    <span className="text-sm font-medium text-gray-700">Contact Support</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                  <div className="flex items-center gap-3">
                    <Package className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                    <span className="text-sm font-medium text-gray-700">Return or Replace</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                    <span className="text-sm font-medium text-gray-700">Order FAQ</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;