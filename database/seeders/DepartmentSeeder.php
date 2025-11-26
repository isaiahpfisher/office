<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $seasons = [
            [
                'id' => 1,
                'title' => 'Sales',
                'created_at' => '2025-11-26 00:57:00',
                'updated_at' => '2025-11-26 01:29:58',
            ],
            [
                'id' => 2,
                'title' => 'Accounting',
                'created_at' => '2025-11-26 00:57:00',
                'updated_at' => '2025-11-26 01:29:58',
            ],
            [
                'id' => 3,
                'title' => 'Management',
                'created_at' => '2025-11-26 00:57:00',
                'updated_at' => '2025-11-26 01:29:58',
            ],
            [
                'id' => 4,
                'title' => 'Customer Service',
                'created_at' => '2025-11-26 00:57:00',
                'updated_at' => '2025-11-26 01:29:58',
            ],
            [
                'id' => 5,
                'title' => 'Warehouse',
                'created_at' => '2025-11-26 00:57:00',
                'updated_at' => '2025-11-26 01:29:58',
            ],
            [
                'id' => 6,
                'title' => 'Corporate',
                'created_at' => '2025-11-26 00:57:00',
                'updated_at' => '2025-11-26 01:29:58',
            ],
            [
                'id' => 7,
                'title' => 'Reception',
                'created_at' => '2025-11-26 00:57:00',
                'updated_at' => '2025-11-26 01:29:58',
            ],
            [
                'id' => 8,
                'title' => 'Other',
                'created_at' => '2025-11-26 00:57:00',
                'updated_at' => '2025-11-26 01:29:58',
            ]

        ];

        Department::upsert(
            $seasons,
            ['id'],
            ['title', 'created_at', 'updated_at']
        );
    }
}
