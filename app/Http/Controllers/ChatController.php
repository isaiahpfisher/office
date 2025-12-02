<?php

namespace App\Http\Controllers;

use App\Services\GeminiDatabaseService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
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

        $history = Session::get('history', []);
        $history[] = $userMessage;

        Session::put('history', $history);

        $result = $geminiService->ask($question, $history);

        $aiMessage = [
            'id' => (string) Str::uuid(),
            'role' => 'assistant',
            'content' => $result['answer'],
            'sql' => $result['sql'] ?: null,
            'created_at' => now()->toIso8601String(),
        ];

        $history[] = $aiMessage;
        Session::put('history', $history);

        return $history;
    }

    public function destroy(Request $request) {
        Session::forget('history');
        return redirect()->back();
    }
}
