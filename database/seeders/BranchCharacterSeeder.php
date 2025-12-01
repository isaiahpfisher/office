<?php

namespace Database\Seeders;

use App\Models\BranchCharacter;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class BranchCharacterSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $json = File::get(database_path('data/branch-characters.json'));
        $data = json_decode($json, true);
        BranchCharacter::insert($data);
    }
}
