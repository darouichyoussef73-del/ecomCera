// 'use client';
// import React from 'react';
// import Link from 'next/link'
// import NavbarClient from '../../components/navbarClients'
// import ScrollItems from '../../components/scrollItems'
// import Footer from '../../components/footer'
// import { User } from 'lucide-react'
// import { useEffect } from 'react';
// import AboutSection from '@/app/components/aboutSection'



// const page = () => {
//    useEffect(() => {
//   const boxes = document.querySelectorAll(".box");

//   const handleScroll = () => {
//     boxes.forEach((box) => {
//       const rect = box.getBoundingClientRect();

//       if (rect.top < window.innerHeight * 0.7) {
//         box.classList.add("active");
//       }
//     });
//   };

//   window.addEventListener("scroll", handleScroll);
//   return () => window.removeEventListener("scroll", handleScroll);
// }, []);
//   return (
//     < >
      
   
//       <NavbarClient/>
  
// {/* this is the hero section made by khaoula */}
//     <section className="hero relative min-h-screen overflow-hidden " id=''>
   
//       {/* Background Image */}
//       <div className="absolute inset-0">
     
//              <video
//                 src="/videos/hero.mp4"
//                 poster="/images/hero1.jpeg"
//                 autoPlay
//                 muted
//                 loop
//                 playsInline
//                   className="w-full h-full object-cover rounded-2xl"
//                 // className="w-full h-48 md:h-64 object-cover rounded-3xl"
//               >
//                 Your browser does not support the video tag.
//               </video>
//         </div>
    

//       {/* Content */}
//       <div className="relative z-10 container mx-auto px-6 lg:px-12 min-h-screen flex items-end pb-16">
//         <div className="grid lg:grid-cols-2 gap-12 w-full items-end">
//           {/* Left Content */}
//           <div className="max-w-2xl mb-10">
//             <h1 className="text-5xl md:text-7xl font-bold text-black leading-tight tracking-tight ">
//               A calmer way to care for your smile.
//             </h1>

//             <p className="mt-6 text-lg md:text-xl text-black/80 max-w-xl">
//               Gentle dentistry designed to remove fear, build trust, and
//               deliver confident, lasting results.
//             </p>

          
//           </div>

//           {/* Right Content */}
//           <div className="flex flex-col lg:items-end gap-6">
//             {/* Testimonial Card */}
//             <div className="max-w-sm rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-6">
             

//               <p className="text-black text-lg">
//                 “It felt more like a wellness visit than a dental appointment.”
//               </p>

//               <p className="mt-3 text-black/70">— Sarah M.</p>

             
//             </div>

//             {/* Video Card */}
//             <div className="max-w-sm rounded-3xl overflow-hidden">
              
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>

//     <section className="relative gap-5 py-10 items-center   justify-center h-full  overflow-hidden">
     

//       <div className='flex flex-wrap gap-5 items-center justify-center '>
     
//      < ScrollItems/>

//       </div>
        
     
//         </section> 
//        {/*this is the aboute section made by khaoula */}
       
//   <AboutSection/>
//        {/*this is the services section made by youssef */}
//     <section id="events" className="py-24 md:py-32 px-6 bg-sand">
//   <div className="mx-auto max-w-7xl">
//     <div className="flex items-center gap-4 text-black text-sm uppercase tracking-[0.25em] mb-6">
//       <span className="font-display text-2xl ">04</span>
//       <span>Services</span>
//     </div>
//     <h2 className="font-display text-4xl md:text-6xl max-w-3xl leading-[1.05] ">
//       Discover our recent events and achievements.
//     </h2>
//     <p className="mt-6 text-black/70 max-w-xl">
//       Stay updated on milestones and activities. Recent events show our dedication to growth and creativity.
//     </p>

