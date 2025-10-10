import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import {
    Briefcase,
    Users,
    LayoutDashboard,
    Settings,
    ChevronDown,
    Image,
    MessageSquare,
    Phone,
} from "lucide-react";

// Komponen Reusable untuk setiap link utama di sidebar
const SidebarLink = ({ href, active, children, icon }) => {
    const baseClasses =
        "group flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out";
    const activeClasses = "bg-indigo-600 text-white shadow-md scale-[1.02]";
    const inactiveClasses = "text-gray-300 hover:bg-gray-700 hover:text-white";

    return (
        <Link
            href={href}
            className={`${baseClasses} ${
                active ? activeClasses : inactiveClasses
            }`}
        >
            <span className="mr-3 text-gray-400 group-hover:text-white transition-colors duration-200">
                {icon}
            </span>
            {children}
        </Link>
    );
};

// Komponen Sub-Link untuk item di dalam dropdown
const SidebarSubLink = ({ href, active, children, icon }) => {
    const baseClasses =
        "group flex items-center pl-11 pr-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out";
    const activeClasses = "bg-gray-700 text-white";
    const inactiveClasses = "text-gray-400 hover:bg-gray-700 hover:text-white";

    return (
        <Link
            href={href}
            className={`${baseClasses} ${
                active ? activeClasses : inactiveClasses
            }`}
        >
            <span className="mr-3 text-gray-500 group-hover:text-gray-300 transition-colors duration-200">
                {icon}
            </span>
            {children}
        </Link>
    );
};

export default function AdminSidebar() {
    // State untuk mengontrol apakah dropdown settings terbuka atau tidak.
    // Dibuat terbuka secara default jika route saat ini adalah salah satu dari halaman settings.
    const [isSettingsOpen, setSettingsOpen] = useState(
        route().current("admin.settings.*")
    );

    return (
        <aside className="w-64 min-h-screen bg-gray-800 flex flex-col border-r border-gray-700 shadow-lg">
            {/* Header / Logo */}
            <div className="h-16 flex items-center justify-center bg-gray-900 border-b border-gray-700">
                <Link
                    href={route("dashboard")}
                    className="text-white font-bold text-lg tracking-wide hover:text-indigo-400 transition-colors"
                >
                    ADMIN PANEL
                </Link>
            </div>

            {/* Menu Navigasi */}
            <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
                <SidebarLink
                    href={route("dashboard")}
                    active={route().current("dashboard")}
                    icon={<LayoutDashboard className="h-5 w-5" />}
                >
                    Dashboard
                </SidebarLink>

                <SidebarLink
                    href={route("admin.job_vacancies.index")}
                    active={route().current("admin.job_vacancies.*")}
                    icon={<Briefcase className="h-5 w-5" />}
                >
                    Job Vacancies
                </SidebarLink>

                <SidebarLink
                    href={route("admin.users.index")}
                    active={route().current("admin.users.*")}
                    icon={<Users className="h-5 w-5" />}
                >
                    User Management
                </SidebarLink>

                {/* --- MENU PENGATURAN DROPDOWN BARU --- */}
                <div>
                    {/* Tombol untuk membuka/menutup dropdown */}
                    <button
                        onClick={() => setSettingsOpen(!isSettingsOpen)}
                        className={`group w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out ${
                            route().current("admin.settings.*")
                                ? "bg-indigo-600 text-white shadow-md scale-[1.02]"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        }`}
                    >
                        <span className="mr-3 text-gray-400 group-hover:text-white transition-colors duration-200">
                            <Settings className="h-5 w-5" />
                        </span>
                        Pengaturan
                        {/* Ikon panah yang bisa berputar */}
                        <ChevronDown
                            className={`ml-auto h-5 w-5 transform transition-transform duration-200 ${
                                isSettingsOpen ? "rotate-180" : ""
                            }`}
                        />
                    </button>

                    {/* Konten Dropdown yang muncul/hilang */}
                    {isSettingsOpen && (
                        <div className="mt-1 space-y-1">
                            <SidebarSubLink
                                href={route("admin.settings.contact")}
                                active={route().current(
                                    "admin.settings.contact"
                                )}
                                icon={<Phone size={14} />}
                            >
                                Info Kontak
                            </SidebarSubLink>
                            <SidebarSubLink
                                href={route("admin.settings.social")}
                                active={route().current(
                                    "admin.settings.social"
                                )}
                                icon={<MessageSquare size={14} />}
                            >
                                Media Sosial
                            </SidebarSubLink>
                            <SidebarSubLink
                                href={route("admin.settings.logo")}
                                active={route().current("admin.settings.logo")}
                                icon={<Image size={14} />}
                            >
                                Logo
                            </SidebarSubLink>
                        </div>
                    )}
                </div>
            </nav>

            {/* Footer Sidebar */}
            <div className="px-4 py-3 border-t border-gray-700 text-center text-xs text-gray-400">
                © {new Date().getFullYear()} Admin Panel
            </div>
        </aside>
    );
}
