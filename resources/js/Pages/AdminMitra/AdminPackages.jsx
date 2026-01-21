import React, { useState } from "react";
import { Head, useForm, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout"; // ✅ Pakai AdminLayout
import { Plus, Edit, Trash2, CheckCircle, Package } from "lucide-react";

export default function AdminPackages({ auth, packages }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    // Setup Form
    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        processing,
        errors,
        reset,
    } = useForm({
        id: "",
        title: "",
        price: "",
        duration: "",
        features: "",
        is_best_seller: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedData = {
            ...data,
            features:
                typeof data.features === "string"
                    ? data.features.split(",").map((item) => item.trim())
                    : data.features,
        };

        if (isEditMode) {
            router.put(route("mitra.packages.update", data.id), formattedData, {
                onSuccess: () => closeModal(),
            });
        } else {
            router.post(route("mitra.packages.store"), formattedData, {
                onSuccess: () => closeModal(),
            });
        }
    };

    const openEditModal = (pkg) => {
        setIsEditMode(true);
        setData({
            id: pkg.id,
            title: pkg.title,
            price: pkg.price,
            duration: pkg.duration,
            features: Array.isArray(pkg.features)
                ? pkg.features.join(", ")
                : pkg.features,
            is_best_seller: pkg.is_best_seller,
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (confirm("Yakin mau hapus paket ini?")) {
            router.delete(route("mitra.packages.destroy", id));
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditMode(false);
        reset();
    };

    return (
        // 👇 PENTING: Panggil Layout dengan sidebarType="mitra"
        <AdminLayout header="Kelola Paket Kemitraan" sidebarType="mitra">
            <Head title="Paket Kemitraan" />

            {/* Tombol Tambah */}
            <div className="flex justify-end mb-6">
                <button
                    onClick={() => {
                        reset();
                        setIsEditMode(false);
                        setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-lg shadow-indigo-200 transition-all"
                >
                    <Plus className="w-5 h-5" />
                    Tambah Paket Baru
                </button>
            </div>

            {/* Grid Paket */}
            {packages.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">
                        Belum ada paket
                    </h3>
                    <p className="text-gray-500">
                        Silakan buat paket kemitraan pertama Anda.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {packages.map((pkg) => (
                        <div
                            key={pkg.id}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative hover:shadow-md transition-all group"
                        >
                            {pkg.is_best_seller && (
                                <div className="absolute top-0 right-0 bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">
                                    BEST SELLER
                                </div>
                            )}

                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                                {pkg.title}
                            </h3>
                            <div className="flex items-baseline gap-1 mb-4">
                                <span className="text-2xl font-extrabold text-indigo-600">
                                    {pkg.price}
                                </span>
                                <span className="text-sm text-gray-500">
                                    / {pkg.duration}
                                </span>
                            </div>

                            <div className="border-t border-gray-100 pt-4 mb-6">
                                <ul className="space-y-2">
                                    {Array.isArray(pkg.features) &&
                                        pkg.features.map((feat, idx) => (
                                            <li
                                                key={idx}
                                                className="flex items-start gap-2 text-sm text-gray-600"
                                            >
                                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                                <span>{feat}</span>
                                            </li>
                                        ))}
                                </ul>
                            </div>

                            <div className="flex items-center gap-3 pt-4 border-t border-gray-50 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => openEditModal(pkg)}
                                    className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm font-medium"
                                >
                                    <Edit className="w-4 h-4" /> Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(pkg.id)}
                                    className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal Form */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl p-6 animate-in fade-in zoom-in duration-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">
                            {isEditMode ? "Edit Paket" : "Buat Paket Baru"}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold mb-1">
                                    Nama Paket
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border-gray-300"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-1">
                                        Harga
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full rounded-lg border-gray-300"
                                        value={data.price}
                                        onChange={(e) =>
                                            setData("price", e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">
                                        Durasi
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full rounded-lg border-gray-300"
                                        value={data.duration}
                                        onChange={(e) =>
                                            setData("duration", e.target.value)
                                        }
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">
                                    Fitur (Pisah koma)
                                </label>
                                <textarea
                                    className="w-full rounded-lg border-gray-300"
                                    rows="3"
                                    value={data.features}
                                    onChange={(e) =>
                                        setData("features", e.target.value)
                                    }
                                    required
                                ></textarea>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={data.is_best_seller}
                                    onChange={(e) =>
                                        setData(
                                            "is_best_seller",
                                            e.target.checked,
                                        )
                                    }
                                />
                                <label className="text-sm font-medium">
                                    Best Seller
                                </label>
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
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
