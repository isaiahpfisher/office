<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Actor extends Model
{
    protected $guarded = [];

    public function character() : HasOne {
        return $this->hasOne(Character::class);
    }
}
