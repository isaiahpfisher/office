<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Affair extends Model
{
    protected $guarded = [];

    public function cheating() : HasOne {
        return $this->hasOne(Relationship::class, 'cheating_id');
    }

    public function cheated() : HasOne {
        return $this->hasOne(Relationship::class, 'cheated_id');
    }
}
