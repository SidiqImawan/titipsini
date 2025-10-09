<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Panggil seeder lain yang sudah ada dan yang baru
        $this->call([
            RoleSeeder::class,    // Seeder untuk role yang sudah ada
            SettingSeeder::class, // Seeder baru yang kita buat untuk settings
        ]);

        // 2. Kode factory untuk membuat user (bisa tetap ada)
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
    }
}
