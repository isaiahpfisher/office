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
        return Inertia::render('characters/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        $valid = $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'sex' => 'required|in:Male,Female',
        ]);

        Character::create([
            'first_name' => $valid['first_name'],
            'last_name' => $valid['last_name'],
            'sex' => $valid['sex'],
        ]);

        return redirect()->route('characters.index');
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
        return Inertia::render('characters/edit', ['character' => $character]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Character $character) {
        $valid = $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'sex' => 'required|in:Male,Female',
        ]);

        $character->update([
            'first_name' => $valid['first_name'],
            'last_name' => $valid['last_name'],
            'sex' => $valid['sex'],
        ]);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Character $character) {
        $character->delete();
    }
}
