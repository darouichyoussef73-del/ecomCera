// // 'use client'
// // import React from 'react'
// // import Link from 'next/link'
// // import { User } from 'lucide-react'
// // import { useState ,useEffect } from 'react'
// // const navbarClients = () => {
// //    const [showNavbar, setShowNavbar] = useState(true);
// //     const [lastScrollY, setLastScrollY] = useState(0);
  
// //     useEffect(() => {
// //       const handleScroll = () => {
// //         const currentScrollY = window.scrollY;
  
// //         if (currentScrollY > lastScrollY && currentScrollY > 80) {
// //           // Scrolling Down
// //           setShowNavbar(false);
// //         } else {
// //           // Scrolling Up
// //           setShowNavbar(true);
// //         }
  
// //         setLastScrollY(currentScrollY);
// //       };
  
// //       window.addEventListener("scroll", handleScroll);
  
// //       return () => {
// //         window.removeEventListener("scroll", handleScroll);
// //       };
// //     }, [lastScrollY]);
// //   return (
// //     <>
    
// //     <header  className={`fixed inset-x-0 mt-4 top-0 left-0 w-full z-50 transition-transform duration-300 ${
// //         showNavbar ? "translate-y-0" : "-translate-y-full"
// //       }`}>
// //   <div className="mx-auto max-w-7xl px-6 bg-white/10 backdrop-blur-md border rounded-full border-white/15 py-5 flex items-center justify-between">
// //     <Link href="/clients/home" className="flex items-center gap-2 text-cream">
// //       <div className='flex bg-white/10 backdrop-blur-md border rounded-full border-white/15 px-4 py-2 justify-center items-center gap-4'>
// //       <div className="w-8 h-8 rounded-full border border-cream/60 flex items-center justify-center font-display text-lg">C</div>
// //       <span className="font-display text-xl text-black">Cera</span></div>
// //     </Link>
// //     <nav  className="hidden md:flex items-center font-semibold gap-6 rounded-full bg-white/10  backdrop-blur-md border border-white/15 px-4 py-2">

// //          <Link href="/clients/home" className="text-gray-800 hover:text-black/15 transition" >Home</Link>
// //          <Link href="/clients/products" className="text-gray-800 hover:text-black/15 transition" >Products</Link>
// //           <Link href="/clients/services" className="text-gray-800 hover:text-black/15 transition">Services</Link>
// //           <Link href="/clients/shop" className="text-gray-800 hover:text-black/15 transition">Shopping Cart</Link>
// //           <Link href="/clients/orders" className="text-gray-800 hover:text-black/15 transition">Orders</Link>
// //     </nav>
// //     <div className='flex gap-5'>
// //     <Link href="/clients/profile" className="rounded-full bg-cream text-ink font-bold  text-black text-sm bg-blue-50  px-3 py-2.5 hover:bg-black hover:text-white transition" ><User/></Link>
      
// //  </div>
// //   </div>
// // </header>
// //     </>
// //   )
// // }

// // export default navbarClients
// 'use client'
// import React from 'react'
// import Link from 'next/link'
// import { User, Menu, X } from 'lucide-react'
// import { useState, useEffect } from 'react'

// const NavbarClients = () => {
//   const [showNavbar, setShowNavbar] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;

//       if (currentScrollY > lastScrollY && currentScrollY > 80) {
//         // Scrolling Down
//         setShowNavbar(false);
//       } else {
//         // Scrolling Up
//         setShowNavbar(true);
//       }

//       setLastScrollY(currentScrollY);
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [lastScrollY]);

//   // Close mobile menu when clicking a link
//   const handleLinkClick = () => {
//     setMobileMenuOpen(false);
//   };

//   return (
//     <>
//       <header className={`fixed inset-x-0 mt-4 top-0 left-0 w-full z-50 transition-transform duration-300 ${
//         showNavbar ? "translate-y-0" : "-translate-y-full"
//       }`}>
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 bg-white/10 backdrop-blur-md border rounded-full border-white/15 py-4 sm:py-5 flex items-center justify-between">
          
//           {/* Logo */}
//           <Link href="/clients/home" className="flex items-center gap-2 text-cream">
//             <div className='flex bg-white/10 backdrop-blur-md border rounded-full border-white/15 px-3 sm:px-4 py-2 justify-center items-center gap-3 sm:gap-4'>
//               <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-cream/60 flex items-center justify-center font-display text-base sm:text-lg">C</div>
//               <span className="font-display text-lg sm:text-xl text-black">Cera</span>
//             </div>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center font-semibold gap-6 rounded-full bg-white/10 backdrop-blur-md border border-white/15 px-4 py-2">
//             <Link href="/clients/home" className="text-gray-800 hover:text-black/15 transition">Home</Link>
//             <Link href="/clients/products" className="text-gray-800 hover:text-black/15 transition">Products</Link>
//             <Link href="/clients/services" className="text-gray-800 hover:text-black/15 transition">Services</Link>
//             <Link href="/clients/shop" className="text-gray-800 hover:text-black/15 transition">Shopping Cart</Link>
//             <Link href="/clients/orders" className="text-gray-800 hover:text-black/15 transition">Orders</Link>
//           </nav>

//           {/* Right Side: Profile + Hamburger */}
//           <div className='flex items-center gap-3 sm:gap-5'>
//             <Link href="/clients/profile" className="rounded-full bg-blue-50 text-black text-sm px-2.5 sm:px-3 py-2 sm:py-2.5 hover:bg-black hover:text-white transition">
//               <User className="w-4 h-4 sm:w-5 sm:h-5" />
//             </Link>
            
