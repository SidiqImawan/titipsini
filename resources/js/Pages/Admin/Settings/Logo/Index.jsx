import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import { Save, UploadCloud } from "lucide-react";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";

export default function LogoIndex({ settings, flash }) {
    const [logoPreview, setLogoPreview] = useState(null);

    const { data, setData, post, errors, processing, progress, reset } =
        useForm({
            logo: null,
        });

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("logo", file);
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.settings.logo.update"), {
            onSuccess: () => {
                reset("logo");
                setLogoPreview(null);
                if (document.getElementById("logo-input")) {
                    document.getElementById("logo-input").value = "";
                }
            },
        });
    };

    return (
        <AdminLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Pengaturan / Logo Situs
                </h2>
            }
        >
            <Head title="Logo Situs" />

            <div className="py-12">
                <div className="max-w-xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={submit} className="p-6 space-y-6">
                            {flash?.success && (
                                <div className="p-4 bg-green-100 text-green-700 rounded-md">
                                    {flash.success}
                                </div>
                            )}

                            <div>
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-medium text-gray-800">
                                        Logo Saat Ini
                                    </h3>
                                    {/* --- TOMBOL HAPUS BARU --- */}
                                    {settings.site_logo && (
                                        <Link
                                            href={route(
                                                "admin.settings.logo.destroy"
                                            )}
                                            method="delete"
                                            as="button"
                                            className="text-sm text-red-600 hover:underline"
                                            onBefore={() =>
                                                confirm(
                                                    "Anda yakin ingin menghapus logo ini?"
                                                )
                                            }
                                        >
                                            Hapus Logo
                                        </Link>
                                    )}
                                </div>

                                {settings.site_logo ? (
                                    <div className="mt-2 p-4 border rounded-md inline-block">
                                        <img
                                            src={`/storage/${settings.site_logo}`}
                                            alt="Logo Situs"
                                            className="h-20"
                                        />
                                    </div>
                                ) : (
                                    <p className="mt-2 text-sm text-gray-500">
                                        Belum ada logo yang diunggah.
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="logo-input"
                                    className="block text-lg font-medium text-gray-800"
                                >
                                    Unggah Logo Baru
                                </label>
                                <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                                        <div className="flex text-sm text-gray-600">
                                            <label
                                                htmlFor="logo-input"
                                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                                            >
                                                <span>Pilih file</span>
                                                <input
                                                    id="logo-input"
                                                    name="logo"
                                                    type="file"
                                                    className="sr-only"
                                                    onChange={handleLogoChange}
                                                />
                                            </label>
                                            <p className="pl-1">
                                                atau seret dan lepas
                                            </p>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            PNG, JPG, SVG, WEBP hingga 2MB
                                        </p>
                                    </div>
                                </div>
                                <InputError
                                    message={errors.logo}
                                    className="mt-2"
                                />
                            </div>

                            {logoPreview && (
                                <div>
                                    <h3 className="text-lg font-medium text-gray-800">
                                        Pratinjau Logo Baru
                                    </h3>
                                    <div className="mt-4 p-4 border rounded-md inline-block">
                                        <img
                                            src={logoPreview}
                                            alt="Pratinjau Logo Baru"
                                            className="h-20"
                                        />
                                    </div>
                                </div>
                            )}

                            {progress && (
                                <div className="w-full bg-gray-200 rounded-full">
                                    <div
                                        className="bg-indigo-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                                        style={{
                                            width: `${progress.percentage}%`,
                                        }}
                                    >
                                        {progress.percentage}%
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center justify-end">
                                <PrimaryButton
                                    disabled={processing || !data.logo}
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    Unggah & Simpan
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
