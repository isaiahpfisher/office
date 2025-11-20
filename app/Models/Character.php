<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Character extends Model
{
    /** @use HasFactory<\Database\Factories\CharacterFactory> */
    use HasFactory;

    protected $guarded = [];

    public function department() : HasOne {
        return $this->hasOne(Department::class);
    }

    public function actor() : HasOne {
        return $this->hasMany(Actor::class);
    }

    public function episodes() : HasMany {
        return $this->hasMany(Episode::class);
    }

    public function relationships() : HasMany {
        return $this->hasMany(Relationship::class);
    }

    public function quotes() : HasMany {
        return $this->hasMany(Quote::class);
    }

    public function things_she_said() : HasMany {
        return $this->hasMany(ThingsSheSaid::class);
    }

    public function roles() : HasMany {
        return $this->hasMany(Role::class);
    }

}