//             {/* Mobile Menu Toggle */}
//             <button 
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="md:hidden rounded-full bg-white/10 backdrop-blur-md border border-white/15 p-2 hover:bg-black/5 transition"
//               aria-label="Toggle menu"
//             >
//               {mobileMenuOpen ? <X className="w-5 h-5 text-gray-800" /> : <Menu className="w-5 h-5 text-gray-800" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu Dropdown */}
//         {mobileMenuOpen && (
//           <div className="md:hidden mx-4 mt-2 bg-white/95 backdrop-blur-xl border border-white/20 rounded-3xl shadow-lg overflow-hidden">
//             <nav className="flex flex-col p-4 gap-1">
//               <Link 
//                 href="/clients/home" 
//                 onClick={handleLinkClick}
//                 className="text-gray-800 hover:bg-black/5 rounded-xl px-4 py-3 transition font-medium"
//               >
//                 Home
//               </Link>
//               <Link 
//                 href="/clients/products" 
//                 onClick={handleLinkClick}
//                 className="text-gray-800 hover:bg-black/5 rounded-xl px-4 py-3 transition font-medium"
//               >
//                 Products
//               </Link>
//               <Link 
//                 href="/clients/services" 
//                 onClick={handleLinkClick}
//                 className="text-gray-800 hover:bg-black/5 rounded-xl px-4 py-3 transition font-medium"
//               >
//                 Services
//               </Link>
//               <Link 
//                 href="/clients/shop" 
//                 onClick={handleLinkClick}
//                 className="text-gray-800 hover:bg-black/5 rounded-xl px-4 py-3 transition font-medium"
//               >
//                 Shopping Cart
//               </Link>
//               <Link 
//                 href="/clients/orders" 
//                 onClick={handleLinkClick}
//                 className="text-gray-800 hover:bg-black/5 rounded-xl px-4 py-3 transition font-medium"
//               >
//                 Orders
//               </Link>
//             </nav>
//           </div>
//         )}
//       </header>
//     </>
//   )
// }

// export default NavbarClients
'use client'
import React from 'react'
import Link from 'next/link'
import { User,LogOut, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

const NavbarClients = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`fixed inset-x-0 mt-4 top-0 left-0 w-full z-50 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 bg-white/10 backdrop-blur-md border rounded-full border-white/15 py-4 sm:py-5 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/clients/home" className="flex items-center gap-2 text-cream">
            <div className='flex bg-white/10 backdrop-blur-md border rounded-full border-white/15 px-3 sm:px-4 py-2 justify-center items-center gap-3 sm:gap-4'>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-cream/60 flex items-center justify-center font-display text-base sm:text-lg">C</div>
              <span className="font-display text-lg sm:text-xl text-black">Cera</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center font-semibold gap-6 rounded-full bg-white/10 backdrop-blur-md border border-white/15 px-4 py-2">
            <Link href="/clients/home" className="text-gray-800 hover:text-black/15 transition">Home</Link>
            <Link href="/clients/products" className="text-gray-800 hover:text-black/15 transition">Products</Link>
            <Link href="/clients/services" className="text-gray-800 hover:text-black/15 transition">Services</Link>
            <Link href="/clients/shop" className="text-gray-800 hover:text-black/15 transition">Shopping Cart</Link>
            <Link href="/clients/orders" className="text-gray-800 hover:text-black/15 transition">Orders</Link>
          </nav>

          {/* Right Side */}
          <div className='flex items-center gap-3 sm:gap-5'>
            <Link href="/clients/profile" className="rounded-full bg-blue-50 text-black text-sm px-2.5 sm:px-3 py-2 sm:py-2.5 hover:bg-red-700 hover:text-white transition">
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
            
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden rounded-full bg-white/10 cursor-pointer backdrop-blur-md border border-white/15 p-2 hover:bg-white/20 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-gray-800 " /> : <Menu className="w-5 h-5 text-gray-800" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown — Same Glass Style */}
        {mobileMenuOpen && (
          <div className="md:hidden mx-4 mt-2 bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl shadow-lg overflow-hidden">
            <nav className="flex flex-col p-4 gap-1">
              <Link 
                href="/clients/home" 
                onClick={handleLinkClick}
                className="text-gray-800 hover:bg-white/10 hover:backdrop-blur-md rounded-xl px-4 py-3 transition font-medium"
              >
                Home
              </Link>
              <Link 
                href="/clients/products" 
                onClick={handleLinkClick}
                className="text-gray-800 hover:bg-white/10 hover:backdrop-blur-md rounded-xl px-4 py-3 transition font-medium"
              >
                Products
              </Link>
              <Link 
                href="/clients/services" 
                onClick={handleLinkClick}
                className="text-gray-800 hover:bg-white/10 hover:backdrop-blur-md rounded-xl px-4 py-3 transition font-medium"
              >
                Services
              </Link>
              <Link 
                href="/clients/shop" 
                onClick={handleLinkClick}
                className="text-gray-800 hover:bg-white/10 hover:backdrop-blur-md rounded-xl px-4 py-3 transition font-medium"
              >
                Shopping Cart
              </Link>
              <Link 
                href="/clients/orders" 
                onClick={handleLinkClick}
                className="text-gray-800 hover:bg-white/10 hover:backdrop-blur-md rounded-xl px-4 py-3 transition font-medium"
              >
                Orders
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}

export default NavbarClients