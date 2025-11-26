<?php

namespace App\Http\Controllers;

use App\Models\Actor;
use App\Models\Branch;
use App\Models\Character;
use App\Models\Department;
use App\Models\Episode;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CharacterController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        return Inertia::render('characters/index', ['data' => Character::with(["actor", "department"])->get()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        return Inertia::render('characters/create', ['actors' => Actor::latest()->get(), 'departments' => Department::latest()->get()]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        $valid = $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'actor_id' => 'required|exists:actors,id',
            'department_id' => 'required|exists:departments,id',
        ]);

        Character::create([
            'first_name' => $valid['first_name'],
            'last_name' => $valid['last_name'],
            'actor_id' => $valid['actor_id'],
            'department_id' => $valid['department_id'],
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
        return Inertia::render('characters/edit', [
            'character' => $character->load([
                'roles',
                'relationshipsOne.personOne',
                'relationshipsOne.personTwo',
                'relationshipsTwo.personOne',
                'relationshipsTwo.personTwo',
                'thingsSheSaid.episode',
                'quotes.episode',
                'branches',
                'episodes',
            ])
                ->append('relationships'),
            'actors' => Actor::all(),
            'branches' => Branch::latest()->get(),
            'departments' => Department::latest()->get(),
            'episodes' => Episode::orderBy('air_date')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Character $character) {
        $valid = $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'actor_id' => 'required|exists:actors,id',
            'department_id' => 'required|exists:departments,id',
        ]);

        $character->update([
            'first_name' => $valid['first_name'],
            'last_name' => $valid['last_name'],
            'actor_id' => $valid['actor_id'],
            'department_id' => $valid['department_id'],
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
