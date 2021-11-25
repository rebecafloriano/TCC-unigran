<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DoctorServices extends Model
{
    use HasFactory;

    protected $table = 'doctorservices';
    public $timestamps = false;
}
