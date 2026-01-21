<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MitraContent extends Model
{
    use HasFactory;

    // 🔴 HAPUS BAGIAN INI (FILLABLE)
    // protected $fillable = [
    //     'key', 
    //     'value', 
    //     'section'
    // ];

    // 🟢 GANTI DENGAN INI (GUARDED)
    // Artinya: "Tidak ada kolom yang dijaga", jadi semua kolom boleh diisi/diupdate.
    protected $guarded = [];
}