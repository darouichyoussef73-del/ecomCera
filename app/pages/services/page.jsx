// import React from 'react'
// import Navbar from '../../components/navbar'
// import Footer from '@/app/components/footer'
// import Link from 'next/link'
// const page = () => {
//   return (
//     <>
//     <Navbar/>
//      <section className="hero relative min-h-screen  ">
   
//       {/* Background Image */}
//       <div className="absolute inset-0">
       
//         <video
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
//           <div className="max-w-2xl">
//             <h1 className="text-5xl md:text-7xl font-bold text-black leading-tight tracking-tight">
//               A calmer way to care for your smile.
//             </h1>

//             <p className="mt-6 text-lg md:text-xl text-black/80 max-w-xl">
//               Gentle dentistry designed to remove fear, build trust, and
//               deliver confident, lasting results.
//             </p>

//             <div className="mt-10">
//               <Link
//                 href="/contact"
//                 className="inline-flex items-center rounded-full bg-white px-8 py-4 text-black font-medium transition hover:bg-gray-200"
//               >
//                 Schedule a Visit
//               </Link>
//             </div>
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
//                    </div>
//         </div>
//       </div>
//     </section>

//     <section >
//       <h1 className='font-bold text-5xl text-center text-black py-15'>Our Services </h1>
//     <div className='w-full h-screen min-h-fit flex  flex-wrap justify-center items-center gap-10  '>
      
//       <div className="relative w-1/4 min-w-100   h-4/5  overflow-hidden rounded-2xl  hover:scale-110 transition-all cursor-pointer">
//      <img
//     src="/images/img2.jpeg"
//     alt="Product"
//     className="w-full h-full object-cover  "
//   />
//   <div className="absolute inset-x-0 bottom-0 h-50 bg-linear-to-t from-black/90 via-black/40 to-transparent"></div>
//   <h2 className="absolute bottom-6 left-6 text-white text-2xl font-bold">
//     Join us in our work Shop
//   </h2>
// </div>
//       <div className="relative w-1/4 min-w-100   h-4/5  overflow-hidden rounded-2xl  hover:scale-110 transition-all cursor-pointer">
//      <img
//     src="/images/img2.jpeg"
//     alt="Product"
//     className="w-full h-full object-cover  "
//   />
//   <div className="absolute inset-x-0 bottom-0 h-50 bg-linear-to-t from-black/90 via-black/40 to-transparent"></div>
//   <h2 className="absolute bottom-6 left-6 text-white text-2xl font-bold">
//     Join us in our work Shop
//   </h2>
// </div>
//       <div className="relative w-1/4 min-w-100   h-4/5  overflow-hidden rounded-2xl  hover:scale-110 transition-all cursor-pointer">
//      <img
//     src="/images/img2.jpeg"
//     alt="Product"
//     className="w-full h-full object-cover  "
//   />
//   <div className="absolute inset-x-0 bottom-0 h-50 bg-linear-to-t from-black/90 via-black/40 to-transparent"></div>
//   <h2 className="absolute bottom-6 left-6 text-white text-2xl font-bold">
//     Join us in our work Shop
//   </h2>
// </div>

   
     
      
     
//     </div>
//     </section>
//     <Footer/>
//     </>
//   )
// }

// export default page
"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import NavbarClient from "@/app/components/navbarClients";
import Footer from "@/app/components/footer";

// ============================================
// STYLES (unchanged)
// ============================================
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap');

body {
  font-family: 'Inter', sans-serif;
  color: #3D3228;
  overflow-x: hidden;
}

.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.reveal.active {
  opacity: 1;
  transform: translateY(0);
}

.reveal-delay-1 { transition-delay: 0.1s; }
.reveal-delay-2 { transition-delay: 0.2s; }
.reveal-delay-3 { transition-delay: 0.3s; }
.reveal-delay-4 { transition-delay: 0.4s; }

