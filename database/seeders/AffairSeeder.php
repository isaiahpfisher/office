<?php

namespace Database\Seeders;

use App\Models\Affair;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class AffairSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $json = File::get(database_path('data/affairs.json'));
        $affairs = json_decode($json, true);
        Affair::insert($affairs);
    }
}
