import React, { useState } from "react";
// import AdminLayout from '@/Layouts/AdminLayout'; // Dinonaktifkan karena batasan lingkungan pratinjau
// import { Head, useForm } from '@inertiajs/react'; // Dinonaktifkan karena batasan lingkungan pratinjau
import { PlusCircle, Trash2, Save } from "lucide-react";

// --- Komponen Placeholder untuk Lingkungan Pratinjau ---
// Di proyek nyata, Anda akan mengimpor ini dari Inertia dan file layout Anda

const Head = ({ title }) => {
    React.useEffect(() => {
        document.title = title;
    }, [title]);
    return null;
};

const useForm = (initialData) => {
    const [data, setData] = useState(initialData);
    const post = (url) => {
        console.log("Mengirim data ke:", url);
        console.log("Data:", data);
        alert("Perubahan akan disimpan!");
    };
    const errors = {}; // Mensimulasikan tidak ada error
    return { data, setData, post, errors, processing: false };
};

const AdminLayout = ({ children }) => (
    <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto">
            <header className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">
                    Admin Panel
                </h1>
            </header>
            <main>{children}</main>
        </div>
    </div>
);

const route = (routeName) => {
    // Fungsi route tiruan untuk demonstrasi
    console.log(`Mencoba membuat URL untuk: ${routeName}`);
    return "#";
};

// ---------------------------------------------------------

export default function SocialMedia({ social_media_links }) {
    // Data awal disimulasikan jika tidak ada dari props
    const initialLinks = social_media_links || [
        {
            id: 1,
            platform: "Instagram",
            url: "https://instagram.com/titipsini",
        },
        { id: 2, platform: "Facebook", url: "https://facebook.com/titipsini" },
        { id: 3, platform: "LinkedIn", url: "" },
    ];

    const { data, setData, post, errors, processing } = useForm({
        links: initialLinks,
    });

    // Fungsi untuk mengubah URL pada link tertentu
    const handleUrlChange = (id, newUrl) => {
        setData(
            "links",
            data.links.map((link) =>
                link.id === id ? { ...link, url: newUrl } : link
            )
        );
    };

    // Fungsi untuk menambah platform baru
    const addLink = () => {
        const newPlatform = prompt(
            "Masukkan nama platform baru (misal: Twitter):"
        );
        if (newPlatform) {
            const newId =
                data.links.length > 0
                    ? Math.max(...data.links.map((l) => l.id)) + 1
                    : 1;
            setData("links", [
                ...data.links,
                { id: newId, platform: newPlatform, url: "" },
            ]);
        }
    };

    // Fungsi untuk menghapus link
    const removeLink = (id) => {
        if (confirm("Anda yakin ingin menghapus platform ini?")) {
            setData(
                "links",
                data.links.filter((link) => link.id !== id)
            );
        }
    };

    // Fungsi untuk menyimpan perubahan
    const submit = (e) => {
        e.preventDefault();
        post(route("admin.social_media.update"));
    };

    return (
        <AdminLayout>
            <Head title="Edit Social Media" />

            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                        Manage Social Media Links
                    </h2>

                    <form onSubmit={submit}>
                        <div className="space-y-4">
                            {data.links.map((link) => (
                                <div
                                    key={link.id}
                                    className="flex items-center space-x-3"
                                >
                                    <div className="flex-grow">
                                        <label className="block text-sm font-medium text-gray-600 mb-1">
                                            {link.platform} URL
                                        </label>
                                        <input
                                            type="url"
                                            value={link.url}
                                            onChange={(e) =>
                                                handleUrlChange(
                                                    link.id,
                                                    e.target.value
                                                )
                                            }
                                            placeholder={`https://...`}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeLink(link.id)}
                                        className="mt-6 p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full transition"
                                        aria-label={`Hapus ${link.platform}`}
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Tombol Aksi */}
                        <div className="mt-8 flex items-center justify-between">
                            <button
                                type="button"
                                onClick={addLink}
                                className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 font-semibold text-sm rounded-md hover:bg-gray-300 transition"
                            >
                                <PlusCircle className="w-4 h-4 mr-2" />
                                Add Platform
                            </button>

                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center px-6 py-2 bg-indigo-600 text-white font-semibold text-sm rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
