import React, { useState, useEffect, useRef } from "react";
// Catatan: Karena lingkungan ini tidak dapat me-resolve '@inertiajs/react',
// komponen <Link> diganti dengan tag <a> standar untuk tujuan demo.
// Dalam proyek Laravel Inertia yang sebenarnya, Anda harus menggunakan <Link>.
// import { Link } from "@inertiajs/react";

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
    ChevronDown,
} from "lucide-react";

// --- Komponen Header ---
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null); // State untuk dropdown desktop
    const [openMobileSubmenu, setOpenMobileSubmenu] = useState(null); // State untuk submenu mobile
    const dropdownRef = useRef(null);

    // Menggunakan tag <a> sebagai pengganti <Link>
    const Link = (props) => <a {...props}>{props.children}</a>;

    // Menyesuaikan navLinks dengan routes/web.php
    const navLinks = [
        { label: "Beranda", href: "/" },
        { label: "Layanan", href: "/layanan" },
        { label: "Tentang Kami", href: "/tentang-kami" },
        { label: "Kontak", href: "/contact" },
        {
            label: "Karir & Program",
            isDropdown: true,
            items: [
                { label: "Lowongan Kerja", href: "/lowongan-kerja" },
                { label: "Internship", href: "/internship" },
                { label: "Program Kami", href: "/program-kami" },
            ],
        },
    ];

    const handleDropdownToggle = (label) => {
        setOpenDropdown(openDropdown === label ? null : label);
    };

    const handleMobileSubmenuToggle = (label) => {
        setOpenMobileSubmenu(openMobileSubmenu === label ? null : label);
    };

    // Efek untuk menutup dropdown saat klik di luar
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpenDropdown(null);
            }
        }
        // Tambahkan event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Hapus event listener saat komponen unmount
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex-shrink-0">
                        <Link
                            href="/"
                            className="text-2xl font-bold text-gray-800"
                        >
                            Titipsini
                            <span className="text-green-600">.com</span>
                        </Link>
                    </div>
                    {/* Navigasi Desktop */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) =>
                            link.isDropdown ? (
                                <div
                                    key={link.label}
                                    className="relative"
                                    ref={dropdownRef}
                                >
                                    <button
                                        onClick={() =>
                                            handleDropdownToggle(link.label)
                                        }
                                        className="flex items-center text-gray-600 hover:text-green-600 transition-colors font-medium focus:outline-none"
                                    >
                                        {link.label}
                                        <ChevronDown
                                            size={16}
                                            className={`ml-1 transition-transform duration-200 ${
                                                openDropdown === link.label
                                                    ? "transform rotate-180"
                                                    : ""
                                            }`}
                                        />
                                    </button>
                                    {openDropdown === link.label && (
                                        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                                            {link.items.map((item) => (
                                                <Link
                                                    key={item.label}
                                                    href={item.href}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                                                    onClick={() =>
                                                        setOpenDropdown(null)
                                                    } // Tutup dropdown setelah item diklik
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="text-gray-600 hover:text-green-600 transition-colors font-medium"
                                >
                                    {link.label}
                                </Link>
                            )
                        )}
                    </nav>
                    <div className="hidden md:flex items-center space-x-4">
                        <button className="text-gray-600 hover:text-green-600">
                            <Search size={20} />
                        </button>
                        <Link
                            href="#" // Ganti dengan route yang sesuai, misal: /titip
                            className="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                        >
                            Titip Sekarang
                        </Link>
                    </div>
                    {/* Tombol Menu Mobile */}
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
            {/* Menu Mobile */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) =>
                            link.isDropdown ? (
                                <div key={link.label}>
                                    <button
                                        onClick={() =>
                                            handleMobileSubmenuToggle(
                                                link.label
                                            )
                                        }
                                        className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-green-600"
                                    >
                                        <span>{link.label}</span>
                                        <ChevronDown
                                            size={20}
                                            className={`transition-transform duration-200 ${
                                                openMobileSubmenu === link.label
                                                    ? "transform rotate-180"
                                                    : ""
                                            }`}
                                        />
                                    </button>
                                    {openMobileSubmenu === link.label && (
                                        <div className="pl-6 mt-1 space-y-1">
                                            {link.items.map((item) => (
                                                <Link
                                                    key={item.label}
                                                    href={item.href}
                                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-white hover:bg-green-500"
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-green-600"
                                >
                                    {link.label}
                                </Link>
                            )
                        )}
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-200">
                        <div className="flex items-center justify-center px-5">
                            <Link
                                href="#" // Ganti dengan route yang sesuai, misal: /titip
                                className="w-full text-center bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                            >
                                Titip Sekarang
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

// --- Komponen Footer ---
const Footer = () => {
    // Menggunakan tag <a> sebagai pengganti <Link>
    const Link = (props) => <a {...props}>{props.children}</a>;

    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Kolom 1: Logo & Social */}
                    <div>
                        <h3 className="text-2xl font-bold">
                            Titipsini
                            <span className="text-green-500">.com</span>
                        </h3>
                        <p className="mt-2 text-gray-400 text-sm">
                            Solusi tepercaya untuk kebutuhan penitipan barang
                            Anda. Kami berkomitmen memberikan layanan storage
                            yang aman dengan kualitas tinggi.
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

                    {/* Kolom 2: Tautan Cepat */}
                    <div>
                        <h4 className="font-semibold tracking-wider">
                            Tautan Cepat
                        </h4>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <Link
                                    href="/"
                                    className="text-gray-400 hover:text-white text-sm"
                                >
                                    Beranda
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/layanan"
                                    className="text-gray-400 hover:text-white text-sm"
                                >
                                    Layanan
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/tentang-kami"
                                    className="text-gray-400 hover:text-white text-sm"
                                >
                                    Tentang Kami
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#" // Misal: /faq
                                    className="text-gray-400 hover:text-white text-sm"
                                >
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-gray-400 hover:text-white text-sm"
                                >
                                    Kontak
                                </Link>
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
                    <p>
                        &copy; 2025 Titipsini.com. Semua hak cipta dilindungi.
                    </p>
                </div>
            </div>
        </footer>
    );
};

// --- Komponen Layout Utama ---
// Komponen ini akan membungkus setiap halaman
export default function GuestLayout({ children }) {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
}
