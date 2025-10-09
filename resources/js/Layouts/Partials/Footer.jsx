import React from "react";
import { Link, usePage } from "@inertiajs/react"; // <-- 1. Tambahkan usePage
import {
    Phone,
    Mail,
    MapPin,
    Facebook,
    Twitter,
    Instagram,
} from "lucide-react";

export default function Footer() {
    // 2. Ambil data settings dari props global
    const { settings } = usePage().props;

    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-2xl font-bold">
                            Titipsini
                            <span className="text-green-500">.com</span>
                        </h3>
                        <p className="mt-2 text-gray-400 text-sm">
                            Solusi tepercaya untuk kebutuhan penitipan barang
                            Anda.
                        </p>
                        <div className="flex space-x-4 mt-4">
                            {/* 3. Buat link sosmed menjadi dinamis */}
                            {settings.social_facebook &&
                                settings.social_facebook !== "#" && (
                                    <a
                                        href={settings.social_facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-white"
                                    >
                                        <Facebook />
                                    </a>
                                )}
                            {settings.social_instagram &&
                                settings.social_instagram !== "#" && (
                                    <a
                                        href={settings.social_instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-white"
                                    >
                                        <Instagram />
                                    </a>
                                )}
                            {settings.social_twitter &&
                                settings.social_twitter !== "#" && (
                                    <a
                                        href={settings.social_twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-white"
                                    >
                                        <Twitter />
                                    </a>
                                )}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold tracking-wider">
                            Tautan Cepat
                        </h4>
                        <ul className="mt-4 space-y-2 text-sm text-gray-400">
                            <li>
                                <Link href={route("home")}>Beranda</Link>
                            </li>
                            <li>
                                <Link href={route("layanan.show")}>
                                    Layanan
                                </Link>
                            </li>
                            <li>
                                <Link href={route("about")}>Tentang Kami</Link>
                            </li>
                            <li>
                                <Link href={route("contact.show")}>Kontak</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold tracking-wider">
                            Hubungi Kami
                        </h4>
                        <ul className="mt-4 space-y-3 text-sm text-gray-400">
                            {/* 4. Buat info kontak menjadi dinamis */}
                            <li className="flex items-start">
                                <Phone
                                    size={16}
                                    className="mr-3 mt-1 flex-shrink-0"
                                />
                                <span>{settings.contact_phone}</span>
                            </li>
                            <li className="flex items-start">
                                <Mail
                                    size={16}
                                    className="mr-3 mt-1 flex-shrink-0"
                                />
                                <span>{settings.contact_email}</span>
                            </li>
                            <li className="flex items-start">
                                <MapPin
                                    size={16}
                                    className="mr-3 mt-1 flex-shrink-0"
                                />
                                <span>{settings.contact_address}</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold tracking-wider">
                            Newsletter
                        </h4>
                        <p className="mt-4 text-gray-400 text-sm">
                            Dapatkan info dan promo terbaru dari kami.
                        </p>
                        <form className="mt-4 flex">
                            <input
                                type="email"
                                placeholder="Email Anda"
                                className="w-full px-4 py-2 rounded-l-md text-gray-800 focus:outline-none"
                            />
                            <button className="bg-green-600 px-4 py-2 rounded-r-md hover:bg-green-700 font-semibold text-sm">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} Titipsini.com. Semua hak
                    cipta dilindungi.
                </div>
            </div>
        </footer>
    );
}
