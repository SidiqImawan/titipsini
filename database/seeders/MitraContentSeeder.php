<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MitraContent;
use App\Models\MitraTestimonial;

class MitraContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // ==========================================
        // 1. KONTEN HALAMAN (Hero, About, CTA)
        // ==========================================
        $contents = [
            // HERO SECTION
            ['section' => 'hero', 'key' => 'hero_title', 'value' => 'Buka Peluang Usaha Menguntungkan Bersama Titipsini.com'],
            ['section' => 'hero', 'key' => 'hero_subtitle', 'value' => 'Bergabunglah dengan ribuan mitra sukses dan raih penghasilan hingga jutaan rupiah setiap bulannya.'],
            ['section' => 'hero', 'key' => 'hero_cta_text', 'value' => 'Gabung Sekarang'],
            
            // ABOUT / SECTION CUAN
            ['section' => 'about', 'key' => 'cuan_title', 'value' => 'Ubah Properti Tidak Terpakai Jadi Ladang Cuan!'],
            ['section' => 'about', 'key' => 'cuan_desc', 'value' => 'Apakah Anda memiliki properti yang menganggur? Jangan biarkan aset berharga Anda sia-sia! Bergabunglah dengan Titipsini.com.'],
            
            // CTA BAWAH
            ['section' => 'cta', 'key' => 'cta_title', 'value' => 'Bawa Teman, Dapat Cuan!'],
            ['section' => 'cta', 'key' => 'cta_desc', 'value' => 'Gabung bersama ribuan mitra sukses lainnya dan mulai raih penghasilan dari properti yang menganggur.'],
        ];

        foreach ($contents as $content) {
            MitraContent::updateOrCreate(['key' => $content['key']], $content);
        }

        // ==========================================
        // 2. DATA TESTIMONI
        // ==========================================
        $testimonials = [
            [
                'name' => 'Budi Santoso',
                'location' => 'Mitra Jakarta',
                'quote' => 'Sangat membantu untuk passive income properti saya yang kosong. Timnya responsif!',
                'rating' => 5
            ],
            [
                'name' => 'Sari Wulandari',
                'location' => 'Mitra Surabaya',
                'quote' => 'Platform mudah digunakan, dalam 6 bulan ROI sudah terlihat. Mantap!',
                'rating' => 5
            ],
            [
                'name' => 'Ahmad Pratama',
                'location' => 'Mitra Bandung',
                'quote' => 'Pelatihan bisnisnya sangat daging. Saya jadi paham cara kelola properti.',
                'rating' => 4
            ]
        ];

        foreach ($testimonials as $testi) {
            MitraTestimonial::create($testi);
        }
    }
}