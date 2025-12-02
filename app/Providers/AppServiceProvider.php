<?php

namespace App\Providers;

use App\Services\GeminiDatabaseService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider {
    /**
     * Register any application services.
     */
    public function register(): void {
        $this->app->singleton(GeminiDatabaseService::class, function ($app) {
            $apiKey = config('services.gemini.key') ?? env('GEMINI_API_KEY');

            return new GeminiDatabaseService($apiKey);
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void {
        Model::unguard();
    }
}
