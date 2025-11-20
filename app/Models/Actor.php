<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Actor extends Model {
    protected $guarded = [];

    public function characters(): HasMany {
        return $this->hasMany(Character::class);
    }
}
