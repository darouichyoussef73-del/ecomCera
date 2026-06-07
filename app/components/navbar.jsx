import Link from 'next/link'
import React from 'react'

const navbar = () => {
  return (
    <>
       {/* <header className="fixed top-0 left-0 w-full z-50 bg-white/5 backdrop-blur-xl border-b border-white/10 ">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between"> */}

        {/* Logo */}
      {/*  <div href="/" className="flex items-center gap-2">
           <img
            src=""
            alt="logo"
            className="h-8 w-auto"
          /> 
        </div>*/}

        {/* Desktop Nav */}
        {/* <nav className="hidden md:flex items-center gap-8 text-md  text-black/70">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="/pages/products" className="hover:text-white transition">Products</Link>
          <Link href="/services" className="hover:text-white transition">Services</Link>
          <Link href="/about" className="hover:text-white transition">About Us</Link>
          <a href="#contact" className="hover:text-white transition">Contact</a>
          
        </nav> */}
        
        {/* Desktop Button */}
        {/* <div className='flex gap-2'>
             <Link
            href="/pages/login"
            className="hidden md:flex items-center gap-0 px-5 py-2 rounded-xl bg-white text-black text-sm font-medium hover:opacity-80 transition"
            >
            Sign In
            </Link>
        <Link
          href="/pages/signup"
          className="hidden md:flex items-center gap-0  px-5 py-2 rounded-xl bg-black text-white text-sm font-medium hover:opacity-80 transition"
        >
          Sign Up
        </Link>
        </div> */}
           

        {/* Mobile Button */}
        {/* <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1"
        >
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
        </button> 
      </div>*/}

      {/* Mobile Menu */}
      {/* {open && (
        <div className="md:hidden bg-[#0b1220]/95 backdrop-blur-xl border-t border-white/10 px-6 py-6 space-y-4 text-white/80">
          <a href="#Home" className="block hover:text-white">Home</a>
          <a href="#About" className="block hover:text-white">About Us</a>
          <a href="#Services" className="block hover:text-white">Services</a>
          <a href="#Contact" className="block hover:text-white">Contact</a>
          <a href="#Pricing" className="block hover:text-white">Pricing</a>

          <a
            href="#Contact"
            className="mt-4 inline-block px-5 py-2 rounded-xl bg-white text-black text-sm font-medium"
          >
            Book Appointment
          </a>
        </div>
      )} */}
    {/* </header> */}
    <header className="fixed top-0 inset-x-0 z-50">
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
    <Link href="/pages/login" className="rounded-full bg-cream text-ink font-bold border-gray-500  text-black text-sm bg-white  px-5 py-2.5 hover:bg-black hover:text-white transition">Sign In</Link>

    <Link href="/pages/signin" className="rounded-full bg-cream text-ink font-bold  text-white text-sm bg-gray-950   px-5 py-2.5 hover:bg-white hover:text-black transition">Sign In</Link>
    </div>
  </div>
</header>
    </>
  )
}

export default navbar