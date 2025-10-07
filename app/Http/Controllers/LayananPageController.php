<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class LayananPageController extends Controller
{
    public function show()
    {
        return Inertia::render('Layanan');
    }
}