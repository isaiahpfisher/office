<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Relationship extends Model
{
    public function personOne() : HasOne {
        return $this->hasMany(Character::class, 'person_one_id');
    }

    public function personTwo() : HasOne {
        return $this->hasMany(Character::class, 'person_two_id');
    }
}
