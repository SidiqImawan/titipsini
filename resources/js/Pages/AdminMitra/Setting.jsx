import React, { useState } from "react";
import {
    FaFacebook,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
    FaYoutube,
    FaTiktok,
    FaWhatsapp,
    FaTelegram,
    FaPlus,
    FaTrashAlt,
    FaPen,
    FaCheck,
    FaTimes,
    FaGlobe,
    FaLink,
    FaHashtag,
} from "react-icons/fa";

// --- 1. CONFIG & DATA DUMMY ---
const ICON_OPTS = [
    { key: "FaFacebook", component: <FaFacebook />, color: "text-blue-600" },
    { key: "FaInstagram", component: <FaInstagram />, color: "text-pink-600" },
    { key: "FaTwitter", component: <FaTwitter />, color: "text-sky-500" },
    { key: "FaLinkedin", component: <FaLinkedin />, color: "text-blue-700" },
    { key: "FaYoutube", component: <FaYoutube />, color: "text-red-600" },
    { key: "FaTiktok", component: <FaTiktok />, color: "text-black" },
    { key: "FaWhatsapp", component: <FaWhatsapp />, color: "text-green-500" },
    { key: "FaTelegram", component: <FaTelegram />, color: "text-blue-400" },
];

const initialData = [
    {
        id: 1,
        label: "Instagram Official",
        link: "https://instagram.com/titipsini",
        iconKey: "FaInstagram",
    },
    {
        id: 2,
        label: "Facebook Page",
        link: "https://facebook.com/titipsini",
        iconKey: "FaFacebook",
    },
];

