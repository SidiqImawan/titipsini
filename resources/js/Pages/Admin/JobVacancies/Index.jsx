import React from "react";
// Catatan: Import dari '@inertiajs/react' dinonaktifkan karena masalah di lingkungan pratinjau.
// import { Head, Link, usePage } from '@inertiajs/react';
import { PlusCircle, Edit, Trash2 } from "lucide-react";

// Komponen pengganti <Head>
const Head = ({ title }) => {
    // Di proyek nyata, ini akan mengubah judul dokumen. Di sini hanya sebagai placeholder.
    React.useEffect(() => {
        document.title = title;
    }, [title]);
    return null;
};

// Komponen pengganti <Link>
const Link = ({ href, children, ...props }) => (
    <a href={href} {...props}>
        {children}
    </a>
);

// Hook pengganti usePage
const usePage = () => ({
    props: {
        flash: {}, // Mensimulasikan flash message kosong
    },
});

// Layout Admin Sederhana (bisa diganti dengan layout utama Anda)
const AdminLayout = ({ children, auth }) => (
    <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
                <div className="text-sm text-gray-600">
                    Welcome, {auth ? auth.user.name : "Admin"}
                </div>
            </div>
        </header>
        <main className="py-10">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">{children}</div>
        </main>
    </div>
);

export default function Index({ auth, job_vacancies }) {
    const { flash } = usePage().props;

    // Fungsi pengganti route() helper
    const route = (name, params = {}) => {
        const routes = {
            "job_vacancies.create": "/admin/job-vacancies/create",
            "job_vacancies.edit": `/admin/job-vacancies/${params}/edit`,
            "job_vacancies.destroy": `/admin/job-vacancies/${params}`,
        };
        return routes[name] || "#";
    };

    return (
        <AdminLayout auth={auth}>
            <Head title="Manage Job Vacancies" />

            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-700">
                            Job Vacancies List
                        </h2>
                        <Link
                            href={route("job_vacancies.create")}
                            className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-semibold text-sm rounded-md hover:bg-green-700 transition"
                        >
                            <PlusCircle className="w-4 h-4 mr-2" />
                            Add New Vacancy
                        </Link>
                    </div>

                    {flash.success && (
                        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-md">
                            {flash.success}
                        </div>
                    )}

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Department
                                    </th>
                                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th className="py-3 px-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {job_vacancies.map((vacancy) => (
                                    <tr
                                        key={vacancy.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {vacancy.title}
                                        </td>
                                        <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-600">
                                            {vacancy.department}
                                        </td>
                                        <td className="py-4 px-6 whitespace-nowrap">
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    vacancy.status === "Open"
                                                        ? "bg-green-100 text-green-800"
                                                        : vacancy.status ===
                                                          "Urgent Hiring"
                                                        ? "bg-red-100 text-red-800"
                                                        : "bg-gray-100 text-gray-800"
                                                }`}
                                            >
                                                {vacancy.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-600">
                                            {vacancy.type}
                                        </td>
                                        <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-right">
                                            <Link
                                                href={route(
                                                    "job_vacancies.edit",
                                                    vacancy.id
                                                )}
                                                className="text-indigo-600 hover:text-indigo-900 mr-4"
                                            >
                                                <Edit className="w-5 h-5 inline" />
                                            </Link>
                                            <a // Diubah dari Link untuk menghindari properti yang tidak didukung
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (
                                                        confirm(
                                                            "Are you sure you want to delete this item?"
                                                        )
                                                    ) {
                                                        // Di proyek nyata, ini akan memicu request Inertia
                                                        alert(
                                                            "Item would be deleted!"
                                                        );
                                                    }
                                                }}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                <Trash2 className="w-5 h-5 inline" />
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                                {job_vacancies.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="py-8 px-6 text-center text-gray-500"
                                        >
                                            No job vacancies found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
