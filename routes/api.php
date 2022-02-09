<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DoctorController;


Route::get('/ping', function() {
    return ['pong' =>true];
});

Route::get('/401', [AuthController::class, 'unauthorized'])->name('login');

Route::get('/random', [DoctorController::class, 'createRandom']);

Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/logout', [AuthController::class, 'logout']);
Route::post('/auth/refresh', [AuthController::class, 'refresh']);
Route::post('/user', [AuthController::class, 'create']);

Route::get('/user', [UserController::class, 'read']);
Route::put('/user', [UserController::class, 'update']);
Route::post('/user/avatar', [UserController::class, 'updateAvatar']);
Route::get('/user/favorites', [UserController::class, 'getFavorites']);
Route::post('/user/favorite', [UserController::class, 'toggleFavorite']);
Route::get('/user/appointments', [UserController::class, 'getAppointments']);

Route::get('/doctors', [DoctorController::class, 'list']);
Route::get('/doctor/{id}', [DoctorController::class, 'one']);
Route::post('/doctor/{id}/appointment', [DoctorController::class, 'setAppointment']);

Route::get('/search', [DoctorController::class, 'search']);
Route::get('/searchService', [DoctorController::class, 'searchService']);


