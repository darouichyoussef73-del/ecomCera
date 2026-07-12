
'use client'

import Link from 'next/link';
import React, { useRef, useEffect, useState, useCallback } from 'react';

const styles = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap');

/* ── Base ── */
.font-serif { font-family: 'Playfair Display', serif; }
.font-sans { font-family: 'Inter', sans-serif; }

/* ── Reveal Animations ── */
.reveal, .reveal-left, .reveal-right {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}
.reveal-left { transform: translateX(-60px); }
.reveal-right { transform: translateX(60px); }
.reveal.active, .reveal-left.active, .reveal-right.active {
  opacity: 1;
  transform: translate(0, 0);
}
.reveal-delay-1 { transition-delay: 0.1s; }
.reveal-delay-2 { transition-delay: 0.2s; }
.reveal-delay-3 { transition-delay: 0.3s; }
.reveal-delay-4 { transition-delay: 0.4s; }

/* ── Floating Orbs ── */
.floating-orb {
  position: absolute;
  border-radius: 50%;
  opacity: 0.12;
  filter: blur(80px);
  pointer-events: none;
  z-index: 0;
}
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(5deg); }
}
.float-anim { animation: float 8s ease-in-out infinite; }

/* ── Glass Cards ── */
.glass-card {
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
}
.glass-card-dark {
  background: rgba(45, 40, 35, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
}

/* ── Organic Image Shape ── */
.img-organic {
  border-radius: 40% 60% 55% 45% / 55% 45% 55% 45%;
  overflow: hidden;
  transition: border-radius 0.8s ease;
}
.img-organic:hover {
  border-radius: 45% 55% 50% 50% / 50% 50% 50% 50%;
}
.img-organic-2 {
  border-radius: 30% 70% 60% 40% / 40% 40% 60% 60%;
  overflow: hidden;
  transition: border-radius 0.8s ease;
}
.img-organic-2:hover {
  border-radius: 35% 65% 55% 45% / 45% 45% 55% 55%;
}

/* ── Feature Card ── */
.feature-card {
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}
.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(61, 50, 40, 0.1);
}

/* ── Button ── */
.btn-primary {
  background: #3D3228;
  color: #F5F0EB;
  padding: 14px 32px;
  border-radius: 50px;
  font-weight: 500;
  font-size: 0.95rem;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}
.btn-primary:hover {
  background: #2a231c;
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(61, 50, 40, 0.2);
}

/* ── Scroll Hint ── */
.scroll-hint {
  animation: bounce 2s ease-in-out infinite;
}
@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-10px); }
}

/* ════════════════════════════════════════════
   DESKTOP: Horizontal Scroll (lg+)
   ════════════════════════════════════════════ */
@media (min-width: 1024px) {
  .scroll-wrapper {
    height: 300vh;
    position: relative;
  }
  .sticky-container {
    position: sticky;
    top: 0;
    height: 100vh;
    overflow: hidden;
  }
  .horizontal-track {
    display: flex;
    height: 100vh;
    width: 300vw;
    will-change: transform;
  }
  .section {
    width: 100vw;
    height: 100vh;
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
  }
}

/* ════════════════════════════════════════════
   MOBILE & TABLET: Vertical Stack (below lg)
   ════════════════════════════════════════════ */
@media (max-width: 1023px) {
  .scroll-wrapper {
    height: auto !important;
  }
  .sticky-container {
    position: static;
    height: auto;
    overflow: visible;
  }
  .horizontal-track {
    display: flex;
    flex-direction: column;
    height: auto;
    width: 100% !important;
    transform: none !important;
  }
  .section {
    width: 100%;
    height: auto;
    min-height: 100vh;
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
    padding: 80px 0;
  }
}

/* ── Mobile-specific tweaks ── */
@media (max-width: 768px) {
  .floating-orb {
    opacity: 0.08;
    filter: blur(60px);
  }
}
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
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

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


