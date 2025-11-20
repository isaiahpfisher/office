<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Role extends Model
{
    public function character() : HasOne {
        return $this->hasOne(Character::class);
    }
}
