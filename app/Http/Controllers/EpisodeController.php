<?php

namespace App\Http\Controllers;

use App\Models\Actor;
use App\Models\Character;
use App\Models\Episode;
use App\Models\Season;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EpisodeController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        return Inertia::render('episodes/index', ['data' => Episode::with(["season", 'coldOpen'])->orderBy('air_date')->get()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        return Inertia::render('episodes/create', ['seasons' => Season::orderBy('number')->get()]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        $valid = $request->validate([
            'title' => 'required',
            'summary' => 'required',
            'air_date' => 'required|date',
            'season_id' => 'required|exists:seasons,id',
        ]);

        Episode::create([
            'title' => $valid['title'],
            'summary' => $valid['summary'],
            'air_date' => $valid['air_date'],
            'season_id' => $valid['season_id'],
        ]);

        return redirect()->route('episodes.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Episode $episode) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Episode $episode) {
        return Inertia::render('episodes/edit', [
            'episode' => $episode->load('characters', 'quotes.character', 'thingsSheSaid.character', 'pranks'),
            'seasons' => Season::orderBy('number')->get(),
            'characters' => Character::latest()->get()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Episode $episode) {
        $valid = $request->validate([
            'title' => 'required',
            'summary' => 'required',
            'air_date' => 'required|date',
            'season_id' => 'required|exists:seasons,id',
        ]);

        $episode->update([
            'title' => $valid['title'],
            'summary' => $valid['summary'],
            'air_date' => $valid['air_date'],
            'season_id' => $valid['season_id'],
        ]);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Episode $episode) {
        $episode->delete();
    }
}
