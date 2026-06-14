// import React from 'react'
// import NavbarClient from '@/app/components/navbarClients'
// import Footer from '@/app/components/footer'
// import Card from '@/app/components/product'
// import Link from 'next/link'
// const page = () => {
//   return (
//     <>
//         <>
//     <NavbarClient/>
//    <section className="hero relative min-h-screen overflow-hidden " id=''>
   
//       {/* Background Image */}
//       <div className="absolute inset-0">
       
      
//         </div>
    

//       {/* Content */}
//       <div className="relative z-10 container mx-auto px-6 lg:px-12 min-h-screen flex items-end pb-16">
//         <div className="grid lg:grid-cols-2 gap-12 w-full items-end">
//           {/* Left Content */}
//           <div className="max-w-2xl">
//             <h1 className="text-5xl md:text-7xl font-bold text-black leading-tight tracking-tight">
//               A calmer way to care for your smile.
//             </h1>

//             <p className="mt-6 text-lg md:text-xl text-black/80 max-w-xl">
//               Gentle dentistry designed to remove fear, build trust, and
//               deliver confident, lasting results.
//             </p>

//             <div className="mt-10">
//               <Link
//                 href="/contact"
//                 className="inline-flex items-center rounded-full bg-white px-8 py-4 text-black font-medium transition hover:bg-gray-200"
//               >
//                 Schedule a Visit
//               </Link>
//             </div>
//           </div>

//           {/* Right Content */}
//           <div className="flex flex-col lg:items-end gap-6">
//             {/* Testimonial Card */}
//             <div className="max-w-sm rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-6">
             

//               <p className="text-black text-lg">
//                 “It felt more like a wellness visit than a dental appointment.”
//               </p>

//               <p className="mt-3 text-black/70">— Sarah M.</p>

             
//             </div>

//             {/* Video Card */}
//                    </div>
//         </div>
//       </div>
//     </section>
//           <section className="relative gap-5 py-10 items-center   justify-center h-full  overflow-hidden">
//       <div className='flex flex-wrap items-center justify-center my-30 text-black gap-10'>
   
// {/* <select className="w-45 px-4 py-3 border  border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
//   <option>Select a category</option>
//   <option>Electronics</option>
//   <option>Fashion</option>
//   <option>Sports</option>
// </select> */}

// <select className="w-45  px-4 py-3  focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-3xl">
//   <option>Select a category</option>
//   <option>Electronics</option>
//   <option>Fashion</option>
//   <option>Sports</option>
// </select>
// <select className="w-45  px-4 py-3  focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-3xl">
//   <option>Select a category</option>
//   <option>Electronics</option>
//   <option>Fashion</option>
//   <option>Sports</option>
// </select>
// <select className="w-45  px-4 py-3  focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-3xl">
//   <option>Select a category</option>
//   <option>Electronics</option>
//   <option>Fashion</option>
//   <option>Sports</option>
// </select>
// <select className="w-45  px-4 py-3  focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-3xl">
//   <option>Select a category</option>
//   <option>Electronics</option>
//   <option>Fashion</option>
//   <option>Sports</option>
// </select>


//       </div>

//       <div className='flex flex-wrap gap-5 items-center justify-center '>
//         <Card/>
//         <Card/>
//         <Card/>
//         <Card/>
//         <Card/>
//         <Card/>
//         <Card/>
//         <Card/>
//         <Card/>
//         <Card/>
//         <Card/>
//       </div>
        
     
//         </section>

//         <Footer/>
//     </>
//     </>
//   )
// }

// export default page
'use client'
import React, { useState } from 'react';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  Tag,
  Truck,
  ShieldCheck,
  Gift,
  X,
  CheckCircle2,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import Navbar from '@/app/components/navbar';
