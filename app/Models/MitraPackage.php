<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MitraPackage extends Model
{
    protected $fillable = [
    'title', 'price', 'duration', 'features', 'is_best_seller', 'color'
];

// Penting: Agar kolom 'features' otomatis jadi Array saat diambil, bukan string JSON
protected $casts = [
    'features' => 'array',
    'is_best_seller' => 'boolean',
];
}
