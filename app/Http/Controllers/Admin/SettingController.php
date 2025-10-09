<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Setting;
use Illuminate\Support\Facades\Cache; // <-- 1. TAMBAHKAN IMPORT CACHE

class SettingController extends Controller
{
    /**
     * Menampilkan halaman pengaturan dengan data dari database.
     */
    public function index()
    {
        $settings = Setting::all()->pluck('value', 'key');

        return Inertia::render('Admin/Settings/Index', [
            'settings' => $settings,
        ]);
    }

    /**
     * Memperbarui data pengaturan di database.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'contact_phone'   => 'nullable|string|max:255',
            'contact_email'   => 'nullable|email|max:255',
            'contact_address' => 'nullable|string|max:255',
            'social_facebook'  => 'nullable|url|max:255',
            'social_instagram' => 'nullable|url|max:255',
            'social_twitter'   => 'nullable|url|max:255',
        ]);

        foreach ($validated as $key => $value) {
            Setting::where('key', $key)->update(['value' => $value ?? '']);
        }

        // 2. TAMBAHKAN BARIS INI UNTUK MEMBERSIHKAN CACHE
        Cache::forget('settings');

        // 3. PERBAIKI NAMA ROUTE DI SINI
        return redirect()->route('admin.settings.index')
            ->with('success', 'Pengaturan berhasil diperbarui.');
    }
}
