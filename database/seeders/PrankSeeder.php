<?php

namespace Database\Seeders;

use App\Models\Prank;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class PrankSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $json = File::get(database_path('data/pranks.json'));
        $pranks = json_decode($json, true);
        Prank::insert($pranks);
    }
}