//     <div className="mt-16 grid md:grid-cols-3 gap-6">
//       <div className='flex justify-center '>
//       <div id='box' className="box md:row-span-2  aspect-3/4 md:aspect-auto rounded-3xl overflow-hidden">
//         <img src="https://cdn.prod.website-files.com/68de9f894df3c35c556330f6/68e5405301886a216066c589_event-main-img.avif" className="w-full h-full object-cover"/>
//       </div>
//       </div>
//       <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
//         <article id='box' className="  bg-black rounded-3xl overflow-hidden">
//           <div className='flex justify-center items-center'>
//           <img src="https://cdn.prod.website-files.com/68de9f894df3c35c556330f6/68e547017e3a4ee99da4637a_event-01.avif" className="w-full aspect-4/3 object-cover"/>
//           </div>
//           <div className="p-6">
//             <div className="text-black text-xs uppercase tracking-widest">01 · Sep 15, 2024</div>
//             <h3 className="font-display text-xl  mt-2">Present new objectives and new talents.</h3>
//           </div>
//         </article>
        
//         <article id='box' className=" bg-black rounded-3xl overflow-hidden">
//              <div className='flex justify-center items-center'>
//           <img src="https://cdn.prod.website-files.com/68de9f894df3c35c556330f6/68e54701363b6dc9e71939b7_event-02.avif" className="w-full aspect-4/3 object-cover"/>
//           </div>
//           <div className="p-6">
//             <div className="text-black text-xs uppercase tracking-widest">02 · Sep 15, 2024</div>
//             <h3 className="font-display text-xl  mt-2">Present new objectives and new talents.</h3>
//           </div>
//         </article>
//         <div className="sm:col-span-2 rounded-3xl bg-ink text-black p-8 md:p-10 flex items-center justify-between gap-6">
//           <div>
//             <div className="font-display text-3xl md:text-4xl leading-tight">Your idea · our expertise</div>
//             <p className="text-black/60 mt-2 text-sm">Expert guidance and solutions for every project stage.</p>
//           </div>
//           <div className="mt-10">
//               <Link
//                 href="/pages/services"
//                 className="inline-flex items-center rounded-full bg-white px-8 py-4 text-black font-medium transition hover:bg-gray-200"
//               >
//                 Explore services
//               </Link>
//             </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </section>

//           <section id="faq" className="py-24 md:py-32 px-6 ">
//   <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-16 items-start">
//     <div className="md:sticky md:top-28">
//       <div className="flex items-center gap-4 text-black text-sm uppercase tracking-[0.25em] mb-6">
//         <span className="font-display text-2xl text-black">05</span>
//         <span>— FAQs</span>
//       </div>
//       <h2 className="font-display text-4xl md:text-5xl text-black leading-[1.05]">
//         Answers to your frequently asked questions.
//       </h2>
//       <div className='flex justify-center content-center'><div id='box' className="box mt-10 aspect-[4/3] rounded-3xl overflow-hidden">
//         <img src="/images/img2.jpeg" className="w-full h-full object-cover"/>
//       </div></div>
//     </div>

//     <div className="divide-y divide-ink/10 border-y border-ink/10">
     
//       <details className="group py-6">
//         <summary className="flex items-center justify-between cursor-pointer list-none">
//           <span className="font-display text-xl md:text-2xl text-black pr-6">Do you work with specific contractors or suppliers?</span>
//           <span className="chev font-display text-2xl text-black">+</span>
//         </summary>
//         <p className="mt-4 text-black/70">We offer a comprehensive range of services designed to meet your specific needs — architectural design, interior design, project management, and consultation.</p>
//       </details>
//       <details className="group py-6">
//         <summary className="flex items-center justify-between cursor-pointer list-none">
//           <span className="font-display text-xl md:text-2xl text-black pr-6">Do you carry out remote projects?</span>
//           <span className="chev font-display text-2xl text-black">+</span>
//         </summary>
//         <p className="mt-4 text-black/70">Yes — we collaborate with clients worldwide using detailed digital workflows, 3D previews, and on-site partners when needed.</p>
//       </details>
//       <details className="group py-6">
//         <summary className="flex items-center justify-between cursor-pointer list-none">
//           <span className="font-display text-xl md:text-2xl text-black pr-6">What is the payment process?</span>
//           <span className="chev font-display text-2xl text-black">+</span>
//         </summary>
//         <p className="mt-4 text-black/70">Payments are structured around defined milestones, with a clear contract outlining scope, deliverables, and timelines from day one.</p>
//       </details>
//       <details className="group py-6">
//         <summary className="flex items-center justify-between cursor-pointer list-none">
//           <span className="font-display text-xl md:text-2xl text-black pr-6">Do I need to hire an architect for my project?</span>
//           <span className="chev font-display text-2xl text-black">+</span>
//         </summary>
//         <p className="mt-4 text-black/70">It depends on the scope. We help you evaluate whether your project benefits from full architectural services or focused interior consulting.</p>
//       </details>
//     </div>
//   </div>
//           </section>
  
