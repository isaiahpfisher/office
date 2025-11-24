<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Character extends Model {
    /** @use HasFactory<\Database\Factories\CharacterFactory> */
    use HasFactory;

    protected $guarded = [];

    public function department(): HasOne {
        return $this->hasOne(Department::class);
    }

    public function actor(): BelongsTo {
        return $this->belongsTo(Actor::class);
    }

    public function branches(): BelongsToMany {
        return $this->belongsToMany(Branch::class, 'branch_characters');
    }

    public function episodes(): BelongsToMany {
        return $this->belongsToMany(Episode::class, 'character_episodes');
    }

    public function relationshipsOne(): HasMany {
        return $this->hasMany(Relationship::class, 'person_one_id');
    }

    public function relationshipsTwo(): HasMany {
        return $this->hasMany(Relationship::class, 'person_two_id');
    }

    protected function relationships(): Attribute {
        return Attribute::make(
            get: fn() => $this->relationshipsOne->merge($this->relationshipsTwo)
        );
    }

    public function quotes(): HasMany {
        return $this->hasMany(Quote::class);
    }

    public function thingsSheSaid(): HasMany {
        return $this->hasMany(ThingSheSaid::class);
    }

    public function roles(): HasMany {
        return $this->hasMany(Role::class);
    }
}
