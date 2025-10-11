import React, { useState, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import {
    Save,
    Facebook,
    Instagram,
    Twitter,
    CheckCircle,
    Loader2,
} from "lucide-react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";

// Komponen Input dengan ikon untuk tampilan modern
const SettingsInput = ({ id, label, icon, error, ...props }) => (
    <div className="relative group">
        <InputLabel
            htmlFor={id}
            value={label}
            className="text-gray-700 font-medium tracking-tight"
        />
        <div className="relative mt-1 flex items-center">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                {icon}
            </div>
            <TextInput
                id={id}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl shadow-sm bg-gray-50 focus:bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                {...props}
            />
        </div>
        <InputError message={error} className="mt-2" />
    </div>
);

export default function SocialIndex({ settings, flash }) {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);

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
                <h2 className="font-semibold text-2xl text-gray-800 leading-tight tracking-tight">
                    Pengaturan / Media Sosial
                </h2>
            }
        >
            <Head title="Media Sosial" />

            <div
                className={`py-12 transition-all duration-700 ease-out ${
                    isMounted
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                }`}
            >
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-white to-indigo-50 shadow-lg border border-gray-100 rounded-2xl overflow-hidden backdrop-blur-sm">
                        <form
                            onSubmit={submit}
                            className="p-8 md:p-10 space-y-6"
                        >
                            <div className="flex justify-between items-center border-b border-gray-200 pb-5">
                                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                    <Save className="w-5 h-5 text-indigo-600" />
                                    Edit Media Sosial
                                </h2>
                                <div className="h-1 w-16 bg-indigo-500 rounded-full"></div>
                            </div>

                            {flash?.success && (
                                <div className="mb-6 flex items-center p-4 bg-green-50 text-green-700 rounded-xl border border-green-200 shadow-sm">
                                    <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                                    <span className="font-medium">
                                        {flash.success}
                                    </span>
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
                                icon={<Facebook size={16} />}
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
                                icon={<Instagram size={16} />}
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
                                icon={<Twitter size={16} />}
                                placeholder="https://twitter.com/username"
                            />

                            <div className="flex items-center justify-end mt-10 pt-6 border-t border-gray-200">
                                <PrimaryButton
                                    disabled={processing}
                                    className="flex items-center px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all"
                                >
                                    {processing ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Menyimpan...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4 mr-2" />
                                            Simpan Perubahan
                                        </>
                                    )}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
