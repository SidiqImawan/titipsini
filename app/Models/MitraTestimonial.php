<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MitraTestimonial extends Model
{
    use HasFactory;

    // Pastikan nama kolom ini sesuai dengan migration
    protected $fillable = [
        'name', 
        'location', 
        'quote', 
        'rating'
    ];
}