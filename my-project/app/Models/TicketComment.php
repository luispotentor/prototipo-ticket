<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\UsesUuid;

class TicketComment extends Model
{
    use HasFactory,SoftDeletes,UsesUuid;
    protected $guarded = ['id','created_at','updated_at','deleted_at'];
    public $incrementing = false;

    public function ticket():BelongsTo
    {
        return $this->belongsTo(Ticket::class);
    }

    public function user():BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
