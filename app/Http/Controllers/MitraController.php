<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class MitraController extends Controller
{
    public function index()
    {
        // Jika kamu pakai Inertia (karena project kamu pakai Inertia)
        return Inertia::render('Mitra/Index');

        // Jika pakai Blade biasa, ganti dengan:
        // return view('mitra.index');
    }
}
