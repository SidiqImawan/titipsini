<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
// Asumsi Anda punya model untuk menyimpan link sosmed
// use App\Models\SocialMediaLink; 

class SocialMediaController extends Controller
{
    public function index()
    {
        // Ambil data link sosmed dari database
        // $links = SocialMediaLink::all(); 

        // Untuk contoh, kita gunakan data dummy
        $links = [
            ['id' => 1, 'platform' => 'Instagram', 'url' => '[https://instagram.com/titipsini](https://instagram.com/titipsini)'],
            ['id' => 2, 'platform' => 'Facebook', 'url' => '[https://facebook.com/titipsini](https://facebook.com/titipsini)'],
        ];

        return Inertia::render('Admin/SocialMedia', [
            'social_media_links' => $links
        ]);
    }

    public function update(Request $request)
    {
        // Validasi data yang masuk
        $validated = $request->validate([
            'links' => 'present|array',
            'links.*.id' => 'required|integer',
            'links.*.platform' => 'required|string',
            'links.*.url' => 'nullable|url',
        ]);

        // Logika untuk menyimpan setiap link ke database
        foreach ($validated['links'] as $linkData) {
            // SocialMediaLink::updateOrCreate(
            //     ['id' => $linkData['id']],
            //     ['platform' => $linkData['platform'], 'url' => $linkData['url']]
            // );
        }
        
        // Redirect kembali dengan pesan sukses
        return redirect()->route('admin.social_media.index')->with('success', 'Social media links updated successfully.');
    }
}