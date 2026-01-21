<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   public function up(): void
{
    Schema::create('mitra_packages', function (Blueprint $table) {
        $table->id();
        $table->string('title');          // e.g. "Paket 1 Bulan"
        $table->string('price');          // e.g. "Rp 500.000" (Bisa string atau decimal)
        $table->string('duration');       // e.g. "1 Bulan Akses"
        $table->json('features');         // Kita simpan fitur sebagai JSON array
        $table->boolean('is_best_seller')->default(false);
        $table->string('color')->default('bg-white'); // Opsional buat styling
        $table->timestamps();
    });
}
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mitra_packages');
    }
};
