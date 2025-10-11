<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\JobVacancy;
use Illuminate\Support\Facades\Auth; // <-- Tambahkan ini

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Cek apakah pengguna memiliki role 'admin'
        // Asumsi relasi 'roles' sudah ada di model User Anda
        if ($user->roles()->where('name', 'admin')->exists()) {

            // --- LOGIKA UNTUK ADMIN ---
            $stats = [
                'total_users' => User::count(),
                'total_job_vacancies' => JobVacancy::count(),
                'new_users_this_week' => User::where('created_at', '>=', now()->subWeek())->count(),
            ];

            return Inertia::render('Admin/Dashboard', [
                'stats' => $stats
            ]);
        } else {

            // --- LOGIKA UNTUK PENGGUNA BIASA ---
            // Tampilkan dashboard sederhana untuk pengguna biasa
            return Inertia::render('Dashboard');

            // Atau, jika Anda ingin pengguna biasa langsung dialihkan ke halaman utama:
            // return redirect()->route('home');
        }
    }
}