//     <Footer/>
//     </>
//   )
// }

// export default page
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
            {/* <div className="max-w-sm rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-6">
             

              <p className="text-black text-lg">
                
              </p>

             

             
            </div> */}
            <div className="max-w-sm rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-3">
  <div
    className="w-30 h-30 object-cover rounded-2xl mb-4"

  />
 
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
       {/*this is the services section made by youssef */}
    <section id="events" className="py-24 md:py-32 px-6 bg-sand">
  <div className="mx-auto max-w-7xl">
    <div className="flex items-center gap-4 text-black text-sm uppercase tracking-[0.25em] mb-6">
      <span className="font-display text-2xl ">04</span>
      <span>Workshops</span>
    </div>
    <h2 className="font-display text-4xl md:text-6xl max-w-3xl leading-[1.05] ">
      Discover our latest workshops and creations.
    </h2>
    <p className="mt-6 text-black/70 max-w-xl">
      Stay updated on upcoming workshops and finished pieces. Our studio is dedicated to nurturing creativity and craftsmanship.
    </p>

    <div className="mt-16 grid md:grid-cols-3 gap-6">
      <div className='flex justify-center '>
      <div id='box' className="box md:row-span-2  aspect-3/4 md:aspect-auto rounded-3xl overflow-hidden">
        <img src="https://cdn.prod.website-files.com/68de9f894df3c35c556330f6/68e5405301886a216066c589_event-main-img.avif" className="w-full h-full object-cover"/>
      </div>
      </div>
      <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
        <article id='box' className="  bg-black rounded-3xl overflow-hidden">
          <div className='flex justify-center items-center'>
          <img src="https://cdn.prod.website-files.com/68de9f894df3c35c556330f6/68e547017e3a4ee99da4637a_event-01.avif" className="w-full aspect-4/3 object-cover"/>
          </div>
          <div className="p-6">
            <div className="text-black text-xs uppercase tracking-widest">01 · Sep 15, 2024</div>
            <h3 className="font-display text-xl  mt-2">Hand-building essentials for beginners.</h3>
          </div>
        </article>
        
        <article id='box' className=" bg-black rounded-3xl overflow-hidden">
             <div className='flex justify-center items-center'>
          <img src="https://cdn.prod.website-files.com/68de9f894df3c35c556330f6/68e54701363b6dc9e71939b7_event-02.avif" className="w-full aspect-4/3 object-cover"/>
          </div>
          <div className="p-6">
            <div className="text-black text-xs uppercase tracking-widest">02 · Sep 15, 2024</div>
            <h3 className="font-display text-xl  mt-2">Wheel throwing for intermediate artists.</h3>
          </div>
        </article>
        <div className="sm:col-span-2 rounded-3xl bg-ink text-black p-8 md:p-10 flex items-center justify-between gap-6">
          <div>
            <div className="font-display text-3xl md:text-4xl leading-tight">Your vision · our clay</div>
            <p className="text-black/60 mt-2 text-sm">Expert guidance and hands-on instruction for every skill level.</p>
          </div>
          <div className="mt-10">
              <Link
                href="/clients/services"
                className="inline-flex items-center rounded-full bg-white px-8 py-4 text-black font-medium transition hover:bg-gray-200"
              >
                Explore workshops
              </Link>
            </div>
        </div>
      </div>
    </div>
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