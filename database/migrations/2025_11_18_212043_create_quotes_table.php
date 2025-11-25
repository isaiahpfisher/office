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
        Schema::create('quotes', function (Blueprint $table) {
            $table->id();
            $table->text('quote');
            $table->foreignIdFor(Episode::class)->constrained()->onDelete('cascade');
            $table->foreignIdFor(Character::class)->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('quotes');
    }
};
