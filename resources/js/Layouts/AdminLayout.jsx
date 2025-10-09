import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import AdminSidebar from "@/Components/Partials/AdminSidebar"; // ✅ pastikan path ini sesuai struktur kamu
import { Menu, X } from "lucide-react";

export default function AdminLayout({ user, header, children }) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100 text-gray-900">
            {/* Sidebar untuk Desktop */}
            <div className="hidden md:flex">
                <AdminSidebar />
            </div>

            {/* Sidebar untuk Mobile */}
            {isSidebarOpen && (
                <div className="fixed inset-0 z-40 flex md:hidden">
                    {/* Overlay Gelap */}
                    <div
                        className="fixed inset-0 bg-black opacity-40"
                        onClick={() => setSidebarOpen(false)}
                    ></div>

                    {/* Sidebar Slide */}
                    <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800 shadow-xl">
                        <div className="absolute top-0 right-0 -mr-10 pt-2">
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full text-white"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <AdminSidebar />
                    </div>
                </div>
            )}

            {/* Konten Utama */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Navbar Atas */}
                <header className="bg-white shadow-sm sticky top-0 z-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            {/* Tombol Mobile Menu */}
                            <div className="md:hidden">
                                <button
                                    onClick={() =>
                                        setSidebarOpen(!isSidebarOpen)
                                    }
                                    className="text-gray-600 hover:text-gray-800"
                                >
                                    <Menu size={24} />
                                </button>
                            </div>

                            {/* Header Judul Halaman */}
                            <div className="flex-1 flex justify-center md:justify-start">
                                {header && (
                                    <h1 className="font-semibold text-xl text-gray-800 leading-tight">
                                        {header}
                                    </h1>
                                )}
                            </div>

                            {/* User Info */}
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-600">
                                    👋 {user ? user.name : "Guest"}
                                </span>
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="text-sm text-gray-500 hover:text-red-600"
                                >
                                    Logout
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Area Konten */}
                <main className="flex-1 overflow-y-auto bg-gray-50">
                    <div className="max-w-7xl mx-auto p-6">{children}</div>
                </main>
            </div>
        </div>
    );
}
