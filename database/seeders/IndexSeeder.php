<?php

namespace Database\Seeders;

use App\Models\Episode;
use Illuminate\Database\Seeder;

class IndexSeeder extends Seeder {
    /**
     * Seed the application's database.
     */
    public function run(): void {
        $this->call(SeasonSeeder::class);

        $rows = 1000000;
        $range = range(1, $rows);
        $chunkSize = 1000;

        foreach (array_chunk($range, $chunkSize) as $chunk) {
            $episodes = array();

            foreach ($chunk as $i) {
                $episodes[] = array(
                    'title' => fake()->words(3, true),
                    'summary' => fake()->paragraph(),
                    'air_date' => fake()->date(),
                    'season_id' => fake()->randomElement([1, 2, 3, 4, 5, 6, 7, 8, 9]),
                );
            }

            Episode::insert($episodes);
        }

        Episode::insert([
            'title' => 'Needle',
            'summary' => 'The specific episode we are looking for.',
            'air_date' => '2025-12-02',
            'season_id' => 1,
        ]);
    }
}
