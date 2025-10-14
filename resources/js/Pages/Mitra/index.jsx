import React from "react";
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
} from "react-icons/fa";

// Komponen Header
const Header = () => {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <h1 className="font-bold text-2xl text-teal-500">
                    Titipsini.com
                </h1>
                <nav className="hidden md:flex space-x-8">
                    <a
                        href="#beranda"
                        className="text-gray-600 hover:text-teal-500"
                    >
                        Beranda
                    </a>
                    <a
                        href="#tentang"
                        className="text-gray-600 hover:text-teal-500"
                    >
                        Tentang Kami
                    </a>
                    <a
                        href="#keuntungan"
                        className="text-gray-600 hover:text-teal-500"
                    >
                        Keuntungan
                    </a>
                    <a
                        href="#kontak"
                        className="text-gray-600 hover:text-teal-500"
                    >
                        Kontak
                    </a>
                </nav>
                <a
                    href="#gabung"
                    className="bg-teal-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-teal-600 transition duration-300"
                >
                    Gabung Sekarang
                </a>
            </div>
        </header>
    );
};

// Komponen Hero
const StatCard = ({ value, label }) => (
    <div className="text-center">
        <p className="text-4xl font-bold text-teal-500">{value}</p>
        <p className="text-gray-600">{label}</p>
    </div>
);

