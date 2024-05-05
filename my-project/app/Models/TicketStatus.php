<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TicketStatus extends Model
{
    use HasFactory,UsesUuid;
    protected $guarded = [ 'id','created_at','updated_at','deleted_at' ];
    public $incrementing = false;

    public function tickets():HasMany
    {
        return $this->hasMany(Ticket::class);
    }
}
