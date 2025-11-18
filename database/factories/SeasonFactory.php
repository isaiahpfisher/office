<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Season>
 */
class SeasonFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        return [
            'number' => fake()->unique()->randomElement([1, 2, 3, 4, 5, 6, 7, 8, 9]),
            'start_date' => fake()->date(),
            'end_date' => fake()->date(),
            'overview' => fake()->paragraph()
        ];
    }
}
