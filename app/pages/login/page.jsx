
import Link from 'next/link'
import React from 'react'

const page = () => {
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

      {/* Floating glow orbs */}
      <div className="absolute w-72 h-72 bg-white/10 blur-3xl rounded-full top-10 left-10 animate-pulse" />
      <div className="absolute w-72 h-72 bg-blue-200/10 blur-3xl rounded-full bottom-10 right-10 animate-pulse" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 hover:scale-[1.01] transition-transform duration-300">
          
          {/* Logo */}
          <h1 className="text-white text-3xl font-bold text-center mb-2">
            Clair
          </h1>
          <p className="text-white/70 text-center mb-6">
            Welcome back — sign in to continue
          </p>

          {/* Form */}
          <form className="space-y-4">
            <div>
              <label className="text-white/80 text-sm">Email</label>
              <input
                type="email"
                
                placeholder="you@example.com"
                className="w-full mt-1 px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="text-white/80 text-sm">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full mt-1 px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-slate-400/60 to-blue-300/60 hover:from-slate-300/70 hover:to-blue-200/70 transition-all shadow-lg"
            >
            <Link href="/clients/home">  Sign In</Link>
            </button>
          </form>

          {/* Links */}
          <div className="flex justify-between text-sm text-white/70 mt-4">
            <a href="#" className="hover:text-white transition">
              Forgot password?
            </a>
            <Link href="/pages/signup" className="hover:text-white transition">
              Create account
            </Link>
           
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default page