import React from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    Phone,
    Mail,
    MapPin,
    Facebook,
    Twitter,
    Instagram,
} from "lucide-react";

export default function Footer() {
    const { settings = {} } = usePage().props;

    const contactPhone = settings.contact_phone || "+62 812-3456-7890";
    const contactEmail = settings.contact_email || "info@titipsini.com";
    const contactAddress = settings.contact_address || "Jakarta, Indonesia";

    return (
        <footer className="bg-slate-900 text-slate-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <Link href="/">
                            <div className="flex items-center space-x-3 mb-4">
                                <img
                                    src="/images/titipsini-fotter1.png"
                                    alt="Logo Titipsini.com"
                                    className="h-8 w-auto"
                                />
                                <span className="text-2xl font-bold text-white">
                                    Titipsini.com
                                </span>
                            </div>
                        </Link>
                        <p className="text-sm text-slate-400">
                            Solusi terpercaya untuk kebutuhan penitipan barang
                            Anda. Kami berkomitmen memberikan layanan storage
                            yang aman dengan kualitas tinggi.
                        </p>
                        <div className="flex space-x-4 mt-6">
                            {settings.social_facebook &&
                                settings.social_facebook !== "#" && (
                                    <a
                                        href={settings.social_facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-slate-400 hover:text-white transition-colors"
                                    >
                                        <Facebook size={20} />
                                    </a>
                                )}
                            {settings.social_instagram &&
                                settings.social_instagram !== "#" && (
                                    <a
                                        href={settings.social_instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-slate-400 hover:text-white transition-colors"
                                    >
                                        <Instagram size={20} />
                                    </a>
                                )}
                            {settings.social_twitter &&
                                settings.social_twitter !== "#" && (
                                    <a
                                        href={settings.social_twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-slate-400 hover:text-white transition-colors"
                                    >
                                        <Twitter size={20} />
                                    </a>
                                )}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">
                            Tautan Cepat
                        </h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li>
                                <Link
                                    href={route("home")}
                                    className="hover:text-white transition-colors"
                                >
                                    Beranda
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={route("layanan.show")}
                                    className="hover:text-white transition-colors"
                                >
                                    Layanan
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={route("about")}
                                    className="hover:text-white transition-colors"
                                >
                                    Tentang Kami
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={route("contact.show")}
                                    className="hover:text-white transition-colors"
                                >
                                    Kontak
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">
                            Layanan
                        </h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Penitipan Barang
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Storage Kendaraan
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Layanan Pengiriman
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Customer Support
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">
                            Hubungi Kami
                        </h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li className="flex items-start">
                                <Phone
                                    size={16}
                                    className="mr-3 mt-1 flex-shrink-0"
                                />
                                <span>{contactPhone}</span>
                            </li>
                            <li className="flex items-start">
                                <Mail
                                    size={16}
                                    className="mr-3 mt-1 flex-shrink-0"
                                />
                                <span>{contactEmail}</span>
                            </li>
                            <li className="flex items-start">
                                <MapPin
                                    size={16}
                                    className="mr-3 mt-1 flex-shrink-0"
                                />
                                <span>{contactAddress}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-700 mt-12 pt-8 text-center text-slate-500 text-sm">
                    &copy; {new Date().getFullYear()} Titipsini.com. Semua hak
                    cipta dilindungi.
                </div>
            </div>
        </footer>
    );
}
