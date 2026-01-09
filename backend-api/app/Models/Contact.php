<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    // Tambahkan ini agar semua kolom bisa diisi/dibaca
    protected $guarded = []; 
}