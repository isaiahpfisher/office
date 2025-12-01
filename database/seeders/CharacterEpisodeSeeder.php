<?php

namespace Database\Seeders;

use App\Models\CharacterEpisode;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class CharacterEpisodeSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $json = File::get(database_path('data/episodes.json'));
        $episodes = json_decode($json, true);

        $pivotData = [];
        $episodeId = 1;

        foreach ($episodes as $episode) {
            $seasonId = $episode['season_id'];

            // --- LOGIC RULES FOR APPEARANCES ---

            // Dwight, Jim, Pam, Stanley, Kevin, Angela, Meredith, Phyllis, Creed, Oscar, Darryl
            $regulars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 16];
            foreach ($regulars as $charId) {
                $pivotData[] = $this->record($charId, $episodeId);
            }

            // Michael Scott
            if ($seasonId < 7 || ($seasonId == 7 && $episode['title'] !== 'The Inner Circle' && $episodeId <= 148)) {
                $pivotData[] = $this->record(14, $episodeId);
            } elseif ($episode['title'] === 'Finale') {
                $pivotData[] = $this->record(14, $episodeId);
            }

            // Ryan Howard & Kelly Kapoor
            if ($seasonId <= 8 || $episode['title'] === 'New Guys' || $episode['title'] === 'Finale') {
                $pivotData[] = $this->record(11, $episodeId);
                $pivotData[] = $this->record(12, $episodeId);
            }

            // Andy Bernard
            if ($episodeId >= 29) {
                $pivotData[] = $this->record(13, $episodeId);
            }

            // Toby Flenderson
            if ($episodeId <= 64 || $episodeId >= 81) {
                $pivotData[] = $this->record(15, $episodeId);
            }

            // 6. Erin Hannon
            if ($episodeId >= 95) {
                $pivotData[] = $this->record(17, $episodeId);
            }

            // // abe Lewis
            if ($episodeId >= 115 && $seasonId <= 8) {
                $pivotData[] = $this->record(18, $episodeId);
            }

            // Jan Levinson
            if ($seasonId <= 4) {
                $pivotData[] = $this->record(19, $episodeId);
            }

            // Roy Anderson
            if ($seasonId <= 3) {
                $pivotData[] = $this->record(22, $episodeId);
            }

            // Karen Filippelli
            if ($seasonId == 3 && $episodeId >= 29 && $episodeId <= 51) {
                $pivotData[] = $this->record(23, $episodeId);
            }

            // Robert California
            if ($seasonId == 8 || $episode['title'] === 'Search Committee') {
                $pivotData[] = $this->record(24, $episodeId);
            }

            // Nellie Bertram
            if (($seasonId == 7 && $episode['title'] === 'Search Committee') || $seasonId >= 8) {
                $pivotData[] = $this->record(21, $episodeId);
            }

            // David Wallace & Bob Vance (Vance Refrigeration)
            if ($episodeId % 5 == 0) {
                $pivotData[] = $this->record(20, $episodeId);
                $pivotData[] = $this->record(25, $episodeId);
            }

            // Holly Flax
            if (
                $episode['title'] === 'Goodbye, Toby' ||
                ($seasonId == 5 && $episodeId <= 77) ||
                ($seasonId == 7 && $episodeId >= 137 && $episodeId <= 148) ||
                $episode['title'] === 'Finale'
            ) {
                $pivotData[] = $this->record(26, $episodeId);
            }

            $episodeId++;
        }

        $chunks = array_chunk($pivotData, 1000);
        foreach ($chunks as $chunk) {
            CharacterEpisode::insert($chunk);
        }
    }

    private function record($charId, $epId) {
        return [
            'character_id' => $charId,
            'episode_id' => $epId,
        ];
    }
}
