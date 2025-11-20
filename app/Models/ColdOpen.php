<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ColdOpen extends Model {
    public function episode(): BelongsTo {
        return $this->belongsTo(Episode::class);
    }
}
