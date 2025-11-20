<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Episode extends Model
{
    //
    protected $guarded = [];

    public function season(): HasOne {
        return $this->hasOne(Season::class);
    }

    public function thingsSheSaid() : HasMany {
        return $this->hasMany(ThingsSheSaid::class);

    }

    public function quotes() : HasMany {
        return $this->hasMany(Quote::class);
    }

    public function characters() : HasMany {
        return $this->hasMany(Character::class);
    }

    public function coldOpen() : HasOne {
        return $this->hasOne(ColdOpen::class);
    }

    public function pranks() : HasMany {
        return $this->hasMany(Prank::class);
    }


}
