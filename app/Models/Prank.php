<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Prank extends Model
{
    protected $guarded = [];

    public function episode() : HasOne {
        return $this->hasOne(Episode::class);
    }
}
