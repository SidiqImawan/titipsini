import React from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Save, LayoutTemplate, Info, Megaphone } from "lucide-react";

export default function AdminContent({ contents }) {
    // Kita inisialisasi form dengan data dari database
    // Gunakan nilai default jika kosong agar tidak error
    const { data, setData, post, processing } = useForm({
        // Hero Section
        hero_title: contents.hero_title || "",
        hero_subtitle: contents.hero_subtitle || "",
        hero_cta_text: contents.hero_cta_text || "",

        // About Section
        cuan_title: contents.cuan_title || "",
        cuan_desc: contents.cuan_desc || "",

        // CTA Bottom
        cta_title: contents.cta_title || "",
        cta_desc: contents.cta_desc || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("mitra.contents.store"), {
            preserveScroll: true,
            onSuccess: () => alert("Konten halaman berhasil diperbarui!"),
        });
    };

    return (
        <AdminLayout header="Edit Konten Halaman Depan" sidebarType="mitra">
            <Head title="Edit Konten" />

            <form
                onSubmit={handleSubmit}
                className="max-w-4xl mx-auto space-y-8 pb-10"
            >
                {/* SECTION 1: HERO (ATAS) */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                            <LayoutTemplate size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800">
                            Bagian Hero (Atas)
                        </h3>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">
                                Judul Utama (Headline)
                            </label>
                            <input
                                type="text"
                                className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                value={data.hero_title}
                                onChange={(e) =>
                                    setData("hero_title", e.target.value)
                                }
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">
                                Sub-Judul (Deskripsi Pendek)
                            </label>
                            <textarea
                                className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                rows="3"
                                value={data.hero_subtitle}
                                onChange={(e) =>
                                    setData("hero_subtitle", e.target.value)
                                }
                            ></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">
                                Teks Tombol
                            </label>
                            <input
                                type="text"
                                className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                value={data.hero_cta_text}
                                onChange={(e) =>
                                    setData("hero_cta_text", e.target.value)
                                }
                            />
                        </div>
                    </div>
                </div>

                {/* SECTION 2: ABOUT (PELUANG CUAN) */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                        <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                            <Info size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800">
                            Bagian Peluang Bisnis
                        </h3>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">
                                Judul Seksi
                            </label>
                            <input
                                type="text"
                                className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                value={data.cuan_title}
                                onChange={(e) =>
                                    setData("cuan_title", e.target.value)
                                }
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">
                                Deskripsi
                            </label>
                            <textarea
                                className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                rows="3"
                                value={data.cuan_desc}
                                onChange={(e) =>
                                    setData("cuan_desc", e.target.value)
                                }
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* SECTION 3: CTA BOTTOM */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                        <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                            <Megaphone size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800">
                            Bagian Bawah (Ajak Gabung)
                        </h3>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">
                                Judul Ajakan
                            </label>
                            <input
                                type="text"
                                className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                value={data.cta_title}
                                onChange={(e) =>
                                    setData("cta_title", e.target.value)
                                }
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">
                                Deskripsi Tambahan
                            </label>
                            <textarea
                                className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                rows="2"
                                value={data.cta_desc}
                                onChange={(e) =>
                                    setData("cta_desc", e.target.value)
                                }
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* ACTION BUTTON */}
                <div className="sticky bottom-4 flex justify-end">
                    <button
                        type="submit"
                        disabled={processing}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all transform hover:-translate-y-1"
                    >
                        <Save size={20} />
                        Simpan Semua Perubahan
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
