import React, { useState } from "react";
import { Head, useForm, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Trash2, Plus, Star, MapPin, Quote } from "lucide-react";

export default function AdminTestimonials({ testimonials }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data, setData, post, reset, processing } = useForm({
        name: "",
        location: "",
        quote: "",
        rating: 5,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route("mitra.testimonials.store"), data, {
            onSuccess: () => {
                setIsModalOpen(false);
                reset();
            },
        });
    };

    const handleDelete = (id) => {
        if (confirm("Hapus testimoni ini?"))
            router.delete(route("mitra.testimonials.destroy", id));
    };

    return (
        <AdminLayout header="Kelola Testimoni Mitra" sidebarType="mitra">
            <Head title="Testimoni" />

            <div className="flex justify-end mb-6">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200"
                >
                    <Plus size={18} /> Tambah Testimoni
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative group hover:shadow-md transition"
                    >
                        <button
                            onClick={() => handleDelete(item.id)}
                            className="absolute top-4 right-4 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
                        >
                            <Trash2 size={18} />
                        </button>

                        <div className="flex text-yellow-400 mb-3">
                            {[...Array(item.rating)].map((_, i) => (
                                <Star key={i} size={16} fill="currentColor" />
                            ))}
                        </div>

                        <p className="text-gray-600 italic text-sm mb-4 line-clamp-3">
                            "{item.quote}"
                        </p>

                        <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500">
                                {item.name.charAt(0)}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800 text-sm">
                                    {item.name}
                                </h4>
                                <div className="flex items-center text-xs text-gray-400">
                                    <MapPin size={10} className="mr-1" />{" "}
                                    {item.location}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
                        <h3 className="font-bold mb-4 text-lg">
                            Tambah Testimoni Baru
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold mb-1 text-gray-700">
                                    Nama Mitra
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border-gray-300"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                    placeholder="Misal: Budi Santoso"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1 text-gray-700">
                                    Lokasi / Status
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border-gray-300"
                                    value={data.location}
                                    onChange={(e) =>
                                        setData("location", e.target.value)
                                    }
                                    required
                                    placeholder="Misal: Mitra Jakarta"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1 text-gray-700">
                                    Isi Testimoni
                                </label>
                                <textarea
                                    className="w-full rounded-lg border-gray-300"
                                    rows="3"
                                    value={data.quote}
                                    onChange={(e) =>
                                        setData("quote", e.target.value)
                                    }
                                    required
                                    placeholder="Pengalaman mitra..."
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1 text-gray-700">
                                    Rating (Bintang)
                                </label>
                                <select
                                    className="w-full rounded-lg border-gray-300"
                                    value={data.rating}
                                    onChange={(e) =>
                                        setData(
                                            "rating",
                                            parseInt(e.target.value),
                                        )
                                    }
                                >
                                    <option value="5">⭐⭐⭐⭐⭐ (5)</option>
                                    <option value="4">⭐⭐⭐⭐ (4)</option>
                                    <option value="3">⭐⭐⭐ (3)</option>
                                    <option value="2">⭐⭐ (2)</option>
                                    <option value="1">⭐ (1)</option>
                                </select>
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
