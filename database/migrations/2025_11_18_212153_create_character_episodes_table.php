<?php

use App\Models\Character;
use App\Models\Episode;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('character_episodes', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignIdFor(Character::class)->constrained()->onDelete('cascade');
            $table->foreignIdFor(Episode::class)->constrained()->onDelete('cascade');

            $table->unique(['character_id', 'episode_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('character_episodes');
    }
};
