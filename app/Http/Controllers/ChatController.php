<?php

namespace App\Http\Controllers;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Session;
use function Pest\Laravel\put;

class ChatController extends Controller {
    public function index(): Response {

        return Inertia::render('chat', ['startDialogue' => Session::get('chat')]);
    }

    public function response(Request $request) {
        $question = $request->get('question');
        $request->session()->push('chat' , $question);

        $headers = [
            'x-goog-api-key' => 'AIzaSyDWtmjvefHa5jU-sxOVCgU4qUKAGOf7Nnw',
            'Content-Type' => 'application/json',
        ];

        $originalQuestion = $question;

        $question = 'Please create SQL and only SQL without the markdown based on this database schema
        CREATE TABLE actors (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL
);

CREATE TABLE affairs (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  cheating_id BIGINT UNSIGNED NOT NULL,
  cheated_id BIGINT UNSIGNED NOT NULL,
  UNIQUE (cheating_id, cheated_id),
  FOREIGN KEY (cheated_id) REFERENCES relationships(id) ON DELETE CASCADE,
  FOREIGN KEY (cheating_id) REFERENCES relationships(id) ON DELETE CASCADE
);

CREATE TABLE branch_characters (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  character_id BIGINT UNSIGNED NOT NULL,
  branch_id BIGINT UNSIGNED NOT NULL,
  UNIQUE (character_id, branch_id),
  FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE CASCADE,
  FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE
);

CREATE TABLE branches (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  city VARCHAR(255) NOT NULL
);

CREATE TABLE cache (
  `key` VARCHAR(255) PRIMARY KEY,
  value MEDIUMTEXT NOT NULL,
  expiration INT NOT NULL
);

CREATE TABLE cache_locks (
  `key` VARCHAR(255) PRIMARY KEY,
  owner VARCHAR(255) NOT NULL,
  expiration INT NOT NULL
);

CREATE TABLE character_episodes (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  character_id BIGINT UNSIGNED NOT NULL,
  episode_id BIGINT UNSIGNED NOT NULL,
  UNIQUE (character_id, episode_id),
  FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE,
  FOREIGN KEY (episode_id) REFERENCES episodes(id) ON DELETE CASCADE
);

CREATE TABLE characters (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  actor_id BIGINT UNSIGNED NOT NULL,
  department_id BIGINT UNSIGNED NOT NULL
);

CREATE TABLE cold_opens (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  description VARCHAR(255) NOT NULL,
  episode_id BIGINT UNSIGNED NOT NULL,
  FOREIGN KEY (episode_id) REFERENCES episodes(id) ON DELETE CASCADE
);

CREATE TABLE departments (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL
);

CREATE TABLE episodes (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  summary TEXT NOT NULL,
  air_date DATE NOT NULL,
  season_id BIGINT UNSIGNED NOT NULL,
  FOREIGN KEY (season_id) REFERENCES seasons(id) ON DELETE CASCADE
);

CREATE TABLE failed_jobs (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  uuid VARCHAR(255) NOT NULL UNIQUE,
  connection TEXT NOT NULL,
  queue TEXT NOT NULL,
  payload LONGTEXT NOT NULL,
  exception LONGTEXT NOT NULL,
  failed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE job_batches (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  total_jobs INT NOT NULL,
  pending_jobs INT NOT NULL,
  failed_jobs INT NOT NULL,
  failed_job_ids LONGTEXT NOT NULL,
  options MEDIUMTEXT,
  cancelled_at INT,
  created_at INT NOT NULL,
  finished_at INT
);

CREATE TABLE jobs (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  queue VARCHAR(255) NOT NULL,
  payload LONGTEXT NOT NULL,
  attempts TINYINT UNSIGNED NOT NULL,
  reserved_at INT UNSIGNED,
  available_at INT UNSIGNED NOT NULL,
  created_at INT UNSIGNED NOT NULL
);

CREATE TABLE migrations (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  migration VARCHAR(255) NOT NULL,
  batch INT NOT NULL
);

CREATE TABLE password_reset_tokens (
  email VARCHAR(255) PRIMARY KEY,
  token VARCHAR(255) NOT NULL
);

CREATE TABLE pranks (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  description TEXT NOT NULL,
  episode_id BIGINT UNSIGNED NOT NULL,
  FOREIGN KEY (episode_id) REFERENCES episodes(id) ON DELETE CASCADE
);

CREATE TABLE quotes (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  quote TEXT NOT NULL,
  episode_id BIGINT UNSIGNED NOT NULL,
  character_id BIGINT UNSIGNED NOT NULL,
  FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE,
  FOREIGN KEY (episode_id) REFERENCES episodes(id) ON DELETE CASCADE
);

CREATE VIEW quotes_view AS
  SELECT id, quote FROM quotes;

CREATE TABLE relationships (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  outcome VARCHAR(255) NOT NULL,
  person_one_id BIGINT UNSIGNED NOT NULL,
  person_two_id BIGINT UNSIGNED NOT NULL,
  UNIQUE (person_one_id, person_two_id),
  FOREIGN KEY (person_one_id) REFERENCES characters(id) ON DELETE CASCADE,
  FOREIGN KEY (person_two_id) REFERENCES characters(id) ON DELETE CASCADE
);

CREATE TABLE roles (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  character_id BIGINT UNSIGNED NOT NULL,
  FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE
);

CREATE TABLE seasons (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  number INT NOT NULL UNIQUE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  overview TEXT NOT NULL
);

CREATE TABLE sessions (
  id VARCHAR(255) PRIMARY KEY,
  user_id BIGINT UNSIGNED,
  ip_address VARCHAR(45),
  user_agent TEXT,
  payload LONGTEXT NOT NULL,
  last_activity INT NOT NULL
);

CREATE TABLE thing_she_saids (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  saying TEXT NOT NULL,
  episode_id BIGINT UNSIGNED NOT NULL,
  character_id BIGINT UNSIGNED NOT NULL,
  FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE,
  FOREIGN KEY (episode_id) REFERENCES episodes(id) ON DELETE CASCADE
);

CREATE TABLE users (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  email_verified_at TIMESTAMP NULL,
  password VARCHAR(255) NOT NULL,
  two_factor_secret TEXT,
  two_factor_recovery_codes TEXT,
  two_factor_confirmed_at TIMESTAMP NULL,
  remember_token VARCHAR(100)
);

from this natural language question: ' . $question;


        $data = [
            'contents' => [
                [
                    'parts' => [
                        ['text' => $question]
                    ]
                ]
            ]
        ];
        $response = Http::withHeaders($headers)->post('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent', $data);

        if ($response->successful()) {
            $answer = $response->json()['candidates'][0]['content']['parts'][0]['text'];
            // Process the data
        } else {
            // Handle errors
            $answer = $response->body();
        }
        $request->session()->push('chat' , $answer);


        $question = 'Turn this SQL query result into natural language answer to this question. Only use the data provided here: ' . $originalQuestion . ' ';

        if(str_contains(strtolower($answer), 'select')){

            $result = DB::select($answer);
            foreach($result as $row){
                $question .= json_encode($row) . '\n';
            }
        }
        else if(str_contains(strtolower($answer), 'delete')){

            $result = DB::delete($answer);
            $question .= $result;
        }else if(str_contains(strtolower($answer), 'update')){

            $result = DB::update($answer);
            $question .= $result;

        }

        $data['contents'][0]['parts'][0]['text'] = $question;

        $response = Http::withHeaders($headers)->post('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent', $data);

        if ($response->successful()) {
            $answer = $response->json()['candidates'][0]['content']['parts'][0]['text'];
            // Process the data
        } else {
            // Handle errors
            $answer = $response->body();
        }

        $request->session()->push('chat' , $answer);
        return $request->session()->get('chat');
    }
}
