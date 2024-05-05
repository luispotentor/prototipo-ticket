<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\UsesUuid;

class TicketType extends Model
{
    use HasFactory,SoftDeletes,UsesUuid;

    protected $guarded = [ 'id','created_at','updated_at','deleted_at' ];
    public $incrementing = false;

    public function tickets():HasMany
    {
        return $this->hasMany(Ticket::class);
    }
}
