'use client'
import React from 'react'
import Link from 'next/link'
import { User } from 'lucide-react'
import { useState ,useEffect } from 'react'
const navbarClients = () => {
   const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
  
    useEffect(() => {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
  
        if (currentScrollY > lastScrollY && currentScrollY > 80) {
          // Scrolling Down
          setShowNavbar(false);
        } else {
          // Scrolling Up
          setShowNavbar(true);
        }
  
        setLastScrollY(currentScrollY);
      };
  
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [lastScrollY]);
  return (
    <>
    
    <header  className={`fixed inset-x-0 mt-4 top-0 left-0 w-full z-50 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}>
  <div className="mx-auto max-w-7xl px-6 bg-white/10 backdrop-blur-md border rounded-full border-white/15 py-5 flex items-center justify-between">
    <Link href="/clients/home" className="flex items-center gap-2 text-cream">
      <div className='flex bg-white/10 backdrop-blur-md border rounded-full border-white/15 px-4 py-2 justify-center items-center gap-4'>
      <div className="w-8 h-8 rounded-full border border-cream/60 flex items-center justify-center font-display text-lg">C</div>
      <span className="font-display text-xl text-black">Cera</span></div>
    </Link>
    <nav  className="hidden md:flex items-center font-semibold gap-6 rounded-full bg-white/10  backdrop-blur-md border border-white/15 px-4 py-2">

         <Link href="/clients/home" className="text-gray-800 hover:text-black/15 transition" >Home</Link>
         <Link href="/clients/products" className="text-gray-800 hover:text-black/15 transition" >Products</Link>
          <Link href="/clients/services" className="text-gray-800 hover:text-black/15 transition">Services</Link>
          <Link href="/clients/shop" className="text-gray-800 hover:text-black/15 transition">Shopping Cart</Link>
          <Link href="/clients/orders" className="text-gray-800 hover:text-black/15 transition">Orders</Link>
    </nav>
    <div className='flex gap-5'>
    <Link href="/clients/profile" className="rounded-full bg-cream text-ink font-bold  text-black text-sm bg-blue-50  px-3 py-2.5 hover:bg-black hover:text-white transition" ><User/></Link>
      
 </div>
  </div>
</header>
    </>
  )
}

export default navbarClients