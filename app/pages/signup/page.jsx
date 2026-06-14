'use client'
import Link from 'next/link'
import React from 'react'
import { useState } from 'react';

const page = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Account created successfully!");
      } else {
        setMessage(data.message || "Registration failed");
      }
    } catch (error) {
      setMessage("Server error");
    }
  };
  return (
    <>
     <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden">
      {/* Moonlit Fog Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 30% 70%, rgba(176, 196, 222, 0.15) 0%, transparent 50%),
            linear-gradient(135deg, 
              #2c3e50 0%,
              #3a506b 25%,
              #435e79 50%,
              #516b87 75%,
              #5f7995 100%
            )
          `,
          backgroundBlendMode: "soft-light, screen, normal",
          filter: "brightness(1.05) contrast(1.05)",
        }}
      />

      {/* Glow Effects */}
      <div className="absolute w-72 h-72 bg-white/10 blur-3xl rounded-full top-10 left-10 animate-pulse" />
      <div className="absolute w-72 h-72 bg-blue-200/10 blur-3xl rounded-full bottom-10 right-10 animate-pulse" />

      {/* Signup Card */}
      <div className="relative z-10 w-full max-w-md px-4 sm:px-6">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-6 sm:p-8 transition-transform duration-300 hover:scale-[1.01]">

          {/* Title */}
          <h1 className="text-white text-3xl font-bold text-center">
            Create Account
          </h1>
          <p className="text-white/70 text-center mt-2 mb-6">
            Join Clair and start your journey
          </p>

          {/* Form */}
          <form method='post' className="space-y-4">
            {/* Name */}
            <div>
              <label className="text-white/80 text-sm">Full Name</label>
              <input
                type="text"
                 onClick={handleChange}
                placeholder="John Doe"
                className="w-full mt-1 px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-white/80 text-sm">Email</label>
              <input
                type="email"
                 onClick={handleChange}
                placeholder="you@example.com"
                className="w-full mt-1 px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-white/80 text-sm">Password</label>
              <input
                type="password"
                 onClick={handleChange}
                placeholder="••••••••"
                className="w-full mt-1 px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-white/80 text-sm">Confirm Password</label>
              <input
                type="password"
                 onClick={handleChange}
                placeholder="••••••••"
                className="w-full mt-1 px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
            onClick={handleSubmit}
              className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-slate-400/60 to-blue-300/60 hover:from-slate-300/70 hover:to-blue-200/70 transition-all shadow-lg"
            >
              Create Account
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-white/70 text-sm mt-5">
            Already have an account?{" "}
            <Link href="/pages/login" className="hover:text-white transition">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div></>
  )
}

export default page