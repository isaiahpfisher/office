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
        Schema::create('thing_she_saids', function (Blueprint $table) {
            $table->id();
            $table->text('saying');
            $table->foreignIdFor(Episode::class);
            $table->foreignIdFor(Character::class);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('thing_she_saids');
    }
};
