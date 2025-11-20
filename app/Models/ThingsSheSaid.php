<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ThingsSheSaid extends Model
{
    public function character() : HasOne{
        return $this->hasOne(Character::class);
    }

    public function episode() : HasOne {
        return $this->hasOne(Episode::class);
    }
}
