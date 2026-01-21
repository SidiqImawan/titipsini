<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MitraPackage;
use App\Models\MitraBenefit;
use App\Models\SocialLink;

class MitraSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Seed Paket
        MitraPackage::create([
            'title' => 'Paket 1 Bulan',
            'price' => 'Rp 500.000',
            'duration' => '1 Bulan',
            'features' => ['Akses Dasar', 'Support Email'], // Otomatis jadi JSON
            'is_best_seller' => false,
            'color' => 'bg-white'
        ]);

        MitraPackage::create([
            'title' => 'Paket 1 Tahun',
            'price' => 'Rp 2.500.000',
            'duration' => '1 Tahun',
            'features' => ['Akses Lengkap', 'Prioritas Support', 'Mentoring'],
            'is_best_seller' => true,
            'color' => 'bg-indigo-50'
        ]);

        // 2. Seed Benefit
        MitraBenefit::create(['text' => 'Modul Pelatihan Bisnis', 'type' => 'bonus']);
        MitraBenefit::create(['text' => 'Sertifikat Resmi', 'type' => 'bonus']);
        MitraBenefit::create(['text' => 'Akses Dashboard Premium', 'type' => 'access']);

        // 3. Seed Social
        SocialLink::create([
            'label' => 'Instagram Official',
            'link' => 'https://instagram.com/titipsini',
            'icon_key' => 'FaInstagram'
        ]);
    }
}