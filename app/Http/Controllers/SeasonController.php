<?php

namespace App\Http\Controllers;

use App\Models\Season;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class SeasonController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        return Inertia::render("seasons/index", ['data' => Season::all()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        return Inertia::render("seasons/create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        $valid = $request->validate([
            'number' => ['required', 'numeric', Rule::unique('seasons', 'number')],
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'overview' => 'required',
        ]);

        Season::create([
            'number' => $valid['number'],
            'start_date' => $valid['start_date'],
            'end_date' => $valid['end_date'],
            'overview' => $valid['overview'],
        ]);

        return redirect()->route('seasons.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Season $season) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Season $season) {
        return Inertia::render("seasons/edit", ['season' => $season->load('episodes')]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Season $season) {
        $valid = $request->validate([
            'number' => ['required', 'numeric', Rule::unique('seasons', 'number')->ignore($season->id)],
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'overview' => 'required',
        ]);

        $season->update([
            'number' => $valid['number'],
            'start_date' => $valid['start_date'],
            'end_date' => $valid['end_date'],
            'overview' => $valid['overview'],
        ]);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Season $season) {
        $season->delete();
    }
}
