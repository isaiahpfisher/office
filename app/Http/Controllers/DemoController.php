<?php

namespace App\Http\Controllers;

use App\Models\Affair;
use App\Models\Character;
use App\Models\Episode;
use App\Models\Quote;
use App\Models\Relationship;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;

class DemoController extends Controller {
    public function index() {
        return Inertia::render('demo', [
            'relationships' => Relationship::with(['personOne', 'personTwo'])->latest()->get(),
            'characters' => Character::latest()->get(),
        ]);
    }

    public function allQuotes(): Collection {
        return Quote::all();
    }

    public function view(): array {
        return DB::select('SELECT * FROM quotes_view');
    }

    public function multipleJoins() {
        return Character::with([
            'actor',
            'department',
            'roles',
            'branches',
            'quotes',
            'episodes',
            'thingsSheSaid'
        ])->limit(value: 10)->get();
    }

    public function reportAffair(Request $request) {
        $valid = $request->validate([
            'victim_relationship_id' => 'required|integer|exists:relationships,id',
            'cheater_id' => 'required|integer|exists:characters,id',
            'affair_partner_id' => 'required|integer|exists:characters,id|different:cheater_id',
        ]);

        DB::statement('CALL CreateAffair(?, ?, ?)', [
            $valid['victim_relationship_id'],
            $valid['cheater_id'],
            $valid['affair_partner_id'],
        ]);

        return Affair::latest()->firstOrFail();
    }
}
