import React, { useState } from "react";
import {
    Search,
    Menu,
    X,
    Phone,
    Mail,
    MapPin,
    Facebook,
    Twitter,
    Instagram,
} from "lucide-react";

// --- Komponen Header ---
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // Di Laravel, kita akan menggunakan router Inertia, jadi kita ganti <a> dengan <Link> nantinya
    const navLinks = [
        "Beranda",
        "Layanan",
        "Tentang Kami",
        "Kontak",
        "Karir & Program",
    ];

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex-shrink-0">
                        <a
                            href="/"
                            className="text-2xl font-bold text-gray-800"
                        >
                            Titipsini
                            <span className="text-green-600">.com</span>
                        </a>
                    </div>
                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link}
                                href="#"
                                className="text-gray-600 hover:text-green-600 transition-colors font-medium"
                            >
                                {link}
                            </a>
                        ))}
                    </nav>
                    <div className="hidden md:flex items-center space-x-4">
                        <button className="text-gray-600 hover:text-green-600">
                            <Search size={20} />
                        </button>
                        <a
                            href="#"
                            className="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                        >
                            Titip Sekarang
                        </a>
                    </div>
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-600"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <a
                                key={link}
                                href="#"
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-green-600"
                            >
                                {link}
                            </a>
                        ))}
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-200">
                        <div className="flex items-center justify-center px-5">
                            <a
                                href="#"
                                className="w-full text-center bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                            >
                                Titip Sekarang
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

// --- Komponen Footer ---
const Footer = () => (
    <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Kolom 1: Logo & Social */}
                <div>
                    <h3 className="text-2xl font-bold">
                        Titipsini<span className="text-green-500">.com</span>
                    </h3>
                    <p className="mt-2 text-gray-400 text-sm">
                        Solusi tepercaya untuk kebutuhan penitipan barang Anda.
                        Kami berkomitmen memberikan layanan storage yang aman
                        dengan kualitas tinggi.
                    </p>
                    <div className="flex space-x-4 mt-4">
                        <a href="#" className="text-gray-400 hover:text-white">
                            <Facebook />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <Instagram />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <Twitter />
                        </a>
                    </div>
                </div>

                {/* Kolom 2: Tautan Cepat */}
                <div>
                    <h4 className="font-semibold tracking-wider">
                        Tautan Cepat
                    </h4>
                    <ul className="mt-4 space-y-2">
                        <li>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white text-sm"
                            >
                                Beranda
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white text-sm"
                            >
                                Layanan
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white text-sm"
                            >
                                Tentang Kami
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white text-sm"
                            >
                                FAQ
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white text-sm"
                            >
                                Kontak
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Kolom 3: Hubungi Kami */}
                <div>
                    <h4 className="font-semibold tracking-wider">
                        Hubungi Kami
                    </h4>
                    <ul className="mt-4 space-y-3">
                        <li className="flex items-start text-sm">
                            <Phone
                                size={16}
                                className="mr-3 mt-1 flex-shrink-0"
                            />
                            <span className="text-gray-400">
                                +62 812-3456-7890
                            </span>
                        </li>
                        <li className="flex items-start text-sm">
                            <Mail
                                size={16}
                                className="mr-3 mt-1 flex-shrink-0"
                            />
                            <span className="text-gray-400">
                                info@titipsini.com
                            </span>
                        </li>
                        <li className="flex items-start text-sm">
                            <MapPin
                                size={16}
                                className="mr-3 mt-1 flex-shrink-0"
                            />
                            <span className="text-gray-400">
                                Jakarta, Indonesia
                            </span>
                        </li>
                    </ul>
                </div>

                {/* Kolom 4: Newsletter */}
                <div>
                    <h4 className="font-semibold tracking-wider">Newsletter</h4>
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
                <p>&copy; 2025 Titipsini.com. Semua hak cipta dilindungi.</p>
            </div>
        </div>
    </footer>
);

// --- Komponen Layout Utama ---
// Komponen ini akan membungkus setiap halaman
export default function GuestLayout({ children }) {
    return (
        <div className="bg-white">
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
