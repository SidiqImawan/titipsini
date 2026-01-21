import React, { useState } from "react";
import { Head, useForm, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout"; // ✅ Pakai AdminLayout
import { Plus, Trash2, Gift, Key } from "lucide-react";

export default function AdminBenefits({ bonusData, accessData }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Default type 'bonus'
    const {
        data,
        setData,
        post,
        delete: destroy,
        reset,
    } = useForm({
        text: "",
        type: "bonus",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route("mitra.benefits.store"), data, {
            onSuccess: () => {
                setIsModalOpen(false);
                reset();
            },
        });
    };

    const handleDelete = (id) => {
        if (confirm("Hapus benefit ini?")) {
            router.delete(route("mitra.benefits.destroy", id));
        }
    };

    return (
        <AdminLayout header="Keuntungan & Akses Mitra" sidebarType="mitra">
            <Head title="Keuntungan Mitra" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* KOLOM 1: BONUS */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                                <Gift size={20} />
                            </div>
                            <h3 className="text-lg font-bold">Daftar Bonus</h3>
                        </div>
                        <button
                            onClick={() => {
                                setData("type", "bonus");
                                setIsModalOpen(true);
                            }}
                            className="text-sm bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg font-bold hover:bg-indigo-100"
                        >
                            + Tambah
                        </button>
                    </div>
                    <ul className="space-y-3">
                        {bonusData.length === 0 && (
                            <p className="text-gray-400 text-sm italic">
                                Belum ada data bonus.
                            </p>
                        )}
                        {bonusData.map((item) => (
                            <li
                                key={item.id}
                                className="flex justify-between items-center group p-2 hover:bg-gray-50 rounded-lg transition"
                            >
                                <span className="text-gray-700 font-medium text-sm">
                                    • {item.text}
                                </span>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* KOLOM 2: AKSES */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                                <Key size={20} />
                            </div>
                            <h3 className="text-lg font-bold">Hak Akses</h3>
                        </div>
                        <button
                            onClick={() => {
                                setData("type", "access");
                                setIsModalOpen(true);
                            }}
                            className="text-sm bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-lg font-bold hover:bg-emerald-100"
                        >
                            + Tambah
                        </button>
                    </div>
                    <ul className="space-y-3">
                        {accessData.length === 0 && (
                            <p className="text-gray-400 text-sm italic">
                                Belum ada data akses.
                            </p>
                        )}
                        {accessData.map((item) => (
                            <li
                                key={item.id}
                                className="flex justify-between items-center group p-2 hover:bg-gray-50 rounded-lg transition"
                            >
                                <span className="text-gray-700 font-medium text-sm">
                                    ✓ {item.text}
                                </span>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Modal Tambah */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl w-full max-w-sm">
                        <h3 className="font-bold mb-4">
                            Tambah{" "}
                            {data.type === "bonus" ? "Bonus" : "Hak Akses"}
                        </h3>
                        <form onSubmit={handleSubmit}>
                            <input
                                autoFocus
                                type="text"
                                className="w-full border-gray-300 rounded-lg mb-4"
                                placeholder="Contoh: Gratis Spanduk Toko..."
                                value={data.text}
                                onChange={(e) =>
                                    setData("text", e.target.value)
                                }
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-gray-500"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
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
