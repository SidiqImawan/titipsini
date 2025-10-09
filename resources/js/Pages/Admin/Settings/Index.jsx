import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { Save } from "lucide-react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";

// Komponen reusable untuk setiap baris input agar lebih rapi
const SettingsInput = ({ id, label, error, ...props }) => (
    <div>
        <InputLabel htmlFor={id} value={label} />
        <TextInput id={id} className="mt-1 block w-full" {...props} />
        <InputError message={error} className="mt-2" />
    </div>
);

export default function SettingsIndex({ settings, flash }) {
    // 1. Terima prop 'settings' dari controller
    // 2. Inisialisasi useForm dengan data settings
    const { data, setData, post, errors, processing } = useForm({
        contact_phone: settings.contact_phone || "",
        contact_email: settings.contact_email || "",
        contact_address: settings.contact_address || "",
        social_facebook: settings.social_facebook || "",
        social_instagram: settings.social_instagram || "",
        social_twitter: settings.social_twitter || "",
    });

    // 3. Fungsi untuk submit form
    const submit = (e) => {
        e.preventDefault();
        post(route("admin.settings.update"));
    };

    return (
        <AdminLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Pengaturan Situs
                </h2>
            }
        >
            <Head title="Pengaturan Situs" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Menampilkan notifikasi sukses jika ada */}
                            {flash?.success && (
                                <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
                                    {flash.success}
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-8">
                                {/* --- BAGIAN INFORMASI KONTAK --- */}
                                <div>
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                                        Informasi Kontak
                                    </h3>
                                    <div className="mt-4 space-y-4">
                                        <SettingsInput
                                            id="contact_phone"
                                            label="Nomor Telepon"
                                            value={data.contact_phone}
                                            onChange={(e) =>
                                                setData(
                                                    "contact_phone",
                                                    e.target.value
                                                )
                                            }
                                            error={errors.contact_phone}
                                        />
                                        <SettingsInput
                                            id="contact_email"
                                            label="Alamat Email"
                                            type="email"
                                            value={data.contact_email}
                                            onChange={(e) =>
                                                setData(
                                                    "contact_email",
                                                    e.target.value
                                                )
                                            }
                                            error={errors.contact_email}
                                        />
                                        <SettingsInput
                                            id="contact_address"
                                            label="Alamat"
                                            value={data.contact_address}
                                            onChange={(e) =>
                                                setData(
                                                    "contact_address",
                                                    e.target.value
                                                )
                                            }
                                            error={errors.contact_address}
                                        />
                                    </div>
                                </div>

                                {/* --- BAGIAN MEDIA SOSIAL --- */}
                                <div>
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                                        Tautan Media Sosial
                                    </h3>
                                    <div className="mt-4 space-y-4">
                                        <SettingsInput
                                            id="social_facebook"
                                            label="Facebook URL"
                                            type="url"
                                            value={data.social_facebook}
                                            onChange={(e) =>
                                                setData(
                                                    "social_facebook",
                                                    e.target.value
                                                )
                                            }
                                            error={errors.social_facebook}
                                            placeholder="https://facebook.com/username"
                                        />
                                        <SettingsInput
                                            id="social_instagram"
                                            label="Instagram URL"
                                            type="url"
                                            value={data.social_instagram}
                                            onChange={(e) =>
                                                setData(
                                                    "social_instagram",
                                                    e.target.value
                                                )
                                            }
                                            error={errors.social_instagram}
                                            placeholder="https://instagram.com/username"
                                        />
                                        <SettingsInput
                                            id="social_twitter"
                                            label="Twitter URL"
                                            type="url"
                                            value={data.social_twitter}
                                            onChange={(e) =>
                                                setData(
                                                    "social_twitter",
                                                    e.target.value
                                                )
                                            }
                                            error={errors.social_twitter}
                                            placeholder="https://twitter.com/username"
                                        />
                                    </div>
                                </div>

                                {/* --- TOMBOL SIMPAN --- */}
                                <div className="flex items-center justify-end">
                                    <PrimaryButton disabled={processing}>
                                        <Save className="w-4 h-4 mr-2" />
                                        Simpan Perubahan
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
