import React, { useState } from "react";
import { Head, useForm, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
    Save,
    Plus,
    Trash2,
    Phone,
    Mail,
    MapPin,
    Globe,
    Instagram,
    Facebook,
    MessageSquare,
} from "lucide-react";

// Helper Icon
const SocialIcon = ({ type }) => {
    switch (type) {
        case "instagram":
            return <Instagram size={18} />;
        case "facebook":
            return <Facebook size={18} />;
        case "website":
            return <Globe size={18} />;
        default:
            return <Globe size={18} />;
    }
};

export default function Setting({ socials, contacts }) {
    // --- STATE SOSMED ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    const formSocial = useForm({ label: "", link: "", icon_key: "website" });

    // --- STATE KONTAK & WA (UPDATE) ---
    const formContact = useForm({
        // Kontak Fisik
        contact_phone: contacts?.contact_phone || "+62 812-3456-7890",
        contact_email: contacts?.contact_email || "info@titipsini.com",
        contact_address: contacts?.contact_address || "Jakarta, Indonesia",

        // Pesan WhatsApp Custom
        wa_msg_join:
            contacts?.wa_msg_join ||
            "Halo Admin, saya tertarik bergabung menjadi Mitra.",
        wa_msg_consult:
            contacts?.wa_msg_consult ||
            "Halo Admin, saya ingin konsultasi gratis.",
        wa_msg_info:
            contacts?.wa_msg_info ||
            "Halo Admin, saya ingin info lebih lanjut.",
    });

    // Handle Submit Kontak & WA
    const submitContact = (e) => {
        e.preventDefault();
        formContact.post(route("mitra.settings.contact.store"), {
            preserveScroll: true,
            onSuccess: () => alert("Pengaturan berhasil disimpan!"),
        });
    };

    // Handle Submit Sosmed
    const submitSocial = (e) => {
        e.preventDefault();
        formSocial.post(route("mitra.settings.social.store"), {
            onSuccess: () => {
                setIsModalOpen(false);
                formSocial.reset();
            },
        });
    };

    const deleteSocial = (id) => {
        if (confirm("Hapus sosmed ini?"))
            router.delete(route("mitra.settings.social.destroy", id));
    };

    return (
        <AdminLayout header="Pengaturan Umum" sidebarType="mitra">
            <Head title="Pengaturan" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* KOLOM KIRI: KONTAK & WA */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-fit">
                    <form onSubmit={submitContact} className="space-y-8">
                        {/* 1. INFO KONTAK */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
                                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                    <Phone size={20} />
                                </div>
                                <h3 className="font-bold text-gray-800">
                                    Kontak Utama
                                </h3>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">
                                    No. WhatsApp Admin
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                    value={formContact.data.contact_phone}
                                    onChange={(e) =>
                                        formContact.setData(
                                            "contact_phone",
                                            e.target.value,
                                        )
                                    }
                                    placeholder="+62 ..."
                                />
                                <p className="text-[10px] text-gray-400 mt-1">
                                    *Nomor ini akan digunakan sebagai tujuan
                                    link WA.
                                </p>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">
                                    Email Resmi
                                </label>
                                <input
                                    type="email"
                                    className="w-full rounded-lg border-gray-300"
                                    value={formContact.data.contact_email}
                                    onChange={(e) =>
                                        formContact.setData(
                                            "contact_email",
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">
                                    Alamat Kantor
                                </label>
                                <textarea
                                    className="w-full rounded-lg border-gray-300"
                                    rows="2"
                                    value={formContact.data.contact_address}
                                    onChange={(e) =>
                                        formContact.setData(
                                            "contact_address",
                                            e.target.value,
                                        )
                                    }
                                ></textarea>
                            </div>
                        </div>

                        {/* 2. PESAN OTOMATIS WA (BARU) */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
                                <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                                    <MessageSquare size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800">
                                        Template Pesan WhatsApp
                                    </h3>
                                    <p className="text-xs text-gray-500">
                                        Kata-kata otomatis saat user klik
                                        tombol.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">
                                    Pesan Tombol "Gabung"
                                </label>
                                <textarea
                                    className="w-full rounded-lg border-gray-300 bg-gray-50 text-sm"
                                    rows="2"
                                    value={formContact.data.wa_msg_join}
                                    onChange={(e) =>
                                        formContact.setData(
                                            "wa_msg_join",
                                            e.target.value,
                                        )
                                    }
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">
                                    Pesan Tombol "Konsultasi"
                                </label>
                                <textarea
                                    className="w-full rounded-lg border-gray-300 bg-gray-50 text-sm"
                                    rows="2"
                                    value={formContact.data.wa_msg_consult}
                                    onChange={(e) =>
                                        formContact.setData(
                                            "wa_msg_consult",
                                            e.target.value,
                                        )
                                    }
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">
                                    Pesan Tombol "Pelajari"
                                </label>
                                <textarea
                                    className="w-full rounded-lg border-gray-300 bg-gray-50 text-sm"
                                    rows="2"
                                    value={formContact.data.wa_msg_info}
                                    onChange={(e) =>
                                        formContact.setData(
                                            "wa_msg_info",
                                            e.target.value,
                                        )
                                    }
                                ></textarea>
                            </div>
                        </div>

                        <div className="pt-2 flex justify-end">
                            <button
                                type="submit"
                                disabled={formContact.processing}
                                className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-indigo-700 transition w-full justify-center"
                            >
                                <Save size={18} /> Simpan Semua Pengaturan
                            </button>
                        </div>
                    </form>
                </div>

                {/* KOLOM KANAN: SOSIAL MEDIA */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-fit">
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-pink-100 text-pink-600 rounded-lg">
                                <Instagram size={20} />
                            </div>
                            <h3 className="font-bold text-gray-800">
                                Sosial Media
                            </h3>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-600"
                        >
                            <Plus size={20} />
                        </button>
                    </div>

                    <div className="space-y-3">
                        {socials.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between p-3 border rounded-lg bg-gray-50 hover:bg-white transition"
                            >
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="w-8 h-8 bg-white border rounded-full flex items-center justify-center text-gray-600">
                                        <SocialIcon type={item.icon_key} />
                                    </div>
                                    <div className="truncate">
                                        <p className="font-bold text-sm text-gray-800">
                                            {item.label}
                                        </p>
                                        <p className="text-xs text-gray-400 truncate">
                                            {item.link}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => deleteSocial(item.id)}
                                    className="text-gray-400 hover:text-red-500 p-2"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                        {socials.length === 0 && (
                            <p className="text-center text-gray-400 italic py-4">
                                Belum ada sosial media.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* MODAL TAMBAH SOSMED (Tetap sama) */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl">
                        <h3 className="font-bold mb-4">Tambah Sosial Media</h3>
                        <form onSubmit={submitSocial} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold mb-1">
                                    Platform
                                </label>
                                <select
                                    className="w-full rounded-lg border-gray-300"
                                    value={formSocial.data.icon_key}
                                    onChange={(e) =>
                                        formSocial.setData(
                                            "icon_key",
                                            e.target.value,
                                        )
                                    }
                                >
                                    <option value="instagram">Instagram</option>
                                    <option value="facebook">Facebook</option>
                                    <option value="whatsapp">WhatsApp</option>
                                    <option value="website">
                                        Website / Lainnya
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">
                                    Label
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border-gray-300"
                                    placeholder="Contoh: Instagram Kami"
                                    value={formSocial.data.label}
                                    onChange={(e) =>
                                        formSocial.setData(
                                            "label",
                                            e.target.value,
                                        )
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">
                                    Link URL
                                </label>
                                <input
                                    type="url"
                                    className="w-full rounded-lg border-gray-300"
                                    placeholder="https://..."
                                    value={formSocial.data.link}
                                    onChange={(e) =>
                                        formSocial.setData(
                                            "link",
                                            e.target.value,
                                        )
                                    }
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-gray-500"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-pink-600 text-white rounded-lg"
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
