export default function DsmartLogo({
  variant = "full", // "full", "icon-only", "compact"
  theme = "dark",  // "dark" (for dark sidebar), "light" (for white cards)
  className = "",
}) {
  const isLight = theme === "light";

  const icon = (
    <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0052cc] to-[#00c7e6] p-0.5 shadow-md shadow-blue-500/20 flex items-center justify-center shrink-0">
      <div className="w-full h-full bg-[#0047b3] rounded-[10px] flex items-center justify-center relative overflow-hidden">
        <svg className="w-6 h-6 text-white" viewBox="0 0 32 32" fill="none">
          <path
            d="M8 6 H18 C23.5 6 26 9 26 14 C26 19 23.5 22 18 22 H8 Z"
            fill="url(#d_smart_gradient)"
          />
          <rect x="12" y="10" width="3.8" height="8" rx="1.5" fill="#ffffff" />
          <circle cx="20.5" cy="14" r="2.2" fill="#38bdf8" />
          <defs>
            <linearGradient id="d_smart_gradient" x1="8" y1="6" x2="26" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0065ff" />
              <stop offset="1" stopColor="#00b8d9" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );

  if (variant === "icon-only") {
    return <div className={`inline-flex items-center ${className}`}>{icon}</div>;
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {icon}
      <div>
        <h1
          className={`text-xl font-black tracking-tight leading-none ${
            isLight ? "text-[#0f2744]" : "text-white"
          }`}
        >
          D-SMART
        </h1>
        <p
          className={`text-[11px] font-medium tracking-tight mt-0.5 ${
            isLight ? "text-slate-500" : "text-cyan-200/70"
          }`}
        >
          Document Intelligence
          <span className="block text-[10px] opacity-80">
            for Smarter Infrastructure
          </span>
        </p>
      </div>
    </div>
  );
}
