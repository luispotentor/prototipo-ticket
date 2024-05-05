<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Role extends Model
{
    use HasFactory,SoftDeletes,UsesUuid;

    protected $fillable = ['name'];
    public $incrementing = false;

    public function users():HasMany
    {
        return $this->hasMany(User::class);
    }
}
