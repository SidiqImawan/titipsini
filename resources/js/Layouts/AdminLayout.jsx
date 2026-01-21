import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Menu, X, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- IMPORT SIDEBAR (Sesuaikan path dengan screenshot folder kamu) ---
import AdminSidebar from "@/Layouts/Partials/AdminSidebar";
import MitraSidebar from "@/Layouts/Partials/MitraSidebar";

export default function AdminLayout({
    header,
    children,
    sidebarType = "admin", // Default 'admin', bisa diisi 'mitra'
}) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    // Ambil data user dari Props Global Inertia (biar aman)
    const { auth } = usePage().props;
    const user = auth?.user;

    // --- LOGIC PEMILIH SIDEBAR ---
    const renderSidebar = () => {
        if (sidebarType === "mitra") {
            return <MitraSidebar />;
        }
        // Default: Tampilkan Sidebar Admin Pusat
        return <AdminSidebar />;
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
            {/* =========================================
                1. SIDEBAR DESKTOP (Hidden di Mobile)
               ========================================= */}
            <div className="hidden md:block">{renderSidebar()}</div>

            {/* =========================================
                2. SIDEBAR MOBILE (Drawer)
               ========================================= */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        {/* Overlay Gelap */}
                        <motion.div
                            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm md:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSidebarOpen(false)}
                        />

                        {/* Sidebar Slide-in */}
                        <motion.div
                            className="fixed z-50 inset-y-0 left-0 w-72 bg-white shadow-2xl md:hidden flex flex-col"
                            initial={{ x: -300 }}
                            animate={{ x: 0 }}
                            exit={{ x: -300 }}
                            transition={{
                                type: "spring",
                                stiffness: 100,
                                damping: 20,
                            }}
                        >
                            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50">
                                <h2 className="text-lg font-bold text-gray-800">
                                    Menu{" "}
                                    {sidebarType === "mitra"
                                        ? "Mitra"
                                        : "Admin"}
                                </h2>
                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className="p-2 rounded-lg text-gray-500 hover:bg-gray-200 transition"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Render Sidebar di dalam Mobile Menu */}
                            <div className="flex-1 overflow-y-auto">
                                {renderSidebar()}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* =========================================
                3. KONTEN UTAMA (Main Wrapper)
               ========================================= */}
            {/* PENTING: 'md:ml-64' adalah kunci agar konten tidak tertutup Sidebar. 
                Sidebar lebarnya 64 (256px), jadi kita kasih margin kiri segitu.
            */}
            <div className="flex-1 flex flex-col min-h-screen transition-all duration-300 md:ml-64">
                {/* --- HEADER / NAVBAR ATAS --- */}
                <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            {/* Tombol Hamburger (Hanya Mobile) */}
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() =>
                                        setSidebarOpen(!isSidebarOpen)
                                    }
                                    className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
                                >
                                    <Menu size={24} />
                                </button>

                                {/* Judul Halaman (Header Props) */}
                                {header && (
                                    <motion.h1
                                        className="text-xl font-bold text-gray-800 tracking-tight"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                    >
                                        {header}
                                    </motion.h1>
                                )}
                            </div>

                            {/* User Profile (Kanan Atas) */}
                            <div className="flex items-center gap-4">
                                <div className="hidden md:block text-right">
                                    <div className="text-sm font-bold text-gray-700">
                                        {user?.name}
                                    </div>
                                    <div className="text-xs text-gray-500 capitalize">
                                        {user?.role || "User"}
                                    </div>
                                </div>

                                <div className="h-9 w-9 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold shadow-sm">
                                    {user?.name?.charAt(0) || "U"}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* --- CONTENT BODY --- */}
                <motion.main
                    className="flex-1 p-6 sm:p-8 overflow-x-hidden bg-gray-50"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {children}
                </motion.main>
            </div>
        </div>
    );
}
