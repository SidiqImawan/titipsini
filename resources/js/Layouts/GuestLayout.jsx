import React, { useState, useEffect } from "react";
import Header from "./Partials/Header";
import Footer from "./Partials/Footer";

// 1. Terima semua props dengan '...props'
export default function GuestLayout({ children, ...props }) {
    const [isAuthPage, setIsAuthPage] = useState(false);

    useEffect(() => {
        const path = window.location.pathname;
        const authPaths = [
            "/login",
            "/register",
            "/forgot-password",
            "/reset-password",
        ];
        setIsAuthPage(authPaths.some((authPath) => path.startsWith(authPath)));
    }, [children]); // Gunakan children sebagai dependensi agar di-cek ulang saat halaman ganti

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            {!isAuthPage && <Header />}

            <main className="flex-grow">
                {/* 2. 'Clone' children dan tempelkan sisa props ke dalamnya */}
                {React.cloneElement(children, props)}
            </main>

            {!isAuthPage && <Footer />}
        </div>
    );
}
