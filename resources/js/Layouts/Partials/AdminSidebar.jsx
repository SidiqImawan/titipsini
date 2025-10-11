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

const SidebarLink = ({ href, active, children, icon }) => {
    return (
        <Link
            href={href}
            className={`group relative flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300
                ${
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
};

const SidebarSubLink = ({ href, active, children, icon }) => {
    return (
        <Link
            href={href}
            className={`group flex items-center pl-12 pr-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                ${
                    active
                        ? "bg-[#1e293b] text-amber-300"
                        : "text-gray-400 hover:bg-[#1e293b] hover:text-white"
                }`}
        >
            <span
                className={`mr-3 ${
                    active
                        ? "text-amber-300"
                        : "text-gray-500 group-hover:text-gray-300"
                }`}
            >
                {icon}
            </span>
            {children}
        </Link>
    );
};

export default function AdminSidebar() {
    const [isSettingsOpen, setSettingsOpen] = useState(
        route().current("admin.settings.*")
    );

    return (
        <aside className="w-64 min-h-screen bg-[#0f172a] text-gray-200 flex flex-col border-r border-[#1e293b] shadow-2xl">
            {/* Header */}
            <div className="h-16 flex items-center justify-center bg-gradient-to-r from-[#0f172a] to-[#1e293b] border-b border-[#1e293b] shadow-lg">
                <Link
                    href={route("dashboard")}
                    className="text-amber-300 font-semibold text-lg tracking-wider hover:text-amber-200 transition-colors"
                >
                    ADMIN PANEL
                </Link>
            </div>

            {/* Navigasi */}
            <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#1e293b] scrollbar-track-[#0f172a]">
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

                {/* Dropdown Settings */}
                <div>
                    <button
                        onClick={() => setSettingsOpen(!isSettingsOpen)}
                        className={`group w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300
                            ${
                                route().current("admin.settings.*")
                                    ? "bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-amber-300 shadow-md scale-[1.02]"
                                    : "text-gray-400 hover:bg-[#1e293b] hover:text-white"
                            }`}
                    >
                        <span
                            className={`mr-3 ${
                                route().current("admin.settings.*")
                                    ? "text-amber-300"
                                    : "text-gray-500 group-hover:text-gray-200"
                            }`}
                        >
                            <Settings className="h-5 w-5" />
                        </span>
                        Pengaturan
                        <ChevronDown
                            className={`ml-auto h-5 w-5 transform transition-transform duration-300 ${
                                isSettingsOpen
                                    ? "rotate-180 text-amber-300"
                                    : ""
                            }`}
                        />
                    </button>

                    <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${
                            isSettingsOpen
                                ? "max-h-40 opacity-100"
                                : "max-h-0 opacity-0"
                        }`}
                    >
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
                    </div>
                </div>
            </nav>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-[#1e293b] text-center text-xs text-gray-500">
                © {new Date().getFullYear()} Admin Panel
            </div>
        </aside>
    );
}
