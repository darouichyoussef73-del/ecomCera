// // import React from 'react';

// // const ProductCard = ({ product }) => {
// //   // Handle missing product data gracefully
// //   if (!product) return null;

// //   return (
// //     <div className="group cursor-pointer w-full max-w-80">
// //       <div className="bg-white/5 rounded-3xl overflow-hidden border h-90 border-gray-100 transition-all duration-500 hover:shadow-2xl">

// //         {/* Image Area */}
// //         <div className="relative overflow-hidden aspect-6/5 bg-gray-50">

// //           {/* Main Image - Dynamic from API */}
// //           <img
// //             src={product.image || '/images/img1.jpeg'}
// //             alt={product.name || 'Product'}
// //             className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
// //           />

// //           {/* Badge - Dynamic Status */}
// //           {product.status && product.status !== 'active' && (
// //             <div className="absolute top-4 left-4 z-10">
// //               <span className={`px-3 py-1 rounded-full text-xs font-medium ${
// //                 product.status === 'low stock' ? 'bg-yellow-100 text-yellow-800' :
// //                 product.status === 'out of stock' ? 'bg-red-100 text-red-800' :
// //                 product.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
// //                 'bg-blue-100 text-blue-800'
// //               }`}>
// //                 {product.status.replace(/-/g, ' ').toUpperCase()}
// //               </span>
// //             </div>
// //           )}

// //           {/* Out of Stock Overlay */}
// //           {product.status === 'out of stock' && (
// //             <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-20">
// //               <span className="text-gray-500 font-semibold text-lg">Out of Stock</span>
// //             </div>
// //           )}

// //           {/* Add To Cart - Hidden if out of stock */}
// //           {product.status !== 'out of stock' && (
// //             <button
// //               className="
// //                 absolute
// //                 bottom-4
// //                 left-4
// //                 right-4
// //                 bg-black
// //                 text-white
// //                 rounded-2xl
// //                 py-3
// //                 flex
// //                 items-center
// //                 justify-center
// //                 gap-2
// //                 translate-y-20
// //                 opacity-0
// //                 transition-all
// //                 duration-500
// //                 group-hover:translate-y-0
// //                 group-hover:opacity-100
// //                 hover:bg-gray-800
// //               "
// //             >
// //               <svg
// //                 xmlns="http://www.w3.org/2000/svg"
// //                 className="w-5 h-5"
// //                 fill="none"
// //                 viewBox="0 0 24 24"
// //                 stroke="currentColor"
// //               >
// //                 <path
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   strokeWidth={2}
// //                   d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6h13M10 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
// //                 />
// //               </svg>
// //               Add to Cart
// //             </button>
// //           )}
// //         </div>

// //         {/* Content */}
// //         <div className="p-6 pt-2">

// //           {/* Category - Dynamic */}
// //           <span className="text-xs uppercase tracking-[0.2em] text-gray-400">
// //             {product.category || 'General'}
// //           </span>

// //           {/* Product Name - Dynamic */}
// //           <h3 className="mt-1 text-md font-semibold text-gray-900 line-clamp-1">
// //             {product.name || 'Unnamed Product'}
// //           </h3>

// //           {/* SKU - Optional */}
// //           {product.sku && (
// //             <p className="mt-1 text-xs text-gray-400">
// //               SKU: {product.sku}
// //             </p>
// //           )}

// //           {/* Price - Dynamic */}
// //           <div className="mt-2 flex items-center justify-between">

// //             <span className="text-2xl font-bold text-gray-900">
// //               ${parseFloat(product.price || 0).toFixed(2)}
// //             </span>

// //             <span className="text-sm text-gray-400">
// //               USD
// //             </span>

// //           </div>

// //           {/* Stock Info */}
// //           <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
// //             <span>
// //               {product.stock > 0 ? `${product.stock} in stock` : 'No stock'}
// //             </span>
// //             {product.stock > 0 && product.stock <= 5 && (
// //               <span className="text-red-500 font-medium">Low stock!</span>
// //             )}
// //           </div>

// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductCard;

// 'use client';

// import React from 'react';
// import { ShoppingCart } from 'lucide-react';
// import Link from 'next/link';
// const ProductCard = ({ product, onAddToCart }) => {
//   if (!product) return null;

//   const isOutOfStock = product.status === 'out of stock' || (product.stock ?? 0) <= 0;
//   const isLowStock = product.status === 'low stock' || (product.stock ?? 0) <= 5 && (product.stock ?? 0) > 0;

//   const handleAddToCart = (e) => {
//     e.stopPropagation();
//     if (!isOutOfStock && onAddToCart) {
//       onAddToCart(product);
//     }
//   };

//   return (
//     <div className="group cursor-pointer w-full max-w-80">
//       <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 transition-all duration-500 hover:shadow-2xl">
        
//         {/* Image Area */}
//         <div className="relative overflow-hidden aspect-[5/4] bg-gray-50">
//           <img
//             src={product.image || '/images/img1.jpeg'}
//             alt={product.name || 'Product'}
//             className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
//             onError={(e) => { e.target.src = '/images/img1.jpeg'; }}
//           />

