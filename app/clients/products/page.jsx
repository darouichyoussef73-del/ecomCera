
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import NavbarClient from '../../components/navbarClients';
import ProductCard from '../../components/product';
import Footer from '../../components/footer';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const Page = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [searchQuery, setSearchQuery] = useState('');

  // ===== CART STATE =====
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartNotification, setCartNotification] = useState(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart:', e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/admin/products`, {
          headers: { 'Accept': 'application/json' },
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        if (!Array.isArray(data)) throw new Error('Invalid data format');

        setProducts(data);
        setCategories([...new Set(data.map(p => p.category).filter(Boolean))]);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ===== CART LOGIC =====
  const addToCart = useCallback((product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        // Check stock limit
        if (existing.quantity >= (product.stock ?? 999)) {
          showNotification('Maximum stock reached!', 'error');
          return prev;
        }
        showNotification(`Updated ${product.name} quantity`);
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      showNotification(`Added ${product.name} to cart`);
      return [...prev, { 
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        image: product.image,
        sku: product.sku,
        stock: product.stock ?? 999,
        quantity: 1 
      }];
    });
  }, []);

  const updateQuantity = useCallback((id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, Math.min(item.quantity + delta, item.stock));
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    localStorage.removeItem('cart');
  }, []);

  const showNotification = (message, type = 'success') => {
    setCartNotification({ message, type });
    setTimeout(() => setCartNotification(null), 2000);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Filter & sort products
  const filteredProducts = products
    .filter(product => {
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesStatus = !selectedStatus || product.status === selectedStatus;
      const matchesSearch = !searchQuery ||
        product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'stock') return (b.stock || 0) - (a.stock || 0);
      return a.name?.localeCompare(b.name) ?? 0;
    });

  const statuses = [...new Set(products.map(p => p.status).filter(Boolean))];

  return (
    <>
      <NavbarClient />
      
      {/* Cart Notification */}
      {cartNotification && (
        <div className={`fixed top-20 right-4 z-50 px-6 py-3 rounded-xl shadow-lg transition-all ${
          cartNotification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
        } text-white`}>
          {cartNotification.message}
        </div>
      )}

      {/* Cart Toggle Button */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed cursor-pointer top-7 right-4 z-50 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-all"
      >
        <ShoppingCart className="w-6 h-6" />
        {cartItemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
            {cartItemCount}
          </span>
        )}
      </button>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute cursor-pointer inset-0 bg-black/40" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Shopping Cart ({cartItemCount})</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="mt-4 px-6 py-2 bg-black text-white rounded-full text-sm"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-4 p-4 text-gray-500  bg-gray-50 rounded-2xl ">
                        <img src={item.image || '/images/img1.jpeg'} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm text-gray-900 line-clamp-1">{item.name}</h4>
                          <p className="text-xs text-gray-500">SKU: {item.sku}</p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200">
                              <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-gray-100 rounded-l-lg">
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-gray-100 rounded-r-lg">
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            <span className="font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="p-2 text-gray-400 hover:text-red-500 self-start">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-3 text-gray-500">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subtotal</span>
                      <span className="font-medium">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <button 
                      onClick={() => window.location.href = '/clients/shop'}
                      className="w-full py-3 bg-black text-white rounded-2xl font-semibold hover:bg-gray-800 transition"
                    >
                      Checkout
                    </button>
                    <button 
                      onClick={clearCart}
                      className="w-full py-2 text-sm text-red-500 hover:text-red-700 transition"
                    >
                      Clear Cart
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <video
            src="/videos/hero.mp4"
            poster="/images/hero1.jpeg"
            autoPlay muted loop playsInline
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
        <div className="relative z-10 container mx-auto px-6 lg:px-12 min-h-screen flex items-end pb-16">
          <div className="grid lg:grid-cols-2 gap-12 w-full items-end">
              <div className="max-w-2xl mb-10">
            <h1 className="text-5xl md:text-7xl font-bold text-black leading-tight tracking-tight ">
               shape your creativity.
            </h1>

            <p className="mt-6 text-lg md:text-xl text-black/80 max-w-xl">
              A welcoming pottery studio designed to inspire creativity, build skills, and
              craft beautiful, lasting ceramics.
            </p>

          
          </div>
            <div className="flex flex-col lg:items-end gap-6">
              <div className="max-w-sm rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-6">
                <p className="text-black text-lg">“Every piece feels like a small work of art crafted with soul and precision.”</p>
 
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="relative gap-5 py-10 items-center justify-center h-full overflow-hidden bg-gray-50">
        <div className='flex flex-wrap items-center justify-center my-10 text-black gap-4 px-4'>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-3xl"
          />
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-45 px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-3xl"
          >
            <option value="">All Categories</option>
            {categories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
          </select>
          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-45 px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-3xl"
          >
            <option value="">All Statuses</option>
            {statuses.map((s, i) => <option key={i} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-45 px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-3xl"
          >
            <option value="name">Sort by Name</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="stock">Stock: High to Low</option>
          </select>
        </div>

        <div className='flex flex-wrap gap-5 items-center justify-center px-4'>
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="w-72 h-96 bg-gray-200 animate-pulse rounded-3xl" />
            ))
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500 text-lg">{error}</p>
              <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2 bg-black text-white rounded-full">
                Retry
              </button>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No products found.</p>
            </div>
          ) : (
            filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart}
              />
            ))
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Page;