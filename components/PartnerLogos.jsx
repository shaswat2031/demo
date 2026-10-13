import Image from "next/image";

export default function PartnerLogos({ className = "" }) {
  return (
    <div className={`flex items-center gap-2 sm:gap-5 ${className}`}>
      {/* 1. Bhakra Beas Management Board Logo */}
      <div className="flex items-center gap-2">
        {/* BBMB Crest / Emblem */}
        <div className="flex flex-col items-center shrink-0">
          <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 48 48" fill="none">
            {/* Red stylized dam curve */}
            <path
              d="M10 8 V32 C10 39 16 44 24 44 C32 44 38 39 38 32 C38 25 32 20 24 20"
              stroke="#D32F2F"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <path
              d="M14 12 V30 C14 36 18 40 24 40 C30 40 34 36 34 30 C34 24 30 20 24 20"
              stroke="#D32F2F"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            {/* Water grid */}
            <rect x="18" y="24" width="12" height="12" rx="2" fill="#E1F5FE" />
            <path
              d="M19 27 H29 M19 30 H29 M19 33 H29"
              stroke="#0288D1"
              strokeWidth="1.2"
              strokeDasharray="1.5 1.5"
            />
            {/* Pipeline telemetry dots */}
            <circle cx="34" cy="24" r="2" fill="#D32F2F" />
            <circle cx="34" cy="28" r="2" fill="#FBC02D" />
            <circle cx="34" cy="32" r="2" fill="#0288D1" />
          </svg>
          <span className="text-[5.5px] sm:text-[6.5px] font-bold text-[#D32F2F] tracking-tighter uppercase leading-none mt-0.5">
            BBMB
          </span>
        </div>

        {/* BBMB Text (Visible on md and up) */}
        <div className="hidden md:flex flex-col justify-center">
          <span className="text-xs sm:text-[13px] font-black text-[#D32F2F] tracking-tight uppercase leading-tight">
            BHAKRA BEAS MANAGEMENT BOARD
          </span>
          <span className="text-[9.5px] sm:text-[10.5px] font-medium text-slate-700 leading-tight">
            An ISO 9001, 14001 Certified Board
          </span>
        </div>
      </div>

      {/* Vertical Subtle Divider */}
      <div className="h-7 w-[1px] bg-slate-200 hidden md:block" />

      {/* 2. Official ICED Logo Image (Visible on sm and up) */}
      <div className="relative hidden sm:flex items-center shrink-0">
        <Image
          src="/iced-logo.png"
          alt="ICED - International Centre of Excellence for Dams"
          width={185}
          height={52}
          className="h-7 sm:h-8 md:h-9 w-auto object-contain"
          priority
        />
      </div>
    </div>
  );
}