//           {/* Status Badge */}
//           {product.status && product.status !== 'active' && (
//             <div className="absolute top-4 left-4 z-10">
//               <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                 isOutOfStock ? 'bg-red-100 text-red-800' :
//                 isLowStock ? 'bg-yellow-100 text-yellow-800' :
//                 'bg-gray-100 text-gray-800'
//               }`}>
//                 {product.status.replace(/-/g, ' ').toUpperCase()}
//               </span>
//             </div>
//           )}

//           {/* Out of Stock Overlay */}
//           {isOutOfStock && (
//             <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-20">
//               <span className="text-gray-500 font-semibold text-lg">Out of Stock</span>
//             </div>
//           )}

//           {/* Add To Cart Button */}
//           <button
//             onClick={handleAddToCart}
//             disabled={isOutOfStock}
//             className={`
//               cursor-pointer
//               absolute bottom-4 left-4 right-4
//               rounded-2xl py-3
//               flex items-center justify-center gap-2
//               translate-y-20 opacity-0
//               transition-all duration-500
//               group-hover:translate-y-0 group-hover:opacity-100
//               ${isOutOfStock 
//                 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
//                 : 'bg-black text-white hover:bg-gray-800'
//               }
//             `}
//           >
//             <ShoppingCart className="w-5 h-5" />
//             {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
//           </button>
//         </div>

//         {/* Content */}
//         <div className="p-6 pt-2">
//           <span className="text-xs uppercase tracking-[0.2em] text-gray-400">
//             {product.category || 'General'}
//           </span>

//           <h3 className="mt-1 text-md font-semibold text-gray-900 line-clamp-1">
//             {product.name || 'Unnamed Product'}
//           </h3>

//           {product.sku && (
//             <p className="mt-1 text-xs text-gray-400">SKU: {product.sku}</p>
//           )}

//           <div className="mt-2 flex items-center justify-between">
//             <span className="text-2xl font-bold text-gray-900">
//               ${parseFloat(product.price || 0).toFixed(2)}
//             </span>
//             <span className="text-sm text-gray-400">USD</span>
//           </div>

//           {/* Stock Info */}
//           <div className="mt-2 flex items-center justify-between text-xs">
//             <span className={isOutOfStock ? 'text-red-500' : isLowStock ? 'text-yellow-600' : 'text-gray-500'}>
//               {isOutOfStock ? 'No stock available' : 
//                isLowStock ? `Only ${product.stock} left!` : 
//                `${product.stock ?? 0} in stock`}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
'use client';

