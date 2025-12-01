<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration {

    /**
     * Determine if the migration should run.
     *
     * @return bool
     */
    public function shouldRun(): bool {
        return app()->environment('production');
    }

    /**
     * Run the migrations.
     */
    public function up(): void {
        DB::statement('CREATE OR REPLACE VIEW quotes_view AS SELECT id, quote FROM quotes');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        DB::statement("DROP VIEW IF EXISTS quotes_view");
    }
};
