// import Link from 'next/link'
// import React, { useEffect, useRef } from 'react'

// const footer = () => {
//   const Reveal = ({ children, className = '', delay = '', direction = 'up' }) => {
//     const ref = useRef(null);
    
//     useEffect(() => {
//       const el = ref.current;
//       if (!el) return;
      
//       const observer = new IntersectionObserver((entries) => {
//         entries.forEach(entry => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add('active');
//           } else {
//             entry.target.classList.remove('active');
//           }
//         });
//       }, { threshold: 0.15 });
      
//       observer.observe(el);
//       return () => observer.disconnect();
//     }, []);
    
//     const baseClass = direction === 'left' ? 'reveal-left' : direction === 'right' ? 'reveal-right' : 'reveal';
    
//     return (
//       <div ref={ref} className={`${baseClass} ${delay} ${className}`}>
//         {children}
//       </div>
//     );
//   };
// const FacebookIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//     <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
//   </svg>
// );

// const InstagramIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//     <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
//   </svg>
// );

// const TwitterIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//     <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
//   </svg>
// );
//   return (
//     <>

//     <footer id='contact' className="  relative  text-black overflow-hidden border-t border-black/10">

//       {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//         <h1 className="text-[20vw] font-extrabold tracking-widest text-black/20 select-none rotate-[-20deg]">
//           C
//         </h1>
//         <h1 className="text-[20vw] font-extrabold tracking-widest text-black/20 select-none rotate-10">
//           e
//         </h1>
//         <h1 className="text-[20vw] font-extrabold tracking-widest text-black/20 select-none rotate-[-10deg]">
//           r
//         </h1>
//         <h1 className="text-[20vw] font-extrabold tracking-widest text-black/20 select-none">
//           a
//         </h1>
//       </div> */}

//       <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
//           {/* Brand */}
//           <div>
//             <h2 className="text-3xl font-bold">Cera</h2>
            
//           </div>

//           {/* Links */}
//           <div>
//             <h3 className="font-semibold mb-4">Product</h3>
//             <ul className="space-y-2 text-gray-800 text-sm">
//               <Link href="/#features">Features</Link>
//               <Link href="/#pricing">Pricing</Link>
//               <Link href="/#documentation">Documentation</Link>
//               <Link href="/#updates">Updates</Link>
//             </ul>
//           </div>

//           <div>
//             <h3 className="font-semibold mb-4">Company</h3>
//             <ul className="space-y-2 text-gray-800 text-sm">
//              <Link href="/#careers"><li>Careers</li></Link>
//               <Link href="/#about"><li>About Us</li></Link>
//               <Link href="/clients/services/"><li>Services</li></Link>
//               <Link href="/#team"><li>Team</li></Link>
//             </ul>
//           </div>

//           <div>
//             <h3 className="font-semibold mb-4">Legal</h3>
//             <ul className="space-y-2 text-gray-800 text-sm">
//               <li>Privacy Policy</li>
//               <li>Terms of Service</li>
//               <li>Cookie Policy</li>
//             </ul>
//           </div>
//            <Reveal delay="reveal-delay-4">
//                       <div className="flex items-center gap-4 pt-4">
//                         <span className="text-sm text-[#8A7E72]">Follow us:</span>
//                         {[
//                           { icon: <FacebookIcon />, label: 'Facebook' },
//                           { icon: <InstagramIcon />, label: 'Instagram' },
//                           { icon: <TwitterIcon />, label: 'Twitter' },
//                         ].map((social, i) => (
//                           <a
//                             key={i}
//                             href="#"
//                             aria-label={social.label}
//                             className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-[#8A7E72] hover:text-[#B8916A] hover:bg-[#E8E0D5]/40 transition-all"
//                           >
//                             {social.icon}
//                           </a>
//                         ))}
//                       </div>
//                     </Reveal>
//         </div>

       
//         <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between text-sm text-gray-500">
//           <p>© {new Date().getFullYear()} Cera. All rights reserved.</p>
          
//         </div>
//       </div>
//     </footer>
 
//     </>
//   )
// }

// export default footer
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'

const Footer = () => {
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
      }, { threshold: 0.15 });

      observer.observe(el);
      return () => observer.disconnect();
    }, []);

    const baseClass = direction === 'left' 
      ? 'reveal-left' 
      : direction === 'right' 
        ? 'reveal-right' 
        : 'reveal';

    return (
      <div ref={ref} className={`${baseClass} ${delay} ${className}`}>
        {children}
      </div>
    );
  };

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

  const productLinks = [
    { href: '/#features', label: 'Features' },
    { href: '/#pricing', label: 'Pricing' },
    { href: '/#documentation', label: 'Documentation' },
    { href: '/#updates', label: 'Updates' },
  ];

  const companyLinks = [
    { href: '/#careers', label: 'Careers' },
    { href: '/#about', label: 'About Us' },
    { href: '/clients/services/', label: 'Services' },
    { href: '/#team', label: 'Team' },
  ];

  const legalLinks = [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/cookies', label: 'Cookie Policy' },
  ];

  const socialLinks = [
    { icon: <FacebookIcon />, label: 'Facebook', href: 'https://facebook.com' },
    { icon: <InstagramIcon />, label: 'Instagram', href: 'https://instagram.com' },
    { icon: <TwitterIcon />, label: 'Twitter', href: 'https://twitter.com' },
  ];

  return (
    <footer id="contact" className="relative text-black overflow-hidden border-t border-black/10">
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <Reveal delay="reveal-delay-1">
            <div>
              <h2 className="text-3xl font-bold">Cera</h2>
              <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                Crafting beautiful ceramic experiences for your digital space.
              </p>
            </div>
          </Reveal>

          {/* Product Links */}
          <Reveal delay="reveal-delay-2">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-800 text-sm">
                {productLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-[#B8916A] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Company Links */}
          <Reveal delay="reveal-delay-3">
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-800 text-sm">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-[#B8916A] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Legal Links */}
          <Reveal delay="reveal-delay-4">
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-800 text-sm">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-[#B8916A] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Social & Copyright */}
        <div className="border-t border-black/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Cera. All rights reserved.
          </p>

          <Reveal delay="reveal-delay-5">
            <div className="flex items-center gap-4">
              <span className="text-sm text-[#8A7E72]">Follow us:</span>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
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
    </footer>
  );
};

export default Footer;