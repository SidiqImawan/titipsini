import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { Save } from "lucide-react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";

// Komponen reusable untuk setiap baris input
const SettingsInput = ({ id, label, error, ...props }) => (
    <div>
        <InputLabel htmlFor={id} value={label} />
        <TextInput id={id} className="mt-1 block w-full" {...props} />
        <InputError message={error} className="mt-2" />
    </div>
);

export default function ContactIndex({ settings, flash }) {
    const { data, setData, post, errors, processing } = useForm({
        contact_phone: settings.contact_phone || "",
        contact_email: settings.contact_email || "",
        contact_address: settings.contact_address || "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.settings.update"));
    };

    return (
        <AdminLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Pengaturan / Informasi Kontak
                </h2>
            }
        >
            <Head title="Informasi Kontak" />

            <div className="py-12">
                <div className="max-w-xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={submit} className="p-6 space-y-6">
                            {flash?.success && (
                                <div className="p-4 bg-green-100 text-green-700 rounded-md">
                                    {flash.success}
                                </div>
                            )}

                            <SettingsInput
                                id="contact_phone"
                                label="Nomor Telepon"
                                value={data.contact_phone}
                                onChange={(e) =>
                                    setData("contact_phone", e.target.value)
                                }
                                error={errors.contact_phone}
                            />

                            <SettingsInput
                                id="contact_email"
                                label="Alamat Email"
                                type="email"
                                value={data.contact_email}
                                onChange={(e) =>
                                    setData("contact_email", e.target.value)
                                }
                                error={errors.contact_email}
                            />

                            <SettingsInput
                                id="contact_address"
                                label="Alamat"
                                value={data.contact_address}
                                onChange={(e) =>
                                    setData("contact_address", e.target.value)
                                }
                                error={errors.contact_address}
                            />

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
        </AdminLayout>
    );
}
