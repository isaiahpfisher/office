<?php

use App\Models\Season;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('episodes', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('title');
            $table->text('summary');
            $table->date('air_date')->index();
            $table->foreignIdFor(Season::class)->constrained()->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('episodes');
    }
};
