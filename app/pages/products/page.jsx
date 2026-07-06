// import React from 'react'
// import Navbar from '../../components/navbar'
// import Card from '../../components/product'
// import Footer from '../../components/footer'
// import Link from 'next/link'
// const page = () => {
//   return (
//     <>
//     <Navbar/>
//    <section className="hero relative min-h-screen overflow-hidden " id=''>
   
//       {/* Background Image */}
//       <div className="absolute inset-0">
//          <video
//                 src="/videos/hero.mp4"
//                 poster="/images/hero1.jpeg"
//                 autoPlay
//                 muted
//                 loop
//                 playsInline
//                   className="w-full h-full object-cover rounded-2xl"
//                 // className="w-full h-48 md:h-64 object-cover rounded-3xl"
//               >
//                 Your browser does not support the video tag.
//               </video>
      
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
//   )
// }

// export default page
'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar';
import Card from '../../components/product';
import Footer from '../../components/footer';
import Link from 'next/link';

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

  // Fetch products from Laravel backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/admin/products`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);
        
        // Extract unique categories for filter dropdown
        const uniqueCategories = [...new Set(data.map(p => p.category).filter(Boolean))];
        setCategories(uniqueCategories);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesStatus = !selectedStatus || product.status === selectedStatus;
      const matchesSearch = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'stock') return (b.stock || 0) - (a.stock || 0);
      return a.name.localeCompare(b.name); // default sort by name
    });

  // Get unique statuses for filter
  const statuses = [...new Set(products.map(p => p.status).filter(Boolean))];

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero relative min-h-screen overflow-hidden" id=''>
        <div className="absolute inset-0">
          <video
            src="/videos/hero.mp4"
            poster="/images/hero1.jpeg"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover rounded-2xl"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="relative z-10 container mx-auto px-6 lg:px-12 min-h-screen flex items-end pb-16">
          <div className="grid lg:grid-cols-2 gap-12 w-full items-end">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-7xl font-bold text-black leading-tight tracking-tight">
                A calmer way to care for your smile.
              </h1>
              <p className="mt-6 text-lg md:text-xl text-black/80 max-w-xl">
                Gentle dentistry designed to remove fear, build trust, and
                deliver confident, lasting results.
              </p>
            </div>

            <div className="flex flex-col lg:items-end gap-6">
              <div className="max-w-sm rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-6">
                <p className="text-black text-lg">
                  "It felt more like a wellness visit than a dental appointment."
                </p>
                <p className="mt-3 text-black/70">— Sarah M.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="relative gap-5 py-10 items-center justify-center h-full overflow-hidden bg-gray-50">
        <div className='flex flex-wrap items-center justify-center my-10 text-black gap-4 px-4'>
          
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-3xl"
          />

          {/* Category Filter */}
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-45 px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-3xl"
          >
            <option value="">All Categories</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-45 px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-3xl"
          >
            <option value="">All Statuses</option>
            {statuses.map((status, index) => (
              <option key={index} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>

          {/* Sort By */}
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

        {/* Products Grid */}
        <div className='flex flex-wrap gap-5 items-center justify-center px-4'>
          {loading ? (
            // Loading skeleton
            Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="w-72 h-96 bg-gray-200 animate-pulse rounded-3xl" />
            ))
          ) : error ? (
            // Error state
            <div className="text-center py-20">
              <p className="text-red-500 text-lg">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition"
              >
                Retry
              </button>
            </div>
          ) : filteredProducts.length === 0 ? (
            // Empty state
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
            </div>
          ) : (
            // Render products
            filteredProducts.map((product) => (
              <Card 
                key={product.id} 
                product={product} 
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