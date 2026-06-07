import React from 'react'

const product = () => {
  return (
    <>
      <div className="group cursor-pointer  w-full max-w-80">
  <div className="bg-white rounded-3xl overflow-hidden border h-90 border-gray-100 transition-all duration-500 hover:shadow-2xl">

    {/* Image Area */}
    <div className="relative overflow-hidden  aspect-[5/4] bg-gray-50">

      {/* Main Image */}
      <img
        src="/images/img1.jpeg"
        // alt="Anti-aging Eye Cream"
        className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105
         
         "
      />

      {/* Hover Image */}
      {/* <img
        src="/product/eye-cream-2.jpg"
        alt="Anti-aging Eye Cream"
        className="absolute inset-0 w-full h-full object-cover opacity-0 scale-105 transition-all duration-700 group-hover:opacity-100 group-hover:scale-100"
      /> */}

      {/* Badge */}
      <div className="absolute top-4 left-4 z-10">
       
      </div>

      {/* Add To Cart */}
      <button
        className="
          absolute
          bottom-4
          left-4
          right-4
          bg-black
          text-white
          rounded-2xl
          py-3
          flex
          items-center
          justify-center
          gap-2
          translate-y-20
          opacity-0
          transition-all
          duration-500
          group-hover:translate-y-0
          group-hover:opacity-100
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6h13M10 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
          />
        </svg>

        Add to Cart
      </button>
    </div>

    {/* Content */}
    <div className="p-6 pt-2">

      {/* Category */}
      <span className="text-xs uppercase tracking-[0.2em] text-gray-400">
        Eye Care
      </span>

      {/* Product Name */}
      <h3 className="mt-1 text-md font-semibold text-gray-900">
        Anti-Aging Eye Cream
      </h3>

      {/* Price */}
      <div className="mt-1 flex items-center justify-between">

        <span className="text-2xl font-bold text-gray-900">
          $30
        </span>

        <span className="text-sm text-gray-400">
          USD
        </span>

      </div>

    </div>
  </div>
</div>
    </>
  )
}

export default product