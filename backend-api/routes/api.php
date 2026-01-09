<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ContactController;

Route::post('/contact', [ContactController::class, 'store']);

Route::get('/contact', function () {
    return response()->json([
        'status' => 'API Ready',
        'message' => 'Backend Laravel Sixperience Berjalan!'
    ], 200);
});