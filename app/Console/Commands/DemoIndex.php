<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;

class DemoIndex extends Command {
    // Added {value?} as an optional argument at the end
    protected $signature = 'demo:index
                            {model : The class name of the model (e.g. Episode)}
                            {column : The column to test (e.g. title)}
                            {value? : (Optional) The specific value to search for}';

    protected $description = 'Demonstrate the performance difference of a DB index';

    public function handle() {
        $modelClass = "App\\Models\\" . $this->argument('model');
        $column = $this->argument('column');
        $explicitValue = $this->argument('value');

        // Check if model exists
        if (!class_exists($modelClass)) {
            $this->error("Model {$modelClass} not found.");
            return;
        }

        $model = new $modelClass;
        $table = $model->getTable();

        // 1. Setup: Determine what value to search for
        $this->info("1. Setup: Preparing search target...");

        if ($explicitValue) {
            $value = $explicitValue;
            $this->line("   Using user-provided value: '{$value}'");
        } else {
            // Default to finding the last record (Worst Case Scenario)
            $targetRecord = $modelClass::latest('id')->first();

            if (!$targetRecord) {
                $this->error("Table is empty. Please seed fake data first.");
                return;
            }
            $value = $targetRecord->{$column};
            $this->line("   Auto-detected target (last record): '{$value}'");
        }
        $this->newLine();

        // 2. Slow Query
        $this->info("2. Measuring SLOW query (No Index)...");

        // Safely drop index if it exists (wrap in try-catch to avoid error if missing)
        try {
            Schema::table($table, function (Blueprint $t) use ($column) {
                $t->dropIndex([$column]);
            });
        } catch (\Exception $e) {
            // Index didn't exist, carry on.
        }

        $start = microtime(true);
        $count = $modelClass::where($column, $value)->count();
        $slowTime = microtime(true) - $start;

        $this->info("   Time: " . number_format($slowTime, 6) . " seconds (Found: $count records)");
        $this->newLine();

        // 3. Add Index
        $this->info("3. Building Index on '$column' (this takes a moment)...");
        Schema::table($table, function (Blueprint $t) use ($column) {
            $t->index($column);
        });
        $this->line("   Index created.");
        $this->newLine();

        // 4. Fast Query
        $this->info("4. Measuring FAST query (With Index)...");
        $start = microtime(true);
        $count = $modelClass::where($column, $value)->count();
        $fastTime = microtime(true) - $start;

        $this->info("   Time: " . number_format($fastTime, 6) . " seconds (Found: $count records)");
        $this->newLine();

        // 5. Cleanup
        $this->comment("5. Cleaning up (Removing index)...");
        Schema::table($table, function (Blueprint $t) use ($column) {
            $t->dropIndex([$column]);
        });

        // Summary
        $improvement = $slowTime / ($fastTime ?: 0.000001); // avoid div by zero
        $this->newLine();
        $this->alert("RESULT: The query is " . number_format($improvement, 0) . "x faster.");
    }
}
