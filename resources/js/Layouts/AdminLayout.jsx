import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import AdminSidebar from "./Partials/AdminSidebar"; // Import sidebar yang baru dibuat
import { Menu, X } from "lucide-react"; // Import ikon untuk mobile menu

export default function AdminLayout({ user, header, children }) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar untuk Desktop */}
            <div className="hidden md:flex">
                <AdminSidebar />
            </div>

            {/* Konten Utama (Navbar Atas + Isi Halaman) */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Navbar Atas */}
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            {/* Tombol Hamburger untuk Mobile */}
                            <div className="md:hidden">
                                <button
                                    onClick={() =>
                                        setSidebarOpen(!isSidebarOpen)
                                    }
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <Menu size={24} />
                                </button>
                            </div>

                            {/* Header Halaman (diambil dari props) */}
                            <div className="flex-1 flex justify-center md:justify-start">
                                {header && (
                                    <div className="font-semibold text-xl text-gray-800 leading-tight">
                                        {header}
                                    </div>
                                )}
                            </div>

                            {/* Nama User & Logout */}
                            <div className="flex items-center">
                                <span className="mr-4 text-sm text-gray-600">
                                    Welcome, {user ? user.name : "Guest"}
                                </span>
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="text-sm text-gray-500 hover:text-red-700"
                                >
                                    Log Out
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Area Konten Utama yang Bisa di-scroll */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto">
                    <div className="container mx-auto px-6 py-8">
                        {children}
                    </div>
                </main>
            </div>

            {/* Sidebar Mobile (Overlay) */}
            {isSidebarOpen && (
                <div className="md:hidden fixed inset-0 flex z-40">
                    <div
                        className="fixed inset-0 bg-black opacity-30"
                        onClick={() => setSidebarOpen(false)}
                    ></div>
                    <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
                        <div className="absolute top-0 right-0 -mr-12 pt-2">
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
        </div>
    );
}
