<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Branch extends Model {
    protected $guarded = [];

    public function characters(): BelongsToMany {
        return $this->belongsToMany(Character::class, 'branch_characters');
    }
}
