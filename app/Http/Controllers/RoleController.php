<?php

namespace App\Http\Controllers;

use App\Models\Character;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\RedirectResponse;

class RoleController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        return Inertia::render('roles/index', ['data' => Role::with("character")->get()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        return Inertia::render('roles/create', ['characters' => Character::all()]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        $valid = $request->validate([
            'title' => 'required',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'character_id' => 'required|exists:characters,id',
        ]);

        Role::create([
            'title' => $valid['title'],
            'start_date' => $valid['start_date'],
            'end_date' => $valid['end_date'],
            'character_id' => $valid['character_id'],
        ]);

        return redirect()->route('roles.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Role $role) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role) {
        return Inertia::render('roles/edit', ['role' => $role, 'characters' => Character::all()]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Role $role) {
        $valid = $request->validate([
            'title' => 'required',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'character_id' => 'required|exists:characters,id',
        ]);

        $role->update([
            'title' => $valid['title'],
            'start_date' => $valid['start_date'],
            'end_date' => $valid['end_date'],
            'character_id' => $valid['character_id'],
        ]);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role): void {
        $role->delete();
    }
}
