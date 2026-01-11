<?php

namespace App\Http\Controllers\Api; // Pastikan 'A' Besar

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        // 1. Validasi Input
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'message' => 'required|string'
        ]);

        try {
            // 2. Simpan ke Database menggunakan Query Builder (Lebih cepat)
            DB::table('contacts')->insert([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone ?? '-', // Default strip jika kosong
                'message' => $request->message,
                'created_at' => now(),
                'updated_at' => now()
            ]);

            // 3. Sukses
            return response()->json([
                'success' => true,
                'message' => 'Data transmitted successfully.'
            ], 201);
        } catch (\Exception $e) {
            // 4. Jika Database Error, beri tahu Frontend
            return response()->json([
                'success' => false,
                'message' => 'Database Error: ' . $e->getMessage()
            ], 500);
        }
    }

    public function index()
    {
        // Return langsung array-nya, jangan dibungkus 'data' => ...
        return response()->json(\App\Models\Contact::latest()->get());
    }
}
