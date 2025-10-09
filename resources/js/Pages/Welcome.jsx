import React, { useState } from "react";
import {
    ShieldCheck,
    Clock,
    MapPin,
    Package,
    Car,
    Users,
    Star,
    ChevronDown,
} from "lucide-react";
import GuestLayout from "../Layouts/GuestLayout"; // Path diperbaiki
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

// Komponen untuk setiap kartu layanan
const ServiceCard = ({ icon, title, features, illustration }) => (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col">
        <div className="w-full h-40 mb-4 rounded-md overflow-hidden bg-gray-100">
            <img
                src={illustration}
                alt={title}
                className="w-full h-full object-contain p-4"
            />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <ul className="space-y-2 text-gray-600 mb-4 flex-grow">
            {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    {feature}
                </li>
            ))}
        </ul>
        <a
            href="#"
            className="font-semibold text-green-600 hover:text-green-700 transition-colors self-start"
        >
            Pelajari Lebih Lanjut &rarr;
        </a>
    </div>
);

// Komponen untuk setiap kartu keunggulan
const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100">
        <div className="flex items-center justify-center bg-green-100 rounded-lg w-12 h-12 mb-4">
            {icon}
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
    </div>
);

// Komponen untuk item FAQ
const FaqItem = ({ question, answer, isOpen, onClick }) => (
    <div className="border-b border-gray-200 py-4">
        <button
            onClick={onClick}
            className="w-full flex justify-between items-center text-left"
        >
            <h4 className="font-semibold text-gray-800">{question}</h4>
            <ChevronDown
                className={`transform transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                }`}
            />
        </button>
        <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-screen mt-2" : "max-h-0"
            }`}
        >
            <p className="text-gray-600 pt-2">{answer}</p>
        </div>
    </div>
);

// --- SECTIONS ---

const Hero = () => (
    <section className="bg-gray-50 py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-center md:text-left">
                    <span className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-4 py-1 rounded-full mb-4">
                        Terpercaya & Aman Sejak 2020
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
                        Penitipan Barang <br />
                        <span className="text-green-600">Terpercaya</span> untuk
                        Anda
                    </h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Solusi aman dan fleksibel untuk menyimpan barang saat
                        traveling, pindahan kost, atau kendaraan. Waktu
                        penitipan fleksibel dari harian hingga bulanan, dengan
                        layanan pengiriman jika tidak bisa ambil langsung.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <a
                            href="#"
                            className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all text-center"
                        >
                            Titip Sekarang
                        </a>
                        <a
                            href="#"
                            className="bg-white text-gray-800 px-8 py-3 rounded-lg font-semibold border border-gray-300 hover:bg-gray-100 transition-all text-center"
                        >
                            Lihat Harga
                        </a>
                    </div>
                </div>
                <div>
                    <img
                        src="images/hero-home.jpg"
                        alt="Ilustrasi Penitipan Barang"
                        className="rounded-lg shadow-lg mx-auto"
                    />
                </div>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="p-4">
                    <Package
                        size={40}
                        className="mx-auto text-green-600 mb-2"
                    />
                    <h3 className="font-bold text-lg">Berbagai Ukuran</h3>
                    <p className="text-gray-600">
                        Mulai dari dokumen, koper, motor
                    </p>
                </div>
                <div className="p-4">
                    <Clock size={40} className="mx-auto text-green-600 mb-2" />
                    <h3 className="font-bold text-lg">Waktu Fleksibel</h3>
                    <p className="text-gray-600">Harian hingga bulanan</p>
                </div>
                <div className="p-4">
                    <Car size={40} className="mx-auto text-green-600 mb-2" />
                    <h3 className="font-bold text-lg">Layanan Antar</h3>
                    <p className="text-gray-600">Pengiriman tersedia</p>
                </div>
            </div>
        </div>
    </section>
);

const Services = () => {
    const services = [
        {
            title: "Penitipan Traveling",
            features: ["Akses 24/7", "Harian/Bulanan", "Harga terjangkau"],
            illustration:
                "https://placehold.co/300x200/E0F2F1/34D399?text=Traveling",
        },
        {
            title: "Pindahan Kost/Kontrakan",
            features: [
                "Penyimpanan Fleksibel",
                "Bantuan Pengepakan",
                "Hingga bulanan",
                "Layanan antar",
            ],
            illustration:
                "https://placehold.co/300x200/E0F2F1/34D399?text=Pindahan",
        },
        {
            title: "Penitipan Kendaraan",
            features: [
                "Parkir Indoor",
                "CCTV 24 Jam",
                "Perawatan Berkala",
                "Akses Mudah",
            ],
            illustration:
                "https://placehold.co/300x200/E0F2F1/34D399?text=Kendaraan",
        },
    ];

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Layanan Penitipan Kami
                    </h2>
                    <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
                        Kami menyediakan layanan penitipan barang yang lengkap
                        dan fleksibel, mulai dari barang kecil hingga kendaraan.
                        Tersedia pilihan harian dan bulanan, plus layanan
                        pengiriman untuk kemudahan Anda.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const Stats = () => {
    const { ref, inView } = useInView({
        triggerOnce: true, // Animasi hanya berjalan sekali
        threshold: 0.1, // Muncul saat 10% elemen terlihat
    });

    const stats = [
        { value: 3, suffix: "+", label: "Tahun Beroperasi" },
        { value: 500, suffix: "+", label: "Pelanggan Setia" },
        { value: 2000, suffix: "+", label: "Barang Dititipkan" },
        { value: 50, suffix: "+", label: "Motor Terawat" },
    ];

    return (
        <section ref={ref} className="bg-green-600 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat, index) => (
                        <div key={index}>
                            <p className="text-4xl font-bold">
                                {inView ? (
                                    <CountUp end={stat.value} duration={2.5} />
                                ) : (
                                    "0"
                                )}
                                {stat.suffix}
                            </p>
                            <p className="text-green-200">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const WhyUs = () => {
    const features = [
        {
            icon: <ShieldCheck size={24} className="text-green-600" />,
            title: "Keamanan Terjamin",
            description:
                "Sistem keamanan 24/7 dengan CCTV dan akses terkontrol untuk melindungi Barang Anda.",
        },
        {
            icon: <Clock size={24} className="text-green-600" />,
            title: "Fleksibilitas Waktu",
            description:
                "Penitipan harian hingga bulanan sesuai kebutuhan dengan tarif yang kompetitif.",
        },
        {
            icon: <MapPin size={24} className="text-green-600" />,
            title: "Lokasi Strategis",
            description:
                "Berada di lokasi yang mudah dijangkau dengan akses transportasi yang baik.",
        },
        {
            icon: <Car size={24} className="text-green-600" />,
            title: "Layanan Antar Jemput",
            description:
                "Tersedia layanan pengiriman untuk kemudahan pengambilan barang Anda.",
        },
        {
            icon: <Users size={24} className="text-green-600" />,
            title: "Tim Profesional",
            description:
                "Didukung tim yang berpengalaman dan terlatih dalam penanganan berbagai jenis barang.",
        },
        {
            icon: <Star size={24} className="text-green-600" />,
            title: "Kepercayaan Pelanggan",
            description:
                "Telah dipercaya ribuan pelanggan dengan rating kepuasan tinggi.",
        },
    ];
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Mengapa Pilih Titipsini?
                    </h2>
                    <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
                        Kami berkomitmen memberikan layanan penitipan barang
                        terbaik dengan standar keamanan dan kenyamanan tinggi.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const Testimonials = () => (
    <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800">
                    Testimoni Pelanggan
                </h2>
                <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
                    Kepercayaan pelanggan adalah aset terbesar kami. Simak
                    pengalaman mereka yang telah menggunakan layanan penitipan
                    barang kami.
                </p>
            </div>
            <div className="max-w-2xl mx-auto">
                <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 text-center">
                    <div className="flex justify-center mb-4">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className="text-yellow-400 fill-current"
                            />
                        ))}
                    </div>
                    <p className="text-lg italic text-gray-700">
                        "Sangat membantu saat pindah kost! Barang-barang saya
                        aman tersimpan selama 2 minggu. Harga terjangkau dan
                        pelayanan ramah."
                    </p>
                    <div className="mt-6 flex items-center justify-center">
                        <img
                            src="https://placehold.co/50x50/cccccc/FFFFFF?text=AP"
                            alt="Andi Pratama"
                            className="w-12 h-12 rounded-full mr-4"
                        />
                        <div>
                            <p className="font-bold text-gray-800">
                                Andi Pratama
                            </p>
                            <p className="text-sm text-gray-500">Mahasiswa</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-6 space-x-2">
                    <button className="w-3 h-3 bg-green-600 rounded-full"></button>
                    <button className="w-3 h-3 bg-gray-300 rounded-full hover:bg-green-500"></button>
                    <button className="w-3 h-3 bg-gray-300 rounded-full hover:bg-green-500"></button>
                </div>
            </div>
        </div>
    </section>
);

const FAQ = () => {
    const [openFaqIndex, setOpenFaqIndex] = useState(0);
    const faqs = [
        {
            question: "Apa saja jenis barang yang bisa dititipkan?",
            answer: "Kami menerima berbagai jenis barang mulai dari pakaian, elektronik, furniture, dokumen penting, hingga kendaraan seperti motor. Barang yang tidak diperbolehkan adalah barang berbahaya, mudah terbakar, dan barang ilegal.",
        },
        {
            question: "Bagaimana sistem keamanan di Titipsini?",
            answer: "Keamanan adalah prioritas kami. Kami memiliki CCTV 24 jam, akses terbatas, dan staf keamanan yang berjaga.",
        },
        {
            question: "Berapa lama minimal dan maksimal penitipan?",
            answer: "Anda bisa menitipkan barang mulai dari 1 hari hingga tahunan. Kami menawarkan paket harian, mingguan, bulanan, dan tahunan.",
        },
        {
            question: "Apakah ada layanan antar jemput barang?",
            answer: "Ya, kami menyediakan layanan antar jemput dengan biaya tambahan yang terjangkau untuk memudahkan Anda.",
        },
    ];
    const handleFaqClick = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Pertanyaan Umum
                    </h2>
                    <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
                        Temukan jawaban atas pertanyaan yang sering diajukan
                        tentang layanan penitipan barang kami.
                    </p>
                </div>
                <div className="max-w-3xl mx-auto">
                    {faqs.map((faq, index) => (
                        <FaqItem
                            key={index}
                            {...faq}
                            isOpen={openFaqIndex === index}
                            onClick={() => handleFaqClick(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- Komponen Utama Halaman Welcome ---
// Perhatikan bahwa kita tidak lagi mengekspor Header dan Footer di sini
const Welcome = () => {
    return (
        <>
            <Hero />
            <Services />
            <Stats />
            <WhyUs />
            <Testimonials />
            <FAQ />
        </>
    );
};

// Menetapkan layout untuk halaman ini.
// Inertia.js akan secara otomatis membungkus komponen Welcome dengan GuestLayout.
Welcome.layout = (page) => <GuestLayout children={page} />;

export default Welcome;
