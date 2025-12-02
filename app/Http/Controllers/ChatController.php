<?php

namespace App\Http\Controllers;

use App\Services\GeminiDatabaseService;
use Illuminate\Http\Request;
use Illuminate\Support\Str; // Import Str for UUIDs
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Session;

class ChatController extends Controller {
    public function index(): Response {
        return Inertia::render('chat', [
            'messages' => Session::get('history', [])
        ]);
    }

    public function question(Request $request, GeminiDatabaseService $geminiService) {
        $request->validate(['question' => 'required|string']);

        $question = $request->get('question');

        $userMessage = [
            'id' => (string) Str::uuid(),
            'role' => 'user',
            'content' => $question,
            'created_at' => now()->toIso8601String(),
        ];
        $request->session()->push('history', $userMessage);

        $result = $geminiService->ask($question);

        $aiMessage = [
            'id' => (string) Str::uuid(),
            'role' => 'assistant',
            'content' => $result['answer'],
            'sql' => $result['sql'],
            'created_at' => now()->toIso8601String(),
        ];
        $request->session()->push('history', $aiMessage);

        return $request->session()->get('history');
    }

    public function destroy(Request $request) {
        $request->session()->forget('history');
        $request->session()->invalidate();
        return redirect()->back();
    }
}
