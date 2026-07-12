
'use client';
import React from 'react';
import Link from 'next/link'
import NavbarClient from '../../components/navbarClients'
import ScrollItems from '../../components/scrollItems'
import Footer from '../../components/footer'
import { User } from 'lucide-react'
import { useEffect } from 'react';
import AboutSection from '@/app/components/aboutSection'



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
      
   
      <NavbarClient/>
  
{/* this is the hero section made by khaoula */}
    <section className="hero relative min-h-screen overflow-hidden " id=''>
   
      {/* Background Image */}
      <div className="absolute inset-0">
     
             <video
                src="/videos/hero.mp4"
                poster="/images/hero1.jpeg"
                autoPlay
                muted
                loop
                playsInline
                  className="w-full h-full object-cover rounded-2xl"
                // className="w-full h-48 md:h-64 object-cover rounded-3xl"
              >
                Your browser does not support the video tag.
              </video>
        </div>
    

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 min-h-screen flex items-end pb-16">
        <div className="grid lg:grid-cols-2 gap-12 w-full items-end">
          {/* Left Content */}
          <div className="max-w-2xl mb-10">
            <h1 className="text-5xl md:text-7xl font-bold text-black leading-tight tracking-tight ">
               shape your creativity.
            </h1>

            <p className="mt-6 text-lg md:text-xl text-black/80 max-w-xl">
              A welcoming pottery studio designed to inspire creativity, build skills, and
              craft beautiful, lasting ceramics.
            </p>

          
          </div>

          {/* Right Content */}
          <div className="flex flex-col lg:items-end gap-6">
            {/* Testimonial Card */}
            <div className="max-w-sm rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-6">
             

              <p className="text-black text-lg">
                "Every piece feels like a small work of art crafted with soul and precision."
              </p>

             

             
            </div>
        
          </div>
        </div>
      </div>
    </section>

    <section className="relative gap-5 py-10 items-center   justify-center h-full  overflow-hidden">
     

      <div className='flex flex-wrap gap-5 items-center justify-center '>
     
     < ScrollItems/>

      </div>
        
     
        </section> 
       {/*this is the aboute section made by khaoula */}
       
  <AboutSection/>


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
      <div className='flex justify-center content-center'><div id='box' className="box mt-10 aspect-4/3 rounded-3xl overflow-hidden">
        <img src="/images/img2.jpeg" className="w-full h-full object-cover"/>
      </div></div>
    </div>

    <div className="divide-y divide-ink/10 border-y border-ink/10">
     
      <details className="group py-6">
        <summary className="flex items-center justify-between cursor-pointer list-none">
          <span className="font-display text-xl md:text-2xl text-black pr-6">Do I need prior experience to join a workshop?</span>
          <span className="chev font-display text-2xl text-black">+</span>
        </summary>
        <p className="mt-4 text-black/70">Not at all! Our workshops are designed for all skill levels — from complete beginners to experienced potters. We provide step-by-step guidance tailored to you.</p>
      </details>
      <details className="group py-6">
        <summary className="flex items-center justify-between cursor-pointer list-none">
          <span className="font-display text-xl md:text-2xl text-black pr-6">Can I book private sessions or group events?</span>
          <span className="chev font-display text-2xl text-black">+</span>
        </summary>
        <p className="mt-4 text-black/70">Absolutely! We offer private one-on-one sessions, group workshops, team-building events, and birthday parties. Contact us to customize your experience.</p>
      </details>
      <details className="group py-6">
        <summary className="flex items-center justify-between cursor-pointer list-none">
          <span className="font-display text-xl md:text-2xl text-black pr-6">What is included in a workshop fee?</span>
          <span className="chev font-display text-2xl text-black">+</span>
        </summary>
        <p className="mt-4 text-black/70">All workshop fees include clay, tools, glazing, and two firings. You keep every piece you create. Advanced workshops may include specialty materials.</p>
      </details>
      <details className="group py-6">
        <summary className="flex items-center justify-between cursor-pointer list-none">
          <span className="font-display text-xl md:text-2xl text-black pr-6">How long does it take to finish a piece?</span>
          <span className="chev font-display text-2xl text-black">+</span>
        </summary>
        <p className="mt-4 text-black/70">A single session is usually enough to shape your piece. Drying, bisque firing, glazing, and glaze firing take about 2–3 weeks total. We notify you when it's ready for pickup.</p>
      </details>
    </div>
  </div>
          </section>
  
    <Footer/>
    </>
  )
}

export default page