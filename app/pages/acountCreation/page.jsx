// "use client";
// import Link from "next/link";
// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// const page = () => {
//   const router = useRouter();
//   const [currentMode, setCurrentMode] = useState("login");
//   const [isAnimating, setIsAnimating] = useState(false);
//   const expiresAt = Date.now() + 24 * 60 * 60 * 1000; 


//   // Login form state
//   const [loginForm, setLoginForm] = useState({ email: "", password: "" });
//   const [loginMessage, setLoginMessage] = useState("");
  
//   // Signup form state
//   const [signupForm, setSignupForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [signupMessage, setSignupMessage] = useState("");
//   const [strength, setStrength] = useState(0);



//   // Cursor glow effect
//   useEffect(() => {
  
//     const handleMouseMove = (e) => {
//       const glow = document.getElementById("cursorGlow");
//       if (glow) {
//         glow.style.left = e.clientX + "px";
//         glow.style.top = e.clientY + "px";
//       }
//     };
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   const switchMode = (mode) => {
//     if (mode === currentMode || isAnimating) return;
//     setIsAnimating(true);

//     const loginFormEl = document.getElementById("loginForm");
//     const signupFormEl = document.getElementById("signupForm");

//     if (mode === "signup") {
//       // Animate out login
//       loginFormEl.style.animation = "formExitLeft 0.4s ease forwards";
//       setTimeout(() => {
//         loginFormEl.classList.add("hidden");
//         loginFormEl.style.animation = "";
        
//         signupFormEl.classList.remove("hidden");
//         signupFormEl.style.animation = "formEnterRight 0.5s ease forwards";
//         setTimeout(() => {
//           signupFormEl.style.animation = "";
//           setIsAnimating(false);
//         }, 500);
//       }, 400);
//     } else {
//       // Animate out signup
//       signupFormEl.style.animation = "formExitRight 0.4s ease forwards";
//       setTimeout(() => {
//         signupFormEl.classList.add("hidden");
//         signupFormEl.style.animation = "";
        
//         loginFormEl.classList.remove("hidden");
//         loginFormEl.style.animation = "formEnterLeft 0.5s ease forwards";
//         setTimeout(() => {
//           loginFormEl.style.animation = "";
//           setIsAnimating(false);
//         }, 500);
//       }, 400);
//     }

//     setCurrentMode(mode);
//   };

//   const handleLoginChange = (e) => {
//     setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
//   };

//   const handleSignupChange = (e) => {
//     setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
//     if (e.target.name === "password") {
//       checkStrength(e.target.value);
//     }
//   };

//   const checkStrength = (val) => {
//     let s = 0;
//     if (val.length > 5) s++;
//     if (val.length > 8) s++;
//     if (/[A-Z]/.test(val)) s++;
//     if (/[0-9!@#$%^&*]/.test(val)) s++;
//     setStrength(s);
//   };

//   const getStrengthLabel = () => {
//     const labels = ["Enter a password", "Weak", "Fair", "Good", "Strong"];
//     return labels[strength];
//   };

//   const getStrengthColor = () => {
//     const colors = ["text-[#9C8B7A]", "text-red-300", "text-orange-300", "text-yellow-500", "text-green-400"];
//     return colors[strength];
//   };

//   const togglePassword = (id) => {
//     const input = document.getElementById(id);
//     const btn = input.parentElement.querySelector(".eye-soft");
//     const open = btn.querySelector(".eye-open");
//     const close = btn.querySelector(".eye-close");

//     btn.classList.add("eye-blink");
//     setTimeout(() => btn.classList.remove("eye-blink"), 300);

//     if (input.type === "password") {
//       input.type = "text";
//       open.classList.add("hidden");
//       close.classList.remove("hidden");
//     } else {
//       input.type = "password";
//       open.classList.remove("hidden");
//       close.classList.add("hidden");
//     }
//   };

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     setLoginMessage("");

//     // Admin bypass
//     if (loginForm.email === "admin@admin.ma" && loginForm.password === "12345AA") {
//       localStorage.setItem("role", "admin");
//       setLoginMessage("Admin login successful!");
//       setTimeout(() => router.push("/admin/dashboard"), 800);
//       return;
//     }

//     try {
//       const res = await fetch("http://127.0.0.1:8000/api/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(loginForm),
//       });
//       const data = await res.json();

//       if (res.ok) {
//         if (data.token) localStorage.setItem("token", data.token);

//         if (data.user) {
//         localStorage.setItem("userId", data.user.id.toString());
//         localStorage.setItem("user", JSON.stringify(data.user));
//         console.log(data?.user);
//         localStorage.setItem("expiresAt", expiresAt);
//       }
//         setLoginMessage("Login successful! Redirecting...");
//         setTimeout(() => router.push("/clients/home"), 800);
//       } else {
//         setLoginMessage(data.message || "Login failed");
//       }
//     } catch (err) {
//       setLoginMessage("Server error");
//     }
//   };

//   const handleSignupSubmit = async (e) => {
//     e.preventDefault();
//     setSignupMessage("");

//     if (signupForm.password !== signupForm.confirmPassword) {
//       setSignupMessage("Passwords do not match");
//       return;
//     }

//     try {
//       const response = await fetch("http://127.0.0.1:8000/api/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: signupForm.name,
//           email: signupForm.email,
//           password: signupForm.password,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setSignupMessage("Account created successfully! Redirecting...");
//         setTimeout(() => switchMode("login"), 1200);
//       } else {
//         setSignupMessage(data.message || "Registration failed");
//       }
//     } catch (error) {
//       setSignupMessage("Server error");
//     }
//   };

//   return (
//     <>
//       <style >{`
//         @keyframes gentleFloat {
//           0%, 100% { transform: translate(0, 0) rotate(0deg); }
//           33% { transform: translate(8px, -15px) rotate(1deg); }
//           66% { transform: translate(-5px, 8px) rotate(-0.5deg); }
//         }
//         @keyframes gentleFloatReverse {
//           0%, 100% { transform: translate(0, 0) rotate(0deg); }
//           33% { transform: translate(-10px, 12px) rotate(-1deg); }
//           66% { transform: translate(6px, -8px) rotate(0.5deg); }
//         }
//         @keyframes breathe {
//           0%, 100% { transform: scale(1); opacity: 0.6; }
//           50% { transform: scale(1.08); opacity: 0.8; }
//         }
//         @keyframes drift {
//           0% { transform: translateX(-100px); opacity: 0; }
//           10% { opacity: 0.4; }
//           90% { opacity: 0.4; }
//           100% { transform: translateX(calc(100vw + 100px)); opacity: 0; }
//         }
//         @keyframes softReveal {
//           from { opacity: 0; transform: translateY(30px) scale(0.97); filter: blur(4px); }
//           to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
//         }
//         @keyframes softSlideRight {
//           from { opacity: 0; transform: translateX(-40px); }
//           to { opacity: 1; transform: translateX(0); }
//         }
//         @keyframes softScale {
//           from { opacity: 0; transform: scale(0.9); }
//           to { opacity: 1; transform: scale(1); }
//         }
//         @keyframes letterSpacing {
//           from { letter-spacing: 0.3em; opacity: 0; }
//           to { letter-spacing: 0.2em; opacity: 1; }
//         }
//         @keyframes lineGrow {
//           from { transform: scaleX(0); }
//           to { transform: scaleX(1); }
//         }
//         @keyframes fadeBlurIn {
//           from { opacity: 0; filter: blur(8px); transform: translateY(10px); }
//           to { opacity: 1; filter: blur(0); transform: translateY(0); }
//         }
//         @keyframes formExitLeft {
//           to { opacity: 0; transform: translateX(-30px) scale(0.98); filter: blur(2px); }
//         }
//         @keyframes formExitRight {
//           to { opacity: 0; transform: translateX(30px) scale(0.98); filter: blur(2px); }
//         }
//         @keyframes formEnterLeft {
//           from { opacity: 0; transform: translateX(-30px) scale(0.98); filter: blur(2px); }
//           to { opacity: 1; transform: translateX(0) scale(1); filter: blur(0); }
//         }
//         @keyframes formEnterRight {
//           from { opacity: 0; transform: translateX(30px) scale(0.98); filter: blur(2px); }
//           to { opacity: 1; transform: translateX(0) scale(1); filter: blur(0); }
//         }
//         @keyframes checkAppear {
//           from { opacity: 0; transform: rotate(45deg) scale(0.5); }
//           to { opacity: 1; transform: rotate(45deg) scale(1); }
//         }
//         @keyframes spinSoft {
//           to { transform: rotate(360deg); }
//         }
//         @keyframes eyeBlink {
//           0%, 100% { transform: scaleY(1); }
//           50% { transform: scaleY(0.1); }
//         }

//         .anim-soft-reveal { animation: softReveal 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards; opacity: 0; }
//         .anim-soft-right { animation: softSlideRight 0.7s cubic-bezier(0.19, 1, 0.22, 1) forwards; opacity: 0; }
//         .anim-soft-scale { animation: softScale 0.6s cubic-bezier(0.19, 1, 0.22, 1) forwards; opacity: 0; }
//         .anim-letter-spacing { animation: letterSpacing 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards; opacity: 0; }
//         .anim-line-grow { animation: lineGrow 0.6s cubic-bezier(0.19, 1, 0.22, 1) forwards; transform-origin: left; }
//         .anim-fade-blur { animation: fadeBlurIn 0.7s cubic-bezier(0.19, 1, 0.22, 1) forwards; opacity: 0; }

//         .delay-1 { animation-delay: 0.1s; }
//         .delay-2 { animation-delay: 0.2s; }
//         .delay-3 { animation-delay: 0.3s; }
//         .delay-4 { animation-delay: 0.4s; }
//         .delay-5 { animation-delay: 0.5s; }
//         .delay-6 { animation-delay: 0.6s; }

//         .toggle-soft {
//           position: relative;
//           background: #EDE6DE;
//           border-radius: 100px;
//           padding: 5px;
//           display: flex;
//           width: 260px;
//           box-shadow: inset 0 2px 6px rgba(61,53,46,0.06);
//         }
//         .toggle-pill-soft {
//           position: absolute;
//           top: 5px;
//           left: 5px;
//           width: calc(50% - 5px);
//           height: calc(100% - 10px);
//           background: white;
//           border-radius: 100px;
//           box-shadow: 0 3px 12px rgba(61,53,46,0.08), 0 1px 4px rgba(61,53,46,0.04);
//           transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
//           z-index: 1;
//         }
//         .toggle-btn-soft {
//           position: relative;
//           z-index: 2;
//           flex: 1;
//           padding: 12px 0;
//           text-align: center;
//           font-size: 0.875rem;
//           font-weight: 500;
//           border-radius: 100px;
//           transition: color 0.4s ease;
//           cursor: pointer;
//           border: none;
//           background: transparent;
//           outline: none;
//           letter-spacing: 0.02em;
//         }
//         .toggle-btn-soft.active { color: #3D352E; }
//         .toggle-btn-soft.inactive { color: #9C8B7A; }

//         .input-soft {
//           background: #FAF8F5;
//           border: 1.5px solid transparent;
//           border-radius: 16px;
//           padding: 14px 16px;
//           font-size: 0.9rem;
//           color: #3D352E;
//           transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
//           width: 100%;
//         }
//         .input-soft::placeholder { color: #C4B5A5; font-weight: 300; }
//         .input-soft:hover {
//           background: #FFFFFF;
//           border-color: #E8DDD0;
//         }
//         .input-soft:focus {
//           outline: none;
//           background: #FFFFFF;
//           border-color: #C4A882;
//           box-shadow: 0 0 0 4px rgba(196,168,130,0.1), 0 8px 24px rgba(196,168,130,0.06);
//           transform: translateY(-2px);
//         }

//         .input-wrap-soft { position: relative; }
//         .label-soft {
//           position: absolute;
//           left: 16px;
//           top: 50%;
//           transform: translateY(-50%);
//           color: #9C8B7A;
//           font-size: 0.9rem;
//           font-weight: 300;
//           pointer-events: none;
//           transition: all 0.35s cubic-bezier(0.19, 1, 0.22, 1);
//           padding: 0 4px;
//           background: transparent;
//         }
//         .input-soft:focus ~ .label-soft,
//         .input-soft:not(:placeholder-shown) ~ .label-soft {
//           top: 0;
//           transform: translateY(-50%) scale(0.78);
//           color: #C4A882;
//           background: white;
//           font-weight: 500;
//         }

//         .btn-soft {
//           background: linear-gradient(135deg, #3D352E 0%, #4A4036 50%, #3D352E 100%);
//           background-size: 200% 200%;
//           color: white;
//           border-radius: 16px;
//           padding: 14px 24px;
//           font-weight: 500;
//           font-size: 0.9rem;
//           letter-spacing: 0.02em;
//           transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
//           position: relative;
//           overflow: hidden;
//         }
//         .btn-soft:hover {
//           background-position: 100% 0;
//           transform: translateY(-2px);
//           box-shadow: 0 12px 32px rgba(61,53,46,0.18);
//         }

//         .social-soft {
//           background: #FAF8F5;
//           border: 1.5px solid transparent;
//           border-radius: 14px;
//           padding: 12px;
//           transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
//         .social-soft:hover {
//           background: #FFFFFF;
//           border-color: #E8DDD0;
//           transform: translateY(-3px);
//           box-shadow: 0 8px 20px rgba(61,53,46,0.06);
//         }

//         .check-soft {
//           appearance: none;
//           width: 18px;
//           height: 18px;
//           border: 1.5px solid #D4C8BC;
//           border-radius: 5px;
//           cursor: pointer;
//           transition: all 0.25s cubic-bezier(0.68, -0.55, 0.265, 1.55);
//           position: relative;
//         }
//         .check-soft:hover { border-color: #C4A882; transform: scale(1.05); }
//         .check-soft:checked {
//           background: #3D352E;
//           border-color: #3D352E;
//           transform: scale(1);
//         }
//         .check-soft:checked::after {
//           content: '';
//           position: absolute;
//           left: 5px;
//           top: 2px;
//           width: 5px;
//           height: 9px;
//           border: solid #C4A882;
//           border-width: 0 1.5px 1.5px 0;
//           transform: rotate(45deg);
//           animation: checkAppear 0.25s cubic-bezier(0.68, -0.55, 0.265, 1.55);
//         }

//         .divider-soft {
//           display: flex;
//           align-items: center;
//           gap: 16px;
//         }
//         .divider-soft::before, .divider-soft::after {
//           content: '';
//           flex: 1;
//           height: 1px;
//           background: linear-gradient(90deg, transparent, #E8DDD0, transparent);
//         }

//         .form-panel-soft {
//           position: absolute;
//           inset: 0;
//           transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
//         }

//         .toast-soft {
//           position: fixed;
//           bottom: 24px;
//           left: 50%;
//           transform: translateX(-50%) translateY(100px);
//           background: #3D352E;
//           color: white;
//           padding: 14px 28px;
//           border-radius: 16px;
//           font-size: 0.875rem;
//           font-weight: 500;
//           box-shadow: 0 16px 48px rgba(61,53,46,0.2);
//           opacity: 0;
//           transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
//           z-index: 50;
//           display: flex;
//           align-items: center;
//           gap: 10px;
//         }
//         .toast-soft.show {
//           opacity: 1;
//           transform: translateX(-50%) translateY(0);
//         }

//         .strength-bar-soft {
//           height: 3px;
//           border-radius: 100px;
//           background: #EDE6DE;
//           overflow: hidden;
//         }
//         .strength-fill-soft {
//           height: 100%;
//           border-radius: 100px;
//           transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
//           width: 0;
//         }

//         .card-soft {
//           box-shadow: 0 2px 4px rgba(61,53,46,0.02), 0 8px 16px rgba(61,53,46,0.03), 0 24px 48px rgba(61,53,46,0.06), 0 48px 96px rgba(61,53,46,0.04);
//         }

//         .cursor-glow-soft {
//           position: fixed;
//           width: 400px;
//           height: 400px;
//           background: radial-gradient(circle, rgba(196,168,130,0.06), transparent 70%);
//           border-radius: 50%;
//           pointer-events: none;
//           z-index: 0;
//           transition: transform 0.3s ease-out;
//           transform: translate(-50%, -50%);
//         }

//         .feature-soft {
//           transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
//           cursor: default;
//         }
//         .feature-soft:hover { transform: translateX(6px); }
//         .feature-soft:hover .feature-dot {
//           transform: scale(1.2);
//           background: #C4A882;
//         }
//         .feature-dot {
//           transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
//         }

//         .eye-soft {
//           transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
//         }
//         .eye-soft:hover {
//           color: #3D352E;
//           transform: scale(1.15);
//         }

//         .link-soft {
//           position: relative;
//           color: #C4A882;
//           font-weight: 500;
//           font-size: 0.8rem;
//           transition: color 0.3s ease;
//         }
//         .link-soft::after {
//           content: '';
//           position: absolute;
//           bottom: -2px;
//           left: 0;
//           width: 100%;
//           height: 1px;
//           background: #C4A882;
//           transform: scaleX(0);
//           transform-origin: right;
//           transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);
//         }
//         .link-soft:hover { color: #3D352E; }
//         .link-soft:hover::after {
//           transform: scaleX(1);
//           transform-origin: left;
//         }

//         .spinner-soft { animation: spinSoft 1s linear infinite; }
//         .eye-blink { animation: eyeBlink 0.3s ease; }
//       `}</style>

//       <div className="bg-[#F5F0EB] min-h-screen flex items-center justify-center p-4 overflow-hidden relative">
//         {/* Cursor glow */}
//         <div className="cursor-glow-soft hidden lg:block" id="cursorGlow" />

//         {/* Background shapes */}
//         <div className="absolute w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none opacity-[0.35] bg-[radial-gradient(circle,#D9C9B0,transparent_70%)] top-[-10%] left-[-5%] animate-[gentleFloat_12s_ease-in-out_infinite]" />
//         <div className="absolute w-[350px] h-[350px] rounded-full blur-[100px] pointer-events-none opacity-[0.35] bg-[radial-gradient(circle,#C4A882,transparent_70%)] bottom-[-15%] right-[-10%] animate-[gentleFloatReverse_15s_ease-in-out_infinite]" />
//         <div className="absolute w-[250px] h-[250px] rounded-full blur-[100px] pointer-events-none opacity-[0.35] bg-[radial-gradient(circle,#E8DDD0,transparent_70%)] top-[40%] left-[30%] animate-[breathe_8s_ease-in-out_infinite]" />

//         {/* Drifting particles */}
//         <div className="absolute w-2 h-2 rounded-full bg-[#C4A882] opacity-0 pointer-events-none top-[20%] animate-[drift_20s_linear_infinite]" />
//         <div className="absolute w-1.5 h-1.5 rounded-full bg-[#C4A882] opacity-0 pointer-events-none top-[35%] animate-[drift_25s_linear_infinite_5s]" />
//         <div className="absolute w-2.5 h-2.5 rounded-full bg-[#C4A882] opacity-0 pointer-events-none top-[60%] animate-[drift_18s_linear_infinite_10s]" />
//         <div className="absolute w-1 h-1 rounded-full bg-[#C4A882] opacity-0 pointer-events-none top-[75%] animate-[drift_22s_linear_infinite_3s]" />

//         {/* Main Card */}
//         <div className="card-soft relative z-10 w-full max-w-245 bg-white rounded-[2rem] overflow-hidden flex flex-col lg:flex-row min-h-175 anim-soft-scale">
          
//           {/* Left Panel */}
//           <div className="lg:w-[40%] bg-[#F5F0EB] relative p-8 lg:p-10 flex flex-col justify-between overflow-hidden">
//             <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "radial-gradient(#3D352E 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
            
//             <div className="absolute top-6 right-6 w-24 h-24 rounded-full border border-[#3D352E]/5 animate-[gentleFloat_20s_ease-in-out_infinite]" />
//             <div className="absolute bottom-20 left-4 w-16 h-16 rounded-full border border-[#C4A882]/10 animate-[gentleFloatReverse_15s_ease-in-out_infinite]" />

//             <div className="relative z-10">
//               <div className="flex items-center gap-3 mb-10 anim-soft-right delay-1">
//                 <div className="w-9 h-9 bg-[#3D352E] rounded-xl flex items-center justify-center shadow-sm">
//                   <svg className="w-4 h-4 text-[#F5F0EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
//                   </svg>
//                 </div>
//                 <span className="font-serif text-lg font-semibold text-[#3D352E] tracking-tight">Cera</span>
//               </div>

//               <div className="space-y-1 mb-6">
//                 <p className="font-serif text-3xl lg:text-4xl text-[#3D352E] leading-[1.2] anim-soft-reveal delay-2">
//                   Begin your<br />
//                   <span className="italic text-[#C4A882]">journey</span>
//                 </p>
//               </div>

            
//             </div>

//             <div className="relative z-10 mt-8 lg:mt-0 anim-soft-reveal delay-4">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="h-[1px] bg-[#C4A882]/40 w-8 anim-line-grow delay-5" />
//                 <span className="text-[#9C8B7A] text-[11px] font-medium tracking-[0.2em] uppercase anim-letter-spacing delay-5">
//                   {currentMode === "login" ? "Sign In" : "Sign Up"}
//                 </span>
//               </div>

//               <div className="space-y-3">
//                 <div className="feature-soft flex items-center gap-3 text-[#9C8B7A] text-sm">
//                   <div className="feature-dot w-2 h-2 rounded-full bg-[#C4A882]/40" />
//                   <span>Secure authentication</span>
//                 </div>
//                 <div className="feature-soft flex items-center gap-3 text-[#9C8B7A] text-sm">
//                   <div className="feature-dot w-2 h-2 rounded-full bg-[#C4A882]/40" />
//                   <span>End-to-end encrypted</span>
//                 </div>
//                 <div className="feature-soft flex items-center gap-3 text-[#9C8B7A] text-sm">
//                   <div className="feature-dot w-2 h-2 rounded-full bg-[#C4A882]/40" />
//                   <span>Privacy focused</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Panel */}
//           <div className="lg:w-[60%] p-4 pt-2 lg:p-10 lg:pt-0 relative flex flex-col justify-center">
            
//             {/* Toggle */}
//             <div className="flex justify-center mb-3 anim-soft-reveal delay-2">
//               <div className="toggle-soft">
//                 <div 
//                   className="toggle-pill-soft" 
//                   style={{ transform: currentMode === "signup" ? "translateX(100%)" : "translateX(0)" }}
//                 />
//                 <button 
//                   onClick={() => switchMode("login")} 
//                   className={`toggle-btn-soft ${currentMode === "login" ? "active" : "inactive"}`}
//                 >
//                   Sign In
//                 </button>
//                 <button 
//                   onClick={() => switchMode("signup")} 
//                   className={`toggle-btn-soft ${currentMode === "signup" ? "active" : "inactive"}`}
//                 >
//                   Sign Up
//                 </button>
//               </div>
//             </div>

//             {/* Forms */}
//             <div className="relative min-h-[380px]">
              
//               {/* Login Form */}
//               <div id="loginForm" className="form-panel-soft max-w-sm mx-auto">
//                 <div className="text-center mb-8">
//                   <h1 className="font-serif text-2xl text-[#3D352E] mb-2 anim-soft-reveal">Welcome back</h1>
                 
//                 </div>

//                 <form onSubmit={handleLoginSubmit} className="space-y-4">
//                   <div className="input-wrap-soft anim-soft-reveal delay-1">
//                     <input 
//                       type="email" 
//                       name="email"
//                       id="loginEmail"
//                       value={loginForm.email}
//                       onChange={handleLoginChange}
//                       required 
//                       placeholder=" " 
//                       className="input-soft pr-10" 
//                     />
//                     <label htmlFor="loginEmail" className="label-soft">Email address</label>
//                     <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9C8B7A]/30 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
//                     </svg>
//                   </div>

//                   <div className="input-wrap-soft anim-soft-reveal delay-2">
//                     <input 
//                       type="password" 
//                       name="password"
//                       id="loginPass"
//                       value={loginForm.password}
//                       onChange={handleLoginChange}
//                       required 
//                       placeholder=" " 
//                       className="input-soft pr-10" 
//                     />
//                     <label htmlFor="loginPass" className="label-soft">Password</label>
//                     <button type="button" onClick={() => togglePassword("loginPass")} className="eye-soft absolute right-4 top-1/2 -translate-y-1/2 text-[#9C8B7A]/30">
//                       <svg className="w-4 h-4 eye-open" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                       </svg>
//                       <svg className="w-4 h-4 eye-close hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                       </svg>
//                     </button>
//                   </div>

//                   <div className="flex items-center justify-between anim-soft-reveal delay-3">
//                     <label className="flex items-center gap-2.5 cursor-pointer group">
//                       {/* <input type="checkbox" className="check-soft" /> */}
//                       {/* <span className="text-[#9C8B7A] text-xs group-hover:text-[#3D352E] transition-colors">Remember me</span> */}
//                     </label>
//                     <Link href="#" className="link-soft">Forgot password?</Link>
//                   </div>

//                   <button type="submit" className="btn-soft w-full flex items-center justify-center gap-2 group anim-soft-reveal delay-4">
//                     <span>Sign In</span>
//                     <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                     </svg>
//                   </button>
//                 </form>

//                 {loginMessage && (
//                   <p className="text-center text-sm mt-3 text-[#9C8B7A]">{loginMessage}</p>
//                 )}

             

              
//               </div>

//               {/* Signup Form */}
//               <div id="signupForm" className="form-panel-soft max-w-sm mx-auto  hidden">
//                 <div className="text-center mb-6">
//                   <h1 className="font-serif text-2xl text-[#3D352E] mb-2">Create account</h1>
//                   <p className="text-[#9C8B7A] text-sm">A new beginning awaits.</p>
//                 </div>

//                 <form onSubmit={handleSignupSubmit} className="space-y-4">
//                   <div className="input-wrap-soft">
//                     <input 
//                       type="text" 
//                       name="name"
//                       id="signupName"
//                       value={signupForm.name}
//                       onChange={handleSignupChange}
//                       required 
//                       placeholder=" " 
//                       className="input-soft" 
//                     />
//                     <label htmlFor="signupName" className="label-soft">Full name</label>
//                   </div>

//                   <div className="input-wrap-soft">
//                     <input 
//                       type="email" 
//                       name="email"
//                       id="signupEmail"
//                       value={signupForm.email}
//                       onChange={handleSignupChange}
//                       required 
//                       placeholder=" " 
//                       className="input-soft" 
//                     />
//                     <label htmlFor="signupEmail" className="label-soft">Email address</label>
//                   </div>

//                   <div className="input-wrap-soft">
//                     <input 
//                       type="password" 
//                       name="password"
//                       id="signupPass"
//                       value={signupForm.password}
//                       onChange={handleSignupChange}
//                       required 
//                       placeholder=" " 
//                       className="input-soft pr-10" 
//                     />
//                     <label htmlFor="signupPass" className="label-soft">Password</label>
//                     <button type="button" onClick={() => togglePassword("signupPass")} className="eye-soft absolute right-4 top-1/2 -translate-y-1/2 text-[#9C8B7A]/30">
//                       <svg className="w-4 h-4 eye-open" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                       </svg>
//                       <svg className="w-4 h-4 eye-close hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                       </svg>
//                     </button>
//                   </div>

//                   <div className="input-wrap-soft">
//                     <input 
//                       type="password" 
//                       name="confirmPassword"
//                       id="signupConfirmPass"
//                       value={signupForm.confirmPassword}
//                       onChange={handleSignupChange}
//                       required 
//                       placeholder=" " 
//                       className="input-soft pr-10" 
//                     />
//                     <label htmlFor="signupConfirmPass" className="label-soft">Confirm password</label>
//                   </div>

//                   {/* Strength */}
//                   <div className="space-y-1.5">
//                     <div className="flex gap-1.5">
//                       <div className="strength-bar-soft flex-1"><div className="strength-fill-soft bg-red-300" style={{ width: strength >= 1 ? "100%" : "0" }} /></div>
//                       <div className="strength-bar-soft flex-1"><div className="strength-fill-soft bg-orange-300" style={{ width: strength >= 2 ? "100%" : "0" }} /></div>
//                       <div className="strength-bar-soft flex-1"><div className="strength-fill-soft bg-yellow-300" style={{ width: strength >= 3 ? "100%" : "0" }} /></div>
//                       <div className="strength-bar-soft flex-1"><div className="strength-fill-soft bg-green-300" style={{ width: strength >= 4 ? "100%" : "0" }} /></div>
//                     </div>
//                     <p className={`text-xs transition-colors duration-300 ${getStrengthColor()}`}>{getStrengthLabel()}</p>
//                   </div>

//                   <label className="flex items-start gap-2.5 cursor-pointer group">
//                     <input type="checkbox" required className="check-soft mt-0.5" />
//                     <span className="text-[#9C8B7A] text-xs leading-relaxed group-hover:text-[#3D352E] transition-colors">
//                       I agree to the <Link href="#" className="link-soft">Terms</Link> and <Link href="#" className="link-soft">Privacy</Link>
//                     </span>
//                   </label>

//                   <button type="submit" className="btn-soft w-full flex items-center justify-center gap-2 group">
//                     <span>Create Account</span>
//                     <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                     </svg>
//                   </button>
//                 </form>

//                 {signupMessage && (
//                   <p className="text-center text-sm mt-3 text-[#9C8B7A]">{signupMessage}</p>
//                 )}

              
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default page;
"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [currentMode, setCurrentMode] = useState("login");
  const [isAnimating, setIsAnimating] = useState(false);
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000; 

  // Login form state
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginMessage, setLoginMessage] = useState("");
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  
  // Signup form state
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [signupMessage, setSignupMessage] = useState("");
  const [isSignupLoading, setIsSignupLoading] = useState(false);
  const [strength, setStrength] = useState(0);

  // Cursor glow effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const glow = document.getElementById("cursorGlow");
      if (glow) {
        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const switchMode = (mode) => {
    if (mode === currentMode || isAnimating) return;
    setIsAnimating(true);

    const loginFormEl = document.getElementById("loginForm");
    const signupFormEl = document.getElementById("signupForm");

    if (mode === "signup") {
      loginFormEl.style.animation = "formExitLeft 0.4s ease forwards";
      setTimeout(() => {
        loginFormEl.classList.add("hidden");
        loginFormEl.style.animation = "";
        
        signupFormEl.classList.remove("hidden");
        signupFormEl.style.animation = "formEnterRight 0.5s ease forwards";
        setTimeout(() => {
          signupFormEl.style.animation = "";
          setIsAnimating(false);
        }, 500);
      }, 400);
    } else {
      signupFormEl.style.animation = "formExitRight 0.4s ease forwards";
      setTimeout(() => {
        signupFormEl.classList.add("hidden");
        signupFormEl.style.animation = "";
        
        loginFormEl.classList.remove("hidden");
        loginFormEl.style.animation = "formEnterLeft 0.5s ease forwards";
        setTimeout(() => {
          loginFormEl.style.animation = "";
          setIsAnimating(false);
        }, 500);
      }, 400);
    }

    setCurrentMode(mode);
  };

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
    if (e.target.name === "password") {
      checkStrength(e.target.value);
    }
  };

  const checkStrength = (val) => {
    let s = 0;
    if (val.length > 5) s++;
    if (val.length > 8) s++;
    if (/[A-Z]/.test(val)) s++;
    if (/[0-9!@#$%^&*]/.test(val)) s++;
    setStrength(s);
  };

  const getStrengthLabel = () => {
    const labels = ["Enter a password", "Weak", "Fair", "Good", "Strong"];
    return labels[strength];
  };

  const getStrengthColor = () => {
    const colors = ["text-[#9C8B7A]", "text-red-300", "text-orange-300", "text-yellow-500", "text-green-400"];
    return colors[strength];
  };

  const togglePassword = (id) => {
    const input = document.getElementById(id);
    const btn = input.parentElement.querySelector(".eye-soft");
    const open = btn.querySelector(".eye-open");
    const close = btn.querySelector(".eye-close");

    btn.classList.add("eye-blink");
    setTimeout(() => btn.classList.remove("eye-blink"), 300);

    if (input.type === "password") {
      input.type = "text";
      open.classList.add("hidden");
      close.classList.remove("hidden");
    } else {
      input.type = "password";
      open.classList.remove("hidden");
      close.classList.add("hidden");
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginMessage("");
    setIsLoginLoading(true);

    // Admin bypass
    if (loginForm.email === "admin@admin.ma" && loginForm.password === "12345AA") {
      localStorage.setItem("role", "admin");
      setLoginMessage("Admin login successful!");
      setTimeout(() => {
        setIsLoginLoading(false);
        router.push("/admin/dashboard");
      }, 800);
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });
      const data = await res.json();

      if (res.ok) {
        if (data.token) localStorage.setItem("token", data.token);

        if (data.user) {
          localStorage.setItem("userId", data.user.id.toString());
          localStorage.setItem("user", JSON.stringify(data.user));
          console.log(data?.user);
          localStorage.setItem("expiresAt", expiresAt);
        }
        setLoginMessage("Login successful! Redirecting...");
        setTimeout(() => router.push("/clients/home"), 800);
      } else {
        setLoginMessage(data.message || "Login failed");
      }
    } catch (err) {
      setLoginMessage("Server error");
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setSignupMessage("");
    setIsSignupLoading(true);

    if (signupForm.password !== signupForm.confirmPassword) {
      setSignupMessage("Passwords do not match");
      setIsSignupLoading(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: signupForm.name,
          email: signupForm.email,
          password: signupForm.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSignupMessage("Account created successfully! Redirecting...");
        setTimeout(() => switchMode("login"), 1200);
      } else {
        setSignupMessage(data.message || "Registration failed");
      }
    } catch (error) {
      setSignupMessage("Server error");
    } finally {
      setIsSignupLoading(false);
    }
  };

  return (
    <>
      <style >{`
        @keyframes gentleFloat {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(8px, -15px) rotate(1deg); }
          66% { transform: translate(-5px, 8px) rotate(-0.5deg); }
        }
        @keyframes gentleFloatReverse {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-10px, 12px) rotate(-1deg); }
          66% { transform: translate(6px, -8px) rotate(0.5deg); }
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.08); opacity: 0.8; }
        }
        @keyframes drift {
          0% { transform: translateX(-100px); opacity: 0; }
          10% { opacity: 0.4; }
          90% { opacity: 0.4; }
          100% { transform: translateX(calc(100vw + 100px)); opacity: 0; }
        }
        @keyframes softReveal {
          from { opacity: 0; transform: translateY(30px) scale(0.97); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @keyframes softSlideRight {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes softScale {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes letterSpacing {
          from { letter-spacing: 0.3em; opacity: 0; }
          to { letter-spacing: 0.2em; opacity: 1; }
        }
        @keyframes lineGrow {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes fadeBlurIn {
          from { opacity: 0; filter: blur(8px); transform: translateY(10px); }
          to { opacity: 1; filter: blur(0); transform: translateY(0); }
        }
        @keyframes formExitLeft {
          to { opacity: 0; transform: translateX(-30px) scale(0.98); filter: blur(2px); }
        }
        @keyframes formExitRight {
          to { opacity: 0; transform: translateX(30px) scale(0.98); filter: blur(2px); }
        }
        @keyframes formEnterLeft {
          from { opacity: 0; transform: translateX(-30px) scale(0.98); filter: blur(2px); }
          to { opacity: 1; transform: translateX(0) scale(1); filter: blur(0); }
        }
        @keyframes formEnterRight {
          from { opacity: 0; transform: translateX(30px) scale(0.98); filter: blur(2px); }
          to { opacity: 1; transform: translateX(0) scale(1); filter: blur(0); }
        }
        @keyframes checkAppear {
          from { opacity: 0; transform: rotate(45deg) scale(0.5); }
          to { opacity: 1; transform: rotate(45deg) scale(1); }
        }
        @keyframes spinSoft {
          to { transform: rotate(360deg); }
        }
        @keyframes eyeBlink {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.1); }
        }

        .anim-soft-reveal { animation: softReveal 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards; opacity: 0; }
        .anim-soft-right { animation: softSlideRight 0.7s cubic-bezier(0.19, 1, 0.22, 1) forwards; opacity: 0; }
        .anim-soft-scale { animation: softScale 0.6s cubic-bezier(0.19, 1, 0.22, 1) forwards; opacity: 0; }
        .anim-letter-spacing { animation: letterSpacing 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards; opacity: 0; }
        .anim-line-grow { animation: lineGrow 0.6s cubic-bezier(0.19, 1, 0.22, 1) forwards; transform-origin: left; }
        .anim-fade-blur { animation: fadeBlurIn 0.7s cubic-bezier(0.19, 1, 0.22, 1) forwards; opacity: 0; }

        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
        .delay-4 { animation-delay: 0.4s; }
        .delay-5 { animation-delay: 0.5s; }
        .delay-6 { animation-delay: 0.6s; }

        .toggle-soft {
          position: relative;
          background: #EDE6DE;
          border-radius: 100px;
          padding: 5px;
          display: flex;
          width: 260px;
          box-shadow: inset 0 2px 6px rgba(61,53,46,0.06);
        }
        .toggle-pill-soft {
          position: absolute;
          top: 5px;
          left: 5px;
          width: calc(50% - 5px);
          height: calc(100% - 10px);
          background: white;
          border-radius: 100px;
          box-shadow: 0 3px 12px rgba(61,53,46,0.08), 0 1px 4px rgba(61,53,46,0.04);
          transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          z-index: 1;
        }
        .toggle-btn-soft {
          position: relative;
          z-index: 2;
          flex: 1;
          padding: 12px 0;
          text-align: center;
          font-size: 0.875rem;
          font-weight: 500;
          border-radius: 100px;
          transition: color 0.4s ease;
          cursor: pointer;
          border: none;
          background: transparent;
          outline: none;
          letter-spacing: 0.02em;
        }
        .toggle-btn-soft.active { color: #3D352E; }
        .toggle-btn-soft.inactive { color: #9C8B7A; }

        .input-soft {
          background: #FAF8F5;
          border: 1.5px solid transparent;
          border-radius: 16px;
          padding: 14px 16px;
          font-size: 0.9rem;
          color: #3D352E;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          width: 100%;
        }
        .input-soft::placeholder { color: #C4B5A5; font-weight: 300; }
        .input-soft:hover {
          background: #FFFFFF;
          border-color: #E8DDD0;
        }
        .input-soft:focus {
          outline: none;
          background: #FFFFFF;
          border-color: #C4A882;
          box-shadow: 0 0 0 4px rgba(196,168,130,0.1), 0 8px 24px rgba(196,168,130,0.06);
          transform: translateY(-2px);
        }

        .input-wrap-soft { position: relative; }
        .label-soft {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #9C8B7A;
          font-size: 0.9rem;
          font-weight: 300;
          pointer-events: none;
          transition: all 0.35s cubic-bezier(0.19, 1, 0.22, 1);
          padding: 0 4px;
          background: transparent;
        }
        .input-soft:focus ~ .label-soft,
        .input-soft:not(:placeholder-shown) ~ .label-soft {
          top: 0;
          transform: translateY(-50%) scale(0.78);
          color: #C4A882;
          background: white;
          font-weight: 500;
        }

        .btn-soft {
          background: linear-gradient(135deg, #3D352E 0%, #4A4036 50%, #3D352E 100%);
          background-size: 200% 200%;
          color: white;
          border-radius: 16px;
          padding: 14px 24px;
          font-weight: 500;
          font-size: 0.9rem;
          letter-spacing: 0.02em;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: hidden;
        }
        .btn-soft:hover {
          background-position: 100% 0;
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(61,53,46,0.18);
        }

        .social-soft {
          background: #FAF8F5;
          border: 1.5px solid transparent;
          border-radius: 14px;
          padding: 12px;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .social-soft:hover {
          background: #FFFFFF;
          border-color: #E8DDD0;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(61,53,46,0.06);
        }

        .check-soft {
          appearance: none;
          width: 18px;
          height: 18px;
          border: 1.5px solid #D4C8BC;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          position: relative;
        }
        .check-soft:hover { border-color: #C4A882; transform: scale(1.05); }
        .check-soft:checked {
          background: #3D352E;
          border-color: #3D352E;
          transform: scale(1);
        }
        .check-soft:checked::after {
          content: '';
          position: absolute;
          left: 5px;
          top: 2px;
          width: 5px;
          height: 9px;
          border: solid #C4A882;
          border-width: 0 1.5px 1.5px 0;
          transform: rotate(45deg);
          animation: checkAppear 0.25s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .divider-soft {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .divider-soft::before, .divider-soft::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, #E8DDD0, transparent);
        }

        .form-panel-soft {
          position: absolute;
          inset: 0;
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .toast-soft {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%) translateY(100px);
          background: #3D352E;
          color: white;
          padding: 14px 28px;
          border-radius: 16px;
          font-size: 0.875rem;
          font-weight: 500;
          box-shadow: 0 16px 48px rgba(61,53,46,0.2);
          opacity: 0;
          transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
          z-index: 50;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .toast-soft.show {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }

        .strength-bar-soft {
          height: 3px;
          border-radius: 100px;
          background: #EDE6DE;
          overflow: hidden;
        }
        .strength-fill-soft {
          height: 100%;
          border-radius: 100px;
          transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
          width: 0;
        }

        .card-soft {
          box-shadow: 0 2px 4px rgba(61,53,46,0.02), 0 8px 16px rgba(61,53,46,0.03), 0 24px 48px rgba(61,53,46,0.06), 0 48px 96px rgba(61,53,46,0.04);
        }

        .cursor-glow-soft {
          position: fixed;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(196,168,130,0.06), transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          transition: transform 0.3s ease-out;
          transform: translate(-50%, -50%);
        }

        .feature-soft {
          transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          cursor: default;
        }
        .feature-soft:hover { transform: translateX(6px); }
        .feature-soft:hover .feature-dot {
          transform: scale(1.2);
          background: #C4A882;
        }
        .feature-dot {
          transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .eye-soft {
          transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .eye-soft:hover {
          color: #3D352E;
          transform: scale(1.15);
        }

        .link-soft {
          position: relative;
          color: #C4A882;
          font-weight: 500;
          font-size: 0.8rem;
          transition: color 0.3s ease;
        }
        .link-soft::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 1px;
          background: #C4A882;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .link-soft:hover { color: #3D352E; }
        .link-soft:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        .spinner-soft { animation: spinSoft 1s linear infinite; }
        .eye-blink { animation: eyeBlink 0.3s ease; }
      `}</style>

      <div className="bg-[#F5F0EB] min-h-screen flex items-center justify-center p-4 overflow-hidden relative">
        {/* Cursor glow */}
        <div className="cursor-glow-soft hidden lg:block" id="cursorGlow" />

        {/* Background shapes */}
        <div className="absolute w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none opacity-[0.35] bg-[radial-gradient(circle,#D9C9B0,transparent_70%)] top-[-10%] left-[-5%] animate-[gentleFloat_12s_ease-in-out_infinite]" />
        <div className="absolute w-[350px] h-[350px] rounded-full blur-[100px] pointer-events-none opacity-[0.35] bg-[radial-gradient(circle,#C4A882,transparent_70%)] bottom-[-15%] right-[-10%] animate-[gentleFloatReverse_15s_ease-in-out_infinite]" />
        <div className="absolute w-[250px] h-[250px] rounded-full blur-[100px] pointer-events-none opacity-[0.35] bg-[radial-gradient(circle,#E8DDD0,transparent_70%)] top-[40%] left-[30%] animate-[breathe_8s_ease-in-out_infinite]" />

        {/* Drifting particles */}
        <div className="absolute w-2 h-2 rounded-full bg-[#C4A882] opacity-0 pointer-events-none top-[20%] animate-[drift_20s_linear_infinite]" />
        <div className="absolute w-1.5 h-1.5 rounded-full bg-[#C4A882] opacity-0 pointer-events-none top-[35%] animate-[drift_25s_linear_infinite_5s]" />
        <div className="absolute w-2.5 h-2.5 rounded-full bg-[#C4A882] opacity-0 pointer-events-none top-[60%] animate-[drift_18s_linear_infinite_10s]" />
        <div className="absolute w-1 h-1 rounded-full bg-[#C4A882] opacity-0 pointer-events-none top-[75%] animate-[drift_22s_linear_infinite_3s]" />

        {/* Main Card */}
        <div className="card-soft relative z-10 w-full max-w-245 bg-white rounded-[2rem] overflow-hidden flex flex-col lg:flex-row min-h-175 anim-soft-scale">
          
          {/* Left Panel */}
          <div className="lg:w-[40%] bg-[#F5F0EB] relative p-8 lg:p-10 flex flex-col justify-between overflow-hidden">
            <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "radial-gradient(#3D352E 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
            
            <div className="absolute top-6 right-6 w-24 h-24 rounded-full border border-[#3D352E]/5 animate-[gentleFloat_20s_ease-in-out_infinite]" />
            <div className="absolute bottom-20 left-4 w-16 h-16 rounded-full border border-[#C4A882]/10 animate-[gentleFloatReverse_15s_ease-in-out_infinite]" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-10 anim-soft-right delay-1">
                <div className="w-9 h-9 bg-[#3D352E] rounded-xl flex items-center justify-center shadow-sm">
                  <svg className="w-4 h-4 text-[#F5F0EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="font-serif text-lg font-semibold text-[#3D352E] tracking-tight">Cera</span>
              </div>

              <div className="space-y-1 mb-6">
                <p className="font-serif text-3xl lg:text-4xl text-[#3D352E] leading-[1.2] anim-soft-reveal delay-2">
                  Begin your<br />
                  <span className="italic text-[#C4A882]">journey</span>
                </p>
              </div>

            </div>

            <div className="relative z-10 mt-8 lg:mt-0 anim-soft-reveal delay-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[1px] bg-[#C4A882]/40 w-8 anim-line-grow delay-5" />
                <span className="text-[#9C8B7A] text-[11px] font-medium tracking-[0.2em] uppercase anim-letter-spacing delay-5">
                  {currentMode === "login" ? "Sign In" : "Sign Up"}
                </span>
              </div>

              <div className="space-y-3">
                <div className="feature-soft flex items-center gap-3 text-[#9C8B7A] text-sm">
                  <div className="feature-dot w-2 h-2 rounded-full bg-[#C4A882]/40" />
                  <span>Secure authentication</span>
                </div>
                <div className="feature-soft flex items-center gap-3 text-[#9C8B7A] text-sm">
                  <div className="feature-dot w-2 h-2 rounded-full bg-[#C4A882]/40" />
                  <span>End-to-end encrypted</span>
                </div>
                <div className="feature-soft flex items-center gap-3 text-[#9C8B7A] text-sm">
                  <div className="feature-dot w-2 h-2 rounded-full bg-[#C4A882]/40" />
                  <span>Privacy focused</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="lg:w-[60%] p-4 pt-2 lg:p-10 lg:pt-0 relative flex flex-col justify-center">
            
            {/* Toggle */}
            <div className="flex justify-center mb-3 anim-soft-reveal delay-2">
              <div className="toggle-soft">
                <div 
                  className="toggle-pill-soft" 
                  style={{ transform: currentMode === "signup" ? "translateX(100%)" : "translateX(0)" }}
                />
                <button 
                  onClick={() => switchMode("login")} 
                  className={`toggle-btn-soft ${currentMode === "login" ? "active" : "inactive"}`}
                >
                  Sign In
                </button>
                <button 
                  onClick={() => switchMode("signup")} 
                  className={`toggle-btn-soft ${currentMode === "signup" ? "active" : "inactive"}`}
                >
                  Sign Up
                </button>
              </div>
            </div>

            {/* Forms */}
            <div className="relative min-h-[380px]">
              
              {/* Login Form */}
              <div id="loginForm" className="form-panel-soft max-w-sm mx-auto">
                <div className="text-center mb-8">
                  <h1 className="font-serif text-2xl text-[#3D352E] mb-2 anim-soft-reveal">Welcome back</h1>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div className="input-wrap-soft anim-soft-reveal delay-1">
                    <input 
                      type="email" 
                      name="email"
                      id="loginEmail"
                      value={loginForm.email}
                      onChange={handleLoginChange}
                      required 
                      placeholder=" " 
                      className="input-soft pr-10" 
                    />
                    <label htmlFor="loginEmail" className="label-soft">Email address</label>
                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9C8B7A]/30 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>

                  <div className="input-wrap-soft anim-soft-reveal delay-2">
                    <input 
                      type="password" 
                      name="password"
                      id="loginPass"
                      value={loginForm.password}
                      onChange={handleLoginChange}
                      required 
                      placeholder=" " 
                      className="input-soft pr-10" 
                    />
                    <label htmlFor="loginPass" className="label-soft">Password</label>
                    <button type="button" onClick={() => togglePassword("loginPass")} className="eye-soft absolute right-4 top-1/2 -translate-y-1/2 text-[#9C8B7A]/30">
                      <svg className="w-4 h-4 eye-open" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <svg className="w-4 h-4 eye-close hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center justify-between anim-soft-reveal delay-3">
                    <label className="flex items-center gap-2.5 cursor-pointer group">
                    </label>
                    <Link href="#" className="link-soft">Forgot password?</Link>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isLoginLoading}
                    className="btn-soft w-full flex items-center justify-center gap-2 group anim-soft-reveal delay-4 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isLoginLoading ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In</span>
                        <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>

                {loginMessage && (
                  <p className="text-center text-sm mt-3 text-[#9C8B7A]">{loginMessage}</p>
                )}
              </div>

              {/* Signup Form */}
              <div id="signupForm" className="form-panel-soft max-w-sm mx-auto hidden">
                <div className="text-center mb-6">
                  <h1 className="font-serif text-2xl text-[#3D352E] mb-2">Create account</h1>
                  <p className="text-[#9C8B7A] text-sm">A new beginning awaits.</p>
                </div>

                <form onSubmit={handleSignupSubmit} className="space-y-4">
                  <div className="input-wrap-soft">
                    <input 
                      type="text" 
                      name="name"
                      id="signupName"
                      value={signupForm.name}
                      onChange={handleSignupChange}
                      required 
                      placeholder=" " 
                      className="input-soft" 
                    />
                    <label htmlFor="signupName" className="label-soft">Full name</label>
                  </div>

                  <div className="input-wrap-soft">
                    <input 
                      type="email" 
                      name="email"
                      id="signupEmail"
                      value={signupForm.email}
                      onChange={handleSignupChange}
                      required 
                      placeholder=" " 
                      className="input-soft" 
                    />
                    <label htmlFor="signupEmail" className="label-soft">Email address</label>
                  </div>

                  <div className="input-wrap-soft">
                    <input 
                      type="password" 
                      name="password"
                      id="signupPass"
                      value={signupForm.password}
                      onChange={handleSignupChange}
                      required 
                      placeholder=" " 
                      className="input-soft pr-10" 
                    />
                    <label htmlFor="signupPass" className="label-soft">Password</label>
                    <button type="button" onClick={() => togglePassword("signupPass")} className="eye-soft absolute right-4 top-1/2 -translate-y-1/2 text-[#9C8B7A]/30">
                      <svg className="w-4 h-4 eye-open" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <svg className="w-4 h-4 eye-close hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    </button>
                  </div>

                  <div className="input-wrap-soft">
                    <input 
                      type="password" 
                      name="confirmPassword"
                      id="signupConfirmPass"
                      value={signupForm.confirmPassword}
                      onChange={handleSignupChange}
                      required 
                      placeholder=" " 
                      className="input-soft pr-10" 
                    />
                    <label htmlFor="signupConfirmPass" className="label-soft">Confirm password</label>
                  </div>

                  {/* Strength */}
                  <div className="space-y-1.5">
                    <div className="flex gap-1.5">
                      <div className="strength-bar-soft flex-1"><div className="strength-fill-soft bg-red-300" style={{ width: strength >= 1 ? "100%" : "0" }} /></div>
                      <div className="strength-bar-soft flex-1"><div className="strength-fill-soft bg-orange-300" style={{ width: strength >= 2 ? "100%" : "0" }} /></div>
                      <div className="strength-bar-soft flex-1"><div className="strength-fill-soft bg-yellow-300" style={{ width: strength >= 3 ? "100%" : "0" }} /></div>
                      <div className="strength-bar-soft flex-1"><div className="strength-fill-soft bg-green-300" style={{ width: strength >= 4 ? "100%" : "0" }} /></div>
                    </div>
                    <p className={`text-xs transition-colors duration-300 ${getStrengthColor()}`}>{getStrengthLabel()}</p>
                  </div>

                  <label className="flex items-start gap-2.5 cursor-pointer group">
                    <input type="checkbox" required className="check-soft mt-0.5" />
                    <span className="text-[#9C8B7A] text-xs leading-relaxed group-hover:text-[#3D352E] transition-colors">
                      I agree to the <Link href="#" className="link-soft">Terms</Link> and <Link href="#" className="link-soft">Privacy</Link>
                    </span>
                  </label>

                  <button 
                    type="submit" 
                    disabled={isSignupLoading}
                    className="btn-soft w-full flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSignupLoading ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>Create Account</span>
                        <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>

                {signupMessage && (
                  <p className="text-center text-sm mt-3 text-[#9C8B7A]">{signupMessage}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;