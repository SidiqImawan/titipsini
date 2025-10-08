import React, { useState } from "react";
import { Link } from "@inertiajs/react";

// Komponen NavLink kustom untuk menandai link yang aktif
const NavLink = ({ active = false, className = "", children, ...props }) => {
    return (
        <Link
            {...props}
            className={
                "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none " +
                (active
                    ? "border-indigo-400 text-gray-900 focus:border-indigo-700 "
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300 ") +
                className
            }
        >
            {children}
        </Link>
    );
};

export default function AdminLayout({ user, header, children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navigasi Utama Panel Admin */}
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            {/* Logo Admin */}
                            <div className="shrink-0 flex items-center">
                                <Link href={route("dashboard")}>
                                    <span className="font-semibold text-lg bg-red-600 text-white px-3 py-1 rounded">
                                        ADMIN
                                    </span>
                                </Link>
                            </div>

                            {/* Link Navigasi Utama */}
                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink
                                    href={route("admin.job_vacancies.index")}
                                    active={route().current(
                                        "admin.job_vacancies.*"
                                    )}
                                >
                                    Job Vacancies
                                </NavLink>
                                <NavLink
                                    href={route("admin.users.index")}
                                    active={route().current("admin.users.*")}
                                >
                                    User Management
                                </NavLink>
                            </div>
                        </div>

                        {/* Nama User & Opsi Logout di Kanan Atas */}
                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <div className="ml-3 relative">
                                <span className="inline-flex rounded-md">
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                    >
                                        {user ? user.name : "Guest"}{" "}
                                        {/* <-- Perubahan di sini */}
                                    </button>
                                </span>
                            </div>

                            {/* Tombol Logout */}
                            <div className="ml-4">
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="text-sm text-gray-500 hover:text-gray-700"
                                >
                                    Log Out
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Header Halaman (Opsional) */}
            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {/* Konten Utama Halaman */}
            <main>{children}</main>
        </div>
    );
}
