
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  ShoppingBag, Trash2, Plus, Minus, ArrowLeft, Tag, Truck,
  ShieldCheck, Gift, X, CheckCircle2, ChevronRight, AlertCircle,
  MapPin, User, Mail, Phone, CreditCard
} from 'lucide-react';
import NavbarClients from '@/app/components/navbarClients';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const Page = () => {
  // ===== READ CART FROM LOCALSTORAGE =====
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===== USER DATA FROM LOCALSTORAGE =====
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Load cart
    const saved = localStorage.getItem('cart');
    if (saved) {
      try {
        setCartItems(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load cart:', e);
      }
    }

    // Load logged-in user data from localStorage
    // Adjust the key 'user' if your app uses something else like 'auth_user', 'currentUser', etc.
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
      } catch (e) {
        console.error('Failed to parse user:', e);
      }
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  // Checkout modal state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: shipping, 2: payment, 3: confirm
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isConfirming, setIsConfirming] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [orderError, setOrderError] = useState('');

  // Saved cards
  const [savedCards, setSavedCards] = useState([]);
  const [useNewCard, setUseNewCard] = useState(true);
  const [selectedSavedCardId, setSelectedSavedCardId] = useState(null);

  // Shipping form — PRE-FILLED with user data from localStorage
  const [shippingForm, setShippingForm] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    shipping_address: '',
    city: '',
    country: 'USA',
    zip_code: '',
  });
  const [shippingErrors, setShippingErrors] = useState({});

  // Auto-fill shipping form when user data is loaded
  useEffect(() => {
    if (currentUser) {
      setShippingForm(prev => ({
        ...prev,
        customer_name: currentUser.name || currentUser.full_name || currentUser.username || prev.customer_name,
        customer_email: currentUser.email || prev.customer_email,
        customer_phone: currentUser.phone || currentUser.mobile || prev.customer_phone,
      }));
    }
  }, [currentUser]);

  // Payment form
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [paypalEmail, setPaypalEmail] = useState('');
  const [paymentError, setPaymentError] = useState('');

  // ===== CART OPERATIONS =====
  const updateQuantity = useCallback((id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, Math.min(item.quantity + delta, item.stock ?? 999));
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  }, []);

  const removeItem = useCallback((id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  }, []);

  // Coupon logic
  const applyCoupon = () => {
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (!code) return;
    if (code === 'SAVE20') {
      setAppliedCoupon({ code: 'SAVE20', discount: 0.2, type: 'percentage', label: '20% off' });
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

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const shipping = appliedCoupon?.type === 'shipping' ? 0 : subtotal > 100 ? 0 : 12.99;
  const discount = appliedCoupon?.type === 'percentage' ? subtotal * appliedCoupon.discount : 0;
  const tax = subtotal * 0.08; // 8% tax example
  const total = subtotal + shipping + tax - discount;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  // ===== CHECKOUT FLOW =====
  const openCheckout = () => {
    setCheckoutStep(1);
    setOrderError('');
    setPaymentError('');
    setShippingErrors({});
    setIsCheckoutOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
    setCheckoutStep(1);
    setPaymentMethod('card');
    setIsConfirming(false);
    setOrderConfirmed(false);
    setConfirmedOrder(null);
    setOrderError('');
    setPaymentError('');
    setSelectedSavedCardId(null);
    setCardHolder('');
    setCardNumber('');
    setCardExpiry('');
    setCardCvc('');
    setSaveCard(false);
    setPaypalEmail('');
    // Don't clear shipping form — keep user data pre-filled
  };

  const validateShipping = () => {
    const errors = {};
    if (!shippingForm.customer_name.trim()) errors.customer_name = 'Name is required';
    if (!shippingForm.customer_email.trim()) errors.customer_email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingForm.customer_email)) errors.customer_email = 'Invalid email';
    if (!shippingForm.shipping_address.trim()) errors.shipping_address = 'Address is required';
    if (!shippingForm.city.trim()) errors.city = 'City is required';
    
    setShippingErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const goToPayment = () => {
    if (validateShipping()) {
      setCheckoutStep(2);
    }
  };

  const validatePayment = () => {
    setPaymentError('');
    if (paymentMethod === 'card') {
      if (!useNewCard && selectedSavedCardId) return true;
      const digits = cardNumber.replace(/\D/g, '');
      if (!cardHolder.trim() || digits.length < 12 || !/^\d{2}\/\d{2}$/.test(cardExpiry) || !/^\d{3,4}$/.test(cardCvc)) {
        setPaymentError('Please enter valid card details.');
        return false;
      }
    } else if (paymentMethod === 'paypal') {
      if (!paypalEmail?.includes('@')) {
        setPaymentError('Please enter a valid PayPal email.');
        return false;
      }
    }
    return true;
  };

  const goToConfirm = () => {
    if (validatePayment()) {
      setCheckoutStep(3);
    }
  };

  const confirmOrder = async () => {
    setIsConfirming(true);
    setOrderError('');

    const orderData = {
      // Attach user_id so the backend knows who placed the order
      user_id: currentUser?.id || currentUser?.user_id || null,
      client_id: currentUser?.id || currentUser?.user_id || null, // fallback if your API uses client_id
      
      customer_name: shippingForm.customer_name,
      customer_email: shippingForm.customer_email,
      customer_phone: shippingForm.customer_phone,
      shipping_address: shippingForm.shipping_address,
      city: shippingForm.city,
      country: shippingForm.country,
      zip_code: shippingForm.zip_code,
      payment_method: paymentMethod,
      subtotal: parseFloat(subtotal.toFixed(2)),
      shipping: parseFloat(shipping.toFixed(2)),
      discount: parseFloat(discount.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
      coupon_code: appliedCoupon?.code || null,
      coupon_discount: parseFloat(discount.toFixed(2)),
      items: cartItems.map(item => ({
        product_id: item.id,
        product_name: item.name,
        product_sku: item.sku,
        product_image: item.image,
        price: parseFloat(item.price),
        quantity: item.quantity,
        total: parseFloat((item.price * item.quantity).toFixed(2)),
      })),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/admin/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to create order');
      }

      // Success!
      setConfirmedOrder(data.order);
      setOrderConfirmed(true);
      
      // Clear cart
      setCartItems([]);
      localStorage.removeItem('cart');

      // Save card if requested
      if (paymentMethod === 'card' && useNewCard && saveCard) {
        const newCard = {
          id: String(Date.now()),
          brand: 'Card',
          last4: cardNumber.replace(/\D/g, '').slice(-4),
          exp: cardExpiry,
          name: cardHolder,
        };
        setSavedCards(prev => [...prev, newCard]);
      }

    } catch (err) {
      console.error('Order error:', err);
      setOrderError(err.message || 'Failed to place order. Please try again.');
    } finally {
      setIsConfirming(false);
    }
  };

  const handleShippingChange = (field, value) => {
    setShippingForm(prev => ({ ...prev, [field]: value }));
    if (shippingErrors[field]) {
      setShippingErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-[#F5F0EB] flex items-center justify-center">
  //       <div className="text-gray-500">Loading cart...</div>
  //     </div>
  //   );
  // }

  return (
    <> 
    <NavbarClients />
     <section className="hero relative min-h-screen overflow-hidden " id=''>
   
      {/* Background Image */}
      <div className="absolute inset-0">
     
             <video
                src="/videos/hero.mp4"
                poster="/images/hero1.jpeg"
                autoPlay
                muted
                loop
                playsInline
                  className="w-full h-full object-cover rounded-2xl"
                // className="w-full h-48 md:h-64 object-cover rounded-3xl"
              >
                Your browser does not support the video tag.
              </video>
        </div>
    

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 min-h-screen flex items-end pb-16">
        <div className="grid lg:grid-cols-2 gap-12 w-full items-end">
          {/* Left Content */}
          <div className="max-w-2xl mb-10">
            <h1 className="text-5xl md:text-7xl font-bold text-black leading-tight tracking-tight ">
              A calmer way to care for your smile.
            </h1>

            <p className="mt-6 text-lg md:text-xl text-black/80 max-w-xl">
              Gentle dentistry designed to remove fear, build trust, and
              deliver confident, lasting results.
            </p>

          
          </div>

          {/* Right Content */}
          <div className="flex flex-col lg:items-end gap-6">
            {/* Testimonial Card */}
            <div className="max-w-sm rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-6">
             

              <p className="text-black text-lg">
                “It felt more like a wellness visit than a dental appointment.”
              </p>

             
             
            </div>

            {/* Video Card */}
            <div className="max-w-sm rounded-3xl overflow-hidden">
              
            </div>
          </div>
        </div>
      </div>
    </section>
    <div className="min-h-screen bg-[#F5F0EB] p-4 pt-20">
      
     
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Shopping Cart</h1>
            <p className="text-gray-500 mt-1 text-sm">{itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart</p>
           
          </div>
          <a href="/clients/products" className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </a>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                <div className="col-span-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</div>
                <div className="col-span-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</div>
                <div className="col-span-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Quantity</div>
                <div className="col-span-2 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</div>
              </div>

              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl p-4 md:p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:grid md:grid-cols-12 md:gap-4 md:items-center">
                      <div className="md:col-span-6 flex gap-4 mb-4 md:mb-0">
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                          <img src={item.image || '/images/img1.jpeg'} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">{item.name}</h3>
                          <p className="text-xs text-gray-400 mt-1">SKU: {item.sku}</p>
                          <div className="flex items-center gap-2 mt-2 md:hidden">
                            <span className="text-sm font-bold text-gray-900">{formatCurrency(item.price)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="hidden md:col-span-2 md:flex md:flex-col md:items-center">
                        <span className="text-sm font-semibold text-gray-900">{formatCurrency(item.price)}</span>
                      </div>

                      <div className="md:col-span-2 flex items-center justify-between md:justify-center gap-4 mb-4 md:mb-0">
                        <div className="flex items-center gap-1 bg-gray-50 rounded-xl border border-gray-200 p-1">
                          <button onClick={() => updateQuantity(item.id, -1)} disabled={item.quantity <= 1}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-40 transition-colors shadow-sm">
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-10 text-center text-sm font-semibold text-gray-900">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} disabled={item.quantity >= (item.stock ?? 999)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-40 transition-colors shadow-sm">
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="md:hidden p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="hidden md:col-span-2 md:flex md:items-center md:justify-end gap-3">
                        <span className="text-sm font-bold text-gray-900">{formatCurrency(item.price * item.quantity)}</span>
                        <button onClick={() => removeItem(item.id)} className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

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
                    <button onClick={removeCoupon} className="p-1.5 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <input type="text" placeholder="Enter coupon code" value={couponCode}
                        onChange={(e) => { setCouponCode(e.target.value); setCouponError(''); }}
                        className={`w-full px-4 py-2.5 text-black bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all ${couponError ? 'border-red-300' : 'border-gray-200'}`} />
                      {couponError && (
                        <div className="flex items-center gap-1 mt-1.5">
                          <AlertCircle className="w-3 h-3 text-red-500" />
                          <span className="text-xs text-red-500">{couponError}</span>
                        </div>
                      )}
                    </div>
                    <button onClick={applyCoupon} disabled={!couponCode.trim()}
                      className="px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 disabled:opacity-40 transition-all shadow-md shadow-gray-900/20 whitespace-nowrap">
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
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Tax (8%)</span>
                      <span className="text-gray-900 font-medium">{formatCurrency(tax)}</span>
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
                      <span className="text-2xl font-bold text-gray-900">{formatCurrency(total)}</span>
                    </div>
                  </div>
                  <button onClick={openCheckout}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/20">
                    Proceed to Checkout
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

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
          <div className="bg-white rounded-2xl p-12 md:p-16 border border-gray-100 shadow-sm text-center max-w-lg mx-auto">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-sm text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <a href="/products" className="inline-flex items-center gap-2 px-8 py-3.5 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-all shadow-lg">
              <ArrowLeft className="w-4 h-4" />
              Start Shopping
            </a>
          </div>
        )}
      </div>

      {/* ===== CHECKOUT MODAL ===== */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={!isConfirming ? closeCheckout : undefined} />
          
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto z-10">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {orderConfirmed ? 'Order Confirmed!' : 
                   checkoutStep === 1 ? 'Shipping Details' :
                   checkoutStep === 2 ? 'Payment Method' : 'Confirm Order'}
                </h3>
                {!orderConfirmed && (
                  <div className="flex items-center gap-1 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${checkoutStep >= 1 ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-400'}`}>1. Shipping</span>
                    <ChevronRight className="w-3 h-3 text-gray-300" />
                    <span className={`text-xs px-2 py-0.5 rounded-full ${checkoutStep >= 2 ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-400'}`}>2. Payment</span>
                    <ChevronRight className="w-3 h-3 text-gray-300" />
                    <span className={`text-xs px-2 py-0.5 rounded-full ${checkoutStep >= 3 ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-400'}`}>3. Confirm</span>
                  </div>
                )}
              </div>
              {!isConfirming && !orderConfirmed && (
                <button onClick={closeCheckout} className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition">
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="p-6">
              {/* Error Message */}
              {orderError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <span className="text-sm text-red-600">{orderError}</span>
                </div>
              )}

              {!orderConfirmed ? (
                <>
                  {/* STEP 1: SHIPPING */}
                  {checkoutStep === 1 && (
                    <div className="space-y-4 text-black">
                      {/* Show logged-in user badge */}
                      {currentUser && (
                        <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl flex items-center gap-2">
                          <User className="w-4 h-4 text-indigo-600" />
                          <span className="text-sm text-indigo-700 font-medium">
                            Placing order as: {currentUser.name || currentUser.email}
                          </span>
                        </div>
                      )}

                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                          <User className="w-4 h-4 text-gray-400" /> Full Name
                        </label>
                        <input
                          value={shippingForm.customer_name}
                          onChange={(e) => handleShippingChange('customer_name', e.target.value)}
                          placeholder="John Doe"
                          className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all ${shippingErrors.customer_name ? 'border-red-300' : 'border-gray-200'}`}
                        />
                        {shippingErrors.customer_name && <span className="text-xs text-red-500 mt-1">{shippingErrors.customer_name}</span>}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                            <Mail className="w-4 h-4 text-gray-400" /> Email
                          </label>
                          <input
                            type="email"
                            value={shippingForm.customer_email}
                            onChange={(e) => handleShippingChange('customer_email', e.target.value)}
                            placeholder="john@example.com"
                            className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all ${shippingErrors.customer_email ? 'border-red-300' : 'border-gray-200'}`}
                          />
                          {shippingErrors.customer_email && <span className="text-xs text-red-500 mt-1">{shippingErrors.customer_email}</span>}
                        </div>
                        <div>
                          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                            <Phone className="w-4 h-4 text-gray-400" /> Phone
                          </label>
                          <input
                            value={shippingForm.customer_phone}
                            onChange={(e) => handleShippingChange('customer_phone', e.target.value)}
                            placeholder="+1 234 567 890"
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                          <MapPin className="w-4 h-4 text-gray-400" /> Shipping Address
                        </label>
                        <textarea
                          value={shippingForm.shipping_address}
                          onChange={(e) => handleShippingChange('shipping_address', e.target.value)}
                          placeholder="123 Main Street, Apt 4B"
                          rows={2}
                          className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none ${shippingErrors.shipping_address ? 'border-red-300' : 'border-gray-200'}`}
                        />
                        {shippingErrors.shipping_address && <span className="text-xs text-red-500 mt-1">{shippingErrors.shipping_address}</span>}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-1.5 block">City</label>
                          <input
                            value={shippingForm.city}
                            onChange={(e) => handleShippingChange('city', e.target.value)}
                            placeholder="New York"
                            className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all ${shippingErrors.city ? 'border-red-300' : 'border-gray-200'}`}
                          />
                          {shippingErrors.city && <span className="text-xs text-red-500 mt-1">{shippingErrors.city}</span>}
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-1.5 block">ZIP Code</label>
                          <input
                            value={shippingForm.zip_code}
                            onChange={(e) => handleShippingChange('zip_code', e.target.value)}
                            placeholder="10001"
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-1.5 block">Country</label>
                        <select
                          value={shippingForm.country}
                          onChange={(e) => handleShippingChange('country', e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        >
                          <option value="USA">United States</option>
                          <option value="CA">Canada</option>
                          <option value="UK">United Kingdom</option>
                          <option value="FR">France</option>
                          <option value="DE">Germany</option>
                        </select>
                      </div>

                      <button onClick={goToPayment}
                        className="w-full py-3 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/20 mt-2">
                        Continue to Payment
                      </button>
                    </div>
                  )}

                  {/* STEP 2: PAYMENT */}
                  {checkoutStep === 2 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        {['card', 'paypal', 'cod'].map((method) => (
                          <label key={method}
                            className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === method ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}>
                            <input type="radio" name="payment" value={method} checked={paymentMethod === method}
                              onChange={() => setPaymentMethod(method)} className="hidden" />
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${paymentMethod === method ? 'bg-indigo-100' : 'bg-gray-100'}`}>
                              {method === 'card' && <CreditCard className={`w-5 h-5 ${paymentMethod === method ? 'text-indigo-600' : 'text-gray-500'}`} />}
                              {method === 'paypal' && <span className={`font-bold text-sm ${paymentMethod === method ? 'text-indigo-600' : 'text-gray-500'}`}>Pay</span>}
                              {method === 'cod' && <Truck className={`w-5 h-5 ${paymentMethod === method ? 'text-indigo-600' : 'text-gray-500'}`} />}
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-900">
                                {method === 'card' ? 'Credit / Debit Card' : method === 'paypal' ? 'PayPal' : 'Cash on Delivery'}
                              </div>
                              <div className="text-xs text-gray-500">
                                {method === 'card' ? 'Secure online payment' : method === 'paypal' ? 'Use your PayPal account' : 'Pay when the order arrives'}
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>

                      {paymentError && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-red-500" />
                          <span className="text-sm text-red-600">{paymentError}</span>
                        </div>
                      )}

                      {paymentMethod === 'card' && (
                        <div className="space-y-3">
                          {savedCards.length > 0 && (
                            <div className="space-y-2">
                              <div className="text-xs font-medium text-gray-500 uppercase">Saved cards</div>
                              {savedCards.map((card) => (
                                <label key={card.id}
                                  className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer ${selectedSavedCardId === card.id && !useNewCard ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'}`}>
                                  <div className="flex items-center gap-3">
                                    <CreditCard className="w-4 h-4 text-gray-500" />
                                    <div>
                                      <div className="text-sm font-medium text-gray-900">**** **** **** {card.last4}</div>
                                      <div className="text-xs text-gray-500">{card.name} • Expires {card.exp}</div>
                                    </div>
                                  </div>
                                  <input type="radio" name="savedCard" checked={selectedSavedCardId === card.id && !useNewCard}
                                    onChange={() => { setSelectedSavedCardId(card.id); setUseNewCard(false); }} className="hidden" />
                                </label>
                              ))}
                              <label className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer ${useNewCard ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'}`}>
                                <input type="radio" name="savedCard" checked={useNewCard}
                                  onChange={() => setUseNewCard(true)} className="hidden" />
                                <div className="text-sm font-medium text-gray-900">Use a new card</div>
                              </label>
                            </div>
                          )}

                          {(useNewCard || savedCards.length === 0) && (
                            <div className="space-y-3 p-4 bg-gray-50 rounded-xl text-black">
                              <input placeholder="Cardholder name" value={cardHolder} onChange={(e) => setCardHolder(e.target.value)}
                                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500" />
                              <input placeholder="Card number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)}
                                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500" />
                              <div className="flex gap-3">
                                <input placeholder="MM/YY" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)}
                                  className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500" />
                                <input placeholder="CVC" value={cardCvc} onChange={(e) => setCardCvc(e.target.value)}
                                  className="w-24 px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500" />
                              </div>
                              <label className="flex items-center gap-2 text-sm text-gray-700">
                                <input type="checkbox" checked={saveCard} onChange={() => setSaveCard(!saveCard)} className="w-4 h-4 rounded border-gray-300" />
                                Save this card for next time
                              </label>
                            </div>
                          )}
                        </div>
                      )}

                      {paymentMethod === 'paypal' && (
                        <div className="p-4 bg-gray-50 rounded-xl">
                          <input placeholder="PayPal email" value={paypalEmail} onChange={(e) => setPaypalEmail(e.target.value)}
                            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500" />
                        </div>
                      )}

                      {paymentMethod === 'cod' && (
                        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                          <p className="text-sm text-amber-800">You'll pay <strong>{formatCurrency(total)}</strong> when your order is delivered.</p>
                        </div>
                      )}

                      <div className="flex gap-3 pt-2">
                        <button onClick={() => setCheckoutStep(1)}
                          className="flex-1 py-3 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all">
                          Back
                        </button>
                        <button onClick={goToConfirm}
                          className="flex-1 py-3 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/20">
                          Review Order
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: CONFIRM */}
                  {checkoutStep === 3 && (
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                          <div>
                            <div className="text-xs text-gray-500 uppercase font-medium">Ship to</div>
                            <div className="text-sm text-gray-900 font-medium">{shippingForm.customer_name}</div>
                            <div className="text-sm text-gray-600">{shippingForm.shipping_address}</div>
                            <div className="text-sm text-gray-600">{shippingForm.city}, {shippingForm.country} {shippingForm.zip_code}</div>
                            <div className="text-sm text-gray-600">{shippingForm.customer_email}</div>
                          </div>
                        </div>
                        <div className="border-t border-gray-200 pt-3">
                          <div className="text-xs text-gray-500 uppercase font-medium mb-2">Payment</div>
                          <div className="flex items-center gap-2">
                            {paymentMethod === 'card' && <CreditCard className="w-4 h-4 text-gray-500" />}
                            {paymentMethod === 'paypal' && <span className="font-bold text-sm text-gray-700">Pay</span>}
                            {paymentMethod === 'cod' && <Truck className="w-4 h-4 text-gray-500" />}
                            <span className="text-sm text-gray-900 font-medium">
                              {paymentMethod === 'card' ? `Card ending in ${useNewCard ? cardNumber.replace(/\D/g, '').slice(-4) : savedCards.find(c => c.id === selectedSavedCardId)?.last4}` :
                               paymentMethod === 'paypal' ? paypalEmail :
                               'Cash on Delivery'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Subtotal</span>
                          <span className="text-gray-900">{formatCurrency(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Shipping</span>
                          <span className="text-gray-900">{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Tax</span>
                          <span className="text-gray-900">{formatCurrency(tax)}</span>
                        </div>
                        {discount > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Discount</span>
                            <span className="text-rose-600">-{formatCurrency(discount)}</span>
                          </div>
                        )}
                        <div className="border-t border-gray-200 pt-2 flex justify-between">
                          <span className="text-base font-semibold text-gray-900">Total</span>
                          <span className="text-xl font-bold text-gray-900">{formatCurrency(total)}</span>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button onClick={() => setCheckoutStep(2)} disabled={isConfirming}
                          className="flex-1 py-3 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all disabled:opacity-50">
                          Back
                        </button>
                        <button onClick={confirmOrder} disabled={isConfirming}
                          className="flex-1 py-3 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50 flex items-center justify-center gap-2">
                          {isConfirming ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>Place Order <CheckCircle2 className="w-4 h-4" /></>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* ORDER CONFIRMED */
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">Thank You!</h4>
                  <p className="text-sm text-gray-500 mt-2">Your order has been placed successfully.</p>
                  
                  {confirmedOrder && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-xl text-left">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Order ID</span>
                        <span className="font-mono font-medium text-gray-900">{confirmedOrder.order_id}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Placed By</span>
                        <span className="font-medium text-gray-900">{shippingForm.customer_name}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Total</span>
                        <span className="font-bold text-gray-900">{formatCurrency(confirmedOrder.total)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Status</span>
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">{confirmedOrder.status}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 mt-6">
                    <a href="/products" onClick={closeCheckout}
                      className="flex-1 py-3 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-all">
                      Continue Shopping
                    </a>
                    <a href="/orders"
                      className="flex-1 py-3 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all">
                      View Orders
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Page;