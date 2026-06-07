import React from 'react'
import Navbar from '../../components/navbar'
import Card from '../../components/product'
import Footer from '../../components/footer'
import Link from 'next/link'
const page = () => {
  return (
    <>
    <Navbar/>
   <section className="hero relative min-h-screen overflow-hidden " id=''>
   
      {/* Background Image */}
      <div className="absolute inset-0">
       
      
        </div>
    

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 min-h-screen flex items-end pb-16">
        <div className="grid lg:grid-cols-2 gap-12 w-full items-end">
          {/* Left Content */}
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold text-black leading-tight tracking-tight">
              A calmer way to care for your smile.
            </h1>

            <p className="mt-6 text-lg md:text-xl text-black/80 max-w-xl">
              Gentle dentistry designed to remove fear, build trust, and
              deliver confident, lasting results.
            </p>

           
          </div>

          {/* Right Content */}
          <div className="flex flex-col lg:items-end gap-6">
            {/* Testimonial Card */}
            <div className="max-w-sm rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-6">
             

              <p className="text-black text-lg">
                “It felt more like a wellness visit than a dental appointment.”
              </p>

              <p className="mt-3 text-black/70">— Sarah M.</p>

             
            </div>

            {/* Video Card */}
                   </div>
        </div>
      </div>
    </section>
          <section className="relative gap-5 py-10 items-center   justify-center h-full  overflow-hidden">
      <div className='flex flex-wrap items-center justify-center my-30 text-black gap-10'>
   
{/* <select className="w-45 px-4 py-3 border  border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
  <option>Select a category</option>
  <option>Electronics</option>
  <option>Fashion</option>
  <option>Sports</option>
</select> */}

<select className="w-45  px-4 py-3  focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-3xl">
  <option>Select a category</option>
  <option>Electronics</option>
  <option>Fashion</option>
  <option>Sports</option>
</select>
<select className="w-45  px-4 py-3  focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-3xl">
  <option>Select a category</option>
  <option>Electronics</option>
  <option>Fashion</option>
  <option>Sports</option>
</select>
<select className="w-45  px-4 py-3  focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-3xl">
  <option>Select a category</option>
  <option>Electronics</option>
  <option>Fashion</option>
  <option>Sports</option>
</select>
<select className="w-45  px-4 py-3  focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-3xl">
  <option>Select a category</option>
  <option>Electronics</option>
  <option>Fashion</option>
  <option>Sports</option>
</select>


      </div>

      <div className='flex flex-wrap gap-5 items-center justify-center '>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
      </div>
        
     
        </section>

        <Footer/>
    </>
  )
}

export default page
