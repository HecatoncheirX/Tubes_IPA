<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ContactController; 

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route Endpoint
Route::post('/contact', [ContactController::class, 'store']);

// Rate Limiting: Maksimal 60 request per menit
Route::post('/contacts', [ContactController::class, 'store'])
    ->middleware('throttle:60,1');