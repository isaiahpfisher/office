<?php

namespace Database\Seeders;

use App\Models\Season;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class SeasonSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $json = File::get(database_path('data/seasons.json'));
        $seasons = json_decode($json, true);
        Season::insert($seasons);
    }
}
