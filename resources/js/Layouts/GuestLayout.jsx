import React, { useState, useEffect } from "react";
import Header from "./Partials/Header"; // <-- Import komponen Header
import Footer from "./Partials/Footer"; // <-- Import komponen Footer

export default function GuestLayout({ children }) {
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
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            {/* Header hanya muncul jika bukan halaman auth */}
            {!isAuthPage && <Header />}

            <main className="flex-grow">{children}</main>

            {/* Footer hanya muncul jika bukan halaman auth */}
            {!isAuthPage && <Footer />}
        </div>
    );
}
