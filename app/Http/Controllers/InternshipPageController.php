<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class InternshipPageController extends Controller
{
    /**
     * Menampilkan halaman program magang.
     */
    public function show()
    {
        // Karena semua data sudah di-hardcode di frontend,
        // kita hanya perlu me-render komponennya saja.
        return Inertia::render('Internship');
    }
}