export default function AdminSocialSettings() {
    // --- STATE ---
    const [socials, setSocials] = useState(initialData);
    const [form, setForm] = useState({
        id: null,
        label: "",
        link: "",
        iconKey: "FaInstagram",
    });
    const [isEditing, setIsEditing] = useState(false);

    // --- HANDLERS ---
    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const selectIcon = (key) => {
        setForm({ ...form, iconKey: key });
    };

    const handleEdit = (item) => {
        setIsEditing(true);
        setForm(item);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = (id) => {
        if (window.confirm("Hapus sosial media ini?")) {
            setSocials(socials.filter((s) => s.id !== id));
        }
    };

    const handleReset = () => {
        setIsEditing(false);
        setForm({ id: null, label: "", link: "", iconKey: "FaInstagram" });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            setSocials(socials.map((s) => (s.id === form.id ? form : s)));
        } else {
            setSocials([...socials, { ...form, id: Date.now() }]);
        }
        handleReset();
    };

    // Helper untuk render icon berdasarkan string key
    const renderIcon = (key, className = "") => {
        const iconObj = ICON_OPTS.find((i) => i.key === key);
        return iconObj ? (
            <span className={`${className} ${iconObj.color}`}>
                {iconObj.component}
            </span>
        ) : null;
    };

    return (
        <div className="min-h-screen bg-[#F3F4F6] text-gray-800 font-sans p-6 md:p-12">
            {/* HEADER SECTION */}
            <div className="max-w-6xl mx-auto mb-10 flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Pengaturan{" "}
                        <span className="text-indigo-600">Sosial Media</span>
                    </h1>
                    <p className="text-gray-500 mt-2 text-sm md:text-base">
                        Atur tautan platform sosial yang akan muncul di footer
                        website utama.
                    </p>
                </div>
                <div className="mt-4 md:mt-0">
                    <button className="bg-white border border-gray-200 text-gray-600 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition shadow-sm">
                        Kembali ke Dashboard
                    </button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* --- LEFT COLUMN: FORM INPUT (4 cols) --- */}
                <div className="lg:col-span-5 xl:col-span-4">
                    <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 md:p-8 sticky top-8 border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                {isEditing ? (
                                    <FaPen className="text-indigo-500 text-sm" />
                                ) : (
                                    <FaPlus className="text-indigo-500 text-sm" />
                                )}
                                {isEditing ? "Edit Tautan" : "Tambah Baru"}
                            </h2>
                            {isEditing && (
                                <button
                                    onClick={handleReset}
                                    className="text-xs text-red-500 hover:underline"
                                >
                                    Batal
                                </button>
                            )}
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Input Label */}
                            <div className="group">
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block group-focus-within:text-indigo-600 transition-colors">
                                    Label Platform
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaHashtag className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="label"
                                        value={form.label}
                                        onChange={handleInputChange}
                                        placeholder="Contoh: Instagram Official"
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder-gray-400 text-gray-700 font-medium"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Input Link */}
                            <div className="group">
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block group-focus-within:text-indigo-600 transition-colors">
                                    URL Tautan
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLink className="text-gray-400" />
                                    </div>
                                    <input
                                        type="url"
                                        name="link"
                                        value={form.link}
                                        onChange={handleInputChange}
                                        placeholder="https://..."
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder-gray-400 text-gray-700 font-medium"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Icon Picker */}
                            <div>
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 block">
                                    Pilih Ikon Visual
                                </label>
                                <div className="grid grid-cols-4 gap-3">
                                    {ICON_OPTS.map((opt) => (
                                        <button
                                            key={opt.key}
                                            type="button"
                                            onClick={() => selectIcon(opt.key)}
                                            className={`relative aspect-square rounded-xl flex items-center justify-center text-2xl transition-all duration-200 border-2 ${
                                                form.iconKey === opt.key
                                                    ? "border-indigo-500 bg-indigo-50 text-indigo-600 shadow-md transform scale-105"
                                                    : "border-transparent bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                                            }`}
                                        >
                                            {opt.component}
                                            {form.iconKey === opt.key && (
                                                <div className="absolute -top-2 -right-2 bg-indigo-600 text-white p-1 rounded-full text-[10px]">
                                                    <FaCheck />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full mt-4 bg-gray-900 hover:bg-black text-white py-3.5 rounded-xl font-bold shadow-lg shadow-gray-400/30 transform transition hover:-translate-y-1 active:translate-y-0"
                            >
                                {isEditing
                                    ? "Simpan Perubahan"
                                    : "Tambahkan Sekarang"}
                            </button>
                        </form>
                    </div>
                </div>

                {/* --- RIGHT COLUMN: LIST & PREVIEW (8 cols) --- */}
                <div className="lg:col-span-7 xl:col-span-8 space-y-8">
                    {/* List Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-white">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">
                                    Daftar Aktif
                                </h3>
                                <p className="text-gray-400 text-xs mt-1">
                                    Sosmed ini sedang tampil di website.
                                </p>
                            </div>
                            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold">
                                Total: {socials.length}
                            </span>
                        </div>

                        <div className="p-4 grid gap-4">
                            {socials.length === 0 ? (
                                <div className="text-center py-10 text-gray-400 border-2 border-dashed border-gray-100 rounded-xl">
                                    <FaGlobe className="mx-auto text-3xl mb-3 opacity-20" />
                                    <p>Belum ada data sosial media.</p>
                                </div>
                            ) : (
                                socials.map((item) => (
                                    <div
                                        key={item.id}
                                        className="group flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:border-indigo-100 hover:shadow-md hover:shadow-indigo-500/5 transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-2xl group-hover:bg-indigo-50 transition-colors">
                                                {renderIcon(item.iconKey)}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-800 text-sm group-hover:text-indigo-600 transition-colors">
                                                    {item.label}
                                                </h4>
                                                <a
                                                    href={item.link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-xs text-gray-400 hover:text-indigo-500 hover:underline truncate max-w-[150px] md:max-w-xs block"
                                                >
                                                    {item.link}
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                                                title="Edit"
                                            >
                                                <FaPen className="text-sm" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(item.id)
                                                }
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                                title="Hapus"
                                            >
                                                <FaTrashAlt className="text-sm" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Live Preview Section */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                        <div className="relative bg-[#111827] rounded-2xl p-8 md:p-10 text-white overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <FaGlobe className="text-9xl transform rotate-12 translate-x-10 -translate-y-10" />
                            </div>

                            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                                <div className="text-center md:text-left">
                                    <p className="text-gray-400 text-xs font-bold tracking-[0.2em] uppercase mb-2">
                                        Live Preview Footer
                                    </p>
                                    <h4 className="text-xl font-semibold text-white">
                                        Ikuti Kami
                                    </h4>
                                    <p className="text-gray-500 text-sm mt-1 max-w-sm">
                                        Tampilan ikon di bawah ini
                                        merepresentasikan apa yang dilihat
                                        pengunjung.
                                    </p>
                                </div>

                                <div className="flex flex-wrap justify-center gap-4 bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                                    {socials.length === 0 ? (
                                        <span className="text-gray-500 text-xs italic">
                                            Tidak ada sosmed
                                        </span>
                                    ) : (
                                        socials.map((item) => (
                                            <div
                                                key={item.id}
                                                className="group/icon relative"
                                            >
                                                <a
                                                    href="#"
                                                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 text-gray-400 text-lg hover:bg-indigo-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/50"
                                                >
                                                    {renderIcon(
                                                        item.iconKey,
                                                        "text-current"
                                                    )}
                                                </a>
                                                {/* Tooltip Simulation */}
                                                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                                    {item.label}
                                                </span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
