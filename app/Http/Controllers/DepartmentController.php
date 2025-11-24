<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepartmentController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        return Inertia::render('departments/index', ['data' => Department::all()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        return Inertia::render("departments/create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        $valid = $request->validate([
            'title' => 'required|min:5',
        ]);

        Department::create([
            'title' => $valid['title'],
        ]);

        return redirect()->route('departments.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Department $department) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Department $department) {
        return Inertia::render('departments/edit', ['department' => $department->load('characters')]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Department $department) {
        $valid = $request->validate([
            'title' => 'required|min:5',
        ]);

        $department->update([
            'title' => $valid['title'],
        ]);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Department $department) {
        $department->delete();
    }
}
