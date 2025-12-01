<?php

namespace Database\Seeders;

use App\Models\Actor;
use App\Models\Character;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class ActorCharacterSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $json = File::get(database_path('data/actors-characters.json'));
        $data = json_decode($json, true);

        foreach ($data as $item) {

            $actor = Actor::firstOrCreate(
                [
                    'first_name' => $item['actor']['first_name'],
                    'last_name'  => $item['actor']['last_name']
                ]
            );

            Character::firstOrCreate(
                [
                    'first_name' => $item['character']['first_name'],
                    'last_name'  => $item['character']['last_name'],
                ],
                [
                    'actor_id'      => $actor->id,
                    'department_id' => $item['character']['department_id']
                ]
            );
        }
    }
}
