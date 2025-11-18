<?php

namespace Database\Seeders;

use App\Models\Character;
use App\Models\Department;
use App\Models\Season;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder {
    /**
     * Seed the application's database.
     */
    public function run(): void {
        // User::factory(10)->create();

        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );

        Department::factory(10)->create();
        Character::factory(300)->create();
        Season::factory(9)->create();
    }
}
