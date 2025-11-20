<?php

namespace App\Http\Controllers;

use App\Models\Actor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActorController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        return Inertia::render('actors/index', ['data' => Actor::with("characters")->get()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        return Inertia::render('actors/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        $valid = $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
        ]);

        Actor::create([
            'first_name' => $valid['first_name'],
            'last_name' => $valid['last_name'],
        ]);

        return redirect()->route('actors.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Actor $actor) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Actor $actor) {
        return Inertia::render('actors/edit', ['actor' => $actor]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Actor $actor) {
        $valid = $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
        ]);

        $actor->update([
            'first_name' => $valid['first_name'],
            'last_name' => $valid['last_name'],
        ]);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Actor $actor): void {
        $actor->delete();
    }
}
