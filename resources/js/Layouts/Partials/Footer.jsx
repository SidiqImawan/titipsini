import React from "react";
import { Link } from "@inertiajs/react"; // <-- Menggunakan Link dari Inertia
import {
    Phone,
    Mail,
    MapPin,
    Facebook,
    Twitter,
    Instagram,
} from "lucide-react";

export default function Footer() {
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
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white"
                            >
                                <Facebook />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white"
                            >
                                <Instagram />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white"
                            >
                                <Twitter />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold tracking-wider">
                            Tautan Cepat
                        </h4>
                        <ul className="mt-4 space-y-2 text-sm text-gray-400">
                            <li>
                                <Link href="/">Beranda</Link>
                            </li>
                            <li>
                                <Link href="/layanan">Layanan</Link>
                            </li>
                            <li>
                                <Link href="/tentang-kami">Tentang Kami</Link>
                            </li>
                            <li>
                                <Link href="/contact">Kontak</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold tracking-wider">
                            Hubungi Kami
                        </h4>
                        <ul className="mt-4 space-y-3 text-sm text-gray-400">
                            <li className="flex items-start">
                                <Phone size={16} className="mr-3" /> +62
                                812-3456-7890
                            </li>
                            <li className="flex items-start">
                                <Mail size={16} className="mr-3" />{" "}
                                info@titipsini.com
                            </li>
                            <li className="flex items-start">
                                <MapPin size={16} className="mr-3" /> Jakarta,
                                Indonesia
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
                    &copy; 2025 Titipsini.com. Semua hak cipta dilindungi.
                </div>
            </div>
        </footer>
    );
}
