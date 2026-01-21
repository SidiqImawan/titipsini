<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $role): Response
    {
        // 1. Cek apakah user sudah login? Kalau belum, lempar ke login
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        // 2. Cek Role
        // Kita bandingkan role user yang login dengan role yang diminta di route
        // Contoh: User role 'admin', tapi mau masuk route 'mitra'. Ini akan DITOLAK.
        if (Auth::user()->role !== $role) {
            
            // Opsional: Kalau admin mau masuk mitra, bisa kita biarkan atau tolak.
            // Di sini kita buat strict: Harus sesuai role.
            abort(403, 'Akses Ditolak! Anda tidak memiliki izin untuk masuk ke halaman ini.');
        }

        return $next($request);
    }
}