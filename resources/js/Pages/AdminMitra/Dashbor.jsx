import React from "react";
import AdminLayout from "@/Layouts/AdminLayout"; // Tetap pakai AdminLayout
import { Head, Link } from "@inertiajs/react";
import {
    FaChartLine,
    FaUserFriends,
    FaMoneyBillWave,
    FaShoppingBag,
    FaArrowUp,
    FaArrowDown,
    FaEllipsisH,
} from "react-icons/fa";

// --- DATA DUMMY ---
const stats = [
    {
        id: 1,
        label: "Total Pendapatan",
        value: "Rp 128.5 Jt",
        trend: "+12.5%",
        isUp: true,
        icon: <FaMoneyBillWave />,
        color: "from-indigo-500 to-purple-500",
    },
    {
        id: 2,
        label: "Mitra Aktif",
        value: "1,240",
        trend: "+5.2%",
        isUp: true,
        icon: <FaUserFriends />,
        color: "from-blue-400 to-cyan-400",
    },
    {
        id: 3,
        label: "Paket Terjual",
        value: "856",
        trend: "-2.1%",
        isUp: false,
        icon: <FaShoppingBag />,
        color: "from-emerald-400 to-teal-400",
    },
];

const recentTrans = [
    {
        id: 1,
        name: "Budi Santoso",
        package: "Paket Pro (1 Tahun)",
        date: "Baru saja",
        amount: "Rp 3.000.000",
        status: "Success",
    },
    {
        id: 2,
        name: "Siti Aminah",
        package: "Paket Starter",
        date: "15 menit lalu",
        amount: "Rp 500.000",
        status: "Pending",
    },
    {
        id: 3,
        name: "CV Maju Jaya",
        package: "Paket Enterprise",
        date: "1 jam lalu",
        amount: "Rp 15.000.000",
        status: "Success",
    },
];

// --- COMPONENT UTAMA ---
export default function Dashbor({ auth }) {
    return (
        <AdminLayout
            user={auth.user}
            header={
                <div className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard Mitra
                </div>
            }
            // --- INI KUNCINYA BOR! ---
            sidebarType="mitra"
        >
            <Head title="Dashboard Mitra" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header Section Dalam */}
                    <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Selamat Siang, {auth.user.name}! 👋
                            </h1>
                            <p className="text-gray-500 text-sm mt-1">
                                Berikut ringkasan performa kemitraan hari ini.
                            </p>
                        </div>
                        {/* Tombol Aksi Cepat */}
                        <div className="flex gap-3">
                            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/30">
                                + Tambah Mitra
                            </button>
                        </div>
                    </div>

                    {/* --- STATS CARDS --- */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        {stats.map((stat) => (
                            <div
                                key={stat.id}
                                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:shadow-indigo-500/5 transition duration-300 relative overflow-hidden group"
                            >
                                {/* Decorative Blob */}
                                <div
                                    className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br ${stat.color} rounded-full opacity-10 group-hover:opacity-20 transition-opacity blur-2xl`}
                                ></div>

                                <div className="flex justify-between items-start mb-4">
                                    <div
                                        className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-md`}
                                    >
                                        {stat.icon}
                                    </div>
                                    <span
                                        className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${
                                            stat.isUp
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {stat.isUp ? (
                                            <FaArrowUp className="mr-1 text-[10px]" />
                                        ) : (
                                            <FaArrowDown className="mr-1 text-[10px]" />
                                        )}
                                        {stat.trend}
                                    </span>
                                </div>

                                <h3 className="text-gray-500 text-sm font-medium">
                                    {stat.label}
                                </h3>
                                <p className="text-3xl font-extrabold text-gray-900 mt-1">
                                    {stat.value}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* --- CHART & ACTIVITY SECTION --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* LEFT: REVENUE CHART SIMULATION */}
                        <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="font-bold text-lg text-gray-800">
                                    Analisis Pendapatan
                                </h3>
                                <select className="bg-gray-50 border border-gray-200 text-xs rounded-lg px-3 py-2 outline-none">
                                    <option>Bulan Ini</option>
                                    <option>Tahun Ini</option>
                                </select>
                            </div>

                            {/* Dummy CSS Bar Chart */}
                            <div className="h-64 flex items-end justify-between gap-2 md:gap-4 px-2">
                                {[
                                    40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50,
                                    95,
                                ].map((height, i) => (
                                    <div
                                        key={i}
                                        className="flex-1 flex flex-col items-center group cursor-pointer"
                                    >
                                        <div className="relative w-full bg-indigo-50 rounded-t-lg overflow-hidden h-full flex items-end group-hover:bg-indigo-100 transition">
                                            <div
                                                style={{ height: `${height}%` }}
                                                className="w-full bg-indigo-500 rounded-t-lg opacity-80 group-hover:opacity-100 transition-all duration-500 relative"
                                            ></div>
                                        </div>
                                        <span className="text-[10px] text-gray-400 mt-2 font-medium">
                                            W{i + 1}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT: RECENT ACTIVITY */}
                        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-lg text-gray-800">
                                    Transaksi Terbaru
                                </h3>
                                <Link
                                    href="#"
                                    className="text-indigo-600 text-xs font-bold hover:underline"
                                >
                                    Lihat Semua
                                </Link>
                            </div>

                            <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                                {recentTrans.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition cursor-pointer border border-transparent hover:border-gray-100"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs">
                                                {item.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-800">
                                                    {item.name}
                                                </p>
                                                <p className="text-[10px] text-gray-500">
                                                    {item.package}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs font-bold text-indigo-600">
                                                {item.amount}
                                            </p>
                                            <span
                                                className={`text-[10px] px-2 py-0.5 rounded-full ${
                                                    item.status === "Success"
                                                        ? "bg-green-100 text-green-600"
                                                        : "bg-yellow-100 text-yellow-600"
                                                }`}
                                            >
                                                {item.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full mt-4 py-3 border border-dashed border-gray-300 rounded-xl text-gray-400 text-sm font-medium hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 transition flex items-center justify-center gap-2">
                                <FaEllipsisH /> Lihat Aktivitas Lainnya
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
