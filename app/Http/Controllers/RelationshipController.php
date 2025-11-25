<?php

namespace App\Http\Controllers;

use App\Models\Affair;
use App\Models\Character;
use App\Models\Episode;
use App\Models\Relationship;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RelationshipController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        return Inertia::render('relationships/index', ['data' => Relationship::with(["personOne", 'personTwo'])->get()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        return Inertia::render('relationships/create', [
            'characters' => Character::latest()->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        $valid = $request->validate([
            'outcome' => 'required',
            'person_one_id' => 'required|exists:characters,id',
            'person_two_id' => 'required|exists:characters,id|different:person_one_id',
        ]);

        Relationship::create([
            'outcome' => $valid['outcome'],
            'person_one_id' => min($valid['person_one_id'], $valid['person_two_id']),
            'person_two_id' => max($valid['person_one_id'], $valid['person_two_id']),
        ]);

        return redirect()->route('relationships.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Relationship $relationship) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Relationship $relationship) {
        return Inertia::render('relationships/edit', [
            'relationship' => $relationship->load(['personOne', 'personTwo'])->append('affairs'),
            'outcome' => $relationship->load(['personOne', 'personTwo']),
            'characters' => Character::latest()->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Relationship $relationship) {
        $valid = $request->validate([
            'outcome' => 'required',
            'person_one_id' => 'required|exists:characters,id',
            'person_two_id' => 'required|exists:characters,id|different:person_one_id',
        ]);

        $relationship->update([
            'outcome' => $valid['outcome'],
            'person_one_id' => min($valid['person_one_id'], $valid['person_two_id']),
            'person_two_id' => max($valid['person_one_id'], $valid['person_two_id']),
        ]);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Relationship $relationship): void {
        $relationship->delete();
    }
}
