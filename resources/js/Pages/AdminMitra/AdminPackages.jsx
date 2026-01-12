import React, { useState } from "react";
import {
    FaPlus,
    FaTrash,
    FaEdit,
    FaCheckCircle,
    FaStar,
    FaTimes,
    FaSave,
    FaCrown,
    FaTag,
} from "react-icons/fa";

// --- DUMMY DATA ---
const initialPackages = [
    {
        id: 1,
        title: "Paket 1 Bulan",
        price: "Rp 500.000",
        duration: "1 Bulan Akses",
        features: [
            "Akses platform full 1 bulan",
            "Pelatihan online dasar",
            "Template marketing standar",
            "Support via email",
        ],
        isBestSeller: false,
        color: "bg-white", // Bisa dikembangin buat tema warna
    },
    {
        id: 2,
        title: "Paket 1 Tahun",
        price: "Rp 3.000.000",
        duration: "1 Tahun Akses + Bonus",
        features: [
            "Semua fitur paket 1 bulan",
            "Pelatihan offline eksklusif",
            "Mentoring 1-on-1",
            "Sertifikat resmi",
            "Priority support 24/7",
        ],
        isBestSeller: true,
        color: "bg-indigo-50", // Highlight color
    },
];

export default function AdminPackages() {
    // --- STATE ---
    const [packages, setPackages] = useState(initialPackages);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        duration: "",
        features: [],
        isBestSeller: false,
    });

    // --- HANDLERS ---

    // Buka Modal (Tambah Baru / Edit)
    const openModal = (pkg = null) => {
        if (pkg) {
            setEditingId(pkg.id);
            setFormData({ ...pkg });
        } else {
            setEditingId(null);
            setFormData({
                title: "",
                price: "",
                duration: "",
                features: ["Fitur baru..."], // Default 1 fitur kosong
                isBestSeller: false,
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    // Handle Input Form Utama
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // Handle Dynamic Features (Array)
    const handleFeatureChange = (index, value) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData({ ...formData, features: newFeatures });
    };

    const addFeatureField = () => {
        setFormData({ ...formData, features: [...formData.features, ""] });
    };

    const removeFeatureField = (index) => {
        const newFeatures = formData.features.filter((_, i) => i !== index);
        setFormData({ ...formData, features: newFeatures });
    };

    // Save Data
    const handleSave = (e) => {
        e.preventDefault();
        if (editingId) {
            // Update
            setPackages(
                packages.map((p) =>
                    p.id === editingId ? { ...formData, id: editingId } : p
                )
            );
        } else {
            // Create
            setPackages([...packages, { ...formData, id: Date.now() }]);
        }
        closeModal();
    };

    // Delete Data
    const handleDelete = (id) => {
        if (window.confirm("Yakin ingin menghapus paket ini?")) {
            setPackages(packages.filter((p) => p.id !== id));
        }
    };

    return (
        <div className="min-h-screen bg-[#F3F4F6] font-sans p-6 md:p-10 text-gray-800">
            {/* --- HEADER --- */}
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900">
                        Paket Kemitraan
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Atur harga, durasi, dan fitur paket yang ditawarkan.
                    </p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-500/30 transition transform hover:-translate-y-1"
                >
                    <FaPlus /> Tambah Paket
                </button>
            </div>

            {/* --- PACKAGE CARDS GRID --- */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {packages.map((pkg) => (
                    <div
                        key={pkg.id}
                        className={`relative group rounded-3xl p-8 border transition-all duration-300 flex flex-col ${
                            pkg.isBestSeller
                                ? "bg-white border-indigo-500 shadow-xl shadow-indigo-500/10 scale-105 z-10"
                                : "bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-100"
                        }`}
                    >
                        {/* Badge Best Seller */}
                        {pkg.isBestSeller && (
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1">
                                <FaCrown /> Best Seller
                            </div>
                        )}

                        {/* Header Card */}
                        <div className="text-center mb-6">
                            <h3 className="text-gray-500 font-semibold mb-2">
                                {pkg.title}
                            </h3>
                            <div className="text-4xl font-extrabold text-gray-900 tracking-tight">
                                {pkg.price}
                            </div>
                            <p className="text-indigo-600 text-sm font-medium mt-2 bg-indigo-50 inline-block px-3 py-1 rounded-lg">
                                {pkg.duration}
                            </p>
                        </div>

                        {/* Features List */}
                        <ul className="space-y-4 mb-8 flex-1">
                            {pkg.features.map((feat, i) => (
                                <li
                                    key={i}
                                    className="flex items-start text-sm text-gray-600"
                                >
                                    <FaCheckCircle className="text-indigo-500 mt-0.5 mr-3 flex-shrink-0" />
                                    <span className="leading-snug">{feat}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Action Buttons (Admin Only) */}
                        <div className="flex gap-3 pt-6 border-t border-gray-100 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button
                                onClick={() => openModal(pkg)}
                                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-50 text-gray-700 font-bold hover:bg-indigo-50 hover:text-indigo-600 transition"
                            >
                                <FaEdit /> Edit
                            </button>
                            <button
                                onClick={() => handleDelete(pkg.id)}
                                className="w-12 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}

                {/* Empty State Card (Add New) */}
                <button
                    onClick={() => openModal()}
                    className="border-2 border-dashed border-gray-300 rounded-3xl p-8 flex flex-col items-center justify-center text-gray-400 hover:border-indigo-400 hover:text-indigo-500 hover:bg-indigo-50/30 transition-all min-h-[400px] group"
                >
                    <div className="w-16 h-16 rounded-full bg-gray-100 group-hover:bg-indigo-100 flex items-center justify-center text-2xl mb-4 transition-colors">
                        <FaPlus />
                    </div>
                    <span className="font-bold">Buat Paket Baru</span>
                </button>
            </div>

            {/* --- MODAL EDIT/ADD --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop Blur */}
                    <div
                        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
                        onClick={closeModal}
                    ></div>

                    {/* Modal Content */}
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
                        {/* Modal Header */}
                        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                {editingId ? (
                                    <FaEdit className="text-indigo-500" />
                                ) : (
                                    <FaTag className="text-indigo-500" />
                                )}
                                {editingId ? "Edit Paket" : "Tambah Paket Baru"}
                            </h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-400 hover:text-red-500 transition"
                            >
                                <FaTimes className="text-xl" />
                            </button>
                        </div>

                        {/* Scrollable Form Area */}
                        <div className="p-8 overflow-y-auto">
                            <form onSubmit={handleSave} className="space-y-6">
                                {/* Row 1: Title & Price */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                                            Nama Paket
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            placeholder="e.g. Paket Sultan"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition font-medium"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                                            Harga Display
                                        </label>
                                        <input
                                            type="text"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleInputChange}
                                            placeholder="e.g. Rp 5.000.000"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition font-medium"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Row 2: Duration & Best Seller Toggle */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                                            Durasi / Subtitle
                                        </label>
                                        <input
                                            type="text"
                                            name="duration"
                                            value={formData.duration}
                                            onChange={handleInputChange}
                                            placeholder="e.g. Akses Selamanya"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition font-medium"
                                            required
                                        />
                                    </div>

                                    {/* Toggle Switch */}
                                    <div className="flex items-center justify-between bg-indigo-50 p-3 rounded-xl border border-indigo-100 mt-6">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className={`p-2 rounded-lg ${
                                                    formData.isBestSeller
                                                        ? "bg-amber-400 text-white"
                                                        : "bg-gray-200 text-gray-500"
                                                }`}
                                            >
                                                <FaCrown />
                                            </div>
                                            <span className="text-sm font-bold text-gray-700">
                                                Jadikan Best Seller?
                                            </span>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="isBestSeller"
                                                checked={formData.isBestSeller}
                                                onChange={handleInputChange}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                        </label>
                                    </div>
                                </div>

                                {/* Dynamic Features Input */}
                                <div>
                                    {/* --- PERBAIKAN DI SINI (Dihapus class 'block') --- */}
                                    <label className="text-xs font-bold text-gray-500 uppercase mb-3 flex justify-between items-center">
                                        <span>Daftar Fitur & Keuntungan</span>
                                        <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-400">
                                            Total: {formData.features.length}
                                        </span>
                                    </label>

                                    <div className="space-y-3">
                                        {formData.features.map(
                                            (feature, index) => (
                                                <div
                                                    key={index}
                                                    className="flex gap-2"
                                                >
                                                    <div className="flex items-center justify-center w-8 h-10 text-indigo-300">
                                                        <FaCheckCircle />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={feature}
                                                        onChange={(e) =>
                                                            handleFeatureChange(
                                                                index,
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder={`Fitur ke-${
                                                            index + 1
                                                        }`}
                                                        className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm transition"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeFeatureField(
                                                                index
                                                            )
                                                        }
                                                        className="w-10 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                                                        title="Hapus Fitur"
                                                    >
                                                        <FaTrash size={14} />
                                                    </button>
                                                </div>
                                            )
                                        )}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={addFeatureField}
                                        className="mt-3 text-sm text-indigo-600 font-bold hover:underline flex items-center gap-1"
                                    >
                                        <FaPlus size={12} /> Tambah Baris Fitur
                                    </button>
                                </div>

                                {/* Form Actions */}
                                <div className="pt-6 border-t border-gray-100 flex gap-4">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="flex-1 py-3 bg-white border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 hover:shadow-indigo-500/50 transition transform hover:-translate-y-1 flex justify-center items-center gap-2"
                                    >
                                        <FaSave />{" "}
                                        {editingId
                                            ? "Simpan Perubahan"
                                            : "Terbitkan Paket"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
