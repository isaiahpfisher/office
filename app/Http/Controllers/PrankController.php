<?php

namespace App\Http\Controllers;

use App\Models\Episode;
use App\Models\Prank;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PrankController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        return Inertia::render('pranks/index', ['data' => Prank::with("episode")->get()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        return Inertia::render('pranks/create', ['episodes' => Episode::orderBy('air_date')->get()]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        $valid = $request->validate([
            'description' => 'required',
            'episode_id' => 'required|exists:episodes,id',
        ]);

        Prank::create([
            'description' => $valid['description'],
            'episode_id' => $valid['episode_id'],
        ]);

        return redirect()->route('pranks.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Prank $prank) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Prank $prank) {
        return Inertia::render('pranks/edit', ['prank' => $prank->load('episode'), 'episodes' => Episode::orderBy('air_date')->get()]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Prank $prank) {
        $valid = $request->validate([
            'description' => 'required',
            'episode_id' => 'required|exists:episodes,id',
        ]);

        $prank->update([
            'description' => $valid['description'],
            'episode_id' => $valid['episode_id'],
        ]);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Prank $prank): void {
        $prank->delete();
    }
}
