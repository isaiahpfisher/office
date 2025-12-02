<?php

namespace Database\Seeders;

use App\Models\Episode;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder {
    /**
     * Seed the application's database.
     */
    public function run(): void {
        // $this->call(IndexSeeder::class);

        $this->call(SeasonSeeder::class);
        $this->call(DepartmentSeeder::class);
        $this->call(ActorCharacterSeeder::class);
        $this->call(RoleSeeder::class);
        $this->call(EpisodeSeeder::class);
        $this->call(ColdOpenSeeder::class);
        $this->call(BranchSeeder::class);
        $this->call(BranchCharacterSeeder::class);
        $this->call(PrankSeeder::class);
        $this->call(QuoteSeeder::class);
        $this->call(ThingSheSaidSeeder::class);
        $this->call(RelationshipSeeder::class);
        $this->call(AffairSeeder::class);
        $this->call(CharacterEpisodeSeeder::class);
    }
}