const page = () => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Wireless Headphones Pro',
      description: 'Active Noise Cancellation, 30h Battery',
      sku: 'WHP-2026-BLK',
      price: 149.99,
      originalPrice: 199.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
      stock: 15,
      maxPerOrder: 5
    },
    {
      id: 2,
      name: 'USB-C Cable (6ft, 2-Pack)',
      description: 'Braided Nylon, 100W Fast Charging',
      sku: 'USBC-6FT-2PK-WHT',
      price: 19.99,
      originalPrice: 24.99,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1625153669622-870ee005b33d?w=200&h=200&fit=crop',
      stock: 48,
      maxPerOrder: 10
    },
    {
      id: 3,
      name: 'Smart Watch Series 5',
      description: 'GPS, Heart Rate, Always-On Display',
      sku: 'SWS5-44MM-BLU',
      price: 349.99,
      originalPrice: 399.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
      stock: 8,
      maxPerOrder: 5 
    }
  ]);

  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, Math.min(item.quantity + delta, item.maxPerOrder));
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const applyCoupon = () => {
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (!code) return;
    
    if (code === 'SAVE20') {
      setAppliedCoupon({ code: 'SAVE20', discount: 0.20, type: 'percentage', label: '20% off' });
      setCouponCode('');
    } else if (code === 'FREESHIP') {
      setAppliedCoupon({ code: 'FREESHIP', discount: 0, type: 'shipping', label: 'Free Shipping' });
      setCouponCode('');
    } else {
      setCouponError('Invalid coupon code. Try SAVE20 or FREESHIP');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const originalSubtotal = cartItems.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const shipping = appliedCoupon?.type === 'shipping' ? 0 : (subtotal > 100 ? 0 : 12.99);
  const discount = appliedCoupon?.type === 'percentage' ? subtotal * appliedCoupon.discount : 0;
  const total = subtotal + shipping - discount;
  const totalSavings = originalSubtotal - subtotal + discount;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    
    <div className="min-h-screen bg-gray-50  p-4 md:p-6 lg:p-8">
      <Navbar/>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              Shopping Cart
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <button className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </button>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Desktop Table Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                <div className="col-span-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</div>
                <div className="col-span-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</div>
                <div className="col-span-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Quantity</div>
                <div className="col-span-2 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</div>
              </div>

              {/* Cart Items List */}
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-white rounded-2xl p-4 md:p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:grid md:grid-cols-12 md:gap-4 md:items-center">
                      {/* Product Info */}
                      <div className="md:col-span-6 flex gap-4 mb-4 md:mb-0">
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">{item.name}</h3>
                          <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{item.description}</p>
                          <p className="text-xs text-gray-400 mt-1">SKU: {item.sku}</p>
                          <div className="flex items-center gap-2 mt-2 md:hidden">
                            <span className="text-sm font-bold text-gray-900">{formatCurrency(item.price)}</span>
                            <span className="text-xs text-gray-400 line-through">{formatCurrency(item.originalPrice)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Unit Price - Desktop */}
                      <div className="hidden md:col-span-2 md:flex md:flex-col md:items-center">
                        <span className="text-sm font-semibold text-gray-900">{formatCurrency(item.price)}</span>
                        <span className="text-xs text-gray-400 line-through">{formatCurrency(item.originalPrice)}</span>
                      </div>

                      {/* Quantity */}
                      <div className="md:col-span-2 flex items-center justify-between md:justify-center gap-4 mb-4 md:mb-0">
                        <div className="flex items-center gap-1 bg-gray-50 rounded-xl border border-gray-200 p-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            disabled={item.quantity <= 1}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-10 text-center text-sm font-semibold text-gray-900">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            disabled={item.quantity >= item.maxPerOrder}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="md:hidden p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Total - Desktop */}
                      <div className="hidden md:col-span-2 md:flex md:items-center md:justify-end gap-3">
                        <span className="text-sm font-bold text-gray-900">{formatCurrency(item.price * item.quantity)}</span>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Mobile Total */}
                      <div className="md:hidden flex items-center justify-between pt-3 border-t border-gray-100">
                        <span className="text-xs text-gray-500">Total</span>
                        <span className="text-base font-bold text-gray-900">{formatCurrency(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Section */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-4 h-4 text-indigo-600" />
                  <h3 className="text-sm font-semibold text-gray-900">Have a coupon?</h3>
                </div>
                
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <div>
                        <span className="text-sm font-medium text-emerald-700">{appliedCoupon.code}</span>
                        <span className="text-xs text-emerald-600 ml-2">({appliedCoupon.label})</span>
                      </div>
                    </div>
                    <button 
                      onClick={removeCoupon}
                      className="p-1.5 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => { setCouponCode(e.target.value); setCouponError(''); }}
                        className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all ${
                          couponError ? 'border-red-300' : 'border-gray-200'
                        }`}
                      />
                      {couponError && (
                        <div className="flex items-center gap-1 mt-1.5">
                          <AlertCircle className="w-3 h-3 text-red-500" />
                          <span className="text-xs text-red-500">{couponError}</span>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={applyCoupon}
                      disabled={!couponCode.trim()}
                      className="px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-gray-900/20 whitespace-nowrap"
                    >
                      Apply
                    </button>
                  </div>
                )}
                <p className="text-xs text-gray-400 mt-3">Try codes: SAVE20, FREESHIP</p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 space-y-4">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-900 mb-5">Order Summary</h2>
                  
                  <div className="space-y-3 mb-5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Subtotal ({itemCount} items)</span>
                      <span className="text-gray-900 font-medium">{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Shipping</span>
                      <span className={shipping === 0 ? 'text-emerald-600 font-medium' : 'text-gray-900 font-medium'}>
                        {shipping === 0 ? 'Free' : formatCurrency(shipping)}
                      </span>
                    </div>
                    {discount > 0 && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Discount</span>
                        <span className="text-rose-600 font-medium">-{formatCurrency(discount)}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-gray-100 mb-5">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-semibold text-gray-900">Total</span>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-gray-900">{formatCurrency(total)}</span>
                        {totalSavings > 0 && (
                          <p className="text-xs text-emerald-600 mt-0.5">You save {formatCurrency(totalSavings)}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <button className="w-full flex items-center justify-center gap-2 py-3.5 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/20 mb-3">
                    Proceed to Checkout
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Secure checkout powered by Stripe
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                        <Truck className="w-5 h-5 text-emerald-600" />
                      </div>
                      <span className="text-xs font-medium text-gray-600">Free Shipping<br/>over $100</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5 text-indigo-600" />
                      </div>
                      <span className="text-xs font-medium text-gray-600">Secure<br/>Payment</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                        <Gift className="w-5 h-5 text-amber-600" />
                      </div>
                      <span className="text-xs font-medium text-gray-600">30-Day<br/>Returns</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Cart */
          <div className="bg-white rounded-2xl p-12 md:p-16 border border-gray-100 shadow-sm text-center max-w-lg mx-auto">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-sm text-gray-500 mb-8 max-w-sm mx-auto">
              Looks like you haven't added anything to your cart yet. Explore our products and find something you'll love.
            </p>
            <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/20">
              <ArrowLeft className="w-4 h-4" />
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;