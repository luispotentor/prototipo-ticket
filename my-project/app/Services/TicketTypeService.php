<?php

namespace App\Services;

use App\Http\Resources\V1\TicketTypeResource;
use App\Interfaces\TicketTypeServiceInterface;
use App\Models\TicketType;
use Symfony\Component\HttpKernel\Exception\HttpException;

class TicketTypeService implements TicketTypeServiceInterface {

    public function getAllTypes():array {

        $ticketTypes = TicketType::all();

        if ( count($ticketTypes) == 0 ) {
            throw new HttpException(404,'No se encontraron Tipos de Tickets.');
        }

        return [
            'response' => [
                'ticket_types' => TicketTypeResource::collection($ticketTypes)
            ],
            'status'   => 200
        ];
    }
}