import React, { useState } from 'react';
import { ShoppingCart, X, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const ProductCard = ({ product, onAddToCart }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) return null;

  const isOutOfStock = product.status === 'out of stock' || (product.stock ?? 0) <= 0;
  const isLowStock = product.status === 'low stock' || ((product.stock ?? 0) <= 5 && (product.stock ?? 0) > 0);

  // Handle multiple images or fallback to single image
  const images = product.images && product.images.length > 0 
    ? product.images 
    : [product.image || '/images/img1.jpeg'];

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!isOutOfStock && onAddToCart) {
      onAddToCart(product);
    }
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImageIndex(0);
  };

  return (
    <>
      {/* ===== PRODUCT CARD ===== */}
      <div 
        className="group cursor-pointer w-full max-w-80"
        onClick={openModal}
      >
        <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 transition-all duration-500 hover:shadow-2xl">

          {/* Image Area */}
          <div className="relative overflow-hidden aspect-[5/4] bg-gray-50">
            <img
              src={product.image || '/images/img1.jpeg'}
              alt={product.name || 'Product'}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              onError={(e) => { e.target.src = '/images/img1.jpeg'; }}
            />

            {/* Status Badge */}
            {product.status && product.status !== 'active' && (
              <div className="absolute top-4 left-4 z-10">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  isOutOfStock ? 'bg-red-100 text-red-800' :
                  isLowStock ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {product.status.replace(/-/g, ' ').toUpperCase()}
                </span>
              </div>
            )}

            {/* Out of Stock Overlay */}
            {isOutOfStock && (
              <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-20">
                <span className="text-gray-500 font-semibold text-lg">Out of Stock</span>
              </div>
            )}

            {/* Add To Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`
                cursor-pointer
                absolute bottom-4 left-4 right-4
                rounded-2xl py-3
                flex items-center justify-center gap-2
                translate-y-20 opacity-0
                transition-all duration-500
                group-hover:translate-y-0 group-hover:opacity-100
                ${isOutOfStock 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-black text-white hover:bg-gray-800'
                }
              `}
            >
              <ShoppingCart className="w-5 h-5" />
              {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>

          {/* Content */}
          <div className="p-6 pt-2">
            <span className="text-xs uppercase tracking-[0.2em] text-gray-400">
              {product.category || 'General'}
            </span>

            <h3 className="mt-1 text-md font-semibold text-gray-900 line-clamp-1">
              {product.name || 'Unnamed Product'}
            </h3>

            {product.sku && (
              <p className="mt-1 text-xs text-gray-400">SKU: {product.sku}</p>
            )}

            <div className="mt-2 flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900">
                ${parseFloat(product.price || 0).toFixed(2)}
              </span>
              <span className="text-sm text-gray-400">USD</span>
            </div>

            {/* Stock Info */}
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className={isOutOfStock ? 'text-red-500' : isLowStock ? 'text-yellow-600' : 'text-gray-500'}>
                {isOutOfStock ? 'No stock available' : 
                 isLowStock ? `Only ${product.stock} left!` : 
                 `${product.stock ?? 0} in stock`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== PRODUCT DETAIL MODAL ===== */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" />

          {/* Modal Content */}
          <div 
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 p-2 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-gray-100 transition-all"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>

            {/* Left: Image Gallery */}
            <div className="relative w-full md:w-1/2 bg-gray-50 flex flex-col">
              {/* Main Image */}
              <div className="relative flex-1 min-h-[300px] md:min-h-[500px] flex items-center justify-center p-6">
                <img
                  src={images[currentImageIndex]}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain rounded-2xl"
                  onError={(e) => { e.target.src = '/images/img1.jpeg'; }}
                />

                {/* Image Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-white transition-all"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-white transition-all"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-700" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 text-white text-xs rounded-full">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                )}
              </div>

              {/* Thumbnail Strip */}
              {images.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto bg-white border-t border-gray-100">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        idx === currentImageIndex 
                          ? 'border-black ring-2 ring-black/20' 
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} - ${idx + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = '/images/img1.jpeg'; }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Details */}
            <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto">

              {/* Category & Status */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs uppercase tracking-[0.2em] text-gray-400">
                  {product.category || 'General'}
                </span>
                {product.status && product.status !== 'active' && (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    isOutOfStock ? 'bg-red-100 text-red-800' :
                    isLowStock ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {product.status.replace(/-/g, ' ').toUpperCase()}
                  </span>
                )}
              </div>

              {/* Product Name */}
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {product.name || 'Unnamed Product'}
              </h2>

              {/* SKU */}
              {product.sku && (
                <p className="text-sm text-gray-400 mb-4">SKU: {product.sku}</p>
              )}

              {/* Rating (if available) */}
              {product.rating && (
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) 
                          ? 'text-yellow-400 fill-yellow-400' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-500 ml-1">
                    {product.rating} ({product.reviews_count || 0} reviews)
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  ${parseFloat(product.price || 0).toFixed(2)}
                </span>
                <span className="text-sm text-gray-400">USD</span>
                {product.original_price && product.original_price > product.price && (
                  <span className="text-lg text-gray-400 line-through">
                    ${parseFloat(product.original_price).toFixed(2)}
                  </span>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 my-6" />

              {/* Description */}
              {product.description && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
                    Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Specifications */}
              {(product.material || product.dimensions || product.weight || product.color) && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                    Specifications
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {product.material && (
                      <div className="bg-gray-50 rounded-xl p-3">
                        <span className="text-xs text-gray-400 block">Material</span>
                        <span className="text-sm font-medium text-gray-900">{product.material}</span>
                      </div>
                    )}
                    {product.dimensions && (
                      <div className="bg-gray-50 rounded-xl p-3">
                        <span className="text-xs text-gray-400 block">Dimensions</span>
                        <span className="text-sm font-medium text-gray-900">{product.dimensions}</span>
                      </div>
                    )}
                    {product.weight && (
                      <div className="bg-gray-50 rounded-xl p-3">
                        <span className="text-xs text-gray-400 block">Weight</span>
                        <span className="text-sm font-medium text-gray-900">{product.weight}</span>
                      </div>
                    )}
                    {product.color && (
                      <div className="bg-gray-50 rounded-xl p-3">
                        <span className="text-xs text-gray-400 block">Color</span>
                        <span className="text-sm font-medium text-gray-900">{product.color}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Stock Info */}
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    isOutOfStock ? 'bg-red-500' : isLowStock ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <span className={`text-sm font-medium ${
                    isOutOfStock ? 'text-red-600' : isLowStock ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {isOutOfStock ? 'Out of Stock' : 
                     isLowStock ? `Only ${product.stock} left - Low Stock!` : 
                     `In Stock (${product.stock ?? 0} available)`}
                  </span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`
                  w-full py-4 rounded-2xl font-semibold text-lg
                  flex items-center justify-center gap-3
                  transition-all duration-300
                  ${isOutOfStock 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-black text-white hover:bg-gray-800 hover:shadow-lg active:scale-[0.98]'
                  }
                `}
              >
                <ShoppingCart className="w-5 h-5" />
                {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
              </button>

              {/* Additional Info */}
              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <span className="text-xs text-gray-400 block">Free Shipping</span>
                  <span className="text-xs font-medium text-gray-700">Orders $50+</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <span className="text-xs text-gray-400 block">Returns</span>
                  <span className="text-xs font-medium text-gray-700">30 Days</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <span className="text-xs text-gray-400 block">Support</span>
                  <span className="text-xs font-medium text-gray-700">24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;