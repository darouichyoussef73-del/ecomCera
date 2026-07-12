
'use client'

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
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
      <header className={`fixed inset-x-0 top-0 left-0 w-full z-50 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="#" className="flex items-center gap-2 text-cream">
            <div className='flex bg-white/10 backdrop-blur-md border rounded-full border-white/15 px-3 sm:px-4 py-2 justify-center items-center gap-3 sm:gap-4'>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-cream/60 flex items-center justify-center font-display text-base sm:text-lg">C</div>
              <span className="font-display text-lg sm:text-xl text-black">Cera</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 rounded-full bg-white/10 backdrop-blur-md border border-white/15 px-4 py-2">
            <Link href="/" className="text-gray-800 hover:text-white transition">Home</Link>
            <Link href="/pages/products" className="text-gray-800 hover:text-white transition">Products</Link>
            <Link href="/pages/services" className="text-gray-800 hover:text-white transition">Services</Link>
            <Link href="/#about" className="text-gray-800 hover:text-white transition">About Us</Link>
            <Link href="/#contact" className="text-gray-800 hover:text-white transition">Contact</Link>
          </nav>

          {/* Right Side: Login + Hamburger */}
          <div className='flex items-center gap-3 sm:gap-5'>
            <Link 
              href="/pages/acountCreation" 
              className="rounded-full bg-white text-black font-bold text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 hover:bg-black hover:text-white transition border border-gray-200"
            >
              Log In
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden rounded-full bg-white/10 backdrop-blur-md border border-white/15 p-2 hover:bg-white/20 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-gray-800" /> : <Menu className="w-5 h-5 text-gray-800" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown — Glass Style */}
        {mobileMenuOpen && (
          <div className="md:hidden mx-4 mt-2 bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl shadow-lg overflow-hidden">
            <nav className="flex flex-col p-4 gap-1">
              <Link 
                href="/" 
                onClick={handleLinkClick}
                className="text-gray-800 hover:bg-white/10 hover:backdrop-blur-md rounded-xl px-4 py-3 transition font-medium"
              >
                Home
              </Link>
              <Link 
                href="/pages/products" 
                onClick={handleLinkClick}
                className="text-gray-800 hover:bg-white/10 hover:backdrop-blur-md rounded-xl px-4 py-3 transition font-medium"
              >
                Products
              </Link>
              <Link 
                href="/pages/services" 
                onClick={handleLinkClick}
                className="text-gray-800 hover:bg-white/10 hover:backdrop-blur-md rounded-xl px-4 py-3 transition font-medium"
              >
                Services
              </Link>
              <Link 
                href="/#about" 
                onClick={handleLinkClick}
                className="text-gray-800 hover:bg-white/10 hover:backdrop-blur-md rounded-xl px-4 py-3 transition font-medium"
              >
                About Us
              </Link>
              <Link 
                href="/#contact" 
                onClick={handleLinkClick}
                className="text-gray-800 hover:bg-white/10 hover:backdrop-blur-md rounded-xl px-4 py-3 transition font-medium"
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}

export default Navbar