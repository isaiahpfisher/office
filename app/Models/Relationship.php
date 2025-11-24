<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Relationship extends Model {

    protected $with = ['personOne', 'personTwo'];

    public function personOne(): BelongsTo {
        return $this->belongsTo(Character::class, 'person_one_id');
    }

    public function personTwo(): BelongsTo {
        return $this->belongsTo(Character::class, 'person_two_id');
    }

    public function cheatedRelationships(): HasMany {
        return $this->hasMany(Affair::class,  'cheating_id');
    }

    public function cheatingRelationships(): HasMany {
        return $this->hasMany(Affair::class, 'cheated_id');
    }

    protected function affairs(): Attribute {
        return Attribute::make(
            get: fn() => $this->cheatedRelationships->merge($this->cheatingRelationships)
        );
    }
}
