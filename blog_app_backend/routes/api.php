<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\TempImageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// This is the api endpoints routes 
Route::get('/blogs', [BlogController::class, 'index']);
Route::post('/blogs', [BlogController::class, 'store']);
Route::post('/save-temp-image', [TempImageController::class, 'store']);

Route::get('/blogs/{id}', [BlogController::class, 'show']);
Route::post('/blogs/{id}', [BlogController::class, 'update']);

Route::delete('/blogs/{id}', [BlogController::class, 'destroy']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
