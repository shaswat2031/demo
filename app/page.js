"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DsmartLogo from "@/components/DsmartLogo";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState(null);

  const roles = [
    {
      id: "admin",
      label: "Admin",
      email: "admin@dsmart.infra",
      desc: "Full administrative access",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
    },
    {
      id: "manager",
      label: "Manager",
      email: "manager@dsmart.infra",
      desc: "Supervisory review & approvals",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      id: "user",
      label: "User",
      email: "engineer@dsmart.infra",
      desc: "Standard document intelligence access",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      id: "guest",
      label: "Guest",
      email: "guest@dsmart.infra",
      desc: "Read-only inspection preview",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
  ];

  const handleRoleSelect = (role) => {
    setSelectedRole(role.id);
    setEmail(role.email);
    setPassword("Smart@Pass2026");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginStatus(null);

    setTimeout(() => {
      setIsLoading(false);
      setLoginStatus({
        type: "success",
        message: `Authenticated as ${selectedRole ? selectedRole.toUpperCase() : "Authorized User"}! Opening Dashboard...`,
      });
      setTimeout(() => {
        router.push("/dashboard");
      }, 600);
    }, 800);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#081225] overflow-x-hidden font-sans">
      {/* ================= LEFT SECTION (Hero / Infrastructure Visual) ================= */}
      <div className="relative w-full lg:w-[58%] min-h-[520px] lg:min-h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden select-none">
        {/* Background Dam Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/dam-bg.jpg"
            alt="Hydroelectric Infrastructure with Digital Twin Mesh"
            fill
            priority
            className="object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          />
          {/* Deep Navy/Cyan Gradient Overlay for High Contrast & Tech Mood */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#06142e]/95 via-[#081a38]/60 to-[#030b1c]/80" />
          
          {/* Subtle Grid Ambient Glow */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/25 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Content Container (Layered above background) */}
        <div className="relative z-10 flex flex-col justify-between h-full">
          {/* Top Title: Your Documents Smarter */}
          <div className="pt-2 sm:pt-4">
            <span className="text-xl sm:text-2xl lg:text-3xl font-light text-cyan-100/90 tracking-tight block">
              Your
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none mt-1 drop-shadow-md">
              Documents
            </h1>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none mt-1 drop-shadow-md">
              Smarter
            </h1>
          </div>

          {/* Floating Document Cards Cluster (Right side of left hero) */}
          <div className="absolute right-2 sm:right-6 lg:right-10 top-12 sm:top-16 lg:top-20 hidden md:block">
            {/* SVG Connecting Cyber Lines */}
            <svg
              className="absolute -top-6 -left-12 w-[340px] h-[320px] pointer-events-none opacity-80"
              viewBox="0 0 340 320"
              fill="none"
            >
              <path
                d="M80 80 L180 40 L260 120 L160 190 Z"
                stroke="rgba(56, 189, 248, 0.45)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <path
                d="M180 40 L180 230"
                stroke="rgba(56, 189, 248, 0.3)"
                strokeWidth="1"
              />
              {/* Nodes */}
              <circle cx="80" cy="80" r="4" fill="#38bdf8" className="animate-pulse" />
              <circle cx="180" cy="40" r="4" fill="#38bdf8" />
              <circle cx="260" cy="120" r="4" fill="#38bdf8" />
              <circle cx="160" cy="190" r="4" fill="#38bdf8" />
            </svg>

            {/* Floating Glassmorphic Cards */}
            <div className="relative grid grid-cols-2 gap-4 sm:gap-6 w-[270px] sm:w-[310px]">
              {/* PDF Card */}
              <div className="glass-panel p-3.5 sm:p-4 rounded-2xl flex flex-col items-center justify-center animate-float-slow hover:scale-105 transition-transform duration-300 shadow-2xl backdrop-blur-xl">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-tr from-rose-600 to-red-500 flex items-center justify-center shadow-lg shadow-red-500/30">
                  <span className="text-white font-extrabold text-xs tracking-wider">PDF</span>
                </div>
                <span className="text-[11px] text-cyan-100 font-medium mt-2">Specs & Plans</span>
              </div>

              {/* Word Card */}
              <div className="glass-panel p-3.5 sm:p-4 rounded-2xl flex flex-col items-center justify-center animate-float-reverse hover:scale-105 transition-transform duration-300 shadow-2xl backdrop-blur-xl translate-y-3">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-tr from-blue-700 to-sky-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <span className="text-white font-extrabold text-base tracking-wider">W</span>
                </div>
                <span className="text-[11px] text-cyan-100 font-medium mt-2">Contracts</span>
              </div>

              {/* Excel Card */}
              <div className="glass-panel p-3.5 sm:p-4 rounded-2xl flex flex-col items-center justify-center animate-float-reverse hover:scale-105 transition-transform duration-300 shadow-2xl backdrop-blur-xl">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                  <span className="text-white font-extrabold text-base tracking-wider">X</span>
                </div>
                <span className="text-[11px] text-cyan-100 font-medium mt-2">Telemetry</span>
              </div>

              {/* Image/Photo Card */}
              <div className="glass-panel p-3.5 sm:p-4 rounded-2xl flex flex-col items-center justify-center animate-float-slow hover:scale-105 transition-transform duration-300 shadow-2xl backdrop-blur-xl translate-y-3">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                </div>
                <span className="text-[11px] text-cyan-100 font-medium mt-2">Site Scans</span>
              </div>
            </div>
          </div>

          {/* Feature List (Left-aligned bottom section) */}
          <div className="mt-16 sm:mt-24 lg:mt-32 space-y-4 sm:space-y-5">
            {/* Find Faster */}
            <div className="flex items-center gap-3.5 group cursor-default">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 backdrop-blur-md border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-lg shadow-cyan-500/20 group-hover:scale-105 group-hover:border-cyan-300 transition-all">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <span className="text-white text-base sm:text-lg font-medium tracking-wide drop-shadow-sm group-hover:text-cyan-200 transition-colors">
                Find Faster
              </span>
            </div>

            {/* Work Together */}
            <div className="flex items-center gap-3.5 group cursor-default">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 backdrop-blur-md border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-lg shadow-cyan-500/20 group-hover:scale-105 group-hover:border-cyan-300 transition-all">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <span className="text-white text-base sm:text-lg font-medium tracking-wide drop-shadow-sm group-hover:text-cyan-200 transition-colors">
                Work Together
              </span>
            </div>

            {/* Access Securely */}
            <div className="flex items-center gap-3.5 group cursor-default">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 backdrop-blur-md border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-lg shadow-cyan-500/20 group-hover:scale-105 group-hover:border-cyan-300 transition-all">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <span className="text-white text-base sm:text-lg font-medium tracking-wide drop-shadow-sm group-hover:text-cyan-200 transition-colors">
                Access Securely
              </span>
            </div>
          </div>

          {/* Footer note for mobile */}
          <div className="pt-6 sm:pt-8 text-xs text-cyan-200/60 font-mono">
            Smart Hydro & Infrastructure Digital Twin v4.2
          </div>
        </div>
      </div>

      {/* Floating View Switcher */}
      <Link
        href="/dashboard"
        className="fixed top-4 right-4 z-50 bg-white/90 hover:bg-white text-slate-800 text-xs font-semibold px-3.5 py-2 rounded-full shadow-lg border border-slate-200/80 backdrop-blur-md flex items-center gap-2 hover:shadow-xl hover:text-blue-600 transition-all cursor-pointer"
        title="Quick jump to Main Application Dashboard"
      >
        <span>Open Dashboard UI</span>
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14m-7-7 7 7-7 7" />
        </svg>
      </Link>

      {/* ================= RIGHT SECTION (Login Card / Form) ================= */}
      <div className="w-full lg:w-[42%] min-h-screen bg-white flex flex-col justify-center px-6 sm:px-10 lg:px-14 xl:px-16 py-10 shadow-2xl">
        <div className="max-w-[430px] w-full mx-auto">
          {/* Brand Header using standalone DsmartLogo component */}
          <DsmartLogo variant="full" theme="light" />

          {/* Heading */}
          <div className="mt-8">
            <h3 className="text-2xl sm:text-[28px] font-extrabold text-[#0f2744] tracking-tight">
              Welcome Back
            </h3>
            <p className="text-sm text-slate-500 font-normal mt-1">
              Login to access your documents and insights
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Email Address
              </label>
              <div className="relative flex items-center rounded-xl border border-slate-200 bg-white shadow-xs focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                <div className="pl-3.5 pr-2 text-slate-400">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com / +91 XXXXX XXXXX"
                  className="w-full py-2.5 pr-3.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative flex items-center rounded-xl border border-slate-200 bg-white shadow-xs focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                <div className="pl-3.5 pr-2 text-slate-400">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full py-2.5 pr-10 text-sm text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-slate-400 hover:text-slate-600 p-1 focus:outline-none transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                      <line x1="2" x2="22" y1="2" y2="22" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end mt-1.5">
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Password recovery link sent to registered email or phone.");
                  }}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 bg-[#0d6efd] hover:bg-[#0b5ed7] active:bg-[#0a58ca] text-white font-semibold text-sm py-3 px-4 rounded-xl shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Authenticating...
                </>
              ) : (
                "Login"
              )}
            </button>

            {/* Status Alert */}
            {loginStatus && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium animate-fadeIn">
                {loginStatus.message}
              </div>
            )}
          </form>

          {/* Social / SSO Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-slate-400 font-normal">
                or continue with
              </span>
            </div>
          </div>

          {/* SSO / Social Buttons Row */}
          <div className="grid grid-cols-3 gap-2.5">
            {/* Google */}
            <button
              type="button"
              onClick={() => {
                setEmail("google.user@organization.com");
                setSelectedRole("user");
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-2 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition shadow-2xs group cursor-pointer"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span>Google</span>
            </button>

            {/* Microsoft */}
            <button
              type="button"
              onClick={() => {
                setEmail("microsoft.account@organization.com");
                setSelectedRole("user");
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-2 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition shadow-2xs group cursor-pointer"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 21 21">
                <rect x="1" y="1" width="9" height="9" fill="#f25022"/>
                <rect x="11" y="1" width="9" height="9" fill="#7fba00"/>
                <rect x="1" y="11" width="9" height="9" fill="#00a4ef"/>
                <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
              </svg>
              <span>Microsoft</span>
            </button>

            {/* SSO */}
            <button
              type="button"
              onClick={() => {
                setEmail("sso.enterprise@corp.domain");
                setSelectedRole("admin");
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-2 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition shadow-2xs group cursor-pointer"
            >
              <svg className="w-4 h-4 text-blue-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 2l-2 2m-1.5 1.5L14 9a5 5 0 1 0-2 2l3.5-3.5" />
                <circle cx="7" cy="17" r="3" />
                <path d="m14 10 3 3" />
                <path d="m11 13 2 2" />
              </svg>
              <span>SSO</span>
            </button>
          </div>

          {/* Access for Different Roles Box */}
          <div className="mt-6 rounded-2xl bg-[#f4f7fb] border border-blue-50/80 p-4 sm:p-4.5">
            <div>
              <h4 className="text-xs font-bold text-[#0f2744]">
                Access for Different Roles
              </h4>
              <p className="text-[11px] text-slate-500 font-normal">
                Secure, role-based access for your organization
              </p>
            </div>

            {/* 4 Role Cards Grid */}
            <div className="grid grid-cols-4 gap-2 mt-3">
              {roles.map((role) => {
                const isSelected = selectedRole === role.id;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => handleRoleSelect(role)}
                    title={role.desc}
                    className={`flex flex-col items-center justify-center py-2.5 px-1.5 rounded-xl transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-white border-2 border-blue-600 shadow-md shadow-blue-500/15 text-blue-600"
                        : "bg-white border border-slate-200/80 hover:border-slate-300 text-slate-600 hover:text-blue-600 hover:shadow-xs"
                    }`}
                  >
                    <div className={isSelected ? "text-blue-600" : "text-blue-600/90"}>
                      {role.icon}
                    </div>
                    <span className="text-[11px] font-semibold mt-1">
                      {role.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Role indicator feedback */}
            {selectedRole && (
              <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">
                  Active Preset: <span className="font-semibold text-blue-600 capitalize">{selectedRole}</span>
                </span>
                <span className="text-emerald-600 font-medium">Credentials loaded</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
