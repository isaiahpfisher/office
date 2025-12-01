<?php

namespace Database\Seeders;

use App\Models\ThingSheSaid;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class ThingSheSaidSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $json = File::get(database_path('data/things-she-said.json'));
        $data = json_decode($json, true);
        ThingSheSaid::insert($data);
    }
}
