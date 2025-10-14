import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import { Users, Briefcase, UserPlus, PlusCircle, Settings } from "lucide-react";

// Komponen Kartu Statistik
const StatCard = ({ icon, title, value, color }) => (
    <div
        className={`bg-white overflow-hidden shadow-lg rounded-xl border-l-4 ${color}`}
    >
        <div className="p-5 flex items-center">
            <div className="mr-4">{icon}</div>
            <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    {title}
                </p>
                <p className="text-3xl font-bold text-gray-800">{value}</p>
            </div>
        </div>
    </div>
);

export default function AdminDashboard({ auth, stats }) {
    return (
        <AdminLayout user={auth.user} header="Dashboard">
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* --- Pesan Selamat Datang --- */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-2xl font-bold text-gray-800">
                                Selamat Datang Kembali, {auth.user.name}!
                            </h3>
                            <p className="mt-2 text-gray-600">
                                Ini adalah ringkasan aktivitas di platform
                                Titipsini.
                            </p>
                        </div>
                    </div>

                    {/* --- Kartu Statistik --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        <StatCard
                            title="Total User"
                            value={stats.total_users}
                            color="border-blue-500"
                            icon={<Users className="h-10 w-10 text-blue-500" />}
                        />
                        <StatCard
                            title="Lowongan Aktif"
                            value={stats.total_job_vacancies}
                            color="border-green-500"
                            icon={
                                <Briefcase className="h-10 w-10 text-green-500" />
                            }
                        />
                        <StatCard
                            title="User Baru (7 Hari)"
                            value={stats.new_users_this_week}
                            color="border-yellow-500"
                            icon={
                                <UserPlus className="h-10 w-10 text-yellow-500" />
                            }
                        />
                    </div>

                    {/* --- Tautan Cepat & Aktivitas Terbaru --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Kolom Tautan Cepat */}
                        <div className="lg:col-span-1 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-800 border-b pb-3 mb-4">
                                    Tautan Cepat
                                </h3>
                                <div className="space-y-3">
                                    <Link
                                        href={route(
                                            "admin.job_vacancies.create"
                                        )}
                                        className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                                    >
                                        <PlusCircle className="w-5 h-5 mr-3" />
                                        <span>Buat Lowongan Baru</span>
                                    </Link>
                                    <Link
                                        href={route("admin.users.index")}
                                        className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                                    >
                                        <Users className="w-5 h-5 mr-3" />
                                        <span>Manajemen User</span>
                                    </Link>
                                    <Link
                                        href={route("admin.settings.contact")}
                                        className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                                    >
                                        <Settings className="w-5 h-5 mr-3" />
                                        <span>Buka Pengaturan</span>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Kolom Aktivitas Terbaru (Placeholder) */}
                        <div className="lg:col-span-2 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-800 border-b pb-3 mb-4">
                                    Aktivitas Terbaru
                                </h3>
                                <ul className="space-y-4 text-sm text-gray-600">
                                    <li className="flex items-center">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                        <span>
                                            User baru{" "}
                                            <span className="font-semibold">
                                                John Doe
                                            </span>{" "}
                                            mendaftar.
                                        </span>
                                        <span className="ml-auto text-xs text-gray-400">
                                            5 menit lalu
                                        </span>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                        <span>
                                            Lowongan{" "}
                                            <span className="font-semibold">
                                                "Senior Frontend Developer"
                                            </span>{" "}
                                            dibuat.
                                        </span>
                                        <span className="ml-auto text-xs text-gray-400">
                                            1 jam lalu
                                        </span>
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                                        <span>
                                            Pengaturan kontak telah diperbarui
                                            oleh Anda.
                                        </span>
                                        <span className="ml-auto text-xs text-gray-400">
                                            Kemarin
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
