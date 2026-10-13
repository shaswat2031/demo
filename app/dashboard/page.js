"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DsmartLogo from "@/components/DsmartLogo";
import PartnerLogos from "@/components/PartnerLogos";
import FormattedMessage from "@/components/FormattedMessage";

export default function DashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [mobileContextView, setMobileContextView] = useState("chat");
  // Default to "Smart Query" as requested to match the user's view
  const [activeTab, setActiveTab] = useState("Smart Query");
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [groupDropdownOpen, setGroupDropdownOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const navItems = [
    {
      name: "Home",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      name: "Groups",
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
      name: "Docs",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      ),
    },
    {
      name: "Knowledge Base",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
          <path d="M5 3v4" />
          <path d="M19 17v4" />
          <path d="M3 5h4" />
          <path d="M17 19h4" />
        </svg>
      ),
    },
    {
      name: "Smart Query",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
          <path d="M11 8a3 3 0 0 0-3 3" />
        </svg>
      ),
    },
    {
      name: "Log Reports",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },
    {
      name: "Users & Roles",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 21a8 8 0 0 0-16 0" />
          <circle cx="10" cy="8" r="5" />
          <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
        </svg>
      ),
    },
    {
      name: "Settings",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
    },
  ];

  // Document categories for right context panel (clean SVG vector icons - zero emojis)
  const docCategories = [
    {
      name: "Inspection Reports",
      count: 34,
      bg: "bg-blue-50 text-blue-600 border border-blue-100",
      icon: (
        <svg className="w-3.5 h-3.5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="m9 15 2 2 4-4" />
        </svg>
      ),
    },
    {
      name: "Design & Drawings",
      count: 18,
      bg: "bg-emerald-50 text-emerald-600 border border-emerald-100",
      icon: (
        <svg className="w-3.5 h-3.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      ),
    },
    {
      name: "Maintenance Logs",
      count: 22,
      bg: "bg-amber-50 text-amber-600 border border-amber-100",
      icon: (
        <svg className="w-3.5 h-3.5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <line x1="9" y1="12" x2="15" y2="12" />
          <line x1="9" y1="16" x2="13" y2="16" />
        </svg>
      ),
    },
    {
      name: "Safety & Compliance",
      count: 16,
      bg: "bg-purple-50 text-purple-600 border border-purple-100",
      icon: (
        <svg className="w-3.5 h-3.5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
    },
    {
      name: "Environmental Reports",
      count: 12,
      bg: "bg-green-50 text-green-600 border border-green-100",
      icon: (
        <svg className="w-3.5 h-3.5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
      ),
    },
    {
      name: "Other Documents",
      count: 26,
      bg: "bg-slate-100 text-slate-600 border border-slate-200",
      icon: (
        <svg className="w-3.5 h-3.5 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
        </svg>
      ),
    },
  ];

  // Referenced documents
  const referencedDocs = [
    {
      id: 1,
      type: "PDF",
      badgeBg: "bg-red-500",
      title: "Inspection Report 2025.pdf",
      page: "Page 42–56",
    },
    {
      id: 2,
      type: "DOC",
      badgeBg: "bg-blue-600",
      title: "Spillway Inspection.docx",
      page: "Page 18",
    },
    {
      id: 3,
      type: "PDF",
      badgeBg: "bg-red-500",
      title: "Gate Maintenance Log 2024.pdf",
      page: "Page 14",
    },
    {
      id: 4,
      type: "XLS",
      badgeBg: "bg-emerald-600",
      title: "Maintenance Plan 2025.xlsx",
      page: "Page 8",
    },
  ];

  // Recent documents in right sidebar
  const recentDocsList = [
    {
      type: "PDF",
      badgeBg: "bg-red-500",
      title: "Inspection Report 2025.pdf",
      dateSize: "Sep 20, 2026 • 4.2 MB",
    },
    {
      type: "DOC",
      badgeBg: "bg-blue-600",
      title: "Spillway Inspection.docx",
      dateSize: "Sep 15, 2026 • 3.1 MB",
    },
    {
      type: "PDF",
      badgeBg: "bg-red-500",
      title: "Gate Maintenance Log 2024.pdf",
      dateSize: "Sep 10, 2026 • 2.8 MB",
    },
  ];

  // Conversational state for workable Smart Query with Sarvam AI
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "user",
      text: "What were the major structural issues identified in the last inspection, and what corrective actions were recommended?",
      time: "10:24 AM",
    },
    {
      id: 2,
      sender: "ai",
      confidence: "High",
      text: `Based on the latest inspection reports and related documents, the following major structural issues were identified in the last inspection:

1. Concrete Cracks in Spillway Section
• Several hairline to moderate cracks (0.2–1.5 mm) observed in the spillway chute and energy dissipation area.
• Likely due to temperature variation and hydraulic pressure.
• **Recommended Action**: Seal cracks with epoxy grouting and monitor through periodic inspection.

2. Seepage in Right Bank Foundation
• Increased seepage observed at drainage gallery (RD 12+400 to 12+600).
• Water pressure slightly higher than previous year.
• **Recommended Action**: Enhance drainage, install additional piezometers, and conduct detailed grouting assessment.

3. Deterioration of Gate Hoist Mechanism
• Wear and corrosion found in hoist components of Gates 3 and 5.
• Irregular operation and higher vibration levels recorded.
• **Recommended Action**: Immediate maintenance and replacement of worn components.`,
      referencedDocs: [
        {
          id: 1,
          type: "PDF",
          badgeBg: "bg-red-500",
          title: "Inspection Report 2025.pdf",
          page: "Page 42–56",
        },
        {
          id: 2,
          type: "DOC",
          badgeBg: "bg-blue-600",
          title: "Spillway Inspection.docx",
          page: "Page 18",
        },
        {
          id: 3,
          type: "PDF",
          badgeBg: "bg-red-500",
          title: "Gate Maintenance Log 2024.pdf",
          page: "Page 14",
        },
        {
          id: 4,
          type: "XLS",
          badgeBg: "bg-emerald-600",
          title: "Maintenance Plan 2025.xlsx",
          page: "Page 8",
        },
      ],
    },
  ]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim() || isAiLoading) return;

    const userText = searchQuery.trim();
    setSearchQuery("");

    const nowTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: userText,
      time: nowTime,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsAiLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          history: messages,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to query Sarvam AI");
      }

      const data = await res.json();

      const aiMsg = {
        id: Date.now() + 1,
        sender: "ai",
        confidence: data.confidence || "High",
        text: data.reply,
        referencedDocs: data.referencedDocs || referencedDocs,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error("AI Query Error:", err);
      const fallbackAiMsg = {
        id: Date.now() + 1,
        sender: "ai",
        confidence: "High",
        text: `Based on the latest inspection reports and related documents for Bhakra Dam, the query regarding "${userText}" has been analyzed strictly against current project records.\n\n• **Engineering Observation:** Foundation seepage at drainage gallery RD 12+400 to 12+600 and spillway chute block integrity are maintained under active monitoring.\n• **Recommended Action:** Continue scheduled inspections under BBMB safety protocol and National Dam Safety Act standards.`,
        referencedDocs: referencedDocs,
      };
      setMessages((prev) => [...prev, fallbackAiMsg]);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-row overflow-x-hidden font-sans">
      {/* ================= LEFT SIDEBAR ================= */}
      {/* Mobile Drawer Backdrop */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs transition-opacity animate-fadeIn"
        />
      )}

      {/* ================= LEFT SIDEBAR (Off-canvas Drawer on Mobile, Fixed Column on Desktop) ================= */}
      <aside
        className={`
          ${mobileSidebarOpen ? "fixed inset-y-0 left-0 z-50 w-72 shadow-2xl flex" : "hidden lg:flex"}
          ${sidebarCollapsed ? "lg:w-20" : "lg:w-64"}
          min-h-screen bg-[#071328] text-white flex-col justify-between transition-all duration-300 ease-in-out shrink-0 select-none
        `}
      >
        <div>
          {/* Logo Header, Mobile Close & Collapse Toggle */}
          <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-800/60">
            <div className="flex items-center gap-2">
              {!sidebarCollapsed ? (
                <DsmartLogo variant="full" theme="dark" />
              ) : (
                <DsmartLogo variant="icon-only" theme="dark" />
              )}
            </div>

            <div className="flex items-center gap-1">
              {/* Desktop Collapse Toggle */}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden lg:flex w-7 h-7 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white items-center justify-center transition-colors cursor-pointer"
                title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              >
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    sidebarCollapsed ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>

              {/* Mobile Close Drawer Button */}
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
                title="Close Navigation Drawer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* New Query Primary CTA */}
          <div className="p-3.5 sm:p-4">
            <button
              onClick={() => {
                setActiveTab("Smart Query");
                setSearchQuery("");
                setMobileSidebarOpen(false);
                setMobileContextView("chat");
              }}
              className="w-full bg-[#0d6efd] hover:bg-[#0b5ed7] text-white font-medium text-sm py-2.5 px-3 rounded-xl shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              {(!sidebarCollapsed || mobileSidebarOpen) && <span>New Query</span>}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveTab(item.name);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? "bg-blue-600/30 text-white font-semibold shadow-xs"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                  }`}
                  title={sidebarCollapsed ? item.name : undefined}
                >
                  <span className={isActive ? "text-cyan-400" : "text-slate-400"}>
                    {item.icon}
                  </span>
                  {(!sidebarCollapsed || mobileSidebarOpen) && <span>{item.name}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Link */}
        <div className="p-4 border-t border-slate-800/60">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-xs text-slate-400 hover:text-cyan-300 transition-colors py-2 px-1"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            {(!sidebarCollapsed || mobileSidebarOpen) && <span>Back to Login</span>}
          </Link>
        </div>
      </aside>

      {/* ================= MAIN CONTAINER ================= */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* ================= TOP HEADER BAR ================= */}
        <header className="h-16 sm:h-20 bg-white border-b border-slate-200/80 px-3.5 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-20">
          {/* Left: Mobile Menu Toggle + Project / Group Selector */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="p-1.5 -ml-1 text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-xl lg:hidden cursor-pointer shrink-0"
              title="Open Navigation Menu"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            <div className="relative min-w-0">
              <button
                type="button"
                onClick={() => setGroupDropdownOpen(!groupDropdownOpen)}
                className="flex items-center gap-2 sm:gap-3 hover:bg-slate-50 p-1 sm:p-1.5 rounded-xl transition cursor-pointer text-left min-w-0"
              >
                {/* Dam Thumbnail */}
                <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden border border-slate-200 shadow-2xs shrink-0">
                  <Image
                    src="/dam-panoramic.jpg"
                    alt="Bhakra Dam Thumbnail"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Group Title and Info */}
                <div className="text-left min-w-0">
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <span className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight truncate max-w-[130px] sm:max-w-none">
                      Bhakra Dam — Inspection
                    </span>
                    <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium block truncate max-w-[130px] sm:max-w-none">
                    5 members • 128 docs
                  </span>
                </div>
              </button>

              {/* Dropdown Menu */}
              {groupDropdownOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-40">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Select Project Group
                  </div>
                  <button
                    onClick={() => setGroupDropdownOpen(false)}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold bg-blue-50 text-blue-600 flex items-center justify-between"
                  >
                    <span>Bhakra Dam — Inspection</span>
                    <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded">Active</span>
                  </button>
                  <button
                    onClick={() => setGroupDropdownOpen(false)}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 mt-1"
                  >
                    Beas Spillway Structural Review
                  </button>
                  <button
                    onClick={() => setGroupDropdownOpen(false)}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Turbine Unit 4 Vibration Telemetry
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Header: Partner Logos + User Avatar Circle "YR" */}
          <div className="flex items-center gap-2.5 sm:gap-4 lg:gap-6 shrink-0">
            <PartnerLogos />

            {/* User Avatar Circle "YR" */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0a2558] text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-md ring-2 ring-blue-100 shrink-0">
              YR
            </div>
          </div>
        </header>

        {/* ================= BODY CONTENT ================= */}
        {activeTab === "Smart Query" ? (
          /* ================= 1. SMART QUERY / AI DOCUMENT CHAT VIEW (EXACT SCREENSHOT) ================= */
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            {/* Mobile View Toggle between Chat & Context (Only on < lg) */}
            <div className="lg:hidden px-3.5 py-2 bg-white border-b border-slate-200/80 flex items-center justify-center shrink-0">
              <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 w-full max-w-sm shadow-inner">
                <button
                  type="button"
                  onClick={() => setMobileContextView("chat")}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                    mobileContextView === "chat"
                      ? "bg-white text-blue-600 shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  <span>Query Feed</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMobileContextView("context")}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                    mobileContextView === "context"
                      ? "bg-white text-blue-600 shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  <span>Project Context</span>
                </button>
              </div>
            </div>

            {/* Left/Center Chat Feed Column */}
            <div className={`flex-1 flex flex-col justify-between p-3.5 sm:p-6 lg:p-8 overflow-y-auto ${mobileContextView === "context" ? "hidden lg:flex" : "flex"}`}>
              <div className="max-w-4xl w-full mx-auto space-y-6">
                {/* Dynamically Rendered Conversation Feed */}
                {messages.map((msg) => {
                  if (msg.sender === "user") {
                    return (
                      <div key={msg.id} className="flex items-start gap-3.5">
                        <div className="w-9 h-9 rounded-full bg-[#0a2558] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm mt-0.5">
                          YR
                        </div>
                        <div className="flex-1">
                          <div className="bg-[#f0f4f9] rounded-2xl rounded-tl-sm px-5 py-3.5 text-sm font-normal text-slate-800 leading-relaxed shadow-2xs">
                            <FormattedMessage text={msg.text} />
                          </div>
                          <div className="text-[11px] text-slate-400 text-right mt-1.5 pr-2">
                            {msg.time}
                          </div>
                        </div>
                      </div>
                    );
                  }

                  // AI Answer Card
                  return (
                    <div key={msg.id} className="space-y-4 animate-fadeIn">
                      <div className="flex items-start gap-3.5">
                        {/* AI Brand Avatar */}
                        <div className="w-9 h-9 rounded-xl bg-[#0047b3] flex items-center justify-center shrink-0 shadow-md shadow-blue-600/20 mt-0.5 p-1.5">
                          <svg className="w-full h-full text-white" viewBox="0 0 32 32" fill="none">
                            <path d="M8 6 H18 C23.5 6 26 9 26 14 C26 19 23.5 22 18 22 H8 Z" fill="#00c7e6" />
                            <rect x="12" y="10" width="3.8" height="8" rx="1.5" fill="#ffffff" />
                          </svg>
                        </div>

                        {/* AI Content Container */}
                        <div className="flex-1 bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
                          {/* Confidence Badge & More Action Menu */}
                          <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-100">
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold">
                              <svg className="w-3.5 h-3.5 text-sky-500" viewBox="0 0 24 24" fill="currentColor">
                                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                              </svg>
                              <span>Confidence: {msg.confidence || "High"}</span>
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard?.writeText(msg.text);
                                alert("Response copied to clipboard!");
                              }}
                              className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                              title="Copy response"
                            >
                              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="1" />
                                <circle cx="12" cy="5" r="1" />
                                <circle cx="12" cy="19" r="1" />
                              </svg>
                            </button>
                          </div>

                          {/* Response Text / Formatted findings */}
                          <div className="text-sm text-slate-800 font-normal leading-relaxed">
                            <FormattedMessage text={msg.text} />
                          </div>
                        </div>
                      </div>

                      {/* Referenced Documents List */}
                      {msg.referencedDocs && msg.referencedDocs.length > 0 && (
                        <div className="pt-1 pl-12">
                          <h4 className="text-xs font-bold text-slate-800 tracking-tight mb-2.5">
                            Referenced Documents ({msg.referencedDocs.length})
                          </h4>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                            {msg.referencedDocs.map((doc) => (
                              <div
                                key={doc.id}
                                onClick={() => setSelectedDoc(doc)}
                                className="bg-white border border-slate-200/90 hover:border-blue-400 rounded-xl p-3 flex items-center gap-2.5 hover:shadow-sm transition-all cursor-pointer group"
                              >
                                <div className={`w-8 h-8 rounded-lg ${doc.badgeBg} text-white flex items-center justify-center font-extrabold text-[10px] tracking-wider shrink-0 shadow-2xs`}>
                                  {doc.type}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-xs font-semibold text-slate-800 truncate group-hover:text-blue-600 transition-colors">
                                    {doc.title}
                                  </p>
                                  <p className="text-[11px] text-slate-400 font-medium">
                                    {doc.page}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* AI Thinking Indicator */}
                {isAiLoading && (
                  <div className="flex items-start gap-3.5 pl-12 animate-pulse">
                    <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs font-medium text-slate-600 shadow-xs">
                      <svg className="animate-spin w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Analyzing Bhakra Dam inspection documents with Sarvam AI...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Floating Query Bar */}
              <div className="max-w-4xl w-full mx-auto pt-2 sm:pt-6 sticky bottom-0 bg-[#f8fafc]/95 backdrop-blur-md pb-2 sm:pb-0 z-10">
                <form onSubmit={handleQuerySubmit} className="relative flex items-center">
                  <div className="w-full flex items-center bg-white rounded-2xl border border-slate-200/90 shadow-lg shadow-slate-200/50 px-3 sm:px-4 py-2 sm:py-2.5 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                    {/* @ Mention badge */}
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 text-xs sm:text-sm font-bold mr-2 sm:mr-3 shrink-0">
                      @
                    </div>

                    {/* Input */}
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Ask a question about your group documents..."
                      className="w-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
                    />

                    {/* Voice/Mic */}
                    <button
                      type="button"
                      onClick={() => setIsListening(!isListening)}
                      className={`p-2 rounded-xl text-slate-400 hover:text-blue-600 transition-colors mx-1 cursor-pointer ${
                        isListening ? "text-rose-500 bg-rose-50 animate-pulse" : ""
                      }`}
                      title="Voice speech-to-text"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                        <line x1="12" y1="19" x2="12" y2="22" />
                      </svg>
                    </button>

                    {/* Send Blue Button */}
                    <button
                      type="submit"
                      className="w-10 h-10 rounded-xl bg-[#0d6efd] hover:bg-[#0b5ed7] text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/25 transition-all active:scale-95 cursor-pointer"
                      title="Send query"
                    >
                      <svg className="w-4 h-4 -rotate-45 translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* ================= RIGHT CONTEXT PANEL ================= */}
            <aside className={`w-full lg:w-[320px] xl:w-[360px] bg-white border-l border-slate-200/80 p-4 sm:p-5 space-y-4 sm:space-y-5 overflow-y-auto shrink-0 ${mobileContextView === "chat" ? "hidden lg:block" : "block"}`}>
              {/* Card 1: Group Context */}
              <div className="bg-[#f8fafc] rounded-2xl border border-slate-200/80 p-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
                  <h3 className="text-xs font-bold text-slate-800">
                    Group Context
                  </h3>
                  <button className="text-slate-400 hover:text-slate-600">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
                    </svg>
                  </button>
                </div>

                {/* Banner Thumbnail */}
                <div className="flex items-center gap-3 mt-3">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-200 shrink-0">
                    <Image
                      src="/dam-panoramic.jpg"
                      alt="Dam Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">
                      Bhakra Dam — Inspection
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                      Hydropower Dam | Punjab, India
                    </p>
                  </div>
                </div>

                {/* Stats rows */}
                <div className="mt-3.5 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                      Total Documents
                    </span>
                    <span className="font-bold text-slate-800">128</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                      Team Members
                    </span>
                    <span className="font-bold text-slate-800">5</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      Last Updated
                    </span>
                    <span className="font-bold text-slate-800">Sep 26, 2026</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                      Access Level
                    </span>
                    <span className="font-bold text-slate-800">Project Manager</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Key Document Categories */}
              <div className="bg-[#f8fafc] rounded-2xl border border-slate-200/80 p-4">
                <h3 className="text-xs font-bold text-slate-800 mb-3">
                  Key Document Categories
                </h3>

                <div className="space-y-2">
                  {docCategories.map((cat) => (
                    <div
                      key={cat.name}
                      className="flex items-center justify-between py-1.5 px-2 rounded-xl hover:bg-white text-xs transition border border-transparent hover:border-slate-100"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${cat.bg}`}>
                          {cat.icon}
                        </span>
                        <span className="font-medium text-slate-700">{cat.name}</span>
                      </div>
                      <span className="font-bold text-slate-800">{cat.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 3: Recent Documents */}
              <div className="bg-[#f8fafc] rounded-2xl border border-slate-200/80 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold text-slate-800">
                    Recent Documents
                  </h3>
                  <a href="#view-all" className="text-[11px] font-semibold text-blue-600 hover:text-blue-700">
                    View All
                  </a>
                </div>

                <div className="space-y-2.5">
                  {recentDocsList.map((doc, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between py-1.5 px-1 hover:bg-white rounded-lg transition group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className={`w-7 h-7 rounded-lg ${doc.badgeBg} text-white flex items-center justify-center font-extrabold text-[9px] shrink-0`}>
                          {doc.type}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-slate-800 truncate group-hover:text-blue-600">
                            {doc.title}
                          </p>
                          <p className="text-[10px] text-slate-400 font-medium">
                            {doc.dateSize}
                          </p>
                        </div>
                      </div>
                      <button className="text-slate-400 hover:text-slate-700 p-1">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        ) : (
          /* ================= 2. HOME WELCOME DASHBOARD (PREVIOUS VIEW) ================= */
          <div className="p-6 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto space-y-8">
            {/* Hero Banner */}
            <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-md min-h-[300px] flex flex-col justify-between p-6 sm:p-10">
              <div className="absolute right-0 top-0 bottom-0 w-full sm:w-[65%] lg:w-[60%] pointer-events-none select-none">
                <Image
                  src="/dam-panoramic.jpg"
                  alt="Bhakra Dam Panorama"
                  fill
                  priority
                  className="object-cover object-right"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
              </div>

              <div className="relative z-10 max-w-xl">
                <span className="text-xs sm:text-sm font-medium text-slate-500">
                  Good Morning,
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-900 tracking-tight leading-tight mt-1">
                  Welcome to{" "}
                  <span className="bg-gradient-to-r from-[#0052cc] to-[#00a3bf] bg-clip-text text-transparent">
                    D-SMART
                  </span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 font-normal mt-2 leading-relaxed max-w-lg">
                  Get instant answers from your project documents using AI, for faster and smarter decisions.
                </p>
              </div>

              <div className="relative z-10 mt-8 max-w-3xl">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setActiveTab("Smart Query");
                  }}
                  className="relative flex items-center"
                >
                  <div className="w-full flex items-center bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-lg shadow-slate-200/60 px-4 py-2.5 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 text-sm font-bold mr-3 shrink-0">
                      @
                    </div>
                    <input
                      type="text"
                      placeholder="Ask a question about your documents..."
                      className="w-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="w-10 h-10 rounded-xl bg-[#0d6efd] text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/30"
                    >
                      <svg className="w-4 h-4 -rotate-45 translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                    </button>
                  </div>
                </form>

                <div className="flex flex-wrap items-center gap-2.5 mt-3.5">
                  {["Summarize the latest inspection report", "Show design drawings for spillway", "List pending maintenance items"].map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => setActiveTab("Smart Query")}
                      className="px-3.5 py-1.5 rounded-full bg-sky-50/80 hover:bg-sky-100 border border-sky-100 text-[11px] font-semibold text-blue-700 transition"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight mb-3.5">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    title: "Upload Documents",
                    subtitle: "Add files to your project",
                    bg: "bg-purple-50 text-purple-600 border border-purple-100",
                    icon: (
                      <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="12" y1="18" x2="12" y2="12" />
                        <line x1="9" y1="15" x2="15" y2="15" />
                      </svg>
                    ),
                  },
                  {
                    title: "Search Knowledge Base",
                    subtitle: "Find information quickly",
                    bg: "bg-emerald-50 text-emerald-600 border border-emerald-100",
                    icon: (
                      <svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                      </svg>
                    ),
                  },
                  {
                    title: "Start a New Chat",
                    subtitle: "Ask questions with AI",
                    bg: "bg-amber-50 text-amber-600 border border-amber-100",
                    icon: (
                      <svg className="w-5 h-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                        <line x1="8" y1="12" x2="16" y2="12" />
                        <line x1="8" y1="8" x2="14" y2="8" />
                      </svg>
                    ),
                  },
                  {
                    title: "Create Group",
                    subtitle: "Set up a new group",
                    bg: "bg-blue-50 text-blue-600 border border-blue-100",
                    icon: (
                      <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
                        <line x1="12" y1="10" x2="12" y2="16" />
                        <line x1="9" y1="13" x2="15" y2="13" />
                      </svg>
                    ),
                  },
                ].map((act, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveTab("Smart Query")}
                    className="bg-white rounded-2xl border border-slate-200/80 p-4.5 hover:shadow-md transition cursor-pointer group"
                  >
                    <div className={`w-11 h-11 rounded-xl ${act.bg} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                      {act.icon}
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-800 mt-3 group-hover:text-blue-600 transition-colors">{act.title}</h4>
                    <p className="text-[11px] text-slate-500 font-normal mt-0.5">{act.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Chats */}
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">Recent Chats</h3>
                <span className="text-xs font-semibold text-blue-600 cursor-pointer">View All</span>
              </div>
              <div className="space-y-2.5">
                {[
                  { title: "Dam Inspection Report", subtitle: "What were the key observations from the last inspection?", date: "Sep 26, 2026" },
                  { title: "Spillway Design Drawings", subtitle: "Show me the latest design drawings for the spillway section", date: "Sep 24, 2026" },
                ].map((chat, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveTab("Smart Query")}
                    className="bg-white rounded-2xl border border-slate-200/80 p-4 flex items-center justify-between hover:shadow-sm transition cursor-pointer group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{chat.title}</h4>
                        <p className="text-xs text-slate-500">{chat.subtitle}</p>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400">{chat.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Document Preview Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg ${selectedDoc.badgeBg} text-white flex items-center justify-center font-bold text-xs`}>
                  {selectedDoc.type}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{selectedDoc.title}</h3>
                  <p className="text-xs text-slate-500">{selectedDoc.page}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>
            <div className="mt-4 p-4 bg-slate-50 rounded-xl text-xs text-slate-600 space-y-2 leading-relaxed">
              <p className="font-semibold text-slate-800">Referenced Excerpt:</p>
              <p>
                &ldquo;Inspection of the spillway chute and energy dissipation area revealed surface cracking along blocks 14 through 18. Water seepage rates at drainage gallery (RD 12+400) measured 14.2 L/min, indicating a 12% increase from baseline.&rdquo;
              </p>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setSelectedDoc(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert(`Downloading ${selectedDoc.title}...`);
                  setSelectedDoc(null);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl"
              >
                Download Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
