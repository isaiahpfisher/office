<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Quote extends Model
{
    protected $guarded = [];

    public function episode() : HasOne {
        return $this->hasOne(Episode::class);
    }

    public function character() : HasOne {
        return $this->hasOne(Character::class);
    }
}
