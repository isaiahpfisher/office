<?php

use App\Http\Controllers\ActorController;
use App\Http\Controllers\BranchController;
use App\Http\Controllers\CharacterController;
use App\Http\Controllers\ColdOpenController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\EpisodeController;
use App\Http\Controllers\PrankController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SeasonController;
use App\Http\Controllers\ThingSheSaidController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('chat');
})->name('chat');

Route::get('/characters', function () {
    return Inertia::render('characters/index');
})->name('characters.index');

Route::controller(ActorController::class)->group(function () {
    Route::get('/actors', 'index')->name('actors.index');
    Route::get('/actors/create', 'create')->name('actors.create');
    Route::get('/actors/{actor}', 'edit')->name('actors.edit');
    Route::post('/actors', 'store')->name('actors.store');
    Route::patch('/actors/{actor}', 'update')->name('actors.update');
    Route::delete('/actors/{actor}', 'destroy')->name('actors.destroy');
});

Route::controller(CharacterController::class)->group(function () {
    Route::get('/characters', 'index')->name('characters.index');
    Route::get('/characters/create', 'create')->name('characters.create');
    Route::get('/characters/{character}', 'edit')->name('characters.edit');
    Route::post('/characters', 'store')->name('characters.store');
    Route::patch('/characters/{character}', 'update')->name('characters.update');
    Route::delete('/characters/{character}', 'destroy')->name('characters.destroy');
});

Route::controller(RoleController::class)->group(function () {
    Route::get('/roles', 'index')->name('roles.index');
    Route::get('/roles/create', 'create')->name('roles.create');
    Route::get('/roles/{role}', 'edit')->name('roles.edit');
    Route::post('/roles', 'store')->name('roles.store');
    Route::patch('/roles/{role}', 'update')->name('roles.update');
    Route::delete('/roles/{role}', 'destroy')->name('roles.destroy');
});

Route::controller(SeasonController::class)->group(function () {
    Route::get('/seasons', 'index')->name('seasons.index');
    Route::get('/seasons/create', 'create')->name('seasons.create');
    Route::get('/seasons/{season}', 'edit')->name('seasons.edit');
    Route::post('/seasons', 'store')->name('seasons.store');
    Route::patch('/seasons/{season}', 'update')->name('seasons.update');
    Route::delete('/seasons/{season}', 'destroy')->name('seasons.destroy');
});

Route::controller(EpisodeController::class)->group(function () {
    Route::get('/episodes', 'index')->name('episodes.index');
    Route::get('/episodes/create', 'create')->name('episodes.create');
    Route::get('/episodes/{episode}', 'edit')->name('episodes.edit');
    Route::post('/episodes', 'store')->name('episodes.store');
    Route::patch('/episodes/{episode}', 'update')->name('episodes.update');
    Route::delete('/episodes/{episode}', 'destroy')->name('episodes.destroy');
});

Route::controller(DepartmentController::class)->group(function () {
    Route::get('/departments', 'index')->name('departments.index');
    Route::get('/departments/create', 'create')->name('departments.create');
    Route::get('/departments/{department}', 'edit')->name('departments.edit');
    Route::post('/departments', 'store')->name('departments.store');
    Route::patch('/departments/{department}', 'update')->name('departments.update');
    Route::delete('/departments/{department}', 'destroy')->name('departments.destroy');
});

Route::controller(BranchController::class)->group(function () {
    Route::get('/branches', 'index')->name('branches.index');
    Route::get('/branches/create', 'create')->name('branches.create');
    Route::get('/branches/{branch}', 'edit')->name('branches.edit');
    Route::post('/branches', 'store')->name('branches.store');
    Route::patch('/branches/{branch}', 'update')->name('branches.update');
    Route::delete('/branches/{branch}', 'destroy')->name('branches.destroy');
});

Route::controller(PrankController::class)->group(function () {
    Route::get('/pranks', 'index')->name('pranks.index');
    Route::get('/pranks/create', 'create')->name('pranks.create');
    Route::get('/pranks/{prank}', 'edit')->name('pranks.edit');
    Route::post('/pranks', 'store')->name('pranks.store');
    Route::patch('/pranks/{prank}', 'update')->name('pranks.update');
    Route::delete('/pranks/{prank}', 'destroy')->name('pranks.destroy');
});

Route::controller(ColdOpenController::class)->group(function () {
    Route::get('/cold-opens', 'index')->name('cold-opens.index');
    Route::get('/cold-opens/create', 'create')->name('cold-opens.create');
    Route::get('/cold-opens/{coldOpen}', 'edit')->name('cold-opens.edit');
    Route::post('/cold-opens', 'store')->name('cold-opens.store');
    Route::patch('/cold-opens/{coldOpen}', 'update')->name('cold-opens.update');
    Route::delete('/cold-opens/{coldOpen}', 'destroy')->name('cold-opens.destroy');
});

Route::controller(ThingSheSaidController::class)->group(function () {
    Route::get('/things-she-said', 'index')->name('things-she-said.index');
    Route::get('/things-she-said/create', 'create')->name('things-she-said.create');
    Route::get('/things-she-said/{thingSheSaid}', 'edit')->name('things-she-said.edit');
    Route::post('/things-she-said', 'store')->name('things-she-said.store');
    Route::patch('/things-she-said/{thingSheSaid}', 'update')->name('things-she-said.update');
    Route::delete('/things-she-said/{thingSheSaid}', 'destroy')->name('things-she-said.destroy');
});
