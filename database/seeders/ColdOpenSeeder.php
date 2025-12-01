<?php

namespace Database\Seeders;

use App\Models\ColdOpen;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class ColdOpenSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $json = File::get(database_path('data/cold-opens.json'));
        $coldOpens = json_decode($json, true);
        ColdOpen::insert($coldOpens);
    }
}
