import React from "react";
import { Link } from "@inertiajs/react";
import {
    LayoutDashboard,
    Users,
    Settings,
    Briefcase,
    Package,
    Layers,
    BookOpen,
    GraduationCap,
    LogOut,
    // ✅ Import Ikon Baru untuk Menu Pengaturan
    MapPin,
    Share2,
    Image as ImageIcon,
} from "lucide-react";

// Helper Link agar kodingan rapi
const SidebarLink = ({ href, active, children, icon }) => (
    <Link
        href={href}
        className={`group relative flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
            active
                ? "bg-emerald-600 text-white shadow-md scale-[1.02]" // Warna Hijau utk Admin Pusat
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
        }`}
    >
        <span
            className={`mr-3 ${active ? "text-white" : "text-gray-500 group-hover:text-gray-200"}`}
        >
            {icon}
        </span>
        {children}
    </Link>
);

export default function AdminSidebar() {
    return (
        <aside className="w-64 min-h-screen bg-[#111827] text-gray-200 flex flex-col border-r border-gray-800 shadow-2xl fixed left-0 top-0 bottom-0 z-50">
            {/* HEADER ADMIN */}
            <div className="h-16 flex items-center justify-center border-b border-gray-800 bg-[#1f2937] gap-2 shadow-sm">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    A
                </div>
                <span className="text-white font-semibold text-lg tracking-wider">
                    ADMIN
                </span>
            </div>

            {/* NAVIGASI */}
            <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
                {/* 1. Dashboard */}
                <SidebarLink
                    href={route("dashboard")}
                    active={route().current("dashboard")}
                    icon={<LayoutDashboard className="h-5 w-5" />}
                >
                    Dashboard
                </SidebarLink>

                <div className="pt-4 pb-2">
                    <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Master Data
                    </p>
                </div>

                {/* 2. User Management */}
                <SidebarLink
                    href={route("admin.users.index")}
                    active={route().current("admin.users.*")}
                    icon={<Users className="h-5 w-5" />}
                >
                    User Management
                </SidebarLink>

                {/* 3. Services / Layanan */}
                <SidebarLink
                    href={route("admin.services.index")}
                    active={route().current("admin.services.*")}
                    icon={<Layers className="h-5 w-5" />}
                >
                    Layanan
                </SidebarLink>

                {/* 4. Karir / Lowongan */}
                <SidebarLink
                    href={route("admin.job_vacancies.index")}
                    active={route().current("admin.job_vacancies.*")}
                    icon={<Briefcase className="h-5 w-5" />}
                >
                    Lowongan Kerja
                </SidebarLink>

                {/* 5. Moving Package */}
                <SidebarLink
                    href={route("admin.moving-packages.index")}
                    active={route().current("admin.moving-packages.*")}
                    icon={<Package className="h-5 w-5" />}
                >
                    Paket Pindahan
                </SidebarLink>

                {/* 6. Internship / Magang */}
                <SidebarLink
                    href={route("admin.internship-positions.index")}
                    active={route().current("admin.internship-positions.*")}
                    icon={<GraduationCap className="h-5 w-5" />}
                >
                    Posisi Magang
                </SidebarLink>

                {/* 7. Curriculum */}
                <SidebarLink
                    href={route("admin.curricula.index")}
                    active={route().current("admin.curricula.*")}
                    icon={<BookOpen className="h-5 w-5" />}
                >
                    Kurikulum
                </SidebarLink>

                <div className="pt-4 pb-2">
                    <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Pengaturan Web
                    </p>
                </div>

                {/* 8. Kontak & Alamat (Settings Contact) */}
                <SidebarLink
                    href={route("admin.settings.contact")}
                    active={route().current("admin.settings.contact")}
                    icon={<MapPin className="h-5 w-5" />}
                >
                    Kontak & Alamat
                </SidebarLink>

                {/* 9. Sosial Media (Settings Social) */}
                <SidebarLink
                    href={route("admin.settings.social")}
                    active={route().current("admin.settings.social")}
                    icon={<Share2 className="h-5 w-5" />}
                >
                    Sosial Media
                </SidebarLink>

                {/* 10. Logo (Settings Logo) */}
                <SidebarLink
                    href={route("admin.settings.logo")}
                    active={route().current("admin.settings.logo")}
                    icon={<ImageIcon className="h-5 w-5" />}
                >
                    Logo Website
                </SidebarLink>
            </nav>

            {/* FOOTER */}
            <div className="p-4 border-t border-gray-800">
                <Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition font-medium border border-transparent hover:border-red-500/30"
                >
                    <LogOut className="h-5 w-5" />
                    <span>Keluar</span>
                </Link>
            </div>
        </aside>
    );
}
