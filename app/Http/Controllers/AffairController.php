<?php

namespace App\Http\Controllers;

use App\Models\Relationship;
use App\Models\Affair;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AffairController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        return Inertia::render('affairs/index', ['data' => Affair::with(["cheating.personOne", "cheating.personTwo", 'cheated.personOne', 'cheated.personTwo'])->get()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        return Inertia::render('affairs/create', [
            'relationships' => Relationship::latest()->with('personOne', 'personTwo')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        $valid = $request->validate([
            'cheating_id' => 'required|exists:relationships,id',
            'cheated_id' => 'required|exists:relationships,id',
        ]);

        Affair::create([
            'cheating_id' => $valid['cheating_id'],
            'cheated_id' => $valid['cheated_id'],
        ]);

        return redirect()->route('affairs.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Affair $affair) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Affair $affair) {
        return Inertia::render('affairs/edit', [
            'affair' => $affair->load(['cheating', 'cheated']),
            'relationships' => Relationship::latest()->with('personOne', 'personTwo')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Affair $affair) {
        $valid = $request->validate([
            'cheating_id' => 'required|exists:relationships,id',
            'cheated_id' => 'required|exists:relationships,id',
        ]);

        $affair->update([
            'cheating_id' => $valid['cheating_id'],
            'cheated_id' => $valid['cheated_id'],
        ]);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Affair $affair): void {
        $affair->delete();
    }
}
