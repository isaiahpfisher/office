<?php

namespace App\Http\Controllers;

use App\Models\BranchCharacter;
use App\Models\Character;
use App\Models\CharacterEpisode;
use Illuminate\Http\Request;

class CharacterEpisodeController extends Controller {
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        $valid = $request->validate([
            'character_id' => 'required|exists:characters,id',
            'episode_id' => 'required|exists:episodes,id',
        ]);

        CharacterEpisode::create([
            'character_id' => $valid['character_id'],
            'episode_id' => $valid['episode_id'],
        ]);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Character $character, $episodeId) {
        $character->episodes()->detach($episodeId);
    }
}
