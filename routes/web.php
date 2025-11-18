<?php

use App\Http\Controllers\CharacterController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\SeasonController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('chat');
})->name('chat');

Route::get('/characters', function () {
    return Inertia::render('characters/index');
})->name('characters.index');


Route::controller(DepartmentController::class)->group(function () {
    Route::get('/departments', 'index')->name('departments.index');
    Route::get('/departments/create', 'create')->name('departments.create');
    Route::get('/departments/{department}', 'edit')->name('departments.edit');
    Route::post('/departments', 'store')->name('departments.store');
    Route::patch('/departments/{department}', 'update')->name('departments.update');
    Route::delete('/departments/{department}', 'destroy')->name('departments.destroy');
});

Route::controller(CharacterController::class)->group(function () {
    Route::get('/characters', 'index')->name('characters.index');
    Route::get('/characters/create', 'create')->name('characters.create');
    Route::get('/characters/{character}', 'edit')->name('characters.edit');
    Route::post('/characters', 'store')->name('characters.store');
    Route::patch('/characters/{character}', 'update')->name('characters.update');
    Route::delete('/characters/{character}', 'destroy')->name('characters.destroy');
});


Route::controller(SeasonController::class)->group(function () {
    Route::get('/seasons', 'index')->name('seasons.index');
    Route::get('/seasons/create', 'create')->name('seasons.create');
    Route::get('/seasons/{season}', 'edit')->name('seasons.edit');
    Route::post('/seasons', 'store')->name('seasons.store');
    Route::patch('/seasons/{season}', 'update')->name('seasons.update');
    Route::delete('/seasons/{season}', 'destroy')->name('seasons.destroy');
});
