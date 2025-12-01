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
        $procedure = <<<SQL
            DROP PROCEDURE IF EXISTS CreateAffair;

            CREATE PROCEDURE CreateAffair(
                IN p_victim_rel_id BIGINT,
                IN p_one_id BIGINT,
                IN p_two_id BIGINT
            )
            BEGIN
                DECLARE v_cheating_rel_id BIGINT;

                SELECT id INTO v_cheating_rel_id
                FROM relationships
                WHERE (person_one_id = p_one_id AND person_two_id = p_two_id)
                   OR (person_one_id = p_two_id AND person_two_id = p_one_id)
                LIMIT 1;

                IF v_cheating_rel_id IS NULL THEN
                    INSERT INTO relationships (
                        person_one_id,
                        person_two_id,
                        outcome,
                        created_at,
                        updated_at
                    )
                    VALUES (
                        LEAST(p_one_id, p_two_id),
                        GREATEST(p_one_id, p_two_id),
                        'Affair',
                        NOW(),
                        NOW()
                    );

                    SET v_cheating_rel_id = LAST_INSERT_ID();
                END IF;

                INSERT INTO affairs (cheated_id, cheating_id, created_at, updated_at)
                VALUES (p_victim_rel_id, v_cheating_rel_id, NOW(), NOW());
            END;
        SQL;

        DB::unprepared($procedure);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        DB::unprepared("DROP PROCEDURE IF EXISTS CreateAffair");
    }
};
