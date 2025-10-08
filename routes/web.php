<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// --- TAMBAHKAN USE STATEMENT BARU DI BAWAH INI ---
use App\Http\Controllers\ContactPageController;
use App\Http\Controllers\InternshipPageController;
use App\Http\Controllers\JobVacancyController;
use App\Http\Controllers\LayananPageController;
use App\Http\Controllers\UserController;

use App\Http\Controllers\Admin\UserManagementController;
// ------------------------------------------------


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// --- RUTE HALAMAN PUBLIK ---
Route::get('/tentang-kami', fn() => Inertia::render('About'))->name('about');
Route::get('/contact', [ContactPageController::class, 'show'])->name('contact.show');
Route::post('/contact', [ContactPageController::class, 'store'])->name('contact.store');
Route::get('/internship', [InternshipPageController::class, 'show'])->name('internship.show');
Route::get('/program-kami', fn() => Inertia::render('Program'))->name('program');
Route::get('/layanan', [LayananPageController::class, 'show'])->name('layanan.show');

// Rute untuk halaman lowongan kerja publik
Route::get('/lowongan-kerja', [JobVacancyController::class, 'publicIndex'])->name('careers.index');


// --- RUTE UNTUK PENGGUNA TERAUTENTIKASI ---
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // --- RUTE KHUSUS ADMIN (DILINDUNGI OLEH MIDDLEWARE 'isAdmin') ---
    Route::middleware('isAdmin')->group(function () {
        // Rute CRUD untuk Job Vacancies
        Route::resource('admin/job-vacancies', JobVacancyController::class)
            ->except(['show'])
            ->names('job_vacancies');

        // --- TAMBAHKAN RUTE BARU DI SINI ---
        Route::get('/users/{id}/make-admin', [UserController::class, 'makeAdmin'])->name('users.makeAdmin');
        Route::get('/admin/users', [UserManagementController::class, 'index'])->name('admin.users.index');
        Route::get('/users/{id}/remove-admin', [UserController::class, 'removeAdmin'])->name('users.removeAdmin');
    });
});


require __DIR__ . '/auth.php';
