import React from "react";
// Catatan: Import dari '@inertiajs/react' dinonaktifkan karena masalah di lingkungan pratinjau.
// import { Head, Link, useForm } from '@inertiajs/react';

// Komponen pengganti <Head>
const Head = ({ title }) => {
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

// Hook dan fungsi pengganti untuk useForm dan route()
const useForm = (initialData) => {
    const [data, setData] = React.useState(initialData);
    const [processing, setProcessing] = React.useState(false);
    const [errors, setErrors] = React.useState({});

    const put = (url) => {
        setProcessing(true);
        console.log("Simulating PUT request to:", url);
        console.log("Data:", data);
        setTimeout(() => {
            setProcessing(false);
            alert("Vacancy updated successfully! (This is a simulation)");
            window.location.href = "/admin/job-vacancies"; // Simulate redirect
        }, 1000);
    };

    // Menggunakan fungsi untuk setData agar kompatibel dengan onChange
    const handleSetData = (key, value) => {
        setData((prevData) => ({ ...prevData, [key]: value }));
    };

    return { data, setData: handleSetData, put, processing, errors };
};

const route = (name, params = "") => {
    const routes = {
        "job_vacancies.update": `/admin/job-vacancies/${params}`,
        "job_vacancies.index": "/admin/job-vacancies",
    };
    return routes[name] || "#";
};

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

export default function Edit({ auth, job_vacancy }) {
    const { data, setData, put, processing, errors } = useForm({
        title: job_vacancy.title || "",
        department: job_vacancy.department || "",
        location: job_vacancy.location || "",
        salary_range: job_vacancy.salary_range || "",
        type: job_vacancy.type || "Full-time",
        status: job_vacancy.status || "Open",
        description: job_vacancy.description || "",
        requirements: job_vacancy.requirements || "",
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("job_vacancies.update", job_vacancy.id));
    };

    return (
        <AdminLayout auth={auth}>
            <Head title={`Edit - ${job_vacancy.title}`} />
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                    Edit Job Vacancy
                </h2>
                <form onSubmit={submit} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.title && (
                            <p className="text-sm text-red-600 mt-1">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    {/* Department & Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label
                                htmlFor="department"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Department
                            </label>
                            <input
                                id="department"
                                type="text"
                                value={data.department}
                                onChange={(e) =>
                                    setData("department", e.target.value)
                                }
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            {errors.department && (
                                <p className="text-sm text-red-600 mt-1">
                                    {errors.department}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="location"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Location
                            </label>
                            <input
                                id="location"
                                type="text"
                                value={data.location}
                                onChange={(e) =>
                                    setData("location", e.target.value)
                                }
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            {errors.location && (
                                <p className="text-sm text-red-600 mt-1">
                                    {errors.location}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Type & Status */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label
                                htmlFor="type"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Job Type
                            </label>
                            <select
                                id="type"
                                value={data.type}
                                onChange={(e) =>
                                    setData("type", e.target.value)
                                }
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option>Full-time</option>
                                <option>Part-time</option>
                                <option>Internship</option>
                                <option>Contract</option>
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="status"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Status
                            </label>
                            <select
                                id="status"
                                value={data.status}
                                onChange={(e) =>
                                    setData("status", e.target.value)
                                }
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option>Open</option>
                                <option>Urgent Hiring</option>
                                <option>Closed</option>
                            </select>
                        </div>
                    </div>

                    {/* Salary Range */}
                    <div>
                        <label
                            htmlFor="salary_range"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Salary Range (Optional)
                        </label>
                        <input
                            id="salary_range"
                            type="text"
                            value={data.salary_range}
                            placeholder="e.g., Rp 5-7 juta"
                            onChange={(e) =>
                                setData("salary_range", e.target.value)
                            }
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Description (Optional)
                        </label>
                        <textarea
                            id="description"
                            rows="4"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        ></textarea>
                    </div>

                    {/* Requirements */}
                    <div>
                        <label
                            htmlFor="requirements"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Requirements
                        </label>
                        <textarea
                            id="requirements"
                            rows="4"
                            value={data.requirements}
                            onChange={(e) =>
                                setData("requirements", e.target.value)
                            }
                            placeholder="Separate each requirement with a comma, e.g., Skill 1, Skill 2, Skill 3"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        ></textarea>
                        {errors.requirements && (
                            <p className="text-sm text-red-600 mt-1">
                                {errors.requirements}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center justify-end space-x-4">
                        <Link
                            href={route("job_vacancies.index")}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 bg-indigo-600 text-white font-semibold text-sm rounded-md hover:bg-indigo-700 disabled:opacity-50"
                        >
                            Update Vacancy
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