const Page = () => {
  // Refs
  const scrollWrapperRef = useRef(null);
  const horizontalTrackRef = useRef(null);

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
  }, [MAX_TRANSLATE]);

  // Animation loop (60fps via requestAnimationFrame)
  const animate = useCallback(() => {
    currentTranslateRef.current = lerp(
      currentTranslateRef.current,
      targetTranslateRef.current,
      0.08
    );

    if (horizontalTrackRef.current) {
      horizontalTrackRef.current.style.transform = `translateX(${currentTranslateRef.current}vw)`;
    }

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
    // Only run horizontal scroll on desktop
    if (window.innerWidth < 1024) return;

    updateScrollProgress();
    if (!isAnimatingRef.current) {
      isAnimatingRef.current = true;
      rafIdRef.current = requestAnimationFrame(animate);
    }
  }, [updateScrollProgress, animate]);

  // Initialize on mount
  useEffect(() => {
    // Inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Initial calculation (desktop only)
    if (window.innerWidth >= 1024) {
      updateScrollProgress();
      currentTranslateRef.current = targetTranslateRef.current;
      if (horizontalTrackRef.current) {
        horizontalTrackRef.current.style.transform = `translateX(${currentTranslateRef.current}vw)`;
      }
    }

    // Scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Resize handler
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (window.innerWidth >= 1024) {
          updateScrollProgress();
          currentTranslateRef.current = targetTranslateRef.current;
          if (horizontalTrackRef.current) {
            horizontalTrackRef.current.style.transform = `translateX(${currentTranslateRef.current}vw)`;
          }
        } else {
          // Reset transform on mobile
          if (horizontalTrackRef.current) {
            horizontalTrackRef.current.style.transform = 'none';
          }
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

        {/* Sticky Container (stays fixed at top on desktop) */}
        <div className="sticky-container">

          {/* Horizontal Track (moves left via translateX on desktop) */}
          <div ref={horizontalTrackRef} className="horizontal-track">

            {/* ════════════════════════════════════════
                SECTION 1: ABOUT CERA (Hero)
            ════════════════════════════════════════ */}
            <section className="section bg-[#F5F0EB] flex items-center relative">
              {/* Floating decorative orbs */}
              <div className="floating-orb w-72 h-72 lg:w-96 lg:h-96 bg-[#C4A882] top-[-5%] right-[-10%] lg:top-[-10%] lg:right-[-5%] float-anim" />
              <div className="floating-orb w-56 h-56 lg:w-72 lg:h-72 bg-[#D4C4B0] bottom-[-5%] left-[-10%] lg:bottom-[-10%] lg:left-[-5%] float-anim" style={{ animationDelay: '3s' }} />

              <div className="relative z-10 w-full lg:w-screen h-auto lg:h-screen flex items-center py-16 lg:py-0">
                <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-24 flex flex-col lg:flex-row items-center gap-10 lg:gap-20">

                  {/* Left Content */}
                  <div className="w-full lg:w-1/2 space-y-6 lg:space-y-8 text-center lg:text-left">
                    <Reveal>
                      <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#8A7E72] mb-2 block">About Us</span>
                      <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium text-[#3D3228] leading-[1.1]">
                        About <span className="italic text-[#B8916A]">Cera</span>
                      </h1>
                      <div className="flex justify-center lg:justify-start">
                        <WavyLine />
                      </div>
                    </Reveal>

                    <Reveal delay="reveal-delay-1">
                      <p className="text-[#8A7E72] text-base sm:text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
                        Cera is a handcrafted ceramics studio specializing in custom creations. We transform ideas into unique ceramic pieces, blending creativity, quality, and craftsmanship to create something truly personal.
                      </p>
                    </Reveal>

                    <Reveal delay="reveal-delay-2">
                      <div className="glass-card p-5 sm:p-6 max-w-lg mx-auto lg:mx-0">
                        <p className="text-[#3D3228] leading-relaxed text-sm sm:text-[0.95rem]">
                          At Cera, we transform creativity into handcrafted ceramic art. From personalized mugs and custom designs to interactive studio workshops, we offer unique experiences that bring ideas to life. Whether you're looking for a one-of-a-kind piece or want to create your own, Cera is a place where imagination meets craftsmanship.
                        </p>
                      </div>
                    </Reveal>

                    {/* Feature Icons Row */}
                    <Reveal delay="reveal-delay-3">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-lg mx-auto lg:mx-0 pt-2 lg:pt-4">
                        {[
                          { icon: <HeartIcon />, title: 'Handcrafted', desc: 'Made with care' },
                          { icon: <LayersIcon />, title: 'Custom', desc: 'Your ideas shaped' },
                          { icon: <LayersIcon />, title: 'Quality', desc: 'Durable materials' },
                          { icon: <UsersIcon />, title: 'Studio', desc: 'Join workshops' },
                        ].map((item, i) => (
                          <div key={i} className="text-center group cursor-pointer">
                            <div className="w-11 h-11 sm:w-12 sm:h-12 mx-auto mb-2 rounded-2xl bg-[#E8E0D5]/50 flex items-center justify-center text-[#B8916A] transition-all group-hover:bg-[#C4A882]/20 group-hover:scale-110">
                              {item.icon}
                            </div>
                            <div className="text-[0.65rem] sm:text-[0.7rem] font-medium text-[#3D3228]">{item.title}</div>
                            <div className="text-[0.55rem] sm:text-[0.6rem] text-[#8A7E72] mt-0.5">{item.desc}</div>
                          </div>
                        ))}
                      </div>
                    </Reveal>
                  </div>

                  {/* Right Image */}
                  <Reveal delay="reveal-delay-2" direction="right">
                    <div className="img-organic shadow-2xl relative w-full max-w-sm sm:max-w-md lg:max-w-none mx-auto">
                      <img 
                        src="/images/about1.jpg" 
                        alt="Cera ceramics studio with handcrafted pottery mug" 
                        className="w-full h-72 sm:h-96 lg:h-[500px] xl:h-[600px] object-cover"
                      />
                      {/* Floating badge */}
                      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 glass-card-dark px-4 py-2 sm:px-5 sm:py-3 text-white text-xs sm:text-sm font-medium">
                        <span className="text-[#C4A882]">SHAPE</span> YOUR IDEA<br />
                        <span className="text-[#C4A882]">CREATE</span> YOUR STORY
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>

              {/* Scroll hint - desktop only */}
              <div className="hidden lg:flex scroll-hint absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-[#8A7E72]">
                <span className="text-xs tracking-widest uppercase">Scroll</span>
                <ArrowRightIcon size={20} />
              </div>
            </section>

            {/* ════════════════════════════════════════
                SECTION 2: COLLECTIONS & PROCESS
            ════════════════════════════════════════ */}
            <section className="section bg-[#F0EBE3] flex items-center relative">
              <div className="floating-orb w-72 h-72 lg:w-125 lg:h-125 bg-[#D4C4B0] top-[-10%] left-[-10%] lg:top-[-20%] lg:left-[-10%] float-anim" style={{ animationDelay: '1s' }} />
              <div className="floating-orb w-64 h-64 lg:w-80 lg:h-80 bg-[#C4A882] bottom-[-5%] right-[-5%] lg:bottom-[-10%] lg:right-[-5%] float-anim" style={{ animationDelay: '4s' }} />

              <div className="relative z-10 w-full lg:w-screen h-auto lg:h-screen flex items-center py-16 lg:py-0 px-6 sm:px-8 lg:px-16 xl:px-24">
                <div className="w-full max-w-[1400px] mx-auto">

                  {/* Section Header */}
                  <div className="text-center mb-10 lg:mb-12">
                    <Reveal>
                      <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#8A7E72] mb-3 block">Our Work</span>
                    </Reveal>
                    <Reveal delay="reveal-delay-1">
                      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium text-[#3D3228] mb-4">
                        Collections & <span className="italic text-[#B8916A]">Process</span>
                      </h2>
                    </Reveal>
                    <Reveal delay="reveal-delay-2">
                      <p className="text-[#8A7E72] text-base sm:text-lg max-w-xl mx-auto px-4">
                        Each piece tells a story of patience, skill, and artistic vision. Explore our handcrafted collections.
                      </p>
                    </Reveal>
                  </div>

                  {/* Collection Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
                    {[
                      {
                        img: '/images/collection1.jpeg',
                        alt: 'Handcrafted ceramic mugs collection',
                        title: 'Signature Mugs',
                        badge: 'Bestseller',
                        desc: 'Hand-thrown mugs with unique glazes. Each piece carries the warmth of the artisan\'s touch.'
                      },
                      {
                        img: '/images/collection2.jpeg',
                        alt: 'Artistic ceramic vases',
                        title: 'Artisan Vases',
                        badge: 'New',
                        desc: 'Sculptural vases that blend form and function. Perfect for dried flowers or as standalone art.'
                      },
                      {
                        img: '/images/collection3.jpeg',
                        alt: 'Handmade ceramic bowls',
                        title: 'Serving Bowls',
                        badge: 'Classic',
                        desc: 'From breakfast bowls to centerpieces. Food-safe glazes with organic, earthy textures.'
                      }
                    ].map((card, i) => (
                      <Reveal key={i} delay={`reveal-delay-${i + 1}`}>
                        <div className="feature-card glass-card overflow-hidden group cursor-pointer">
                          <div className="h-48 sm:h-56 overflow-hidden">
                            <img 
                              src={card.img} 
                              alt={card.alt} 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          </div>
                          <div className="p-5 sm:p-6">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="font-serif text-lg sm:text-xl font-medium text-[#3D3228]">{card.title}</h3>
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
                    <div className="mt-10 lg:mt-12 flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-16 max-w-3xl mx-auto">
                      {[
                        { num: '1', title: 'Design', desc: 'Sketch your vision' },
                        { num: '2', title: 'Shape', desc: 'Hand-throw on wheel' },
                        { num: '3', title: 'Fire', desc: 'Kiln at 1200°C' },
                        { num: '4', title: 'Glaze', desc: 'Unique finish' },
                      ].map((step, i) => (
                        <React.Fragment key={i}>
                          <div className="text-center w-20 sm:w-auto">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#E8E0D5]/60 flex items-center justify-center mx-auto mb-3 text-[#B8916A] font-serif text-lg sm:text-xl font-medium">
                              {step.num}
                            </div>
                            <div className="text-sm font-medium text-[#3D3228]">{step.title}</div>
                            <div className="text-xs text-[#8A7E72] mt-1">{step.desc}</div>
                          </div>
                          {i < 3 && (
                            <div className="hidden lg:block w-12 h-px bg-[#C4A882]/30 self-center mt-[-20px]" />
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
              <div className="floating-orb w-72 h-72 lg:w-[400px] lg:h-[400px] bg-[#C4A882] top-[-5%] right-[-10%] lg:top-[-10%] lg:right-[-5%] float-anim" style={{ animationDelay: '2s' }} />
              <div className="floating-orb w-64 h-64 lg:w-96 lg:h-96 bg-[#D4C4B0] bottom-[-10%] left-[-10%] lg:bottom-[-15%] lg:left-[-10%] float-anim" style={{ animationDelay: '5s' }} />

              <div className="relative z-10 w-full lg:w-screen h-auto lg:h-screen flex items-center py-16 lg:py-0 px-6 sm:px-8 lg:px-16 xl:px-24">
                <div className="w-full max-w-[1400px] mx-auto flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-20">

                  {/* Left Image */}
                  <Reveal direction="left">
                    <div className="img-organic-2 shadow-2xl relative w-full max-w-sm sm:max-w-md lg:max-w-none mx-auto">
                      <img 
                        src="/images/workshop.jpg" 
                        alt="Pottery workshop hands on clay" 
                        className="w-full h-72 sm:h-96 lg:h-[450px] xl:h-[550px] object-cover object-bottom"
                      />
                      {/* Workshop badge */}
                      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 glass-card px-4 py-2 sm:px-5 sm:py-3">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-xs sm:text-sm font-medium text-[#3D3228]">Workshops Open</span>
                        </div>
                      </div>
                    </div>
                  </Reveal>

                  {/* Right Content */}
                  <div className="w-full lg:w-1/2 space-y-6 lg:space-y-8 text-center lg:text-left">
                    <Reveal>
                      <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#8A7E72] mb-2 block">Get In Touch</span>
                      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium text-[#3D3228] leading-[1.1]">
                        Visit Our <span className="italic text-[#B8916A]">Studio</span>
                      </h2>
                    </Reveal>

                    <Reveal delay="reveal-delay-1">
                      <p className="text-[#8A7E72] text-base sm:text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
                        Ready to create something beautiful? Join our workshops, commission a custom piece, or simply visit to experience the art of ceramics firsthand.
                      </p>
                    </Reveal>

                    {/* Contact Info Cards */}
                    <Reveal delay="reveal-delay-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {[
                          { icon: <MailIcon />, title: 'Email', info: 'hello@cerastudio.com' },
                          { icon: <PhoneIcon />, title: 'Phone', info: '+1 (555) 234-5678' },
                          { icon: <MapPinIcon />, title: 'Location', info: '42 Artisan Lane, Portland' },
                          { icon: <ClockIcon />, title: 'Hours', info: 'Tue–Sun, 10am–6pm' },
                        ].map((contact, i) => (
                          <div key={i} className="glass-card p-4 sm:p-5 flex items-start gap-3 sm:gap-4 hover:bg-[#E8E0D5]/30 transition-all cursor-pointer group">
                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#E8E0D5]/60 flex items-center justify-center text-[#B8916A] group-hover:scale-110 transition-transform flex-shrink-0">
                              {contact.icon}
                            </div>
                            <div className="text-left min-w-0">
                              <div className="text-sm font-medium text-[#3D3228]">{contact.title}</div>
                              <div className="text-xs sm:text-sm text-[#8A7E72] truncate">{contact.info}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Reveal>

                    {/* CTA Buttons */}
                    <Reveal delay="reveal-delay-3">
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 justify-center lg:justify-start">
                        <Link href="/clients/services/#workshop" className="btn-primary flex items-center gap-3 justify-center text-sm sm:text-base">
                          Book a Workshop
                          <ArrowRightIcon />
                        </Link>
                      </div>
                    </Reveal>

                    {/* Social Links */}
                    <Reveal delay="reveal-delay-4">
                      <div className="flex items-center gap-3 sm:gap-4 pt-4 justify-center lg:justify-start">
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
                            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl glass-card flex items-center justify-center text-[#8A7E72] hover:text-[#B8916A] hover:bg-[#E8E0D5]/40 transition-all"
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

export default Page;