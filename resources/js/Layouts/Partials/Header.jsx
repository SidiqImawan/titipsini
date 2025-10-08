import React, { useState, useEffect, useRef } from "react";
import { Link } from "@inertiajs/react"; // <-- Menggunakan Link dari Inertia
import { Search, Menu, X, ChevronDown } from "lucide-react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [openMobileSubmenu, setOpenMobileSubmenu] = useState(null);
    const dropdownRef = useRef(null);

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

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpenDropdown(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* LOGO */}
                    <div className="flex-shrink-0">
                        <Link
                            href={route("home")}
                            className="text-2xl font-bold text-gray-800"
                        >
                            Titipsini
                            <span className="text-green-600">.com</span>
                        </Link>
                    </div>

                    {/* NAV DESKTOP */}
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
                                        className="flex items-center text-gray-600 hover:text-green-600 transition-colors font-medium"
                                    >
                                        {link.label}
                                        <ChevronDown
                                            size={16}
                                            className={`ml-1 transition-transform duration-200 ${
                                                openDropdown === link.label
                                                    ? "rotate-180"
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
                                                    }
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

                    {/* ACTION BUTTONS */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button className="text-gray-600 hover:text-green-600">
                            <Search size={20} />
                        </button>
                        <Link
                            href="#" // Ganti dengan route yang sesuai
                            className="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                        >
                            Titip Sekarang
                        </Link>
                    </div>

                    {/* MOBILE MENU BUTTON */}
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

            {/* MENU MOBILE */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {/* (Logika untuk mobile menu disalin dari file asli Anda) */}
                    </div>
                </div>
            )}
        </header>
    );
}
