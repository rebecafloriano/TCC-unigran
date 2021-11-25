<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DoctorPhotos extends Model
{
    use HasFactory;

    protected $table = 'doctorphotos';
    public $timestamps = false;
}
