<?php

namespace App\Http\Controllers;

use App\Models\Character;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CharacterController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        return Inertia::render('characters/index', ['data' => Character::all()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        return "Hi";
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Character $character) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Character $character) {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Character $character) {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Character $character) {
        $character->delete();
    }
}
