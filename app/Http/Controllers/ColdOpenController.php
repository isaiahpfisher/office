<?php

namespace App\Http\Controllers;

use App\Models\Episode;
use App\Models\ColdOpen;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ColdOpenController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        return Inertia::render('cold-opens/index', ['data' => ColdOpen::with("episode")->get()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        return Inertia::render('cold-opens/create', ['episodes' => Episode::orderBy('air_date')->get()]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        $valid = $request->validate([
            'description' => 'required',
            'episode_id' => 'required|exists:episodes,id',
        ]);

        ColdOpen::create([
            'description' => $valid['description'],
            'episode_id' => $valid['episode_id'],
        ]);

        return redirect()->route('cold-opens.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(ColdOpen $coldOpen) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ColdOpen $coldOpen) {
        return Inertia::render('cold-opens/edit', ['coldOpen' => $coldOpen->load('episode'), 'episodes' => Episode::orderBy('air_date')->get()]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ColdOpen $coldOpen) {
        $valid = $request->validate([
            'description' => 'required',
            'episode_id' => 'required|exists:episodes,id',
        ]);

        $coldOpen->update([
            'description' => $valid['description'],
            'episode_id' => $valid['episode_id'],
        ]);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ColdOpen $coldOpen): void {
        $coldOpen->delete();
    }
}
