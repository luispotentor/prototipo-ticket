<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\V1\TicketTypeResource;
use App\Http\Resources\V1\TicketComments;
use App\Http\Resources\V1\TicketStatusResource;

class TicketResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'title'       => $this->title,
            'description' => $this->description,
            'user'        => array(
                'id'    => $this->user->id,
                'name'  => $this->user->name,
                'email' => $this->user->email,
            ),
            'type'        => new TicketTypeResource($this->ticketType),
            'comments'    => TicketComments::collection($this->comments),
            'status'      => new TicketStatusResource($this->statusTicket),
            'created_at'  => $this->created_at,
            'updated_at'  => $this->updated_at,
        ];
    }
}
