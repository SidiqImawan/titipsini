<?php

// Framework & App
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// App Controllers
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ContactPageController;
use App\Http\Controllers\InternshipPageController;
use App\Http\Controllers\JobVacancyController;
use App\Http\Controllers\LayananPageController;

// Admin Controllers
use App\Http\Controllers\Admin\UserManagementController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// --- RUTE HALAMAN PUBLIK ---

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home'); // Ditambahkan nama 'home'

Route::get('/tentang-kami', fn() => Inertia::render('About'))->name('about');
Route::get('/contact', [ContactPageController::class, 'show'])->name('contact.show');
Route::post('/contact', [ContactPageController::class, 'store'])->name('contact.store');
Route::get('/internship', [InternshipPageController::class, 'show'])->name('internship.show');
Route::get('/program-kami', fn() => Inertia::render('Program'))->name('program');
Route::get('/layanan', [LayananPageController::class, 'show'])->name('layanan.show');
Route::get('/lowongan-kerja', [JobVacancyController::class, 'publicIndex'])->name('careers.index');


// --- RUTE UNTUK PENGGUNA TERAUTENTIKASI ---

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');

    // Profile Routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


// --- RUTE KHUSUS ADMIN ---

Route::middleware(['auth', 'verified', 'isAdmin'])
    ->prefix('admin') // Semua URL diawali dengan /admin
    ->name('admin.') // Semua nama rute diawali dengan admin.
    ->group(function () {

        // Rute CRUD untuk Job Vacancies (URL: /admin/job-vacancies, Nama: admin.job_vacancies.index, dll)
        Route::resource('job-vacancies', JobVacancyController::class)
            ->except(['show'])
            ->names('job_vacancies');

        // Rute untuk Manajemen User
        Route::get('users', [UserManagementController::class, 'index'])->name('users.index');
        Route::get('users/{user}/make-admin', [UserManagementController::class, 'makeAdmin'])->name('users.makeAdmin');
        Route::get('users/{user}/remove-admin', [UserManagementController::class, 'removeAdmin'])->name('users.removeAdmin');
    });


require __DIR__ . '/auth.php';
