import React from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    LayoutDashboard,
    ShoppingBag,
    Gift,
    Settings,
    ChevronDown,
    // ✅ Import Ikon Baru
    LayoutTemplate,
    ThumbsUp,
    Star,
} from "lucide-react";

// --- KOMPONEN HELPER ---
const SidebarLink = ({ href, active, children, icon }) => (
    <Link
        href={href}
        className={`group relative flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
            active
                ? "bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-amber-300 shadow-md scale-[1.02]"
                : "text-gray-400 hover:bg-[#1e293b] hover:text-white"
        }`}
    >
        {active && (
            <span className="absolute left-0 top-0 bottom-0 w-1 bg-amber-400 rounded-r-lg"></span>
        )}
        <span
            className={`mr-3 ${
                active
                    ? "text-amber-300"
                    : "text-gray-500 group-hover:text-gray-200"
            } transition-colors duration-200`}
        >
            {icon}
        </span>
        {children}
    </Link>
);

export default function MitraSidebar() {
    return (
        <aside className="w-64 min-h-screen bg-[#0f172a] text-gray-200 flex flex-col border-r border-[#1e293b] shadow-2xl fixed left-0 top-0 bottom-0 z-50">
            {/* Header */}
            <div className="h-16 flex items-center justify-center bg-gradient-to-r from-[#0f172a] to-[#1e293b] border-b border-[#1e293b] shadow-lg gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    M
                </div>
                <span className="text-amber-300 font-semibold text-lg tracking-wider hover:text-amber-200 transition-colors">
                    MITRA PANEL
                </span>
            </div>

            {/* Navigasi */}
            <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#1e293b] scrollbar-track-[#0f172a]">
                {/* 1. Overview */}
                <SidebarLink
                    href={route("mitra.dashboard")}
                    active={route().current("mitra.dashboard")}
                    icon={<LayoutDashboard className="h-5 w-5" />}
                >
                    Overview
                </SidebarLink>

                {/* 2. Paket Kemitraan */}
                <SidebarLink
                    href={route("mitra.packages")}
                    active={route().current("mitra.packages*")}
                    icon={<ShoppingBag className="h-5 w-5" />}
                >
                    Paket Kemitraan
                </SidebarLink>

                {/* 3. Keuntungan */}
                <SidebarLink
                    href={route("mitra.benefits")}
                    active={route().current("mitra.benefits*")}
                    icon={<Gift className="h-5 w-5" />}
                >
                    Keuntungan & Bonus
                </SidebarLink>

                {/* --- SEPARATOR BARU: KONTEN WEB --- */}
                <div className="pt-4 pb-2">
                    <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Konten Halaman
                    </p>
                </div>

                {/* 4. Fitur Keunggulan */}
                <SidebarLink
                    href={route("mitra.features")}
                    active={route().current("mitra.features")}
                    icon={<ThumbsUp className="h-5 w-5" />}
                >
                    Keunggulan
                </SidebarLink>

                {/* 5. Konten Teks */}
                <SidebarLink
                    href={route("mitra.contents")}
                    active={route().current("mitra.contents")}
                    icon={<LayoutTemplate className="h-5 w-5" />}
                >
                    Edit Teks Web
                </SidebarLink>

                {/* 6. Testimoni */}
                <SidebarLink
                    href={route("mitra.testimonials")}
                    active={route().current("mitra.testimonials")}
                    icon={<Star className="h-5 w-5" />}
                >
                    Testimoni
                </SidebarLink>

                {/* --- SEPARATOR: LAINNYA --- */}
                <div className="pt-4 pb-2">
                    <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Lainnya
                    </p>
                </div>

                {/* 7. Pengaturan */}
                <SidebarLink
                    href={route("mitra.settings")}
                    active={route().current("mitra.settings")}
                    icon={<Settings className="h-5 w-5" />}
                >
                    Pengaturan
                </SidebarLink>
            </nav>

            {/* Footer Copyright */}
            <div className="px-4 py-3 border-t border-[#1e293b] text-center text-xs text-gray-500">
                © {new Date().getFullYear()} Mitra Admin
            </div>
        </aside>
    );
}
