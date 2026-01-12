import React, { useState } from "react";
import {
    FaGift,
    FaLockOpen,
    FaPlus,
    FaTrash,
    FaEdit,
    FaCheckCircle,
    FaSave,
    FaTimes,
    FaLightbulb,
} from "react-icons/fa";

// --- DUMMY DATA ---
const initialData = {
    bonus: [
        { id: 1, text: "Pelatihan online (bisnis, teknik jual, dll)" },
        { id: 2, text: "Sertifikat resmi dari Titipsini.com" },
        { id: 3, text: "Panduan Bisnis Lengkap (E-book)" },
        { id: 4, text: "1 tahun gratis sistem OKR bisnis" },
        { id: 5, text: "Listing bisnis prioritas di website" },
    ],
    access: [
        { id: 101, text: "Akses Dashboard Mitra Lengkap" },
        { id: 102, text: "Pelatihan offline (Gathering Tahunan)" },
        { id: 103, text: "Akses ke Grup WhatsApp Komunitas" },
        { id: 104, text: "Mentoring Bulanan via Zoom" },
    ],
};

export default function AdminBenefits() {
    // --- STATE ---
    const [data, setData] = useState(initialData);
    const [editingItem, setEditingItem] = useState(null); // { type: 'bonus'|'access', id: number }
    const [tempText, setTempText] = useState("");

    // --- HANDLERS ---

    // 1. Delete Item
    const handleDelete = (type, id) => {
        if (window.confirm("Hapus keuntungan ini?")) {
            setData({
                ...data,
                [type]: data[type].filter((item) => item.id !== id),
            });
        }
    };

    // 2. Add New Item
    const handleAdd = (type) => {
        const newItem = {
            id: Date.now(),
            text: "Keuntungan baru (Silakan edit)...",
        };
        setData({
            ...data,
            [type]: [...data[type], newItem],
        });
        // Langsung masuk mode edit
        setEditingItem({ type, id: newItem.id });
        setTempText(newItem.text);
    };

    // 3. Start Editing
    const startEdit = (type, item) => {
        setEditingItem({ type, id: item.id });
        setTempText(item.text);
    };

    // 4. Save Editing
    const saveEdit = () => {
        if (!editingItem) return;
        const { type, id } = editingItem;

        setData({
            ...data,
            [type]: data[type].map((item) =>
                item.id === id ? { ...item, text: tempText } : item
            ),
        });
        setEditingItem(null);
        setTempText("");
    };

    // 5. Cancel Editing
    const cancelEdit = () => {
        setEditingItem(null);
        setTempText("");
    };

    // Helper Component untuk render list item (Biar kode rapi)
    const ListItem = ({ item, type, icon }) => {
        const isEditing =
            editingItem?.type === type && editingItem?.id === item.id;

        return (
            <div
                className={`group flex items-center gap-3 p-4 rounded-xl transition-all duration-300 border ${
                    isEditing
                        ? "bg-indigo-50 border-indigo-300 shadow-md ring-2 ring-indigo-200"
                        : "bg-white border-gray-100 hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-500/5"
                }`}
            >
                {/* Icon Bullet */}
                <div
                    className={`flex-shrink-0 mt-1 ${
                        isEditing
                            ? "text-indigo-600"
                            : "text-gray-400 group-hover:text-indigo-500"
                    }`}
                >
                    {icon}
                </div>

                {/* Content Area */}
                <div className="flex-1">
                    {isEditing ? (
                        <input
                            type="text"
                            value={tempText}
                            onChange={(e) => setTempText(e.target.value)}
                            className="w-full bg-transparent border-b border-indigo-400 focus:outline-none text-gray-800 font-medium pb-1"
                            autoFocus
                            onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                        />
                    ) : (
                        <span className="text-gray-700 leading-relaxed block">
                            {item.text}
                        </span>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                    {isEditing ? (
                        <>
                            <button
                                onClick={saveEdit}
                                className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition"
                                title="Simpan"
                            >
                                <FaSave />
                            </button>
                            <button
                                onClick={cancelEdit}
                                className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                                title="Batal"
                            >
                                <FaTimes />
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => startEdit(type, item)}
                                className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                                title="Edit Teks"
                            >
                                <FaEdit />
                            </button>
                            <button
                                onClick={() => handleDelete(type, item.id)}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                                title="Hapus List"
                            >
                                <FaTrash size={14} />
                            </button>
                        </>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#F3F4F6] font-sans p-6 md:p-10 text-gray-800">
            {/* --- HEADER --- */}
            <div className="max-w-5xl mx-auto mb-10">
                <h1 className="text-3xl font-extrabold text-gray-900">
                    Keuntungan & Bonus
                </h1>
                <p className="text-gray-500 mt-1">
                    Kelola daftar keuntungan eksklusif yang didapatkan mitra
                    saat bergabung.
                </p>
            </div>

            {/* --- CONTENT GRID --- */}
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* COLUMN 1: BONUS */}
                <div className="flex flex-col">
                    {/* Card Header */}
                    <div className="bg-white p-6 rounded-t-2xl border-b border-gray-100 shadow-sm flex justify-between items-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-orange-400"></div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <FaGift className="text-orange-500" /> Daftar
                                Bonus
                            </h2>
                            <p className="text-xs text-gray-400 mt-1">
                                Item fisik/digital tambahan
                            </p>
                        </div>
                        <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold">
                            {data.bonus.length} Items
                        </span>
                    </div>

                    {/* List Content */}
                    <div className="bg-white p-6 rounded-b-2xl shadow-sm border border-gray-100 border-t-0 flex-1 flex flex-col">
                        <div className="space-y-3 flex-1">
                            {data.bonus.length === 0 && (
                                <p className="text-center text-gray-400 py-4 italic">
                                    Belum ada bonus ditambahkan.
                                </p>
                            )}
                            {data.bonus.map((item) => (
                                <ListItem
                                    key={item.id}
                                    item={item}
                                    type="bonus"
                                    icon={<FaCheckCircle size={16} />}
                                />
                            ))}
                        </div>

                        <button
                            onClick={() => handleAdd("bonus")}
                            className="mt-6 w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 font-semibold hover:border-orange-300 hover:text-orange-500 hover:bg-orange-50 transition flex items-center justify-center gap-2"
                        >
                            <FaPlus size={12} /> Tambah Bonus Baru
                        </button>
                    </div>
                </div>

                {/* COLUMN 2: AKSES LENGKAP */}
                <div className="flex flex-col">
                    {/* Card Header */}
                    <div className="bg-white p-6 rounded-t-2xl border-b border-gray-100 shadow-sm flex justify-between items-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-indigo-600"></div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <FaLockOpen className="text-indigo-600" /> Akses
                                Lengkap
                            </h2>
                            <p className="text-xs text-gray-400 mt-1">
                                Privilege & akses sistem
                            </p>
                        </div>
                        <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold">
                            {data.access.length} Items
                        </span>
                    </div>

                    {/* List Content */}
                    <div className="bg-white p-6 rounded-b-2xl shadow-sm border border-gray-100 border-t-0 flex-1 flex flex-col">
                        <div className="space-y-3 flex-1">
                            {data.access.length === 0 && (
                                <p className="text-center text-gray-400 py-4 italic">
                                    Belum ada akses ditambahkan.
                                </p>
                            )}
                            {data.access.map((item) => (
                                <ListItem
                                    key={item.id}
                                    item={item}
                                    type="access"
                                    icon={<FaCheckCircle size={16} />}
                                />
                            ))}
                        </div>

                        <button
                            onClick={() => handleAdd("access")}
                            className="mt-6 w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 font-semibold hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition flex items-center justify-center gap-2"
                        >
                            <FaPlus size={12} /> Tambah Akses Baru
                        </button>
                    </div>
                </div>
            </div>

            {/* --- INFO BOX --- */}
            <div className="max-w-5xl mx-auto mt-8 bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600 mt-0.5">
                    <FaLightbulb />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-blue-800">
                        Tips Pengisian
                    </h4>
                    <p className="text-xs text-blue-600 mt-1 leading-relaxed">
                        Gunakan kalimat yang singkat namun memikat. Semakin
                        banyak poin keuntungan yang ditampilkan, semakin tinggi
                        kemungkinan calon mitra untuk bergabung. Data yang
                        diubah di sini akan otomatis tampil di halaman landing
                        page bagian "Keuntungan Eksklusif".
                    </p>
                </div>
            </div>
        </div>
    );
}
