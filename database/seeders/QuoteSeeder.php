<?php

namespace Database\Seeders;

use App\Models\Quote;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class QuoteSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $json = File::get(database_path('data/quotes.json'));
        $quotes = json_decode($json, true);
        Quote::insert($quotes);
    }
}
