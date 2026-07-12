

'use client'
import Link from 'next/link'
import React from 'react'
import { useEffect } from 'react';
import AboutSection from './components/aboutSection'

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
    <>
      <Navbar/>

{/* HERO SECTION */}
<section className="hero relative min-h-screen overflow-hidden">

  <div className="absolute inset-0">
    <video
      src="/videos/hero.mp4"
      poster="/images/hero1.jpeg"
      autoPlay
      muted
      loop
      playsInline
      className="w-full h-full object-cover rounded-2xl"
    />
  </div>

  <div className="relative z-10 container mx-auto px-6 lg:px-12 min-h-screen flex items-end pb-16">
    <div className="grid lg:grid-cols-2 gap-12 w-full items-end">

      <div className="max-w-2xl mb-10">
        <h1 className="text-7xl md:text-9xl font-bold text-black leading-tight tracking-tight">
        
        Cera
        </h1>
        <h1 className="text-2xl md:text-5xl font-bold text-black leading-tight tracking-tight">
        Where clay becomes memory
        </h1>

        <p className="mt-6 text-lg md:text-xl text-black/80 max-w-xl">
          Discover unique pottery pieces shaped by earth, fire, and creativity.
          Each design brings warmth, elegance, and authenticity to your space.
        </p>
      </div>

      <div className="flex flex-col lg:items-end gap-6">

        <div className="max-w-sm rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-6">
          <p className="text-black text-lg">
            “Every piece feels like a small work of art crafted with soul and precision.”
          </p>

        </div>

      </div>
    </div>
  </div>
</section>

{/* SCROLL ITEMS */}
<section className="relative gap-5 py-10 items-center justify-center h-full overflow-hidden">
  <div className='flex flex-wrap gap-5 items-center justify-center'>
    <ScrollItems/>
  </div>
</section>

{/* ABOUT */}
<AboutSection/>

{/* SERVICES / EVENTS SECTION */}
{/* <section id="events" className="py-24 md:py-32 px-6 bg-sand">
  <div className="mx-auto max-w-7xl">

    <div className="flex items-center gap-4 text-black text-sm uppercase tracking-[0.25em] mb-6">
      <span className="font-display text-2xl">04</span>
      <span>Collections</span>
    </div>

    <h2 className="font-display text-4xl md:text-6xl max-w-3xl leading-[1.05]">
      Explore our handcrafted ceramic creations and artistic pottery designs.
    </h2>

    <p className="mt-6 text-black/70 max-w-xl">
      Each collection reflects craftsmanship, tradition, and modern creativity
      shaped into timeless ceramic pieces.
    </p>

    <div className="mt-16 grid md:grid-cols-3 gap-6">

      <div className='flex justify-center'>
        <div id='box' className="box md:row-span-2 aspect-3/4 md:aspect-auto rounded-3xl overflow-hidden">
          <img src="https://cdn.prod.website-files.com/68de9f894df3c35c556330f6/68e5405301886a216066c589_event-main-img.avif" className="w-full h-full object-cover"/>
        </div>
      </div>

      <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">

        <article id='box' className="bg-black rounded-3xl overflow-hidden">
          <img src="https://cdn.prod.website-files.com/68de9f894df3c35c556330f6/68e547017e3a4ee99da4637a_event-01.avif" className="w-full aspect-4/3 object-cover"/>
          <div className="p-6">
            <div className="text-black text-xs uppercase tracking-widest">Ceramic Series · 2025</div>
            <h3 className="font-display text-xl mt-2">Minimal handcrafted pottery collection.</h3>
          </div>
        </article>

        <article id='box' className="bg-black rounded-3xl overflow-hidden">
          <img src="https://cdn.prod.website-files.com/68de9f894df3c35c556330f6/68e54701363b6dc9e71939b7_event-02.avif" className="w-full aspect-4/3 object-cover"/>
          <div className="p-6">
            <div className="text-black text-xs uppercase tracking-widest">Studio Edition · 2025</div>
            <h3 className="font-display text-xl mt-2">Decorative ceramic art for modern spaces.</h3>
          </div>
        </article>

        <div className="sm:col-span-2 rounded-3xl bg-ink text-black p-8 md:p-10 flex items-center justify-between gap-6">
          <div>
            <div className="font-display text-3xl md:text-4xl leading-tight">
              Your idea · our ceramic craft
            </div>
            <p className="text-black/60 mt-2 text-sm">
              Custom pottery and artistic ceramic design made for your vision.
            </p>
          </div>

          <div className="mt-10">
            <Link
              href="/pages/services"
              className="inline-flex items-center rounded-full bg-white px-8 py-4 text-black font-medium transition hover:bg-gray-200"
            >
              Explore collection
            </Link>
          </div>
        </div>

      </div>
    </div>
  </div>
</section> */}

{/* FAQ SECTION */}
<section id="faq" className="py-24 md:py-32 px-6">
  <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-16 items-start">

    <div className="md:sticky md:top-28">

      <div className="flex items-center gap-4 text-black text-sm uppercase tracking-[0.25em] mb-6">
        <span className="font-display text-2xl text-black">05</span>
        <span>— FAQs</span>
      </div>

      <h2 className="font-display text-4xl md:text-5xl text-black leading-[1.05]">
        Everything you need to know about our ceramic studio.
      </h2>

      <div className='flex justify-center content-center'>
        <div id='box' className="box mt-10 aspect-[4/3] rounded-3xl overflow-hidden">
          <img src="/images/img2.jpeg" className="w-full h-full object-cover"/>
        </div>
      </div>
    </div>

    <div className="divide-y divide-ink/10 border-y border-ink/10">

      <details className="group py-6">
        <summary className="flex items-center justify-between cursor-pointer list-none">
          <span className="font-display text-xl md:text-2xl text-black pr-6">
            Do you create custom ceramic pieces?
          </span>
          <span className="chev font-display text-2xl text-black">+</span>
        </summary>
        <p className="mt-4 text-black/70">
          Yes, we design and craft fully custom pottery based on your ideas, style, and space.
        </p>
      </details>

      <details className="group py-6">
        <summary className="flex items-center justify-between cursor-pointer list-none">
          <span className="font-display text-xl md:text-2xl text-black pr-6">
            Are your ceramic products handmade?
          </span>
          <span className="chev font-display text-2xl text-black">+</span>
        </summary>
        <p className="mt-4 text-black/70">
          Every piece is carefully handcrafted using traditional pottery techniques and natural clay.
        </p>
      </details>

      <details className="group py-6">
        <summary className="flex items-center justify-between cursor-pointer list-none">
          <span className="font-display text-xl md:text-2xl text-black pr-6">
            Do you ship internationally?
          </span>
          <span className="chev font-display text-2xl text-black">+</span>
        </summary>
        <p className="mt-4 text-black/70">
          Yes, we deliver our ceramic artworks worldwide with safe packaging.
        </p>
      </details>

      <details className="group py-6">
        <summary className="flex items-center justify-between cursor-pointer list-none">
          <span className="font-display text-xl md:text-2xl text-black pr-6">
            Can I visit your pottery studio?
          </span>
          <span className="chev font-display text-2xl text-black">+</span>
        </summary>
        <p className="mt-4 text-black/70">
          Yes, visits are welcome by appointment to experience the ceramic crafting process.
        </p>
      </details>

    </div>
  </div>
</section>

<Footer/>
    </>
  )
}

export default page