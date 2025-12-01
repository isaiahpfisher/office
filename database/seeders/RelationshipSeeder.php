<?php

namespace Database\Seeders;

use App\Models\Relationship;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class RelationshipSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $json = File::get(database_path('data/relationships.json'));
        $relationships = json_decode($json, true);
        Relationship::insert($relationships);
    }
}
