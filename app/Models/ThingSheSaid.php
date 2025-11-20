<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ThingSheSaid extends Model {
    public function character(): BelongsTo {
        return $this->belongsTo(Character::class);
    }

    public function episode(): BelongsTo {
        return $this->belongsTo(Episode::class);
    }
}
