<?php

namespace App\Http\Controllers;

use App\Models\Character;
use App\Models\Episode;
use App\Models\ThingSheSaid;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ThingSheSaidController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        return Inertia::render('things-she-said/index', ['data' => ThingSheSaid::with(["episode", 'character'])->get()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        return Inertia::render('things-she-said/create', [
            'episodes' => Episode::orderBy('air_date')->get(),
            'characters' => Character::latest()->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        $valid = $request->validate([
            'saying' => 'required',
            'episode_id' => 'required|exists:episodes,id',
            'character_id' => 'required|exists:characters,id',
        ]);

        ThingSheSaid::create([
            'saying' => $valid['saying'],
            'episode_id' => $valid['episode_id'],
            'character_id' => $valid['character_id'],
        ]);

        return redirect()->route('things-she-said.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(ThingSheSaid $thingSheSaid) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ThingSheSaid $thingSheSaid) {
        return Inertia::render('things-she-said/edit', [
            'thingSheSaid' => $thingSheSaid->load(['episode', 'character']),
            'episodes' => Episode::orderBy('air_date')->get(),
            'characters' => Character::latest()->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ThingSheSaid $thingSheSaid) {
        $valid = $request->validate([
            'saying' => 'required',
            'episode_id' => 'required|exists:episodes,id',
            'character_id' => 'required|exists:characters,id',
        ]);

        $thingSheSaid->update([
            'saying' => $valid['saying'],
            'episode_id' => $valid['episode_id'],
            'character_id' => $valid['character_id'],
        ]);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ThingSheSaid $thingSheSaid): void {
        $thingSheSaid->delete();
    }
}
