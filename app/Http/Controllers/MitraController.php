<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

// ✅ IMPORT SEMUA MODEL (Pastikan tidak ada yang terlewat)
use App\Models\MitraPackage;
use App\Models\MitraBenefit;
use App\Models\SocialLink;
use App\Models\MitraFeature;
use App\Models\MitraContent;      // Penting: Sumber teks & pesan WA
use App\Models\MitraTestimonial;

class MitraController extends Controller
{
    /**
     * Menampilkan halaman landing page Mitra dengan Data Dinamis Lengkap.
     */
    public function index()
    {
        // 1. Ambil Data Paket
        $packages = MitraPackage::all();

        // 2. Ambil Data Benefit & Kelompokkan
        $allBenefits = MitraBenefit::all();
        $benefits = [
            'bonus'  => $allBenefits->where('type', 'bonus')->values(),
            'access' => $allBenefits->where('type', 'access')->values(),
        ];

        // 3. Ambil Sosmed, Fitur, & Testimoni
        $socials = SocialLink::all();
        $features = MitraFeature::all();
        $testimonials = MitraTestimonial::all();

        // 4. ✅ AMBIL KONTEN TEKS (Hero, Kontak, & Pesan WA)
        // Format pluck('value', 'key') membuat data jadi: 
        // { "wa_msg_join": "Halo...", "contact_phone": "081..." }
        $contents = MitraContent::all()->pluck('value', 'key');

        // 5. Kirim SEMUA Data ke View 'Mitra/index'
        return Inertia::render('Mitra/index', [
            'packages'     => $packages,
            'benefits'     => $benefits,
            'socials'      => $socials,
            'features'     => $features,
            'contents'     => $contents,     
            'testimonials' => $testimonials,
        ]);
    }
}