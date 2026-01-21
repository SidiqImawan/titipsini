<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        // --- DAFTARKAN ALIAS DI SINI ---
        $middleware->alias([
            // Alias untuk cek admin (kode lama kamu)
            'isAdmin' => \App\Http\Middleware\IsAdmin::class,
            
            // TAMBAHAN WAJIB: Alias untuk cek role (mitra/admin)
            // Pastikan file App/Http/Middleware/RoleMiddleware.php sudah ada ya!
            'role' => \App\Http\Middleware\RoleMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();