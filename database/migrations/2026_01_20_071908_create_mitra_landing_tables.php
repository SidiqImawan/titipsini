<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Tabel untuk Konten Teks (Hero, About, dll)
        Schema::create('mitra_contents', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();   // Contoh: 'hero_title'
            $table->text('value')->nullable(); // Isi teksnya
            $table->string('section')->nullable(); // Pengelompokan
            $table->timestamps();
        });

        // 2. Tabel untuk Testimoni
        Schema::create('mitra_testimonials', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('location');
            $table->text('quote');
            $table->integer('rating')->default(5);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('mitra_testimonials');
        Schema::dropIfExists('mitra_contents');
    }
};