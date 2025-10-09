import React from "react";
import { Link } from "@inertiajs/react";
import { Briefcase, Users, LayoutDashboard, Share2 } from "lucide-react";

// 🔹 Komponen Reusable untuk setiap link di sidebar
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

export default function AdminSidebar() {
    return (
        <aside className="w-64 min-h-screen bg-gray-800 flex flex-col border-r border-gray-700 shadow-lg">
            {/* 🔹 Header / Logo */}
            <div className="h-16 flex items-center justify-center bg-gray-900 border-b border-gray-700">
                <Link
                    href={route("dashboard")}
                    className="text-white font-bold text-lg tracking-wide hover:text-indigo-400 transition-colors"
                >
                    ADMIN PANEL
                </Link>
            </div>

            {/* 🔹 Menu Navigasi */}
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

                {/* 🔹 Tambahan baru: Sidebar Social Media */}
                <SidebarLink
                    href={route("admin.sosmed.index")}
                    active={route().current("admin.sosmed.*")}
                    icon={<Share2 className="h-5 w-5" />}
                >
                    Social Media
                </SidebarLink>
            </nav>

            {/* 🔹 Footer Sidebar */}
            <div className="px-4 py-3 border-t border-gray-700 text-center text-xs text-gray-400">
                © {new Date().getFullYear()} Admin Panel
            </div>
        </aside>
    );
}
