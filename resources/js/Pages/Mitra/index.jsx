import React from "react";
import { Head } from "@inertiajs/react";
import {
    FaTags,
    FaBuilding,
    FaMobileAlt,
    FaBullhorn,
    FaShieldAlt,
    FaChartLine,
    FaGift,
    FaHeadset,
    FaCheckCircle,
    FaStar,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaClipboardCheck,
    FaLockOpen,
    FaLightbulb,
    FaInstagram,
    FaFacebook,
    FaWhatsapp,
    FaGlobe,
} from "react-icons/fa";
import * as FaIcons from "react-icons/fa";

// 🔹 HELPER: GENERATE WA LINK (Auto Format 62) 🟢
const getWaLink = (number, message) => {
    // 1. Default value jika data kosong
    let phone = number || "6281234567890";
    let msg = message || "Halo Admin, saya tertarik bergabung.";

    // 2. Bersihkan karakter non-angka
    phone = phone.replace(/\D/g, "");

    // 3. Ganti 0 di depan dengan 62
    if (phone.startsWith("0")) {
        phone = "62" + phone.slice(1);
    }

    // 4. Encode pesan URL
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
};

// 🔹 HEADER (Sekarang Menerima 'contents' agar bisa akses pesan WA)
const Header = ({ contents }) => (
    <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <a href="/" className="flex items-center">
                <img
                    src="/images/titipsini.com.png"
                    alt="Logo Titipsini.com"
                    className="h-12 w-auto"
                />
            </a>

            <nav className="hidden md:flex space-x-8">
                {["Beranda", "Tentang Kami", "Keuntungan", "Kontak"].map(
                    (item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                            className="text-gray-600 hover:text-primary font-medium transition duration-300"
                        >
                            {item}
                        </a>
                    ),
                )}
            </nav>
            {/* BUTTON HEADER: GABUNG (Pakai Pesan 'wa_msg_join') */}
            <a
                href={getWaLink(contents?.contact_phone, contents?.wa_msg_join)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-white font-semibold py-2 px-6 rounded-lg hover:bg-primary-dark transition duration-300"
            >
                Gabung Sekarang
            </a>
        </div>
    </header>
);

// 🔹 HERO SECTION
const StatCard = ({ value, label }) => (
    <div className="text-center">
        <p className="text-4xl font-bold text-primary">{value}</p>
        <p className="text-gray-600 mt-1">{label}</p>
    </div>
);

const Hero = ({ contents }) => {
    return (
        <section
            id="beranda"
            className="bg-primary-light pt-24 pb-20 overflow-hidden"
        >
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="lg:w-1/2 text-center lg:text-left">
                        <span className="inline-flex items-center bg-white text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-3 border border-gray-200">
                            <FaLightbulb className="mr-2" /> Platform Mitra
                            Terpercaya
                        </span>

                        <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mt-2">
                            {contents?.hero_title ||
                                "Buka Peluang Usaha Menguntungkan Bersama Titipsini.com"}
                        </h2>
                        <p className="text-gray-600 mt-6 text-lg max-w-lg">
                            {contents?.hero_subtitle ||
                                "Bergabunglah dengan ribuan mitra sukses dan raih penghasilan hingga jutaan rupiah setiap bulannya."}
                        </p>

                        <div className="mt-10 flex justify-center lg:justify-start gap-4">
                            {/* BUTTON 1: GABUNG (Pakai 'wa_msg_join') */}
                            <a
                                href={getWaLink(
                                    contents?.contact_phone,
                                    contents?.wa_msg_join,
                                )}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary-dark transition duration-300 shadow-md hover:shadow-lg"
                            >
                                {contents?.hero_cta_text || "Gabung Sekarang"}
                            </a>

                            {/* BUTTON 2: PELAJARI (Pakai 'wa_msg_info') */}
                            <a
                                href={getWaLink(
                                    contents?.contact_phone,
                                    contents?.wa_msg_info,
                                )}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white text-primary font-bold py-3 px-8 rounded-lg border border-primary hover:bg-gray-100 transition duration-300 shadow-md hover:shadow-lg"
                            >
                                Pelajari Lebih Lanjut
                            </a>
                        </div>
                    </div>
                    <div className="lg:w-1/2 mt-16 lg:mt-0 flex justify-center">
                        <div className="bg-white p-8 rounded-xl shadow-2xl grid grid-cols-2 gap-8 w-full max-w-lg lg:max-w-md xl:max-w-lg">
                            <StatCard value="1" label="Tahun" />
                            <StatCard value="70+" label="Mitra" />
                            <StatCard value="100+" label="Pelanggan" />
                            <StatCard value="200+" label="Suka" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// 🔹 ABOUT SECTION
const SectionCuan = ({ contents }) => (
    <section className="bg-white py-20">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
                <img
                    src="/images/properti.jpg"
                    alt="Ilustrasi properti"
                    className="rounded-xl shadow-xl w-full"
                />
            </div>
            <div className="lg:w-1/2 text-center lg:text-left">
                <span className="inline-flex items-center bg-primary-light text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
                    <FaGift className="mr-2" /> Peluang Emas
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mt-2">
                    {contents?.cuan_title ||
                        "Ubah Properti Tidak Terpakai Jadi Ladang Cuan!"}
                </h2>
                <p className="text-gray-600 mt-6 text-lg max-w-lg mx-auto lg:mx-0">
                    {contents?.cuan_desc ||
                        "Apakah Anda memiliki properti yang menganggur? Jangan biarkan aset berharga Anda sia-sia!"}
                </p>
                <ul className="mt-8 space-y-3 text-gray-700 text-lg text-left max-w-lg mx-auto lg:mx-0">
                    <li className="flex items-center">
                        <FaCheckCircle className="text-primary mr-3 flex-shrink-0" />{" "}
                        Properti kosong bisa menghasilkan jutaan rupiah
                    </li>
                    <li className="flex items-center">
                        <FaCheckCircle className="text-primary mr-3 flex-shrink-0" />{" "}
                        Sistem bagi hasil yang adil dan transparan
                    </li>
                    <li className="flex items-center">
                        <FaCheckCircle className="text-primary mr-3 flex-shrink-0" />{" "}
                        Dukungan penuh dari tim profesional
                    </li>
                </ul>
            </div>
        </div>
    </section>
);

// 🔹 ABOUT PLATFORM
const AboutPlatform = () => (
    <section id="tentang-kami" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 text-center lg:text-left">
                <span className="inline-flex items-center bg-primary-light text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
                    <FaLightbulb className="mr-2" /> Tentang Platform
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">
                    Apa Itu Titipsini.com?
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
                    Titipsini.com adalah platform terdepan yang menghubungkan
                    pemilik properti dengan peluang bisnis menguntungkan.
                </p>
            </div>
            <div className="lg:w-1/2">
                <img
                    src="/images/about-illustration.jpg"
                    alt="Ilustrasi tim"
                    className="rounded-xl shadow-xl w-full"
                />
            </div>
        </div>
    </section>
);

// 🔹 FEATURES SECTION
const FeatureCard = ({ iconName, title }) => {
    const IconComponent = FaIcons[iconName] || FaIcons.FaStar;
    return (
        <div className="bg-primary text-white p-6 rounded-lg flex flex-col items-center text-center shadow-lg hover:shadow-primary/40 hover:-translate-y-2 transition duration-300">
            <div className="text-4xl mb-4">
                <IconComponent />
            </div>
            <h3 className="font-semibold">{title}</h3>
        </div>
    );
};

const Features = ({ features }) => (
    <section id="keuntungan" className="bg-white py-20">
        <div className="container mx-auto px-6 text-center">
            <span className="inline-flex items-center bg-primary-light text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
                <FaLightbulb className="mr-2" /> Keunggulan Platform
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mt-4 mb-12">
                Kenapa Harus Jadi{" "}
                <span className="text-primary">Mitra Titipsini.com?</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {features && features.length > 0 ? (
                    features.map((d, i) => (
                        <FeatureCard
                            key={d.id || i}
                            iconName={d.icon}
                            title={d.title}
                        />
                    ))
                ) : (
                    <p className="col-span-4 text-gray-500 italic">
                        Belum ada fitur ditambahkan.
                    </p>
                )}
            </div>
        </div>
    </section>
);

// 🔹 BONUS/ACCESS
const BonusItem = ({ text }) => (
    <li className="flex items-start text-gray-700 text-lg">
        <FaCheckCircle className="text-primary mr-3 mt-1 flex-shrink-0" />
        <span>{text}</span>
    </li>
);

const BonusAccess = ({ benefits }) => {
    const bonusList = benefits?.bonus || [];
    const accessList = benefits?.access || [];
    return (
        <section className="bg-gray-50 py-20">
            <div className="container mx-auto px-6 text-center">
                <span className="inline-flex items-center bg-primary-light text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
                    <FaLightbulb className="mr-2" /> Keuntungan Eksklusif
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6 leading-tight">
                    Gabung Sekali,{" "}
                    <span className="text-primary">
                        Dapat Semua Keuntungannya
                    </span>
                </h2>
                <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-16">
                    Keuntungan yang didapatkan oleh mitra dengan bergabung
                    bersama kami
                </p>
                <div className="grid lg:grid-cols-2 gap-12 text-left max-w-4xl mx-auto">
                    <div>
                        <h3 className="font-semibold text-xl text-gray-800 mb-6 flex items-center">
                            <FaClipboardCheck className="text-primary mr-3 text-2xl" />{" "}
                            Bonus
                        </h3>
                        <ul className="space-y-4">
                            {bonusList.map((item, i) => (
                                <BonusItem key={i} text={item.text} />
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-xl text-gray-800 mb-6 flex items-center">
                            <FaLockOpen className="text-primary mr-3 text-2xl" />{" "}
                            Akses Lengkap
                        </h3>
                        <ul className="space-y-4">
                            {accessList.map((item, i) => (
                                <BonusItem key={i} text={item.text} />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

// 🔹 PRICING
const PricingCard = ({ title, price, duration, features, isFeatured }) => (
    <div
        className={`border rounded-lg p-8 w-full flex flex-col bg-white transition-all duration-300 ${isFeatured ? "border-primary border-2 shadow-2xl" : "border-gray-200 shadow-lg"}`}
    >
        <p className="text-sm font-semibold text-gray-500">{title}</p>
        <h3 className="text-4xl font-extrabold text-primary mt-2">{price}</h3>
        {duration && <p className="text-gray-500 mt-2 text-base">{duration}</p>}
        <ul className="mt-8 space-y-4 text-gray-700 flex-grow text-left">
            {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                    <FaCheckCircle className="text-primary mr-3 mt-1 flex-shrink-0" />
                    <span>{feature}</span>
                </li>
            ))}
        </ul>
        {/* Tombol Paket (Bisa diarahkan ke WA juga jika mau) */}
        <a
            href="https://wa.me/6281234567890?text=Halo%20Admin,%20saya%20tertarik%20dengan%20paket%20kemitraan."
            target="_blank"
            className={`mt-10 w-full py-3 rounded-lg font-semibold transition duration-300 text-center block ${isFeatured ? "bg-primary text-white hover:bg-primary-dark" : "bg-gray-100 text-primary hover:bg-gray-200"}`}
        >
            Pilih Paket
        </a>
    </div>
);

const Pricing = ({ packages }) => (
    <section id="paket" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
            <span className="inline-flex items-center bg-primary-light text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
                <FaLightbulb className="mr-2" /> Paket Kemitraan
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mt-4">
                Fleksibel dan Terjangkau
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch mt-12 max-w-6xl mx-auto">
                {packages.map((pkg, i) => (
                    <PricingCard
                        key={pkg.id || i}
                        title={pkg.title}
                        price={pkg.price}
                        duration={pkg.duration}
                        features={
                            Array.isArray(pkg.features)
                                ? pkg.features
                                : pkg.features
                                  ? pkg.features.split(",")
                                  : []
                        }
                        isFeatured={pkg.is_best_seller}
                    />
                ))}
            </div>
        </div>
    </section>
);

// 🔹 TESTIMONIALS
const TestimonialCard = ({ name, location, quote, rating }) => (
    <div className="bg-white p-8 rounded-lg shadow-md text-left flex flex-col justify-between h-full border border-gray-100">
        <p className="text-gray-600 italic flex-grow">"{quote}"</p>
        <div className="mt-6">
            <h4 className="font-bold text-gray-800">{name}</h4>
            <p className="text-sm text-gray-500">{location}</p>
            <div className="flex text-yellow-400 mt-2">
                {[...Array(rating || 5)].map((_, i) => (
                    <FaStar key={i} />
                ))}
            </div>
        </div>
    </div>
);

const Testimonials = ({ testimonials }) => (
    <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
            <span className="inline-flex items-center bg-primary-light text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
                <FaLightbulb className="mr-2" /> Testimoni Mitra
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mt-4 mb-12">
                Apa Kata Mitra Kami?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
                {testimonials && testimonials.length > 0 ? (
                    testimonials.map((t, i) => (
                        <TestimonialCard key={t.id || i} {...t} />
                    ))
                ) : (
                    <p className="col-span-3 text-gray-500 italic">
                        Belum ada testimoni.
                    </p>
                )}
            </div>
        </div>
    </section>
);

// 🔹 HOW IT WORKS / CTA SECTION (BUTTONS MODIFIED) 🔥
const StepItem = ({ number, text }) => (
    <div className="flex flex-col items-center text-center px-4">
        <div className="w-16 h-16 bg-white text-primary rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">
            {number}
        </div>
        <p className="max-w-xs text-white text-lg">{text}</p>
    </div>
);

const HowItWorks = ({ contents }) => {
    const steps = [
        "Daftar dan pilih paket yang sesuai",
        "Ikuti pelatihan dan dapatkan sertifikat",
        "Daftarkan properti Anda di platform",
        "Mulai terima penghasilan bulanan",
    ];

    return (
        <section id="gabung" className="bg-primary text-white py-20">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
                    {contents?.cta_title || "Bawa Teman, Dapat Cuan!"}
                </h2>
                <p className="mt-4 text-xl max-w-3xl mx-auto mb-16">
                    {contents?.cta_desc ||
                        "Gabung bersama ribuan mitra sukses lainnya dan mulai raih penghasilan."}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
                    {steps.map((text, i) => (
                        <StepItem key={i} number={i + 1} text={text} />
                    ))}
                </div>

                <div className="mt-8 flex justify-center gap-4">
                    {/* BUTTON: GABUNG SEKARANG (Pakai 'wa_msg_join') */}
                    <a
                        href={getWaLink(
                            contents?.contact_phone,
                            contents?.wa_msg_join,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-primary font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition shadow-md hover:shadow-lg"
                    >
                        Gabung Sekarang Juga!
                    </a>

                    {/* BUTTON: KONSULTASI (Pakai 'wa_msg_consult') */}
                    <a
                        href={getWaLink(
                            contents?.contact_phone,
                            contents?.wa_msg_consult,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-primary transition shadow-md hover:shadow-lg"
                    >
                        Konsultasi Gratis
                    </a>
                </div>
            </div>
        </section>
    );
};

// 🔹 FOOTER (Dynamic Socials & Contacts)
const FooterLink = ({ href, children }) => (
    <li>
        <a href={href} className="hover:text-white transition duration-300">
            {children}
        </a>
    </li>
);

const Footer = ({ socials, contents }) => {
    const getLink = (key) =>
        socials?.find((s) => s.icon_key === key)?.link || "#";
    return (
        <footer id="kontak" className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
                <div>
                    <a href="/" className="flex items-center space-x-3">
                        <img
                            src="/images/titipsini-fotter1.png"
                            alt="Logo"
                            className="h-9 w-auto flex-shrink-0"
                        />
                        <span className="font-extrabold text-2xl text-white">
                            Titipsini<span className="font-semibold">.com</span>
                        </span>
                    </a>
                    <p className="mt-4 text-gray-400 text-sm">
                        Platform terpercaya untuk mengoptimalkan potensi
                        properti.
                    </p>
                    <div className="flex gap-4 mt-4">
                        <a
                            href={getLink("instagram")}
                            className="text-gray-400 hover:text-primary transition"
                        >
                            <FaInstagram size={24} />
                        </a>
                        <a
                            href={getLink("facebook")}
                            className="text-gray-400 hover:text-primary transition"
                        >
                            <FaFacebook size={24} />
                        </a>
                        <a
                            href={getLink("whatsapp")}
                            className="text-gray-400 hover:text-primary transition"
                        >
                            <FaWhatsapp size={24} />
                        </a>
                        <a
                            href={getLink("website")}
                            className="text-gray-400 hover:text-primary transition"
                        >
                            <FaGlobe size={24} />
                        </a>
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold text-lg mb-4">Platform</h3>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <FooterLink href="#">Jual Beli Properti</FooterLink>
                        <FooterLink href="#">Konsultasi Ahli</FooterLink>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold text-lg mb-4">Perusahaan</h3>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <FooterLink href="#">Tentang Kami</FooterLink>
                        <FooterLink href="#">Karir</FooterLink>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold text-lg mb-4">Kontak</h3>
                    <ul className="space-y-3 text-gray-400 text-sm">
                        <li className="flex items-center">
                            <FaPhone className="mr-3 flex-shrink-0" />
                            {contents?.contact_phone || "+62 812-3456-7890"}
                        </li>
                        <li className="flex items-center">
                            <FaEnvelope className="mr-3 flex-shrink-0" />
                            {contents?.contact_email || "info@titipsini.com"}
                        </li>
                        <li className="flex items-center">
                            <FaMapMarkerAlt className="mr-3 flex-shrink-0" />
                            {contents?.contact_address || "Jakarta, Indonesia"}
                        </li>
                    </ul>
                </div>
            </div>
            <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Titipsini.com. Semua hak
                dilindungi undang-undang.
            </div>
        </footer>
    );
};

// 🔹 MAIN APP (MENERIMA 'contents')
export default function MitraIndex({
    packages,
    benefits,
    socials,
    contents,
    features,
    testimonials,
}) {
    return (
        <div className="font-sans text-gray-800 bg-white leading-relaxed">
            <Head title="Mitra - Titipsini.com" />

            {/* ✅ HEADER SEKARANG MENERIMA 'contents' LENGKAP */}
            <Header contents={contents} />

            <main>
                <Hero contents={contents} />
                <SectionCuan contents={contents} />
                <AboutPlatform />
                <Features features={features} />
                <BonusAccess benefits={benefits} />
                <Pricing packages={packages} />
                <Testimonials testimonials={testimonials} />
                <HowItWorks contents={contents} />
            </main>

            {/* Footer menerima socials dan contents */}
            <Footer socials={socials} contents={contents} />
        </div>
    );
}
