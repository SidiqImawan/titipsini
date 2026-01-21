import React, { useState } from "react";
import { Head, useForm, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Trash2, Plus, Star } from "lucide-react";
// Import Icon Pack untuk Preview
import * as FaIcons from "react-icons/fa";

export default function AdminFeatures({ features }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data, setData, post, reset, processing } = useForm({
        title: "",
        icon: "FaStar",
    });

    // Daftar Ikon yang bisa dipilih (Sesuaikan dengan react-icons/fa)
    const availableIcons = [
        "FaTags",
        "FaBuilding",
        "FaMobileAlt",
        "FaBullhorn",
        "FaShieldAlt",
        "FaChartLine",
        "FaGift",
        "FaHeadset",
        "FaStar",
        "FaCheckCircle",
        "FaLeaf",
        "FaRocket",
        "FaHandshake",
        "FaUserTie",
        "FaMoneyBillWave",
        "FaPercentage",
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route("mitra.features.store"), data, {
            onSuccess: () => {
                setIsModalOpen(false);
                reset();
            },
        });
    };

    const handleDelete = (id) => {
        if (confirm("Hapus fitur ini?"))
            router.delete(route("mitra.features.destroy", id));
    };

    // Helper render icon
    const renderIcon = (iconName) => {
        const IconComponent = FaIcons[iconName];
        return IconComponent ? <IconComponent /> : <FaIcons.FaStar />;
    };

    return (
        <AdminLayout header="Kelola Keunggulan Platform" sidebarType="mitra">
            <Head title="Keunggulan" />

            <div className="flex justify-end mb-6">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200"
                >
                    <Plus size={18} /> Tambah Fitur
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {features.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center text-center relative group hover:shadow-md transition"
                    >
                        <button
                            onClick={() => handleDelete(item.id)}
                            className="absolute top-2 right-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition p-2"
                        >
                            <Trash2 size={16} />
                        </button>
                        <div className="text-4xl text-indigo-600 mb-4 p-3 bg-indigo-50 rounded-full">
                            {renderIcon(item.icon)}
                        </div>
                        <h3 className="font-bold text-gray-800">
                            {item.title}
                        </h3>
                        <p className="text-xs text-gray-400 mt-1 font-mono">
                            {item.icon}
                        </p>
                    </div>
                ))}
            </div>

            {/* MODAL TAMBAH */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
                        <h3 className="font-bold mb-4 text-lg">
                            Tambah Keunggulan
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold mb-1 text-gray-700">
                                    Judul Fitur
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    required
                                    placeholder="Contoh: Harga Murah"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2 text-gray-700">
                                    Pilih Ikon
                                </label>
                                <div className="grid grid-cols-4 gap-2 h-48 overflow-y-auto border border-gray-200 p-2 rounded-lg bg-gray-50">
                                    {availableIcons.map((icon) => (
                                        <div
                                            key={icon}
                                            onClick={() =>
                                                setData("icon", icon)
                                            }
                                            className={`cursor-pointer p-2 flex flex-col items-center rounded border transition ${data.icon === icon ? "bg-indigo-100 border-indigo-500 text-indigo-700" : "bg-white border-gray-100 hover:bg-gray-100"}`}
                                        >
                                            <div className="text-xl mb-1">
                                                {renderIcon(icon)}
                                            </div>
                                            <span className="text-[9px] truncate w-full text-center">
                                                {icon}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
