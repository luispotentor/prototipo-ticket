<?php

namespace App\Models;

use App\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Ticket extends Model
{
    use HasFactory,SoftDeletes,UsesUuid;

    public $incrementing = false;

    protected $fillable = [
        'ticket_type_id',
        'user_id',
        'title',
        'description',
        'ticket_status_id',
    ];


    public function ticketType(): BelongsTo
    {
        return $this->belongsTo(TicketType::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function comments():HasMany
    {
        return $this->hasMany(TicketComment::class);
    }

    public function statusLogs():HasMany
    {
        return $this->hasMany(TicketStatusLog::class);
    }

    public function statusTicket(): BelongsTo
    {
        return $this->belongsTo(TicketStatus::class,'ticket_status_id');
    }

}
