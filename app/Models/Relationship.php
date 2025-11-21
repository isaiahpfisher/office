<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Relationship extends Model {
    public function personOne(): BelongsTo {
        return $this->belongsTo(Character::class, 'person_one_id');
    }

    public function personTwo(): BelongsTo {
        return $this->belongsTo(Character::class, 'person_two_id');
    }
}
