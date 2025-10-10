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

export default function SocialIndex({ settings, flash }) {
    const { data, setData, post, errors, processing } = useForm({
        social_facebook: settings.social_facebook || "",
        social_instagram: settings.social_instagram || "",
        social_twitter: settings.social_twitter || "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.settings.update"));
    };

    return (
        <AdminLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Pengaturan / Media Sosial
                </h2>
            }
        >
            <Head title="Media Sosial" />

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
                                id="social_facebook"
                                label="Facebook URL"
                                type="url"
                                value={data.social_facebook}
                                onChange={(e) =>
                                    setData("social_facebook", e.target.value)
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
                                    setData("social_instagram", e.target.value)
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
                                    setData("social_twitter", e.target.value)
                                }
                                error={errors.social_twitter}
                                placeholder="https://twitter.com/username"
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
