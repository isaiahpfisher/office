<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Affair extends Model {
    protected $guarded = [];

    public function cheating(): BelongsTo {
        return $this->belongsTo(Relationship::class, 'cheating_id');
    }

    public function cheated(): BelongsTo {
        return $this->belongsTo(Relationship::class, 'cheated_id');
    }
}
