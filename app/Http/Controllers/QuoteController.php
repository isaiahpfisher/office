<?php

namespace App\Http\Controllers;

use App\Models\Character;
use App\Models\Episode;
use App\Models\Quote;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuoteController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        return Inertia::render('quotes/index', ['data' => Quote::with(["episode", 'character'])->get()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        return Inertia::render('quotes/create', [
            'episodes' => Episode::orderBy('air_date')->get(),
            'characters' => Character::latest()->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        $valid = $request->validate([
            'quote' => 'required',
            'episode_id' => 'required|exists:episodes,id',
            'character_id' => 'required|exists:characters,id',
        ]);

        Quote::create([
            'quote' => $valid['quote'],
            'episode_id' => $valid['episode_id'],
            'character_id' => $valid['character_id'],
        ]);

        return redirect()->route('quotes.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Quote $quote) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Quote $quote) {
        return Inertia::render('quotes/edit', [
            'quote' => $quote->load(['episode', 'character']),
            'episodes' => Episode::orderBy('air_date')->get(),
            'characters' => Character::latest()->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Quote $quote) {
        $valid = $request->validate([
            'quote' => 'required',
            'episode_id' => 'required|exists:episodes,id',
            'character_id' => 'required|exists:characters,id',
        ]);

        $quote->update([
            'quote' => $valid['quote'],
            'episode_id' => $valid['episode_id'],
            'character_id' => $valid['character_id'],
        ]);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Quote $quote): void {
        $quote->delete();
    }
}
