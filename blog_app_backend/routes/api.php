<?php

use App\Http\Controllers\BlogController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('y', [BlogController::class, 'yourMethod']);
Route::post('/blogs', [BlogController::class, 'store']);

Route::post('/cr', 'BlogController@cr');

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
