<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\MitraFeature; // ✅ PENTING: Import Model MitraFeature
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Panggil seeder lain
        $this->call([
            RoleSeeder::class,    
            SettingSeeder::class, 
            ServiceSeeder::class, 
            MovingPackageSeeder::class, 
            InternshipPositionSeeder::class, 
            InternshipProjectSeeder::class, 
            CareerProgramSeeder::class, 
            CurriculumSeeder::class,
            
            // ✅ TAMBAHAN: Seeder Konten Mitra (Hero, About, Testimoni)
            MitraContentSeeder::class, 
        ]);

        // ==========================================
        // 2. DATA KEUNGGULAN MITRA (FEATURES)
        // ==========================================
        // Kita isi manual di sini biar praktis
        MitraFeature::insert([
            ['title' => 'Harga Properti Terbaik', 'icon' => 'FaTags'],
            ['title' => 'Sewa Properti Jangka Panjang', 'icon' => 'FaBuilding'],
            ['title' => 'Aplikasi Mobile User-Friendly', 'icon' => 'FaMobileAlt'],
            ['title' => 'Strategi Marketing Efektif', 'icon' => 'FaBullhorn'],
            ['title' => 'Keamanan Data Terjamin', 'icon' => 'FaShieldAlt'],
            ['title' => 'Analisis Pasar Real-time', 'icon' => 'FaChartLine'],
            ['title' => 'Program Reward Menarik', 'icon' => 'FaGift'],
            ['title' => 'Customer Service 24/7', 'icon' => 'FaHeadset'],
        ]);

        // ==========================================
        // 3. DATA USER ADMIN
        // ==========================================
        $adminUser = User::factory()->create([
            'name' => 'Ulul Azmi A. Latala',
            'email' => 'ullulazmia.l@gmail.com',
            'password' => 'password',
            'role' => 'mitra', // Pastikan kolom role terisi 'admin'
        ]);

        $adminUser1 = User::factory()->create([
            'name' => 'Ahmad Sidiq Imawan',
            'email' => 'sidiq@gmail.com',
            'password' => 'password',
            'role' => 'admin',
        ]);

        // Attach Role ID 1 (Admin) - Jika pakai Spatie/Pivot Table
        // Pastikan RoleSeeder sudah dijalankan sebelumnya
        // Cek dulu apakah method roles() ada (relasi many-to-many)
        if(method_exists($adminUser, 'roles')) {
            $adminUser->roles()->attach(1);
            $adminUser1->roles()->attach(1);
        }

        // ==========================================
        // 4. DATA USER MITRA (Untuk Tes Login)
        // ==========================================
        $mitraUser = User::factory()->create([
            'name' => 'Mitra Demo Sukses',
            'email' => 'mitra@gmail.com',
            'password' => 'password',
            'role' => 'mitra', // ✅ PENTING: role harus 'mitra' agar bisa masuk panel
        ]);
        
        // Opsional: Attach role ID jika pakai pivot table (Misal ID 2 = Mitra)
        // $mitraUser->roles()->attach(2); 

        // ==========================================
        // 5. USER BIASA
        // ==========================================
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'role' => 'user',
        ]);
    }
}