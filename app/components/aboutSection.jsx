'use client'
import { Import } from 'lucide-react';
import Link from 'next/link';
import React, { useRef, useEffect, useState, useCallback } from 'react';

const styles=`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap');
`;


const HeartIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const LayersIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
    <path d="M2 17l10 5 10-5"/>
    <path d="M2 12l10 5 10-5"/>
  </svg>
);

const UsersIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const ArrowRightIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const MapPinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

const WavyLine = () => (
  <svg className="mt-4 w-16 h-4" viewBox="0 0 60 12" fill="none">
    <path d="M2 6C10 2 14 10 22 6C30 2 34 10 42 6C50 2 54 10 58 6" stroke="#C4A882" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// ============================================
// REVEAL COMPONENT (Intersection Observer)
// ============================================
const Reveal = ({ children, className = '', delay = '', direction = 'up' }) => {
  const ref = useRef(null);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active');
        }
      });
    }, { threshold: 0.15 });
    
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  
  const baseClass = direction === 'left' ? 'reveal-left' : direction === 'right' ? 'reveal-right' : 'reveal';
  
  return (
    <div ref={ref} className={`${baseClass} ${delay} ${className}`}>
      {children}
    </div>
  );
};


const page = () => {
  // Refs
  const scrollWrapperRef = useRef(null);
  const horizontalTrackRef = useRef(null);
  const progressBarRef = useRef(null);
  
  // State for active nav dot
  const [activeSection, setActiveSection] = useState(0);
  
  // Animation refs (persist between renders, no re-renders needed)
  const scrollProgressRef = useRef(0);
  const currentTranslateRef = useRef(0);
  const targetTranslateRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const rafIdRef = useRef(null);
  
  // Config
  const TOTAL_SECTIONS = 3;
  const MAX_TRANSLATE = -(TOTAL_SECTIONS - 1) * 100; // -200vw
  
  // Linear interpolation for smooth easing
  const lerp = useCallback((start, end, factor) => {
    return start + (end - start) * factor;
  }, []);
  
  // Calculate scroll progress (0 to 1)
  const updateScrollProgress = useCallback(() => {
    const wrapper = scrollWrapperRef.current;
    if (!wrapper) return;
    
    const rect = wrapper.getBoundingClientRect();
    const wrapperHeight = wrapper.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollableDistance = wrapperHeight - viewportHeight;
    const scrolled = -rect.top;
    
    const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
    scrollProgressRef.current = progress;
    targetTranslateRef.current = progress * MAX_TRANSLATE;
    
    // Update active section for nav dots
    const section = Math.min(Math.floor(progress * TOTAL_SECTIONS), TOTAL_SECTIONS - 1);
    setActiveSection(section);
  }, [MAX_TRANSLATE]);
  
  // Animation loop (60fps via requestAnimationFrame)
  const animate = useCallback(() => {
    // Smooth interpolation (0.08 = 8% of distance per frame)
    currentTranslateRef.current = lerp(
      currentTranslateRef.current,
      targetTranslateRef.current,
      0.08
    );
    
    // Apply transform - GPU-accelerated, no layout thrashing
    if (horizontalTrackRef.current) {
      horizontalTrackRef.current.style.transform = `translateX(${currentTranslateRef.current}vw)`;
    }
    
    // Progress bar
    if (progressBarRef.current) {
      progressBarRef.current.style.transform = `scaleX(${scrollProgressRef.current})`;
    }
    
    // Continue if not close enough to target
    const diff = Math.abs(targetTranslateRef.current - currentTranslateRef.current);
    const progress = scrollProgressRef.current;
    
    if (diff > 0.01 || (progress > 0 && progress < 1)) {
      rafIdRef.current = requestAnimationFrame(animate);
    } else {
      isAnimatingRef.current = false;
    }
  }, [lerp]);
  
  // Scroll handler
  const handleScroll = useCallback(() => {
    updateScrollProgress();
    if (!isAnimatingRef.current) {
      isAnimatingRef.current = true;
      rafIdRef.current = requestAnimationFrame(animate);
    }
  }, [updateScrollProgress, animate]);
  
  // Nav dot click handler
  const handleNavClick = useCallback((index) => {
    const wrapper = scrollWrapperRef.current;
    if (!wrapper) return;
    
    const wrapperHeight = wrapper.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollableDistance = wrapperHeight - viewportHeight;
    const targetScroll = (index / (TOTAL_SECTIONS - 1)) * scrollableDistance;
    
    window.scrollTo({
      top: wrapper.offsetTop + targetScroll,
      behavior: 'smooth'
    });
  }, []);
  
  // Initialize on mount
  useEffect(() => {
    // Inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
    
    // Initial calculation
    updateScrollProgress();
    currentTranslateRef.current = targetTranslateRef.current;
    if (horizontalTrackRef.current) {
      horizontalTrackRef.current.style.transform = `translateX(${currentTranslateRef.current}vw)`;
    }
    
    // Scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Resize handler
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        updateScrollProgress();
        currentTranslateRef.current = targetTranslateRef.current;
        if (horizontalTrackRef.current) {
          horizontalTrackRef.current.style.transform = `translateX(${currentTranslateRef.current}vw)`;
        }
      }, 100);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      document.head.removeChild(styleSheet);
    };
  }, [handleScroll, updateScrollProgress]);
  
  // ============================================
  // RENDER
  // ============================================
  return (
    <>
     
      
     
      <div ref={scrollWrapperRef} id='about' className="scroll-wrapper">
        
        {/* Sticky Container (stays fixed at top) */}
        <div className="sticky-container">
          
          {/* Horizontal Track (moves left via translateX) */}
          <div ref={horizontalTrackRef} className="horizontal-track">
            
            {/* ════════════════════════════════════════
                SECTION 1: ABOUT CERA (Hero)
            ════════════════════════════════════════ */}
            <section  className="section  bg-[#F5F0EB] flex items-center relative">
              {/* Floating decorative orbs */}
              <div className="floating-orb w-96 h-96 bg-[#C4A882] top-[-10%] right-[-5%] float-anim" />
              <div className="floating-orb w-72 h-72 bg-[#D4C4B0] bottom-[-10%] left-[-5%] float-anim" style={{ animationDelay: '3s' }} />
              
              <div className="relative z-10 w-screen h-screen flex items-center">
                <div className="w-full max-w-350 mx-auto px-8 md:px-16 lg:px-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                  
                  {/* Left Content */}
                  <div className="lg:w-1/2 space-y-8">
                    <Reveal>
                      <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#8A7E72] mb-2 block">About Us</span>
                      <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium text-[#3D3228] leading-[1.1]">
                        About <span className="italic text-[#B8916A]">Cera</span>
                      </h1>
                      <WavyLine />
                    </Reveal>
                    
                    <Reveal delay="reveal-delay-1">
                      <p className="text-[#8A7E72] text-lg leading-relaxed max-w-md">
                        Cera is a handcrafted ceramics studio specializing in custom creations. We transform ideas into unique ceramic pieces, blending creativity, quality, and craftsmanship to create something truly personal.
                      </p>
                    </Reveal>
                    
                    <Reveal delay="reveal-delay-2">
                      <div className="glass-card p-6 max-w-lg">
                        <p className="text-[#3D3228] leading-relaxed text-[0.95rem]">
                          At Cera, we transform creativity into handcrafted ceramic art. From personalized mugs and custom designs to interactive studio workshops, we offer unique experiences that bring ideas to life. Whether you're looking for a one-of-a-kind piece or want to create your own, Cera is a place where imagination meets craftsmanship.
                        </p>
                      </div>
                    </Reveal>
                    
                    {/* Feature Icons Row */}
                    <Reveal delay="reveal-delay-3">
                      <div className="grid grid-cols-4 gap-4 max-w-lg pt-4">
                        {[
                          { icon: <HeartIcon />, title: 'Handcrafted', desc: 'Made with care' },
                          { icon: <LayersIcon />, title: 'Custom', desc: 'Your ideas shaped' },
                          { icon: <LayersIcon />, title: 'Quality', desc: 'Durable materials' },
                          { icon: <UsersIcon />, title: 'Studio', desc: 'Join workshops' },
                        ].map((item, i) => (
                          <div key={i} className="text-center group cursor-pointer">
                            <div className="w-12 h-12 mx-auto mb-2 rounded-2xl bg-[#E8E0D5]/50 flex items-center justify-center text-[#B8916A] transition-all group-hover:bg-[#C4A882]/20 group-hover:scale-110">
                              {item.icon}
                            </div>
                            <div className="text-[0.7rem] font-medium text-[#3D3228]">{item.title}</div>
                            <div className="text-[0.6rem] text-[#8A7E72] mt-0.5">{item.desc}</div>
                          </div>
                        ))}
                      </div>
                    </Reveal>
                  </div>
                  
                  {/* Right Image */}
                  <Reveal delay="reveal-delay-2" direction="right">
                    <div className="img-organic shadow-2xl relative">
                      <img 
                        src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&h=900&fit=crop" 
                        alt="Cera ceramics studio with handcrafted pottery mug" 
                        className="w-full h-125 lg:h-150 object-cover"
                      />
                      {/* Floating badge */}
                      <div className="absolute bottom-6 right-6 glass-card-dark px-5 py-3 text-white text-sm font-medium">
                        <span className="text-[#C4A882]">SHAPE</span> YOUR IDEA<br />
                        <span className="text-[#C4A882]">CREATE</span> YOUR STORY
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>
              
              {/* Scroll hint */}
              <div className="scroll-hint absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#8A7E72]">
                <span className="text-xs tracking-widest uppercase">Scroll</span>
                <ArrowRightIcon size={20} />
              </div>
            </section>

            {/* ════════════════════════════════════════
                SECTION 2: COLLECTIONS & PROCESS
            ════════════════════════════════════════ */}
            <section className="section bg-[#F0EBE3] flex items-center relative">
              <div className="floating-orb w-125 h-125 bg-[#D4C4B0] top-[-20%] left-[-10%] float-anim" style={{ animationDelay: '1s' }} />
              <div className="floating-orb w-80 h-80 bg-[#C4A882] bottom-[-10%] right-[-5%] float-anim" style={{ animationDelay: '4s' }} />
              
              <div className="relative z-10 w-screen h-screen flex items-center px-8 md:px-16 lg:px-24">
                <div className="w-full max-w-350 mx-auto">
                  
                  {/* Section Header */}
                  <div className="text-center mb-12">
                    <Reveal>
                      <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#8A7E72] mb-3 block">Our Work</span>
                    </Reveal>
                    <Reveal delay="reveal-delay-1">
                      <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-[#3D3228] mb-4">
                        Collections & <span className="italic text-[#B8916A]">Process</span>
                      </h2>
                    </Reveal>
                    <Reveal delay="reveal-delay-2">
                      <p className="text-[#8A7E72] text-lg max-w-xl mx-auto">
                        Each piece tells a story of patience, skill, and artistic vision. Explore our handcrafted collections.
                      </p>
                    </Reveal>
                  </div>
                  
                  {/* Collection Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {[
                      {
                        img: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&h=400&fit=crop',
                        alt: 'Handcrafted ceramic mugs collection',
                        title: 'Signature Mugs',
                        badge: 'Bestseller',
                        desc: 'Hand-thrown mugs with unique glazes. Each piece carries the warmth of the artisan\'s touch.'
                      },
                      {
                        img: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&h=400&fit=crop',
                        alt: 'Artistic ceramic vases',
                        title: 'Artisan Vases',
                        badge: 'New',
                        desc: 'Sculptural vases that blend form and function. Perfect for dried flowers or as standalone art.'
                      },
                      {
                        img: 'https://images.unsplash.com/photo-1605883705077-8d3d3cebe78c?w=600&h=400&fit=crop',
                        alt: 'Handmade ceramic bowls',
                        title: 'Serving Bowls',
                        badge: 'Classic',
                        desc: 'From breakfast bowls to centerpieces. Food-safe glazes with organic, earthy textures.'
                      }
                    ].map((card, i) => (
                      <Reveal key={i} delay={`reveal-delay-${i + 1}`}>
                        <div className="feature-card glass-card overflow-hidden group cursor-pointer">
                          <div className="h-56 overflow-hidden">
                            <img 
                              src={card.img} 
                              alt={card.alt} 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          </div>
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="font-serif text-xl font-medium text-[#3D3228]">{card.title}</h3>
                              <span className="text-xs text-[#8A7E72] bg-[#E8E0D5]/50 px-3 py-1 rounded-full">{card.badge}</span>
                            </div>
                            <p className="text-[#8A7E72] text-sm leading-relaxed mb-4">{card.desc}</p>
                            <div className="flex items-center gap-2 text-[#B8916A] text-sm font-medium group-hover:gap-3 transition-all">
                              View Collection
                              <ArrowRightIcon />
                            </div>
                          </div>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                  
                  {/* Process Steps */}
                  <Reveal delay="reveal-delay-4">
                    <div className="mt-12 flex justify-center gap-8 md:gap-16 max-w-3xl mx-auto">
                      {[
                        { num: '1', title: 'Design', desc: 'Sketch your vision' },
                        { num: '2', title: 'Shape', desc: 'Hand-throw on wheel' },
                        { num: '3', title: 'Fire', desc: 'Kiln at 1200°C' },
                        { num: '4', title: 'Glaze', desc: 'Unique finish' },
                      ].map((step, i) => (
                        <React.Fragment key={i}>
                          <div className="text-center">
                            <div className="w-14 h-14 rounded-full bg-[#E8E0D5]/60 flex items-center justify-center mx-auto mb-3 text-[#B8916A] font-serif text-xl font-medium">
                              {step.num}
                            </div>
                            <div className="text-sm font-medium text-[#3D3228]">{step.title}</div>
                            <div className="text-xs text-[#8A7E72] mt-1">{step.desc}</div>
                          </div>
                          {i < 3 && (
                            <div className="w-12 h-px bg-[#C4A882]/30 self-center mt-[-20px] hidden md:block" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </Reveal>
                </div>
              </div>
            </section>

            {/* ════════════════════════════════════════
                SECTION 3: VISIT & CONNECT (CTA)
            ════════════════════════════════════════ */}
            <section className="section bg-[#F5F0EB] flex items-center relative">
              <div className="floating-orb w-[400px] h-[400px] bg-[#C4A882] top-[-10%] right-[-5%] float-anim" style={{ animationDelay: '2s' }} />
              <div className="floating-orb w-96 h-96 bg-[#D4C4B0] bottom-[-15%] left-[-10%] float-anim" style={{ animationDelay: '5s' }} />
              
              <div className="relative z-10 w-screen h-screen flex items-center px-8 md:px-16 lg:px-24">
                <div className="w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                  
                  {/* Left Image */}
                  <Reveal direction="left">
                    <div className="img-organic-2 shadow-2xl relative">
                      <img 
                        src="https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=800&h=700&fit=crop" 
                        alt="Pottery workshop hands on clay" 
                        className="w-full h-[450px] lg:h-[550px] object-cover"
                      />
                      {/* Workshop badge */}
                      <div className="absolute top-6 left-6 glass-card px-5 py-3">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-sm font-medium text-[#3D3228]">Workshops Open</span>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                  
                  {/* Right Content */}
                  <div className="lg:w-1/2 space-y-8">
                    <Reveal>
                      <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#8A7E72] mb-2 block">Get In Touch</span>
                      <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-[#3D3228] leading-[1.1]">
                        Visit Our <span className="italic text-[#B8916A]">Studio</span>
                      </h2>
                    </Reveal>
                    
                    <Reveal delay="reveal-delay-1">
                      <p className="text-[#8A7E72] text-lg leading-relaxed max-w-md">
                        Ready to create something beautiful? Join our workshops, commission a custom piece, or simply visit to experience the art of ceramics firsthand.
                      </p>
                    </Reveal>
                    
                    {/* Contact Info Cards */}
                    <Reveal delay="reveal-delay-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { icon: <MailIcon />, title: 'Email', info: 'hello@cerastudio.com' },
                          { icon: <PhoneIcon />, title: 'Phone', info: '+1 (555) 234-5678' },
                          { icon: <MapPinIcon />, title: 'Location', info: '42 Artisan Lane, Portland' },
                          { icon: <ClockIcon />, title: 'Hours', info: 'Tue–Sun, 10am–6pm' },
                        ].map((contact, i) => (
                          <div key={i} className="glass-card p-5 flex items-start gap-4 hover:bg-[#E8E0D5]/30 transition-all cursor-pointer group">
                            <div className="w-10 h-10 rounded-xl bg-[#E8E0D5]/60 flex items-center justify-center text-[#B8916A] group-hover:scale-110 transition-transform">
                              {contact.icon}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-[#3D3228]">{contact.title}</div>
                              <div className="text-sm text-[#8A7E72]">{contact.info}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Reveal>
                    
                    {/* CTA Buttons */}
                    <Reveal delay="reveal-delay-3">
                      <div className="flex flex-col sm:flex-row gap-4 pt-2">
                        <Link href="/clients/services/#workshop" className="btn-primary flex items-center gap-3 justify-center">
                          Book a Workshop
                          <ArrowRightIcon />
                        </Link>
                        <button className="btn-outline flex items-center gap-3 justify-center">
                          <DownloadIcon />
                          Download Catalog
                        </button>
                      </div>
                    </Reveal>
                    
                    {/* Social Links */}
                    <Reveal delay="reveal-delay-4">
                      <div className="flex items-center gap-4 pt-4">
                        <span className="text-sm text-[#8A7E72]">Follow us:</span>
                        {[
                          { icon: <FacebookIcon />, label: 'Facebook' },
                          { icon: <InstagramIcon />, label: 'Instagram' },
                          { icon: <TwitterIcon />, label: 'Twitter' },
                        ].map((social, i) => (
                          <a
                            key={i}
                            href="#"
                            aria-label={social.label}
                            className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-[#8A7E72] hover:text-[#B8916A] hover:bg-[#E8E0D5]/40 transition-all"
                          >
                            {social.icon}
                          </a>
                        ))}
                      </div>
                    </Reveal>
                  </div>
                </div>
              </div>
            </section>
            
          </div>{/* /horizontal-track */}
        </div>{/* /sticky-container */}
      </div>{/* /scroll-wrapper */}

    </>
  );
};

export default page;