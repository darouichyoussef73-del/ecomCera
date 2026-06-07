import React from 'react'
import Navbar from '../../components/navbar'
import Footer from '@/app/components/footer'
import Link from 'next/link'
const page = () => {
  return (
    <>
    <Navbar/>
     <section className="hero relative min-h-screen  " id=''>
   
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

            <div className="mt-10">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full bg-white px-8 py-4 text-black font-medium transition hover:bg-gray-200"
              >
                Schedule a Visit
              </Link>
            </div>
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

    <section>
      <h1 className='font-bold text-5xl text-center text-black pt-15'>Our Services </h1>
    <div className='w-full h-screen flex  flex-wrap justify-center items-center gap-10  '>
      <div className='w-1/4 min-w-100   h-3/5 bg-gray-600 rounded-2xl '>

      </div>
      <div className='w-1/4 min-w-100 h-3/5 bg-gray-600 rounded-2xl'>

      </div>
      <div className='w-1/4 min-w-100 h-3/5 bg-gray-600 rounded-2xl'>

      </div>
      
     
    </div>
    </section>
    <Footer/>
    </>
  )
}

export default page