.glass-card {
  background: rgba(245, 240, 235, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(196, 168, 130, 0.2);
  border-radius: 24px;
  box-shadow: 0 4px 30px rgba(61, 50, 40, 0.08);
}

.glass-card-dark {
  background: rgba(61, 50, 40, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(196, 168, 130, 0.15);
  border-radius: 24px;
}

.form-input {
  width: 100%;
  padding: 14px 18px;
  background: rgba(245, 240, 235, 0.8);
  border: 1.5px solid rgba(196, 168, 130, 0.3);
  border-radius: 14px;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: #3D3228;
  transition: all 0.3s ease;
  outline: none;
}

.form-input:focus {
  border-color: #C4A882;
  box-shadow: 0 0 0 4px rgba(196, 168, 130, 0.15);
  background: white;
}

.form-input::placeholder {
  color: #8A7E72;
}

.form-label {
  display: block;
  font-size: 0.85rem;
  font-weight: 500;
  color: #3D3228;
  margin-bottom: 8px;
  letter-spacing: 0.02em;
}

.form-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%238A7E72' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  cursor: pointer;
}

.form-textarea {
  min-height: 120px;
  resize: vertical;
}

.form-checkbox {
  width: 20px;
  height: 20px;
  border: 1.5px solid rgba(196, 168, 130, 0.4);
  border-radius: 6px;
  cursor: pointer;
  accent-color: #C4A882;
}

.image-upload-zone {
  width: 100%;
  padding: 32px 24px;
  border: 2px dashed rgba(196, 168, 130, 0.4);
  border-radius: 16px;
  background: rgba(245, 240, 235, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.image-upload-zone:hover {
  border-color: #C4A882;
  background: rgba(196, 168, 130, 0.08);
}

.image-upload-zone.dragover {
  border-color: #C4A882;
  background: rgba(196, 168, 130, 0.12);
  transform: scale(1.01);
}

.image-upload-zone.has-image {
  border-style: solid;
  border-color: #C4A882;
  background: rgba(196, 168, 130, 0.06);
}

.upload-preview {
  max-width: 200px;
  max-height: 200px;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 4px 16px rgba(61, 50, 40, 0.15);
}

.upload-remove-btn {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #B8916A;
  color: white;
  border: 2px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(61, 50, 40, 0.2);
}

.upload-remove-btn:hover {
  background: #9A7A5A;
  transform: scale(1.1);
}

.btn-primary {
  background: linear-gradient(135deg, #C4A882, #B8916A);
  color: white;
  border: none;
  border-radius: 16px;
  padding: 16px 40px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(196, 168, 130, 0.35);
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.btn-primary::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(196, 168, 130, 0.5);
}

.btn-primary:hover::after {
  left: 100%;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-secondary {
  background: transparent;
  color: #3D3228;
  border: 1.5px solid rgba(196, 168, 130, 0.5);
  border-radius: 16px;
  padding: 14px 32px;
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: rgba(196, 168, 130, 0.1);
  border-color: #C4A882;
}

.service-card {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 24px 60px rgba(61, 50, 40, 0.12);
}

.service-card.active {
  border-color: #C4A882;
  box-shadow: 0 8px 30px rgba(196, 168, 130, 0.25);
}

.price-tag {
  background: linear-gradient(135deg, #C4A882, #B8916A);
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
  display: inline-block;
}

.floating-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.2;
  pointer-events: none;
}

@keyframes float {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-20px) scale(1.05); }
}

.float-anim {
  animation: float 8s ease-in-out infinite;
}

.tab-btn {
  padding: 12px 28px;
  border-radius: 12px;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1.5px solid transparent;
  background: transparent;
  color: #8A7E72;
}

.tab-btn:hover {
  background: rgba(196, 168, 130, 0.1);
  color: #3D3228;
}

.tab-btn.active {
  background: rgba(196, 168, 130, 0.15);
  border-color: rgba(196, 168, 130, 0.3);
  color: #3D3228;
}

.success-check {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #C4A882, #B8916A);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  animation: scaleIn 0.5s ease;
}

@keyframes scaleIn {
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.error-message {
  background: rgba(220, 38, 38, 0.08);
  border: 1px solid rgba(220, 38, 38, 0.2);
  color: #991B1B;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 0.9rem;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-data-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(196, 168, 130, 0.15);
  border: 1px solid rgba(196, 168, 130, 0.3);
  color: #3D3228;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 16px;
}

.user-data-badge svg {
  color: #B8916A;
}

.user-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(196, 168, 130, 0.12);
  border: 1px solid rgba(196, 168, 130, 0.25);
  color: #3D3228;
  padding: 8px 16px;
  border-radius: 24px;
  font-size: 0.85rem;
  font-weight: 500;
}

.user-bar svg {
  color: #B8916A;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .glass-card { margin: 0 0.5rem; }
}

@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
  .floating-orb, .float-anim { animation: none; }
}
`;

// ============================================
// LOCALSTORAGE KEYS
// ============================================
const STORAGE_KEYS = {
  FORM_DATA: "ceraStudio_formData",
  ACTIVE_SERVICE: "ceraStudio_activeService",
  COMMISSION_IMAGES: "ceraStudio_commissionImages",
  USER_PROFILE: "ceraStudio_userProfile",
  USE_USER_DATA: "ceraStudio_useUserData",
  USER: "user",
};

// ============================================
// API SERVICE
// ============================================
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

const apiService = {
  async submitBooking(formData, serviceType, imageFile = null, userId = null) {
    const endpoint = `${API_BASE_URL}/bookings`;
    const formDataObj = new FormData();

    formDataObj.append("serviceType", serviceType);
    formDataObj.append("submittedAt", new Date().toISOString());
    if (userId) {
      formDataObj.append("user_id", userId);
    }

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "serviceType") return; // serviceType is set by the selected card
      formDataObj.append(
        key,
        value === true ? "1" : value === false ? "0" : (value ?? ""),
      );
    });

    if (imageFile) {
      formDataObj.append("visionImage", imageFile);
    }

    const response = await fetch(endpoint, {
      method: "POST",
      body: formDataObj,
    });

    if (!response.ok)
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    return response.json();
  },

  async uploadImage(file) {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Image upload failed");
    return response.json();
  },
};

// ============================================
// REVEAL COMPONENT (unchanged)
// ============================================
const Reveal = ({ children, className = "", delay = "" }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active");
          else entry.target.classList.remove("active");
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${delay} ${className}`}>
      {children}
    </div>
  );
};

