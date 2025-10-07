import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    LayoutDashboard,
    Briefcase,
    User,
    Menu,
    X,
    LogOut,
} from "lucide-react";

export default function AdminLayout({ children }) {
    const { auth } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navLinks = [
        {
            name: "dashboard",
            href: route("dashboard"),
            label: "Dashboard",
            icon: <LayoutDashboard size={20} />,
        },
        {
            name: "job_vacancies.index",
            href: route("job_vacancies.index"),
            label: "Job Vacancies",
            icon: <Briefcase size={20} />,
        },
        {
            name: "profile.edit",
            href: route("profile.edit"),
            label: "Profile",
            icon: <User size={20} />,
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                ></div>
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-800 text-white flex flex-col transform ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } lg:relative lg:translate-x-0 transition-transform duration-200 ease-in-out`}
            >
                <div className="p-4 flex justify-between items-center border-b border-gray-700">
                    <Link href={route("dashboard")}>
                        <h2 className="text-xl font-bold">Titipsini Admin</h2>
                    </Link>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-gray-400 hover:text-white"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>
                <nav className="mt-4 flex-grow">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className={`flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors ${
                                route().current(link.name)
                                    ? "bg-gray-900 text-white"
                                    : ""
                            }`}
                        >
                            <span className="mr-3">{link.icon}</span>
                            {link.label}
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-700">
                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="w-full text-left flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors rounded-md"
                    >
                        <LogOut className="mr-3" size={20} />
                        Logout
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <header className="bg-white shadow-sm w-full">
                    <div className="max-w-full mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden mr-4 p-1 rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                        <div className="ml-auto text-sm text-gray-600">
                            Welcome,{" "}
                            <span className="font-semibold">
                                {auth.user.name}
                            </span>
                        </div>
                    </div>
                </header>
                <main className="flex-grow p-6">{children}</main>
            </div>
        </div>
    );
}
