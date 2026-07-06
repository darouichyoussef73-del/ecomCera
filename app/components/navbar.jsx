'use client'
import Link from 'next/link'
import React from 'react'
import { useState ,useEffect} from 'react';
const navbar = () => {
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
    
    <header className={`fixed inset-x-0  top-0 left-0 w-full z-50 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`} >
  <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
    <Link href="#" className="flex items-center gap-2 text-cream">
    <div className='flex bg-white/10 backdrop-blur-md border rounded-full border-white/15 px-4 py-2 justify-center items-center gap-4'>
      <div className="w-8 h-8 rounded-full border border-cream/60 flex items-center justify-center font-display text-lg">C</div>
      <span className="font-display text-xl text-black">Cera</span>
    </div>
    </Link>
    <nav  className="hidden md:flex items-center gap-6 rounded-full bg-white/10 backdrop-blur-md border border-white/15 px-4 py-2">
         <Link href="/" className="text-gray-800 hover:text-white transition" >Home</Link>
          <Link href="/pages/products" className="text-gray-800 hover:text-white transition">Products</Link>
          <Link href="/pages/services" className="text-gray-800 hover:text-white transition">Services</Link>
          <Link href="/#about" className="text-gray-800 hover:text-white transition">About Us</Link>
          <Link href="/#contact" className="text-gray-800 hover:text-white transition">Contact</Link>
    </nav>
    <div className='flex gap-5'>
    <Link href="/pages/acountCreation" className="rounded-full bg-cream text-ink font-bold border-gray-500  text-black text-sm bg-white  px-5 py-2.5 hover:bg-black hover:text-white transition">Log In</Link>

    {/* <Link href="/pages/acountCreation/#signupForm" className="rounded-full bg-cream text-ink font-bold  text-white text-sm bg-gray-950   px-5 py-2.5 hover:bg-white hover:text-black transition">Sign Up</Link> */}
    </div>
  </div>
</header>
    </>
  )
}

export default navbar