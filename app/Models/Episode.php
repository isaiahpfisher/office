<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Episode extends Model {
    //
    protected $guarded = [];

    public function season(): BelongsTo {
        return $this->belongsTo(Season::class);
    }

    public function thingsSheSaid(): HasMany {
        return $this->hasMany(ThingSheSaid::class);
    }

    public function quotes(): HasMany {
        return $this->hasMany(Quote::class);
    }

    public function characters(): HasMany {
        return $this->hasMany(Character::class);
    }

    public function coldOpen(): HasOne {
        return $this->hasOne(ColdOpen::class);
    }

    public function pranks(): HasMany {
        return $this->hasMany(Prank::class);
    }
}