const Hero = () => {
    return (
        <section id="beranda" className="bg-teal-50 py-20">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center">
                    <div className="lg:w-1/2 text-center lg:text-left">
                        <p className="text-teal-500 font-semibold">
                            Platform Mitra Terpercaya
                        </p>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mt-2">
                            Buka Peluang{" "}
                            <span className="text-teal-500">Usaha</span>{" "}
                            Menguntungkan{" "}
                            <span className="text-teal-500">Bersama</span>{" "}
                            Titipsini.com
                        </h2>
                        <p className="text-gray-600 mt-4 text-lg">
                            Bergabunglah dengan ribuan mitra sukses dan raih
                            penghasilan hingga jutaan rupiah setiap bulannya.
                        </p>
                        <div className="mt-8 flex justify-center lg:justify-start space-x-4">
                            <a
                                href="#gabung"
                                className="bg-teal-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-teal-600 transition duration-300"
                            >
                                Gabung Sekarang
                            </a>
                            <a
                                href="#pelajari"
                                className="bg-white text-teal-500 font-bold py-3 px-8 rounded-lg border border-teal-500 hover:bg-gray-100 transition duration-300"
                            >
                                Pelajari Lebih Lanjut
                            </a>
                        </div>
                    </div>
                    <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
                        <div className="bg-white p-8 rounded-xl shadow-lg grid grid-cols-2 gap-8 w-full max-w-md">
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

// Komponen Tentang Kami (About)
const About = () => {
    return (
        <section id="tentang" className="py-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <span className="text-teal-500 bg-teal-100 rounded-full px-4 py-1 text-sm font-semibold">
                        Tentang Platform
                    </span>
                    <h2 className="text-4xl font-bold text-gray-800 mt-4">
                        Apa Itu Titipsini.com?
                    </h2>
                </div>
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="lg:w-1/2">
                        <p className="text-gray-600 leading-relaxed text-lg">
                            Titipsini.com adalah platform terdepan yang
                            menghubungkan pemilik properti dengan peluang bisnis
                            menguntungkan. Kami membantu Anda mengoptimalkan
                            aset properti yang tidak terpakai menjadi sumber
                            penghasilan berkelanjutan melalui berbagai skema
                            kerjasama yang fleksibel dan menguntungkan.
                        </p>
                    </div>
                    <div className="lg:w-1/2">
                        {/* Ganti div ini dengan gambar/ilustrasi Anda */}
                        <div className="bg-gray-200 h-64 w-full rounded-lg flex items-center justify-center shadow-lg">
                            <p className="text-gray-500">Ilustrasi Platform</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Komponen Keunggulan (Features)
const FeatureCard = ({ icon, title }) => (
    <div className="bg-teal-500 text-white p-6 rounded-lg flex flex-col items-center text-center hover:bg-teal-600 transition-transform transform hover:-translate-y-1 cursor-pointer shadow-md">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="font-semibold">{title}</h3>
    </div>
);

const Features = () => {
    const featuresList = [
        { icon: <FaTags />, title: "Jual Properti dengan Harga Terbaik" },
        { icon: <FaBuilding />, title: "Sewa Properti Jangka Panjang" },
        { icon: <FaMobileAlt />, title: "Aplikasi Mobile yang User-Friendly" },
        { icon: <FaBullhorn />, title: "Strategi Marketing yang Efektif" },
        { icon: <FaShieldAlt />, title: "Keamanan Data Terjamin" },
        { icon: <FaChartLine />, title: "Analisis Pasar Real-time" },
        { icon: <FaGift />, title: "Program Reward Menarik" },
        { icon: <FaHeadset />, title: "Customer Service 24/7" },
    ];

    return (
        <section id="keuntungan" className="bg-gray-50 py-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <span className="text-teal-500 bg-teal-100 rounded-full px-4 py-1 text-sm font-semibold">
                        Keunggulan Platform
                    </span>
                    <h2 className="text-4xl font-bold text-gray-800 mt-4">
                        Kenapa Harus Jadi Mitra Titipsini.com?
                    </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {featuresList.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            icon={feature.icon}
                            title={feature.title}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

// Komponen Paket Harga (Pricing)
const PricingCard = ({ price, duration, features, isFeatured }) => (
    <div
        className={`border rounded-lg p-8 w-full max-w-sm flex flex-col bg-white ${
            isFeatured
                ? "border-teal-500 border-2 shadow-2xl scale-105"
                : "border-gray-200 shadow-lg"
        }`}
    >
        {isFeatured && (
            <span className="bg-teal-100 text-teal-600 text-xs font-bold px-3 py-1 rounded-full self-start mb-4">
                Paket Kemitraan
            </span>
        )}
        <h3 className="text-3xl font-bold text-gray-800">{price}</h3>
        <p className="text-gray-500 mt-2">{duration}</p>
        <ul className="mt-6 space-y-4 text-gray-600 flex-grow">
            {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                    <FaCheckCircle className="text-teal-500 mr-3" />
                    {feature}
                </li>
            ))}
        </ul>
        <button
            className={`mt-8 w-full py-3 rounded-lg font-semibold transition duration-300 ${
                isFeatured
                    ? "bg-teal-500 text-white hover:bg-teal-600"
                    : "bg-gray-100 text-teal-500 hover:bg-gray-200"
            }`}
        >
            Pilih Paket
        </button>
    </div>
);

const Pricing = () => {
    const plans = [
        {
            price: "Rp 500.000",
            duration: "1 bulan akses penuh platform",
            features: [
                "Akses platform selama 1 bulan",
                "Pelatihan online dasar",
                "Template marketing standar",
                "Support via email",
            ],
            isFeatured: false,
        },
        {
            price: "Rp 3.000.000",
            duration: "1 tahun akses penuh + bonus eksklusif",
            features: [
                "Semua fitur paket 1 bulan",
                "Pelatihan offline eksklusif",
                "Mentoring 1-on-1",
                "Sertifikat resmi",
                "Priority support 24/7",
            ],
            isFeatured: true,
        },
    ];

    return (
        <section id="paket" className="py-20 bg-gray-50">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold text-gray-800">
                    Fleksibel dan Terjangkau, Langsung Jadi Mitra!
                </h2>
                <p className="text-gray-600 mt-4 text-lg">
                    Pilih paket yang sesuai dengan kebutuhan dan budget Anda
                </p>
                <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-12">
                    {plans.map((p, i) => (
                        <PricingCard key={i} {...p} />
                    ))}
                </div>
            </div>
        </section>
    );
};

// Komponen Testimoni
const TestimonialCard = ({ name, location, quote }) => (
    <div className="bg-white p-8 rounded-lg shadow-md text-left h-full flex flex-col">
        <p className="text-gray-600 italic flex-grow">"{quote}"</p>
        <div className="mt-6">
            <h4 className="font-bold text-gray-800">{name}</h4>
            <p className="text-sm text-gray-500">{location}</p>
            <div className="flex text-yellow-400 mt-2">
                {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                ))}
            </div>
        </div>
    </div>
);

const Testimonials = () => {
    const testimonialsList = [
        {
            name: "Budi Hartono",
            location: "Mitra Jakarta",
            quote: "Bergabung dengan Titipsini.com adalah keputusan terbaik! Properti kosong saya sekarang menghasilkan 5 juta per bulan. Tim supportnya juga sangat responsif dan membantu.",
        },
        {
            name: "Sari Wulandari",
            location: "Mitra Surabaya",
            quote: "Platform yang sangat mudah digunakan dan menguntungkan. Dalam 6 bulan, penghasilan dari properti saya sudah mencapai 30 juta. Terima kasih Titipsini.com!",
        },
        {
            name: "Ahmadi Pratama",
            location: "Mitra Bandung",
            quote: "Pelatihan yang diberikan sangat komprehensif dan aplikatif. Sekarang saya bisa mengelola 3 properti sekaligus dengan mudah. ROI yang didapat juga sangat memuaskan.",
        },
    ];

    return (
        <section className="bg-white py-20">
            <div className="container mx-auto px-6 text-center">
                <span className="text-teal-500 bg-teal-100 rounded-full px-4 py-1 text-sm font-semibold">
                    Testimoni Mitra
                </span>
                <h2 className="text-4xl font-bold text-gray-800 mt-4">
                    Apa Kata Mitra Kami?
                </h2>
                <div className="grid md:grid-cols-3 gap-8 mt-12">
                    {testimonialsList.map((t, i) => (
                        <TestimonialCard key={i} {...t} />
                    ))}
                </div>
            </div>
        </section>
    );
};

// Komponen Cara Kerja (HowItWorks)
const Step = ({ number, text }) => (
    <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-white text-teal-500 rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-md">
            {number}
        </div>
        <p className="max-w-xs">{text}</p>
    </div>
);

const HowItWorks = () => {
    const steps = [
        { number: 1, text: "Daftar dan pilih paket yang sesuai" },
        { number: 2, text: "Ikuti pelatihan dan dapatkan sertifikat" },
        { number: 3, text: "Daftarkan properti Anda di platform" },
        { number: 4, text: "Mulai terima penghasilan bulanan" },
    ];
    return (
        <section id="gabung" className="bg-teal-500 text-white py-20">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold">Bawa Teman, Dapat Cuan!</h2>
                <p className="mt-4 text-lg max-w-3xl mx-auto">
                    Gabung bersama ribuan mitra sukses lainnya dan mulai raih
                    penghasilan dari properti yang menganggur. Investasi sekali,
                    untung selamanya!
                </p>
                <h3 className="text-3xl font-bold mt-12 mb-8">Ini Caranya:</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {steps.map((step) => (
                        <Step key={step.number} {...step} />
                    ))}
                </div>
                <div className="mt-16">
                    <h3 className="text-3xl font-bold">
                        Siap Jadi Bagian dari Ekosistem Penjualan Terbesar di
                        Indonesia?
                    </h3>
                    <p className="mt-4">
                        Bergabunglah sekarang dan rasakan perbedaannya. Ribuan
                        mitra telah merasakan manfaatnya, sekarang giliran Anda!
                    </p>
                    <div className="mt-8 flex justify-center space-x-4">
                        <a
                            href="#gabung-sekarang"
                            className="bg-white text-teal-500 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-300"
                        >
                            Gabung Sekarang Juga!
                        </a>
                        <a
                            href="#konsultasi"
                            className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-teal-500 transition duration-300"
                        >
                            Konsultasi Gratis
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Komponen Footer
const Footer = () => {
    return (
        <footer id="kontak" className="bg-gray-800 text-white">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h2 className="font-bold text-2xl">Titipsini.com</h2>
                        <p className="mt-4 text-gray-400">
                            Platform terpercaya untuk mengoptimalkan potensi
                            properti menjadi sumber penghasilan berkelanjutan.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Platform</h3>
                        <ul className="mt-4 space-y-2 text-gray-400">
                            <li>
                                <a href="#" className="hover:text-white">
                                    Jual Beli Properti
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    Konsultasi Ahli
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    Aplikasi Mobile
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    Analisa Pasar
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Perusahaan</h3>
                        <ul className="mt-4 space-y-2 text-gray-400">
                            <li>
                                <a href="#" className="hover:text-white">
                                    Tentang Kami
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    Karir
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    Press Kit
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Kontak</h3>
                        <ul className="mt-4 space-y-3 text-gray-400">
                            <li className="flex items-center">
                                <FaPhone className="mr-3" /> +62 812-3456-7890
                            </li>
                            <li className="flex items-center">
                                <FaEnvelope className="mr-3" />{" "}
                                info@titipsini.com
                            </li>
                            <li className="flex items-center">
                                <FaMapMarkerAlt className="mr-3" /> Jakarta,
                                Indonesia
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500">
                    <p>
                        &copy; 2024 Titipsini.com. Semua hak dilindungi
                        undang-undang.
                    </p>
                </div>
            </div>
        </footer>
    );
};

// Komponen Utama App
function App() {
    return (
        <div className="bg-white font-sans">
            <Header />
            <main>
                <Hero />
                <About />
                <Features />
                <Pricing />
                <Testimonials />
                <HowItWorks />
            </main>
            <Footer />
        </div>
    );
}

export default App;
