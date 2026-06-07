'use client'
import Link from 'next/link'
import React from 'react'
import Image from "next/image";
import { useEffect } from 'react';

// import Footer from '@/components/footer'
import Navbar from './components/navbar'
import Footer from './components/footer'
import ScrollItems from './components/scrollItems';
import Card from './components/product'
const page = () => {
   useEffect(() => {
  const boxes = document.querySelectorAll(".box");

  const handleScroll = () => {
    boxes.forEach((box) => {
      const rect = box.getBoundingClientRect();

      if (rect.top < window.innerHeight * 0.7) {
        box.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
  return (
    < >
      
   
      <Navbar/>
  
{/* this is the hero section made by khaoula */}
    <section className="hero relative min-h-screen overflow-hidden " id=''>
   
      {/* Background Image */}
      <div className="absolute inset-0">
       <img
        src="image source"
        className="img-fluid rounded-top"
        alt=""
       />
             
        </div>
    

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 min-h-screen flex items-end pb-16">
        <div className="grid lg:grid-cols-2 gap-12 w-full items-end">
          {/* Left Content */}
          <div className="max-w-2xl mb-10">
            <h1 className="text-5xl md:text-7xl font-bold text-black leading-tight tracking-tight ">
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
     

      <div className='flex flex-wrap gap-5 items-center justify-center '>
      <ScrollItems/> 
      

      </div>
        
     
        </section> 
       {/*this is the aboute section made by khaoula */}
       <section id="about" className="py-24 md:py-32 px-6 ">
  <div className="mx-auto max-w-7xl">
    <div className="flex items-center gap-4 text-black text-sm uppercase tracking-[0.25em] mb-6">
      <span className="font-display text-2xl ">About us</span>
     
    </div>
    <div className="grid md:grid-cols-2 gap-12 items-end">
      <p className="text-black text-lg max-w-md">
        Let's create a space that's not just beautiful — but beautifully yours.
      </p>
      <h2 className="font-display text-4xl md:text-6xl leading-[1.05] ">
        Design with purpose.<br/><em className="not-italic text-black">style with heart.</em>
      </h2>
    </div>
    <p className="mt-10 max-w-2xl text-black/80">
      At Luzen, we believe that great design goes beyond aesthetics — it should tell your story, support your lifestyle, and inspire daily living.
    </p>
   
    <div className="   mt-16 grid md:grid-cols-2 gap-8  ">
      <figure className="group ">
        <div className='flex justify-center items-center'>
        <div id='box' className=" box aspect-[4/5] overflow-hidden rounded-3xl bg-sand">
          <img src="/images/img2.jpeg" alt="" loading='lazy' className="w-full h-full object-cover group-hover:scale-105 transition duration-700"/>
        </div>
        </div>
        <figcaption className="mt-4 flex justify-between text-sm text-black uppercase tracking-widest">
          <span>Luzen's 001</span><span>—</span>
        </figcaption>
      </figure>
      <figure className="group md:mt-24">
          <div className='flex justify-center items-center'>
        <div id='box' className=" box aspect-[4/5] overflow-hidden rounded-3xl bg-sand">
          <img src="/images/img1.jpeg" alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-700"/>
        </div>
        </div>
        <figcaption className="mt-4 flex justify-between text-sm text-black uppercase tracking-widest">
          <span>Luzen's 002</span><span>—</span>
        </figcaption>
      </figure>
    </div>  
  </div>
</section>
       {/*this is the services section made by youssef */}
    <section id="events" className="py-24 md:py-32 px-6 bg-sand">
  <div className="mx-auto max-w-7xl">
    <div className="flex items-center gap-4 text-black text-sm uppercase tracking-[0.25em] mb-6">
      <span className="font-display text-2xl ">04</span>
      <span>Services</span>
    </div>
    <h2 className="font-display text-4xl md:text-6xl max-w-3xl leading-[1.05] ">
      Discover our recent events and achievements.
    </h2>
    <p className="mt-6 text-black/70 max-w-xl">
      Stay updated on milestones and activities. Recent events show our dedication to growth and creativity.
    </p>

    <div className="mt-16 grid md:grid-cols-3 gap-6">
      <div className='flex justify-center '>
      <div id='box' className="box md:row-span-2 aspect-[3/4] md:aspect-auto rounded-3xl overflow-hidden">
        <img src="https://cdn.prod.website-files.com/68de9f894df3c35c556330f6/68e5405301886a216066c589_event-main-img.avif" className="w-full h-full object-cover"/>
      </div>
      </div>
      <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
        <article id='box' className="  bg-black rounded-3xl overflow-hidden">
          <div className='flex justify-center items-center'>
          <img src="https://cdn.prod.website-files.com/68de9f894df3c35c556330f6/68e547017e3a4ee99da4637a_event-01.avif" className="w-full aspect-[4/3] object-cover"/>
          </div>
          <div className="p-6">
            <div className="text-black text-xs uppercase tracking-widest">01 · Sep 15, 2024</div>
            <h3 className="font-display text-xl  mt-2">Present new objectives and new talents.</h3>
          </div>
        </article>
        
        <article id='box' className=" bg-black rounded-3xl overflow-hidden">
             <div className='flex justify-center items-center'>
          <img src="https://cdn.prod.website-files.com/68de9f894df3c35c556330f6/68e54701363b6dc9e71939b7_event-02.avif" className="w-full aspect-[4/3] object-cover"/>
          </div>
          <div className="p-6">
            <div className="text-black text-xs uppercase tracking-widest">02 · Sep 15, 2024</div>
            <h3 className="font-display text-xl  mt-2">Present new objectives and new talents.</h3>
          </div>
        </article>
        <div className="sm:col-span-2 rounded-3xl bg-ink text-black p-8 md:p-10 flex items-center justify-between gap-6">
          <div>
            <div className="font-display text-3xl md:text-4xl leading-tight">Your idea · our expertise</div>
            <p className="text-black/60 mt-2 text-sm">Expert guidance and solutions for every project stage.</p>
          </div>
          <div className="mt-10">
              <Link
                href="/pages/services"
                className="inline-flex items-center rounded-full bg-white px-8 py-4 text-black font-medium transition hover:bg-gray-200"
              >
                Explore services
              </Link>
            </div>
        </div>
      </div>
    </div>
  </div>
</section>

        

        <section className="relative flex  flex-wrap h-full overflow-hidden gap-15 py-20 items-center justify-center">
        <div className='h-140 w-1/2 min-w-100 pb-10 '  >
       <div className="space-y-10">
        <div className="border-b border-black/15 pb-8">
          <div className="font-display text-black text-6xl">250<span className="text-black">+</span></div>
          <p className="text-black/60 mt-2 max-w-sm">We're proud to have the trust of 250 clients.</p>
        </div>
        <div className="border-b border-black/15 pb-8">
          <div className="font-display text-black  text-6xl">90<span className="text-black">+</span></div>
          <p className="text-black/60 mt-2 max-w-sm">We have completed over 90 projects in various sectors.</p>
        </div>
        <div className="border-b border-black/15 pb-8">
          <div className="font-display text-black  text-6xl">500<span className="text-black">+</span></div>
          <p className="text-black/60 mt-2 max-w-sm">100 architects and engineers focused on quality.</p>
        </div>
        <div>
          <div className="font-display text-black  text-6xl">$5.5<span className="text-black">M</span></div>
          <p className="text-black/60 mt-2 max-w-sm">We manage projects over $3M, showcasing our skill in design.</p>
        </div>
      </div>
        
        </div>
        <div className='relative h-140 w-1/3  min-w-100  bg-gray-700 rounded-3xl mt-5' >
            <img src="/images/img1.jpeg" alt="" className="w-full h-full object-cover rounded-2xl  group-hover:scale-105 transition duration-700"/>
      
        </div>
       
        
          
          </section>
          <section id="faq" className="py-24 md:py-32 px-6 ">
  <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-16 items-start">
    <div className="md:sticky md:top-28">
      <div className="flex items-center gap-4 text-black text-sm uppercase tracking-[0.25em] mb-6">
        <span className="font-display text-2xl text-black">05</span>
        <span>— FAQs</span>
      </div>
      <h2 className="font-display text-4xl md:text-5xl text-black leading-[1.05]">
        Answers to your frequently asked questions.
      </h2>
      <div className='flex justify-center content-center'><div id='box' className="box mt-10 aspect-[4/3] rounded-3xl overflow-hidden">
        <img src="/images/img2.jpeg" className="w-full h-full object-cover"/>
      </div></div>
    </div>

    <div className="divide-y divide-ink/10 border-y border-ink/10">
     
      <details className="group py-6">
        <summary className="flex items-center justify-between cursor-pointer list-none">
          <span className="font-display text-xl md:text-2xl text-black pr-6">Do you work with specific contractors or suppliers?</span>
          <span className="chev font-display text-2xl text-black">+</span>
        </summary>
        <p className="mt-4 text-black/70">We offer a comprehensive range of services designed to meet your specific needs — architectural design, interior design, project management, and consultation.</p>
      </details>
      <details className="group py-6">
        <summary className="flex items-center justify-between cursor-pointer list-none">
          <span className="font-display text-xl md:text-2xl text-black pr-6">Do you carry out remote projects?</span>
          <span className="chev font-display text-2xl text-black">+</span>
        </summary>
        <p className="mt-4 text-black/70">Yes — we collaborate with clients worldwide using detailed digital workflows, 3D previews, and on-site partners when needed.</p>
      </details>
      <details className="group py-6">
        <summary className="flex items-center justify-between cursor-pointer list-none">
          <span className="font-display text-xl md:text-2xl text-black pr-6">What is the payment process?</span>
          <span className="chev font-display text-2xl text-black">+</span>
        </summary>
        <p className="mt-4 text-black/70">Payments are structured around defined milestones, with a clear contract outlining scope, deliverables, and timelines from day one.</p>
      </details>
      <details className="group py-6">
        <summary className="flex items-center justify-between cursor-pointer list-none">
          <span className="font-display text-xl md:text-2xl text-black pr-6">Do I need to hire an architect for my project?</span>
          <span className="chev font-display text-2xl text-black">+</span>
        </summary>
        <p className="mt-4 text-black/70">It depends on the scope. We help you evaluate whether your project benefits from full architectural services or focused interior consulting.</p>
      </details>
    </div>
  </div>
          </section>
  
    <Footer/>
    </>
  )
}

export default page
