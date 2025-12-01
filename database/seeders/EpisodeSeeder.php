<?php

namespace Database\Seeders;

use App\Models\Episode;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class EpisodeSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $json = File::get(database_path('data/episodes.json'));
        $episodes = json_decode($json, true);
        Episode::insert($episodes);
    }
}