// ============================================
// FORM INPUT COMPONENT (unchanged)
// ============================================
const FormField = ({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  options,
  value,
  onChange,
  textarea = false,
}) => (
  <div className="mb-5">
    <label className="form-label">
      {label} {required && <span className="text-[#B8916A]">*</span>}
    </label>
    {textarea ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="form-input form-textarea"
      />
    ) : options ? (
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="form-input form-select"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="form-input"
      />
    )}
  </div>
);

// ============================================
// IMAGE UPLOAD COMPONENT (unchanged)
// ============================================
const ImageUpload = ({
  imagePreview,
  onImageSelect,
  onImageRemove,
  disabled = false,
}) => {
  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be under 5MB");
      return;
    }
    onImageSelect(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled) return;
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  const handleClick = () => {
    if (!disabled) fileInputRef.current?.click();
  };

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="mb-5">
      <label className="form-label">Vision Reference Image</label>
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`image-upload-zone ${isDragOver ? "dragover" : ""} ${imagePreview ? "has-image" : ""}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
          disabled={disabled}
        />

        {imagePreview ? (
          <div className="relative inline-block">
            <img
              src={imagePreview}
              alt="Vision preview"
              className="upload-preview"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onImageRemove();
              }}
              className="upload-remove-btn"
              disabled={disabled}
            >
              ×
            </button>
            <p className="text-sm text-[#8A7E72] mt-3">
              Click to change or drag a new image
            </p>
          </div>
        ) : (
          <div className="py-4">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C4A882"
              strokeWidth="1.5"
              className="mx-auto mb-3"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <p className="text-[#3D3228] font-medium mb-1">
              Drop your vision image here
            </p>
            <p className="text-sm text-[#8A7E72]">
              or click to browse (max 5MB)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================
// SERVICE CARD COMPONENT (unchanged)
// ============================================
const ServiceCard = ({
  icon,
  title,
  description,
  price,
  duration,
  active,
  onClick,
}) => (
  <div
    onClick={onClick}
    className={`service-card glass-card p-8 ${active ? "active border-[#C4A882]" : ""}`}
  >
    <div className="w-14 h-14 rounded-2xl bg-[#E8E0D5]/60 flex items-center justify-center text-[#B8916A] mb-5">
      {icon}
    </div>
    <h3 className="font-serif text-xl font-medium text-[#3D3228] mb-2">
      {title}
    </h3>
    <p className="text-[#8A7E72] text-sm leading-relaxed mb-4">{description}</p>
    <div className="flex items-center justify-between">
      <span className="price-tag">{price}</span>
      <span className="text-xs text-[#8A7E72]">{duration}</span>
    </div>
  </div>
);

// ============================================
// SSR-SAFE LOCALSTORAGE HOOK
// ============================================
function useLocalStorageState(key, defaultValue) {
  const [state, setState] = useState(defaultValue);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) {
        setState(JSON.parse(stored));
      }
    } catch {
      // ignore parse errors
    }
  }, [key]);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state, isHydrated]);

  return [state, setState, isHydrated];
}

// ============================================
// MAIN SERVICES PAGE COMPONENT
// ============================================
const page = () => {
  // --- AUTHENTICATED USER STATE ---
  const [currentUser, setCurrentUser] = useState(null);

  // --- SSR-SAFE: Use default values for initial render, hydrate from localStorage in useEffect ---

  const [activeService, setActiveService] = useLocalStorageState(
    STORAGE_KEYS.ACTIVE_SERVICE,
    "workshop",
  );
  const [formData, setFormData] = useLocalStorageState(STORAGE_KEYS.FORM_DATA, {
    fullName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    participants: "1",
    experience: "",
    workshopType: "beginner",
    firingType: "",
    pieceType: "",
    dimensions: "",
    glazePreference: "",
    message: "",
    newsletter: false,
  });
  const [imagePreview, setImagePreview] = useLocalStorageState(
    STORAGE_KEYS.COMMISSION_IMAGES,
    null,
  );
  const [userProfile, setUserProfile] = useLocalStorageState(
    STORAGE_KEYS.USER_PROFILE,
    null,
  );
  const [useUserData, setUseUserData] = useLocalStorageState(
    STORAGE_KEYS.USE_USER_DATA,
    true,
  );

  // Track hydration to avoid SSR mismatches
  const [isHydrated, setIsHydrated] = useState(false);

  // Form submission states
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Image upload state (file object, not stored)
  const [commissionImage, setCommissionImage] = useState(null);

  // --- Load authenticated user from localStorage ---
  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_KEYS.USER);

    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse user:", error);
      }
    }
  }, []);

  // --- Hydration: Mark as hydrated after mount ---
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // --- Auto-fill form with currentUser data ---
  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        fullName: currentUser?.name || currentUser?.fullName || prev.fullName,
        email: currentUser?.email || prev.email,
        phone: currentUser?.phone || currentUser?.phoneNumber || prev.phone,
      }));
    }
  }, [currentUser, setFormData]);

  // --- Apply legacy user profile data to form after hydration (fallback) ---
  useEffect(() => {
    if (!isHydrated) return;
    if (currentUser) return; // Already handled by currentUser effect

    const storedProfile = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    if (!storedProfile) return;

    try {
      const profile = JSON.parse(storedProfile);
      const storedUseUserData = localStorage.getItem(
        STORAGE_KEYS.USE_USER_DATA,
      );
      const shouldUseUserData = storedUseUserData !== "false";

      if (shouldUseUserData && profile) {
        setFormData((prev) => {
          const next = { ...prev };
          if (!next.fullName && (profile.fullName || profile.name)) {
            next.fullName = profile.fullName || profile.name;
          }
          if (!next.email && profile.email) {
            next.email = profile.email;
          }
          if (!next.phone && (profile.phone || profile.phoneNumber)) {
            next.phone = profile.phone || profile.phoneNumber;
          }
          return next;
        });
      }
    } catch {
      // ignore parse errors
    }
  }, [isHydrated, currentUser, setFormData]);

  // Handle image selection
  const handleImageSelect = useCallback(
    (file) => {
      setCommissionImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    },
    [setImagePreview],
  );

  // Handle image removal
  const handleImageRemove = useCallback(() => {
    setCommissionImage(null);
    setImagePreview(null);
  }, [setImagePreview]);

  // Handle input changes
  const handleChange = useCallback(
    (e) => {
      const { name, value, type, checked } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
      setError(null);
    },
    [setFormData],
  );

  // Toggle user data auto-fill
  const toggleUserData = useCallback(() => {
    setUseUserData((prev) => {
      const next = !prev;
      if (next) {
        // Re-apply currentUser data first, then fallback to legacy profile
        if (currentUser) {
          setFormData((current) => ({
            ...current,
            fullName:
              current.fullName ||
              currentUser?.name ||
              currentUser?.fullName ||
              "",
            email: current.email || currentUser?.email || "",
            phone:
              current.phone ||
              currentUser?.phone ||
              currentUser?.phoneNumber ||
              "",
          }));
        } else {
          const storedProfile = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
          if (storedProfile) {
            try {
              const profile = JSON.parse(storedProfile);
              setFormData((current) => ({
                ...current,
                fullName:
                  current.fullName || profile.fullName || profile.name || "",
                email: current.email || profile.email || "",
                phone:
                  current.phone || profile.phone || profile.phoneNumber || "",
              }));
            } catch {
              // ignore
            }
          }
        }
      }
      return next;
    });
  }, [setUseUserData, setFormData, currentUser]);

  // Clear all stored data
  const clearStoredData = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.FORM_DATA);
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_SERVICE);
    localStorage.removeItem(STORAGE_KEYS.COMMISSION_IMAGES);
  }, []);

  // Handle form submission with REST API
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setSubmitting(true);
      setError(null);

      try {
        const result = await apiService.submitBooking(
          formData,
          activeService,
          commissionImage,
          currentUser?.id,
        );

        // console.log("Booking submitted:", result);

        setSubmitting(false);
        setSubmitted(true);

        // Clear localStorage on successful submission
        clearStoredData();

        // Reset after 4 seconds
        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            fullName: currentUser?.name || currentUser?.fullName || "",
            email: currentUser?.email || "",
            phone: currentUser?.phone || currentUser?.phoneNumber || "",
            date: "",
            time: "",
            participants: "1",
            experience: "",
            workshopType: "beginner",
              firingType: "",
            pieceType: "",
            dimensions: "",
            glazePreference: "",
            message: "",
            newsletter: false,
          });
          setCommissionImage(null);
          setImagePreview(null);
        }, 4000);
      } catch (err) {
        console.error("Submission error:", err);
        setSubmitting(false);
        setError(err.message || "Something went wrong. Please try again.");
      }
    },
    [
      formData,
      activeService,
      commissionImage,
      currentUser,
      clearStoredData,
      setFormData,
      setImagePreview,
    ],
  );

  // Services data
  const services = [
    {
      id: "workshop",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
      title: "Pottery Workshop",
      description:
        "Hands-on wheel throwing and hand-building sessions for all skill levels. Materials and firing included.",
      price: "$65",
      duration: "2.5 hours",
    },
    {
      id: "commission",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
      title: "Custom Commission",
      description:
        "Bespoke ceramic pieces crafted to your vision. From personalized mugs to sculptural centerpieces.",
      price: "From $120",
      duration: "2–4 weeks",
    },
    {
      id: "firing",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.5.5-2.8 1.5-4" />
        </svg>
      ),
      title: "Kiln Firing Service",
      description:
        "Professional bisque and glaze firing for your creations. Multiple kiln sizes available.",
      price: "$25–$80",
      duration: "Per piece",
    },
    {
      id: "private",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: "Private Event",
      description:
        "Team building, birthdays, and group experiences. Up to 12 people with dedicated instructor.",
      price: "$450",
      duration: "3 hours",
    },
  ];

  // Options data
  const workshopOptions = [
    { value: "beginner", label: "Beginner Wheel Throwing" },
    { value: "handbuilding", label: "Hand-Building Basics" },
    { value: "glazing", label: "Glazing Techniques" },
    { value: "advanced", label: "Advanced Throwing" },
    { value: "sculpture", label: "Sculptural Forms" },
  ];

  const experienceOptions = [
    { value: "", label: "Select your experience" },
    { value: "none", label: "No experience" },
    { value: "beginner", label: "Beginner (1–3 sessions)" },
    { value: "intermediate", label: "Intermediate (4–10 sessions)" },
    { value: "advanced", label: "Advanced (10+ sessions)" },
  ];

  const participantOptions = [
    { value: "1", label: "1 Person" },
    { value: "2", label: "2 People" },
    { value: "3", label: "3 People" },
    { value: "4", label: "4 People" },
    { value: "5+", label: "5+ People" },
  ];

  const timeSlots = [
    { value: "", label: "Select time" },
    { value: "09:00", label: "9:00 AM" },
    { value: "11:30", label: "11:30 AM" },
    { value: "14:00", label: "2:00 PM" },
    { value: "16:30", label: "4:30 PM" },
    { value: "18:00", label: "6:00 PM" },
  ];

  const glazeOptions = [
    { value: "", label: "Select glaze preference" },
    { value: "matte-white", label: "Matte White" },
    { value: "speckled", label: "Speckled Cream" },
    { value: "terracotta", label: "Terracotta" },
    { value: "sage", label: "Sage Green" },
    { value: "charcoal", label: "Charcoal" },
    { value: "ocean", label: "Ocean Blue" },
    { value: "custom", label: "Custom — describe below" },
  ];

  // Render form fields based on active service
  const renderFormFields = () => {
    const commonFields = (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            label="Full Name"
            name="fullName"
            placeholder="Your name"
            required
            value={formData.fullName}
            onChange={handleChange}
          />
          <FormField
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            label="Phone"
            name="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={formData.phone}
            onChange={handleChange}
          />
          <FormField
            label="Preferred Date"
            name="date"
            type="date"
            required
            value={formData.date}
            onChange={handleChange}
          />
        </div>
      </>
    );

    switch (activeService) {
      case "workshop":
        return (
          <>
            {commonFields}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                label="Time Slot"
                name="time"
                options={timeSlots}
                required
                value={formData.time}
                onChange={handleChange}
              />
              <FormField
                label="Participants"
                name="participants"
                options={participantOptions}
                value={formData.participants}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                label="Workshop Type"
                name="workshopType"
                options={workshopOptions}
                required
                value={formData.workshopType}
                onChange={handleChange}
              />
              <FormField
                label="Experience Level"
                name="experience"
                options={experienceOptions}
                value={formData.experience}
                onChange={handleChange}
              />
            </div>
            <FormField
              label="Additional Notes"
              name="message"
              placeholder="Any special requests, dietary restrictions, or questions..."
              textarea
              value={formData.message}
              onChange={handleChange}
            />
          </>
        );

      case "commission":
        return (
          <>
            {commonFields}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                label="Piece Type"
                name="pieceType"
                placeholder="e.g., Vase, Mug Set, Bowl..."
                required
                value={formData.pieceType}
                onChange={handleChange}
              />
              <FormField
                label="Approximate Dimensions"
                name="dimensions"
                placeholder="e.g., 20cm × 15cm"
                value={formData.dimensions}
                onChange={handleChange}
              />
            </div>
            <FormField
              label="Glaze Preference"
              name="glazePreference"
              options={glazeOptions}
              value={formData.glazePreference}
              onChange={handleChange}
            />

            <ImageUpload
              imagePreview={imagePreview}
              onImageSelect={handleImageSelect}
              onImageRemove={handleImageRemove}
              disabled={submitting}
            />

            <FormField
              label="Describe Your Vision"
              name="message"
              placeholder="Tell us about colors, textures, shapes, and any reference images or inspiration..."
              textarea
              required
              value={formData.message}
              onChange={handleChange}
            />
          </>
        );

      case "firing":
        return (
          <>
            {commonFields}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                label="Number of Pieces"
                name="participants"
                options={participantOptions}
                value={formData.participants}
                onChange={handleChange}
              />
              <FormField
                label="Firing Type"
                name="firingType"
                options={[
                  { value: "bisque", label: "Bisque Firing" },
                  { value: "glaze", label: "Glaze Firing" },
                  { value: "both", label: "Bisque + Glaze" },
                ]}
                required
                value={formData.firingType}
                onChange={handleChange}
              />
            </div>
            <FormField
              label="Piece Details"
              name="message"
              placeholder="Describe your pieces — sizes, clay type, any special requirements..."
              textarea
              value={formData.message}
              onChange={handleChange}
            />
          </>
        );

      case "private":
        return (
          <>
            {commonFields}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                label="Time Slot"
                name="time"
                options={timeSlots}
                required
                value={formData.time}
                onChange={handleChange}
              />
              <FormField
                label="Group Size"
                name="participants"
                options={[
                  { value: "1", label: "1–4 People" },
                  { value: "2", label: "5–8 People" },
                  { value: "3", label: "9–12 People" },
                ]}
                required
                value={formData.participants}
                onChange={handleChange}
              />
            </div>
            <FormField
              label="Event Type"
              name="pieceType"
              placeholder="e.g., Team Building, Birthday, Bachelorette..."
              value={formData.pieceType}
              onChange={handleChange}
            />
            <FormField
              label="Event Details"
              name="message"
              placeholder="Tell us about your group, any special requests, or dietary needs for refreshments..."
              textarea
              value={formData.message}
              onChange={handleChange}
            />
          </>
        );

      default:
        return null;
    }
  };

  // Inject styles on mount
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
    return () => document.head.removeChild(styleSheet);
  }, []);

  return (
    <div className="min-h-screen bg-[#faf7f3]">

      <NavbarClient />
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
            <div className="max-w-sm rounded-3xl overflow-hidden">
              
            </div>
          </div>
        </div>
      </div>
    </section>

      <section className="relative py-24 md:py-32 px-6 md:px-16 overflow-hidden">
        <div
          className="floating-orb w-80 h-80 bg-[#D4C4B0] bottom-[-10%] left-[-5%] float-anim"
          style={{ animationDelay: "3s" }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <Reveal>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#8A7E72] mb-4 block">
              What We Offer
            </span>
          </Reveal>
          <Reveal delay="reveal-delay-1">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium text-[#3D3228] leading-[1.1] mb-6">
              Our <span className="italic text-[#B8916A]">Services</span>
            </h1>
          </Reveal>
          <Reveal delay="reveal-delay-2">
            <p className="text-[#8A7E72] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              From immersive workshops to bespoke commissions, we offer a range
              of ceramic experiences designed to inspire creativity and craft
              something truly personal.
            </p>
          </Reveal>

          {/* Logged-in user badge */}
          {isHydrated && currentUser && (
            <Reveal delay="reveal-delay-3">
              <div className="mt-6 flex justify-center">
                <div className="user-bar">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span>
                    Welcome back,{" "}
                    <strong>
                      {currentUser?.name ||
                        currentUser?.fullName ||
                        currentUser?.email}
                    </strong>
                  </span>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ============================================
          SERVICES GRID
      ============================================ */}
      <section className="px-6 md:px-16 pb-16">
        <div className="max-w-6xl mx-auto">
          <Reveal delay="reveal-delay-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  {...service}
                  active={activeService === service.id}
                  onClick={() => setActiveService(service.id)}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================
          BOOKING FORM SECTION
      ============================================ */}
      <section className="px-6 md:px-16 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#8A7E72] mb-3 block">
                Book Your Experience
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#3D3228] mb-3">
                {activeService === "workshop" && "Reserve Your Workshop Spot"}
                {activeService === "commission" && "Start Your Custom Piece"}
                {activeService === "firing" && "Schedule Kiln Firing"}
                {activeService === "private" && "Plan Your Private Event"}
              </h2>
              <p className="text-[#8A7E72] max-w-lg mx-auto">
                Fill out the form below and we'll get back to you within 24
                hours to confirm your booking.
              </p>
            </div>
          </Reveal>

          <Reveal delay="reveal-delay-1">
            <div className="glass-card p-8 md:p-12">
              {submitted ? (
                /* Success Message */
                <div className="text-center py-12">
                  <div className="success-check">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl font-medium text-[#3D3228] mb-2">
                    Booking Received!
                  </h3>
                  <p className="text-[#8A7E72]">
                    We'll send a confirmation to {formData.email} shortly.
                  </p>
                </div>
              ) : (
                /* Form */
                <form onSubmit={handleSubmit}>
                  {/* User Data Auto-fill Badge */}
                  {isHydrated && (currentUser || userProfile) && (
                    <div className="flex items-center justify-between mb-6">
                      <div className="user-data-badge">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                        <span>
                          {useUserData
                            ? currentUser
                              ? `Signed in as ${currentUser?.name || currentUser?.fullName || currentUser?.email}`
                              : `Signed in as ${userProfile?.fullName || userProfile?.name || userProfile?.email}`
                            : "Auto-fill disabled"}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={toggleUserData}
                        className="text-xs text-[#B8916A] hover:text-[#9A7A5A] font-medium underline underline-offset-2 transition-colors"
                      >
                        {useUserData ? "Disable auto-fill" : "Enable auto-fill"}
                      </button>
                    </div>
                  )}

                  {/* Error Message */}
                  {error && (
                    <div className="error-message">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      {error}
                    </div>
                  )}

                  {renderFormFields()}

                  {/* Newsletter checkbox */}
                  <div className="flex items-start gap-3 mb-8">
                    <input
                      type="checkbox"
                      name="newsletter"
                      id="newsletter"
                      checked={formData.newsletter}
                      onChange={handleChange}
                      className="form-checkbox mt-0.5"
                    />
                    <label
                      htmlFor="newsletter"
                      className="text-sm text-[#8A7E72] cursor-pointer"
                    >
                      Send me workshop updates, new collection previews, and
                      studio news.
                    </label>
                  </div>

                  {/* Submit button */}
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-primary w-full sm:w-auto justify-center"
                    >
                      {submitting ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          {activeService === "workshop" && "Book Workshop"}
                          {activeService === "commission" && "Request Quote"}
                          {activeService === "firing" && "Schedule Firing"}
                          {activeService === "private" && "Plan Event"}
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </>
                      )}
                    </button>
                    <span className="text-sm text-[#8A7E72]">
                      No payment required now. We'll confirm via email.
                    </span>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================
          FAQ SECTION
      ============================================ */}
      <section className="px-6 md:px-16 py-16 md:py-24 bg-[#F0EBE3]">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#8A7E72] mb-3 block">
                Common Questions
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#3D3228]">
                Frequently Asked
              </h2>
            </div>
          </Reveal>

          <div className="space-y-4">
            {[
              {
                q: "What should I wear to a workshop?",
                a: "Wear comfortable clothes that you don't mind getting clay on. We provide aprons, but clay can be messy! Closed-toe shoes are recommended.",
              },
              {
                q: "How long until my piece is ready?",
                a: "After your workshop, pieces need 1–2 weeks to dry before bisque firing, then another week for glazing and final firing. We'll notify you when ready for pickup.",
              },
              {
                q: "Can I book for a group?",
                a: "Absolutely! For groups of 5+, we recommend our Private Event service. For smaller groups, simply select the number of participants when booking a regular workshop.",
              },
              {
                q: "What if I need to cancel?",
                a: "We offer full refunds for cancellations made 48 hours in advance. Within 48 hours, we can reschedule your booking to a future date at no extra charge.",
              },
              {
                q: "Do you ship commissioned pieces?",
                a: "Yes, we ship domestically and internationally. Shipping costs are calculated based on size and destination, and pieces are carefully packaged to ensure safe arrival.",
              },
            ].map((faq, i) => (
              <Reveal key={i} delay={`reveal-delay-${(i % 3) + 1}`}>
                <div className="glass-card p-6">
                  <h4 className="font-medium text-[#3D3228] mb-2 flex items-start gap-3">
                    <span className="text-[#B8916A] font-serif text-lg">
                      Q.
                    </span>
                    {faq.q}
                  </h4>
                  <p className="text-[#8A7E72] text-sm leading-relaxed pl-7">
                    {faq.a}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          CONTACT CTA SECTION
      ============================================ */}
      <section className="px-6 md:px-16 py-16 md:py-24 relative overflow-hidden">
        <div
          className="floating-orb w-96 h-96 bg-[#C4A882] top-[-10%] left-[-5%] float-anim"
          style={{ animationDelay: "2s" }}
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          <Reveal>
            <div className="glass-card-dark p-10 md:p-16 text-center">
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#F5F0EB] mb-4">
                Not Sure Which Service Fits?
              </h2>
              <p className="text-[#D4C4B0] max-w-lg mx-auto mb-8">
                We'd love to chat about your ideas and help you choose the
                perfect experience. Reach out anytime.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:hello@cerastudio.com"
                  className="btn-primary inline-flex justify-center"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  Email Us
                </a>
                <a
                  href="tel:+15552345678"
                  className="btn-secondary inline-flex justify-center items-center gap-2"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  +1 (555) 234-5678
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default page;
