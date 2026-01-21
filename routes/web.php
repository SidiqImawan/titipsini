<?php

// Framework & App
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// App Controllers (Public)
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ContactPageController;
use App\Http\Controllers\InternshipPageController;
use App\Http\Controllers\JobVacancyController;
use App\Http\Controllers\LayananPageController;
use App\Http\Controllers\ProgramPageController;
use App\Http\Controllers\MitraController; // Ini untuk halaman Publik

// Admin Controllers (Pusat)
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\UserManagementController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\WelcomeController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\MovingPackageController;
use App\Http\Controllers\Admin\InternshipPositionController;
use App\Http\Controllers\Admin\InternshipProjectController;
use App\Http\Controllers\Admin\CareerProgramController;
use App\Http\Controllers\Admin\CurriculumController;

// --- PENTING: Import Controller Admin Mitra dengan Nama Beda (Alias) ---
use App\Http\Controllers\Admin\MitraController as AdminMitraController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// ==============================================================================
// 1. RUTE HALAMAN PUBLIK (Bisa diakses siapa saja)
// ==============================================================================

// Halaman Utama (Homepage)
Route::get('/', [WelcomeController::class, 'index'])->name('home');

// Halaman Mitra (Publik / Landing Page)
Route::get('/mitra', [MitraController::class, 'index'])->name('mitra.index');

// Halaman Statis Lainnya
Route::get('/tentang-kami', fn() => Inertia::render('About'))->name('about');
Route::get('/program-kami', [ProgramPageController::class, 'show'])->name('program');

// Halaman dengan Controller
Route::get('/contact', [ContactPageController::class, 'show'])->name('contact.show');
Route::post('/contact', [ContactPageController::class, 'store'])->name('contact.store');
Route::get('/internship', [InternshipPageController::class, 'show'])->name('internship.show');
Route::get('/layanan', [LayananPageController::class, 'show'])->name('layanan.show');
Route::get('/lowongan-kerja', [JobVacancyController::class, 'publicIndex'])->name('careers.index');


// ==============================================================================
// 2. RUTE USER TERAUTENTIKASI (User Biasa)
// ==============================================================================
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard User Biasa
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Profile Routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


// ==============================================================================
// 3. RUTE KHUSUS ADMIN PUSAT (Role: admin)
// ==============================================================================
Route::middleware(['auth', 'verified', 'role:admin']) 
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {

        // --- Manajemen User ---
        Route::get('users', [UserManagementController::class, 'index'])->name('users.index');
        Route::get('users/{user}/make-admin', [UserManagementController::class, 'makeAdmin'])->name('users.makeAdmin');
        Route::get('users/{user}/remove-admin', [UserManagementController::class, 'removeAdmin'])->name('users.removeAdmin');

        // --- CRUD Master Data ---
        Route::resource('job-vacancies', JobVacancyController::class)->except(['show'])->names('job_vacancies');
        Route::resource('services', ServiceController::class);
        Route::resource('moving-packages', MovingPackageController::class);
        Route::resource('internship-positions', InternshipPositionController::class);
        Route::resource('internship-projects', InternshipProjectController::class);
        Route::resource('career-programs', CareerProgramController::class);
        Route::resource('curricula', CurriculumController::class);

        // --- Pengaturan Situs (Admin Pusat) ---
        Route::prefix('settings')->name('settings.')->group(function () {
            Route::get('contact', [SettingController::class, 'contact'])->name('contact');
            Route::get('social', [SettingController::class, 'social'])->name('social');
            Route::get('logo', [SettingController::class, 'logo'])->name('logo');

            Route::post('update', [SettingController::class, 'update'])->name('update');
            Route::post('logo/update', [SettingController::class, 'updateLogo'])->name('logo.update');
            Route::delete('logo/delete', [SettingController::class, 'destroyLogo'])->name('logo.destroy');
        });
    });


// ==============================================================================
// 4. RUTE KHUSUS MITRA PANEL (Role: mitra) 🔥
// ==============================================================================
Route::middleware(['auth', 'verified', 'role:mitra'])
    ->prefix('mitra-panel') // URL akses: /mitra-panel/overview
    ->name('mitra.')        // Nama route: mitra.dashboard, mitra.packages, dll
    ->group(function () {

        // 1. Dashboard / Overview
        Route::get('/overview', [AdminMitraController::class, 'index'])->name('dashboard');

        // 2. Paket Kemitraan (Full CRUD)
        Route::get('/packages', [AdminMitraController::class, 'packages'])->name('packages');
        Route::post('/packages', [AdminMitraController::class, 'packagesStore'])->name('packages.store');
        Route::put('/packages/{id}', [AdminMitraController::class, 'packagesUpdate'])->name('packages.update');
        Route::delete('/packages/{id}', [AdminMitraController::class, 'packagesDestroy'])->name('packages.destroy');

        // 3. Keuntungan & Bonus (Full CRUD)
        Route::get('/benefits', [AdminMitraController::class, 'benefits'])->name('benefits');
        Route::post('/benefits', [AdminMitraController::class, 'benefitsStore'])->name('benefits.store');
        Route::put('/benefits/{id}', [AdminMitraController::class, 'benefitsUpdate'])->name('benefits.update');
        Route::delete('/benefits/{id}', [AdminMitraController::class, 'benefitsDestroy'])->name('benefits.destroy');

        // 4. Pengaturan Mitra & Sosial Media
        Route::get('/settings', [AdminMitraController::class, 'settings'])->name('settings');
        Route::post('/settings/social', [AdminMitraController::class, 'socialStore'])->name('settings.social.store');
        Route::delete('/settings/social/{id}', [AdminMitraController::class, 'socialDestroy'])->name('settings.social.destroy');
        
        // ✅ TAMBAHAN: Update Kontak Footer
        Route::post('/settings/contact', [AdminMitraController::class, 'settingsContactStore'])->name('settings.contact.store');

        // 5. FITUR KEUNGGULAN (Features)
        Route::get('/features', [AdminMitraController::class, 'features'])->name('features');
        Route::post('/features', [AdminMitraController::class, 'featuresStore'])->name('features.store');
        Route::delete('/features/{id}', [AdminMitraController::class, 'featuresDestroy'])->name('features.destroy');

        // 6. KONTEN HALAMAN (Hero, About, dll)
        Route::get('/contents', [AdminMitraController::class, 'contents'])->name('contents');
        Route::post('/contents', [AdminMitraController::class, 'contentsStore'])->name('contents.store');

        // 7. TESTIMONI
        Route::get('/testimonials', [AdminMitraController::class, 'testimonials'])->name('testimonials');
        Route::post('/testimonials', [AdminMitraController::class, 'testimonialsStore'])->name('testimonials.store');
        Route::delete('/testimonials/{id}', [AdminMitraController::class, 'testimonialsDestroy'])->name('testimonials.destroy');
    });

require __DIR__ . '/auth.php';