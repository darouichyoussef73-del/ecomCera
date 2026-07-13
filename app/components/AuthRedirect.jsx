// 'use client'

// import { useEffect, useState } from 'react';
// import { usePathname, useRouter } from 'next/navigation';

// export default function AuthRedirect() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [isChecking, setIsChecking] = useState(true);

//   useEffect(() => {
//     const userData = localStorage.getItem('user');
//     const role=localStorage.getItem('role');
//     const token = localStorage.getItem('token');
//     const isLoggedIn = !!(userData || token);
//     const isAdmin = role === 'admin';
//     // Public routes that don't require login
//     const publicRoutes = ['/', '/pages/products', '/pages/services', '/about', '/contact'];
//     const adminRoutes = ['/admin/dashboard', '/admin/orders', '/admin/bookings', '/admin/clients', '/admin/productManager/addProduct', '/admin/productManager'];
//     const isPublicRoute = publicRoutes.includes(pathname);
//     const isAdminRoute = adminRoutes.includes(pathname);

//     if (isLoggedIn && isPublicRoute && pathname !== '/clients/home') {
//       if (isAdmin && isAdminRoute  ) {
//         // Logged in as admin + on admin page → allow access
//          router.push('/admin/dashboard');
//          return;
//       }
//       // Logged in + on public page → redirect to dashboard
//       router.push('/clients/home');
//     } else if (!isLoggedIn && !isPublicRoute) {
//       // Not logged in + on protected page → redirect to login
//       router.push('/pages/acountCreation');
//     }

//     setIsChecking(false);
//   }, [pathname, router]);

//   // Loading overlay while checking auth
//   if (isChecking) {
//     return (
      
//       <>
//    <div className="cera-loader fixed inset-0 z-[9999] flex items-center justify-center bg-white">
//   <div className="cera-pot"></div>
//   <div className="cera-text">CERA</div>

//   <style jsx>{`
//     .cera-loader {
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//       gap: 24px;
//       padding: 48px;
//     }

//     .cera-pot {
//       width: 80px;
//       height: 80px;
//       position: relative;
//       animation: spin 2.4s infinite ease-in-out;
//     }

//     .cera-pot::before {
//       content: '';
//       position: absolute;
//       inset: 0;
//       border-radius: 50%;
//       border: 6px solid transparent;
//       border-top-color: #c49a6c;
//       border-right-color: #a67c52;
//       border-bottom-color: #8b5e3c;
//       border-left-color: #d4b896;
//       box-shadow: inset 0 0 12px rgba(139, 94, 60, 0.15);
//     }

//     .cera-pot::after {
//       content: '';
//       position: absolute;
//       top: 50%;
//       left: 50%;
//       transform: translate(-50%, -50%);
//       width: 28px;
//       height: 28px;
//       border-radius: 50%;
//       background: conic-gradient(
//         #c49a6c 0deg,
//         #a67c52 90deg,
//         #8b5e3c 180deg,
//         #d4b896 270deg,
//         #c49a6c 360deg
//       );
//       animation: spin-reverse 1.6s infinite linear;
//       box-shadow: 0 2px 8px rgba(139, 94, 60, 0.3);
//     }

//     .cera-text {
//       font-family: 'Inter', system-ui, sans-serif;
//       font-size: 18px;
//       font-weight: 600;
//       letter-spacing: 6px;
//       color: #8b5e3c;
//       animation: pulse 4s infinite ease-in-out;
//     }

//     @keyframes spin {
//       0% { transform: rotate(0deg); }
//       100% { transform: rotate(360deg); }
//     }

//     @keyframes spin-reverse {
//       0% { transform: translate(-50%, -50%) rotate(0deg); }
//       100% { transform: translate(-50%, -50%) rotate(-360deg); }
//     }

//     @keyframes pulse {
//       0%, 100% { opacity: 0.5; }
//       50% { opacity: 1; }
//     }
//   `}</style>
// </div>
//       </>
//     );
//   }

//   return null;
// }
'use client'

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function AuthRedirect() {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    const isLoggedIn = !!(userData || token || role );
    const isAdmin = role === 'admin';

    // Public routes that don't require login
    const publicRoutes = ['/', '/pages/products', '/pages/services', '/about', '/contact'];
    const adminRoutes = ['/admin/dashboard', '/admin/orders', '/admin/Booking', '/admin/clients', '/admin/productManager/addProduct', '/admin/productManager'];
    const isPublicRoute = publicRoutes.includes(pathname);
    const isAdminRoute = adminRoutes.includes(pathname);

    // ── CASE 1: Not logged in + on protected route → redirect to login ──
    if (!isLoggedIn && !isPublicRoute) {
      router.push('/pages/acountCreation');
      setIsChecking(false);
      return;
    }

    // ── CASE 2: Logged in ──
    if (isLoggedIn) {
      // Admin on admin route → allow (stay)
      if (isAdmin && isAdminRoute) {
        setIsChecking(false);
        return;
      }

      // Admin on non-admin route (public or client) → redirect to admin dashboard
      if (isAdmin && !isAdminRoute) {
        router.push('/admin/dashboard');
        setIsChecking(false);
        return;
      }

      // Non-admin on admin route → redirect to client home
      if (!isAdmin && isAdminRoute) {
        router.push('/clients/home');
        setIsChecking(false);
        return;
      }

      // Non-admin on public route → redirect to client home
      if (!isAdmin && isPublicRoute && pathname !== '/clients/home') {
        router.push('/clients/home');
        setIsChecking(false);
        return;
      }
    }

    setIsChecking(false);
  }, [pathname, router]);

  // Loading overlay while checking auth
  if (isChecking) {
    return (
      <>
        <div className="cera-loader fixed inset-0 z-9999 flex items-center justify-center bg-white">
          <div className="cera-pot"></div>
          <div className="cera-text">CERA</div>

          <style jsx>{`
            .cera-loader {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 24px;
              padding: 48px;
            }

            .cera-pot {
              width: 80px;
              height: 80px;
              position: relative;
              animation: spin 2.4s infinite ease-in-out;
            }

            .cera-pot::before {
              content: '';
              position: absolute;
              inset: 0;
              border-radius: 50%;
              border: 6px solid transparent;
              border-top-color: #c49a6c;
              border-right-color: #a67c52;
              border-bottom-color: #8b5e3c;
              border-left-color: #d4b896;
              box-shadow: inset 0 0 12px rgba(139, 94, 60, 0.15);
            }

            .cera-pot::after {
              content: '';
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 28px;
              height: 28px;
              border-radius: 50%;
              background: conic-gradient(
                #c49a6c 0deg,
                #a67c52 90deg,
                #8b5e3c 180deg,
                #d4b896 270deg,
                #c49a6c 360deg
              );
              animation: spin-reverse 1.6s infinite linear;
              box-shadow: 0 2px 8px rgba(139, 94, 60, 0.3);
            }

            .cera-text {
              font-family: 'Inter', system-ui, sans-serif;
              font-size: 18px;
              font-weight: 600;
              letter-spacing: 6px;
              color: #8b5e3c;
              animation: pulse 4s infinite ease-in-out;
            }

            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }

            @keyframes spin-reverse {
              0% { transform: translate(-50%, -50%) rotate(0deg); }
              100% { transform: translate(-50%, -50%) rotate(-360deg); }
            }

            @keyframes pulse {
              0%, 100% { opacity: 0.5; }
              50% { opacity: 1; }
            }
          `}</style>
        </div>
      </>
    );
  }

  return null;
}