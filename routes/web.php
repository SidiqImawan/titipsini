<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// --- TAMBAHKAN USE STATEMENT BARU DI BAWAH INI ---
use App\Http\Controllers\ContactPageController;
use App\Http\Controllers\InternshipPageController; // <--- BARIS INI BARU
// ------------------------------------------------


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route untuk halaman "Tentang Kami"
Route::get('/tentang-kami', function () {
    return Inertia::render('About');
})->name('about');

// Route untuk halaman Kontak
Route::get('/contact', [ContactPageController::class, 'show'])->name('contact.show');
Route::post('/contact', [ContactPageController::class, 'store'])->name('contact.store');

// --- TAMBAHKAN ROUTE BARU DI SINI UNTUK HALAMAN INTERNSHIP ---
Route::get('/internship', [InternshipPageController::class, 'show'])->name('internship.show');
// -----------------------------------------------------------------
Route::get('/program-kami', function () {
    return Inertia::render('Program');
})->name('program');

Route::get('/contact', [ContactPageController::class, 'show'])->name('contact.show');
Route::post('/contact', [ContactPageController::class, 'store'])->name('contact.store');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
