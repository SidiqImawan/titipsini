<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Display the login view for MITRA.
     * Method ini dipanggil oleh route '/mitra/login'
     */
    public function createMitra(): Response
    {
        // Kita gunakan tampilan 'Auth/Login' yang sama dengan admin/user biasa
        // Jadi tidak perlu bikin file .jsx baru.
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
            'isMitraLogin' => true, // Opsional: Penanda jika ingin membedakan UI sedikit
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        // --- LOGIKA REDIRECT SESUAI ROLE (Polisi Lalu Lintas) ---
        
        $user = $request->user();

        // 1. Jika Role MITRA -> Arahkan ke Panel Mitra
        if ($user->role === 'mitra') {
            // PERBAIKAN: Arahkan ke 'mitra.dashboard' (Panel Admin), BUKAN 'mitra.index' (Landing Page)
            return redirect()->intended(route('mitra.dashboard'));
        }

        // 2. Jika Role ADMIN -> Arahkan ke Dashboard Admin (atau Dashboard Utama)
        if ($user->role === 'admin') {
            // Jika kamu punya dashboard khusus admin, ganti jadi 'admin.dashboard'
            // Tapi kalau admin pakai dashboard biasa, biarkan 'dashboard'
            return redirect()->intended(route('dashboard')); 
        }

        // 3. Default (User Biasa) -> Dashboard Utama
        return redirect()->intended(route('dashboard', absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}