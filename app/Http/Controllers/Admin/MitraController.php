<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

// Models
use App\Models\MitraPackage;
use App\Models\MitraBenefit;
use App\Models\SocialLink;
use App\Models\MitraFeature;     // ✅ Tambahan Baru
use App\Models\MitraContent;     // ✅ Tambahan Baru (Untuk Teks & Kontak)
use App\Models\MitraTestimonial; // ✅ Tambahan Baru

class MitraController extends Controller
{
    // ==========================================
    // 1. DASHBOARD
    // ==========================================
    public function index()
    {
        return Inertia::render('AdminMitra/Dashbor'); 
    }

    // ==========================================
    // 2. PAKET KEMITRAAN
    // ==========================================
    public function packages()
    {
        $packages = MitraPackage::all();
        return Inertia::render('AdminMitra/AdminPackages', ['packages' => $packages]);
    }

    public function packagesStore(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'price' => 'required|string',
            'duration' => 'required|string',
            'features' => 'required|array',
            'features.*' => 'string',
            'is_best_seller' => 'boolean',
        ]);

        MitraPackage::create($validated);
        return Redirect::route('mitra.packages');
    }

    public function packagesUpdate(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'price' => 'required|string',
            'duration' => 'required|string',
            'features' => 'required|array',
            'is_best_seller' => 'boolean',
        ]);

        $pkg = MitraPackage::findOrFail($id);
        $pkg->update($validated);
        return Redirect::route('mitra.packages');
    }

    public function packagesDestroy($id)
    {
        MitraPackage::findOrFail($id)->delete();
        return Redirect::route('mitra.packages');
    }

    // ==========================================
    // 3. KEUNTUNGAN & BONUS
    // ==========================================
    public function benefits()
    {
        $benefits = MitraBenefit::all()->groupBy('type');
        return Inertia::render('AdminMitra/AdminBenefits', [
            'bonusData' => $benefits->get('bonus', []),
            'accessData' => $benefits->get('access', [])
        ]);
    }

    public function benefitsStore(Request $request)
    {
        $validated = $request->validate([
            'text' => 'required|string|max:255',
            'type' => 'required|in:bonus,access',
        ]);

        MitraBenefit::create($validated);
        return Redirect::route('mitra.benefits');
    }

    public function benefitsUpdate(Request $request, $id)
    {
        $validated = $request->validate([
            'text' => 'required|string|max:255',
        ]);

        $benefit = MitraBenefit::findOrFail($id);
        $benefit->update($validated);
        return Redirect::route('mitra.benefits');
    }

    public function benefitsDestroy($id)
    {
        MitraBenefit::findOrFail($id)->delete();
        return Redirect::route('mitra.benefits');
    }

    // ==========================================
    // 4. PENGATURAN (SOSMED & KONTAK FOOTER)
    // ==========================================
    public function settings()
    {
        // 1. Ambil Data Sosmed
        $socials = SocialLink::all();

        // 2. Ambil Data Kontak (Phone, Email, Address) dari MitraContent
        // Kita filter yang key-nya berawalan 'contact_'
        $contacts = MitraContent::where('key', 'like', 'contact_%')->pluck('value', 'key');

        return Inertia::render('AdminMitra/Setting', [
            'socials' => $socials,
            'contacts' => $contacts // ✅ Kirim data kontak ke View
        ]);
    }

    // ✅ Method Baru: Simpan Kontak Footer
    public function settingsContactStore(Request $request)
    {
        $data = $request->validate([
            'contact_phone' => 'nullable|string',
            'contact_email' => 'nullable|email',
            'contact_address' => 'nullable|string',
        ]);

        foreach ($data as $key => $value) {
            // Simpan ke tabel mitra_contents
            MitraContent::updateOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }

        return Redirect::route('mitra.settings')->with('message', 'Info kontak berhasil diperbarui!');
    }

    public function socialStore(Request $request)
    {
        $validated = $request->validate([
            'id' => 'nullable|integer',
            'label' => 'required|string|max:255',
            'link' => 'required|url',
            'icon_key' => 'required|string',
        ]);

        SocialLink::updateOrCreate(
            ['id' => $request->id],
            [
                'label' => $request->label,
                'link' => $request->link,
                'icon_key' => $request->icon_key
            ]
        );
        return Redirect::route('mitra.settings');
    }

    public function socialDestroy($id)
    {
        SocialLink::findOrFail($id)->delete();
        return Redirect::route('mitra.settings');
    }

    // ==========================================
    // 5. FITUR KEUNGGULAN
    // ==========================================
    public function features()
    {
        $features = MitraFeature::all();
        return Inertia::render('AdminMitra/AdminFeatures', ['features' => $features]);
    }

    public function featuresStore(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'icon' => 'required|string',
        ]);

        MitraFeature::create($validated);
        return Redirect::route('mitra.features');
    }

    public function featuresDestroy($id)
    {
        MitraFeature::findOrFail($id)->delete();
        return Redirect::route('mitra.features');
    }

    // ==========================================
    // 6. KONTEN HALAMAN (Hero, About, CTA)
    // ==========================================
    public function contents()
    {
        // Format data jadi { key: value } biar mudah dipakai di React
        $contents = MitraContent::all()->pluck('value', 'key');
        return Inertia::render('AdminMitra/AdminContent', ['contents' => $contents]);
    }

    public function contentsStore(Request $request)
    {
        $data = $request->all(); // Ambil semua input form

        foreach ($data as $key => $value) {
            // Abaikan input default Laravel/Inertia jika ada (misal _token)
            if (in_array($key, ['_method', '_token'])) continue;

            MitraContent::updateOrCreate(
                ['key' => $key],
                ['value' => $value] // Update value-nya
            );
        }

        return Redirect::route('mitra.contents')->with('message', 'Konten berhasil diperbarui!');
    }

    // ==========================================
    // 7. TESTIMONI
    // ==========================================
    public function testimonials()
    {
        $testimonials = MitraTestimonial::all();
        return Inertia::render('AdminMitra/AdminTestimonials', ['testimonials' => $testimonials]);
    }

    public function testimonialsStore(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'quote' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        MitraTestimonial::create($validated);
        return Redirect::route('mitra.testimonials');
    }

    public function testimonialsDestroy($id)
    {
        MitraTestimonial::findOrFail($id)->delete();
        return Redirect::route('mitra.testimonials');
    }
}