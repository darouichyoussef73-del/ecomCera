'use client'
import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Heart, 
  ShoppingCart, 
  Trash2, 
  Eye, 
  Star, 
  Filter, 
  ChevronDown, 
  Package, 
  TrendingUp, 
  Clock, 
  ArrowUpDown,
  X,
  Plus,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const page = () => {
  
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'Wireless Headphones Pro',
      category: 'Electronics',
      price: 149.99,
      originalPrice: 199.99,
      rating: 4.8,
      reviews: 234,
      stock: 'In Stock',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      addedDate: '2026-06-09',
      popularity: 95
    },
    {
      id: 2,
      name: 'Smart Watch Series 5',
      category: 'Electronics',
      price: 349.99,
      originalPrice: 399.99,
      rating: 4.6,
      reviews: 189,
      stock: 'In Stock',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      addedDate: '2026-06-08',
      popularity: 88
    },
    {
      id: 3,
      name: 'Mechanical Keyboard RGB',
      category: 'Electronics',
      price: 129.50,
      originalPrice: 159.00,
      rating: 4.9,
      reviews: 412,
      stock: 'Low Stock',
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop',
      addedDate: '2026-06-07',
      popularity: 92
    },
    {
      id: 4,
      name: 'Portable Monitor 15.6"',
      category: 'Electronics',
      price: 199.99,
      originalPrice: 249.99,
      rating: 4.5,
      reviews: 156,
      stock: 'In Stock',
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop',
      addedDate: '2026-06-06',
      popularity: 76
    },
    {
      id: 5,
      name: 'Ergonomic Office Chair',
      category: 'Furniture',
      price: 289.99,
      originalPrice: 359.99,
      rating: 4.7,
      reviews: 98,
      stock: 'In Stock',
      image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=400&h=400&fit=crop',
      addedDate: '2026-06-05',
      popularity: 65
    },
    {
      id: 6,
      name: 'Standing Desk Converter',
      category: 'Furniture',
      price: 249.99,
      originalPrice: 299.99,
      rating: 4.4,
      reviews: 67,
      stock: 'Out of Stock',
      image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=400&fit=crop',
      addedDate: '2026-06-04',
      popularity: 54
    },
    {
      id: 7,
      name: 'Noise Cancelling Earbuds',
      category: 'Electronics',
      price: 89.99,
      originalPrice: 119.99,
      rating: 4.3,
      reviews: 567,
      stock: 'In Stock',
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop',
      addedDate: '2026-06-03',
      popularity: 82
    },
    {
      id: 8,
      name: '4K Webcam Pro',
      category: 'Electronics',
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.6,
      reviews: 223,
      stock: 'Low Stock',
      image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop',
      addedDate: '2026-06-02',
      popularity: 71
    }
  ]);

  const [recommendedProducts] = useState([
    {
      id: 101,
      name: 'Gaming Mouse RGB',
      category: 'Electronics',
      price: 49.99,
      originalPrice: 69.99,
      rating: 4.7,
      reviews: 445,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop'
    },
    {
      id: 102,
      name: 'USB-C Hub 7-in-1',
      category: 'Electronics',
      price: 39.99,
      originalPrice: 54.99,
      rating: 4.5,
      reviews: 312,
      image: 'https://images.unsplash.com/photo-1625766763788-95dcce9bf5ac?w=400&h=400&fit=crop'
    },
    {
      id: 103,
      name: 'Laptop Stand Aluminum',
      category: 'Accessories',
      price: 34.99,
      originalPrice: 44.99,
      rating: 4.8,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400&h=400&fit=crop'
    },
    {
      id: 104,
      name: 'Bluetooth Speaker Mini',
      category: 'Electronics',
      price: 59.99,
      originalPrice: 79.99,
      rating: 4.4,
      reviews: 278,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop'
    }
  ]);

  const categories = ['All', 'Electronics', 'Furniture', 'Accessories'];
  const sortOptions = [
    { value: 'newest', label: 'Newest Added' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'popularity', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  const removeFromWishlist = (id) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  const getStockColor = (stock) => {
    switch (stock) {
      case 'In Stock':
        return 'text-emerald-600 bg-emerald-50';
      case 'Low Stock':
        return 'text-amber-600 bg-amber-50';
      case 'Out of Stock':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStockIcon = (stock) => {
    switch (stock) {
      case 'In Stock':
        return <CheckCircle2 className="w-3 h-3 mr-1" />;
      case 'Low Stock':
        return <AlertCircle className="w-3 h-3 mr-1" />;
      case 'Out of Stock':
        return <X className="w-3 h-3 mr-1" />;
      default:
        return null;
    }
  };

  // Statistics
  const stats = useMemo(() => {
    const total = wishlistItems.length;
    const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0);
    const inStock = wishlistItems.filter(item => item.stock === 'In Stock').length;
    const onSale = wishlistItems.filter(item => item.originalPrice > item.price).length;
    return { total, totalValue, inStock, onSale };
  }, [wishlistItems]);

  // Filter, search, and sort
  const filteredItems = useMemo(() => {
    let items = wishlistItems.filter(item => {
      const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    switch (sortBy) {
      case 'price-low':
        items.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        items.sort((a, b) => b.price - a.price);
        break;
      case 'popularity':
        items.sort((a, b) => b.popularity - a.popularity);
        break;
      case 'rating':
        items.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
      default:
        items.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
        break;
    }

    return items;
  }, [wishlistItems, searchQuery, categoryFilter, sortBy]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const calculateDiscount = (original, current) => {
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              My Wishlist
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              Save your favorite items and track price changes
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span className="text-sm font-medium text-gray-700">{stats.total} items</span>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 bg-rose-50 rounded-xl">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-sm text-gray-500 mt-0.5">Saved Items</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 bg-indigo-50 rounded-xl">
                <Package className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">${stats.totalValue.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mt-0.5">Total Value</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 bg-emerald-50 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.inStock}</p>
            <p className="text-sm text-gray-500 mt-0.5">In Stock</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 bg-amber-50 rounded-xl">
                <TrendingUp className="w-5 h-5 text-amber-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.onSale}</p>
            <p className="text-sm text-gray-500 mt-0.5">On Sale</p>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search wishlist items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Category Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
              <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                    categoryFilter === cat
                      ? 'bg-gray-900 text-white shadow-md shadow-gray-900/20'
                      : 'bg-gray-50 text-gray-600 border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="relative min-w-[180px]">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none pl-3 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Wishlist Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-gray-200 transition-all duration-300 overflow-hidden"
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Discount Badge */}
                  {item.originalPrice > item.price && (
                    <div className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm">
                      -{calculateDiscount(item.originalPrice, item.price)}%
                    </div>
                  )}
                  
                  {/* Remove Button */}
                  <button 
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-xl text-gray-400 hover:text-rose-500 hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {/* Quick View */}
                  <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button className="w-full py-2.5 bg-white/95 backdrop-blur-sm text-sm font-medium text-gray-900 rounded-xl shadow-lg hover:bg-white transition-colors flex items-center justify-center gap-2">
                      <Eye className="w-4 h-4" />
                      Quick View
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <p className="text-xs font-medium text-indigo-600 mb-1">{item.category}</p>
                      <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">
                        {item.name}
                      </h3>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mb-3">
                    <div className="flex items-center gap-0.5">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-medium text-gray-900">{item.rating}</span>
                    </div>
                    <span className="text-xs text-gray-400">({item.reviews})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-lg font-bold text-gray-900">${item.price.toFixed(2)}</span>
                    {item.originalPrice > item.price && (
                      <span className="text-sm text-gray-400 line-through">${item.originalPrice.toFixed(2)}</span>
                    )}
                  </div>

                  {/* Stock & Date */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex items-center text-xs font-medium px-2 py-1 rounded-lg ${getStockColor(item.stock)}`}>
                      {getStockIcon(item.stock)}
                      {item.stock}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDate(item.addedDate)}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button 
                      disabled={item.stock === 'Out of Stock'}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        item.stock === 'Out of Stock'
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-900 text-white hover:bg-gray-800 shadow-md shadow-gray-900/20'
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-2xl p-12 border border-gray-100 shadow-sm text-center">
            <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <Heart className="w-10 h-10 text-rose-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
              Start adding items you love to your wishlist. We'll notify you when they go on sale or come back in stock.
            </p>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-all shadow-md shadow-gray-900/20">
              <ShoppingCart className="w-4 h-4" />
              Browse Products
            </button>
          </div>
        )}

        {/* Recommended Products */}
        <div className="pt-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Recommended for You</h2>
              <p className="text-sm text-gray-500 mt-0.5">Based on your wishlist and browsing history</p>
            </div>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
              View All
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {recommendedProducts.map((product) => (
              <div 
                key={product.id} 
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300 overflow-hidden"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.originalPrice > product.price && (
                    <div className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm">
                      -{calculateDiscount(product.originalPrice, product.price)}%
                    </div>
                  )}
                  <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-xl text-gray-400 hover:text-rose-500 hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4">
                  <p className="text-xs font-medium text-indigo-600 mb-1">{product.category}</p>
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug mb-2">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center gap-1.5 mb-3">
                    <div className="flex items-center gap-0.5">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-medium text-gray-900">{product.rating}</span>
                    </div>
                    <span className="text-xs text-gray-400">({product.reviews})</span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                    )}
                  </div>

                  <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-gray-50 text-gray-900 rounded-xl text-sm font-medium hover:bg-gray-100 border border-gray-200 transition-all">
                    <Plus className="w-4 h-4" />
                    Add to Wishlist
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;