import React from "react";
import { Link } from "@inertiajs/react";
import { Briefcase, Users, LayoutDashboard } from "lucide-react";

// Komponen helper untuk setiap link di sidebar
const SidebarLink = ({ href, active, children, icon }) => {
    const activeClasses = "bg-gray-900 text-white";
    const inactiveClasses = "text-gray-300 hover:bg-gray-700 hover:text-white";

    return (
        <Link
            href={href}
            className={`group flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                active ? activeClasses : inactiveClasses
            }`}
        >
            {icon}
            {children}
        </Link>
    );
};

export default function AdminSidebar() {
    return (
        // Wrapper untuk sidebar
        <aside className="w-64 flex-shrink-0 bg-gray-800 flex flex-col">
            {/* Logo/Header Sidebar */}
            <div className="h-16 flex items-center justify-center flex-shrink-0 px-4 bg-gray-900">
                <Link
                    href={route("dashboard")}
                    className="text-white font-bold text-lg tracking-wider"
                >
                    ADMIN PANEL
                </Link>
            </div>
            {/* Navigasi Sidebar */}
            <nav className="flex-1 px-2 py-4 space-y-2">
                <SidebarLink
                    href={route("dashboard")}
                    active={route().current("dashboard")}
                    icon={<LayoutDashboard className="mr-3 h-6 w-6" />}
                >
                    Dashboard
                </SidebarLink>
                <SidebarLink
                    href={route("admin.job_vacancies.index")}
                    active={route().current("admin.job_vacancies.*")}
                    icon={<Briefcase className="mr-3 h-6 w-6" />}
                >
                    Job Vacancies
                </SidebarLink>
                <SidebarLink
                    href={route("admin.users.index")}
                    active={route().current("admin.users.*")}
                    icon={<Users className="mr-3 h-6 w-6" />}
                >
                    User Management
                </SidebarLink>
            </nav>
        </aside>
    );
}
