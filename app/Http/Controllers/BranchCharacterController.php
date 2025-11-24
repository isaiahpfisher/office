<?php

namespace App\Http\Controllers;

use App\Models\BranchCharacter;
use App\Models\Character;
use Illuminate\Http\Request;

class BranchCharacterController extends Controller {
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        $valid = $request->validate([
            'branch_id' => 'required|exists:branches,id',
            'character_id' => 'required|exists:characters,id',
        ]);

        BranchCharacter::create([
            'branch_id' => $valid['branch_id'],
            'character_id' => $valid['character_id'],
        ]);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Character $character, $branchId) {
        $character->branches()->detach($branchId);
    }
}
