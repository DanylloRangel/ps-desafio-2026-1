<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SportsArticleController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/profile', function (Request $request) {
        return response()->json(Auth::user(), Response::HTTP_OK);
    });
});

Route::get('/category', [CategoryController::class, 'index']);
Route::get('/category/{id}', [CategoryController::class, 'show']);

Route::get('/sports-articles', [SportsArticleController::class, 'index']);
Route::get('/sports-articles/{id}', [SportsArticleController::class, 'show']);

Route::middleware(['auth:sanctum', 'can:admin'])->group(function () {
    Route::apiResource('/users', UserController::class);

    Route::post('/category', [CategoryController::class, 'store']);
    Route::put('/category/{id}', [CategoryController::class, 'update']);
    Route::delete('/category/{id}', [CategoryController::class, 'destroy']);

    Route::post('/sports-articles', [SportsArticleController::class, 'store']);
    Route::put('/sports-articles/{id}', [SportsArticleController::class, 'update']);
    Route::delete('/sports-articles/{id}', [SportsArticleController::class, 'destroy']);

});

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__.'/auth.php';
