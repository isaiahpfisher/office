<?php

use App\Models\Relationship;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('affairs', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignIdFor(Relationship::class, 'cheating_id');
            $table->foreignIdFor(Relationship::class, 'cheated_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('affairs');
    }
};
