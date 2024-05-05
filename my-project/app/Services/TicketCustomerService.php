<?php
namespace App\Services;

use App\Interfaces\TicketServiceInterface;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpKernel\Exception\HttpException;
use App\Http\Resources\V1\TicketResource;

class TicketCustomerService implements TicketServiceInterface {

    protected $tickets;
    protected $user;

    public function __construct(Auth $auth)
    {
        $this->tickets = $auth::user()->tickets;
        $this->user = $auth::user();
    }
    public function getAllTickets():array
    {

        if ( count($this->tickets) == 0 ){
            throw new HttpException(404,'No se encontraron Tickets.');
        }

        return [
            'response' => [
                'tickets' => TicketResource::collection($this->tickets)
            ],
            'status'   => 200
        ];
    }
    public function getTicketById(string $id):array
    {
        $ticket = $this->tickets->find($id);

        if (is_null($ticket)) {
            throw new HttpException(404, 'Ticket no encontrado.');
        }

        return [
            'response' => [
                'ticket' => new TicketResource($ticket)
            ],
            'status'   => 200
        ];
    }
    public function createTicket(array $request):array
    {

        $ticketResponse = $this->user->tickets()->create($request);

        if (is_null($ticketResponse)) {
            throw new HttpException(500, 'Error al crear el Ticket.');
        }

        return [
            'response' => [
                'message' => 'Ticket creado correctamente.'
            ],
            'status'   => 201
        ];
    }
    public function updateTicket(string $id, array $request): array
    {
        $ticket = $this->tickets->find($id);

        if (is_null($ticket)) {
            throw new HttpException(404, 'Ticket no encontrado.');
        }
        $ticket->update($request);

        return [
            'response' => [
                'message' => 'Ticket actualizado correctamente.'
            ],
            'status'   => 200
        ];
    }
    public function deleteTicket($id):array
    {
        $ticket = $this->tickets->find($id);

        if (is_null($ticket)) {
            throw new HttpException(404, 'Ticket no encontrado.');
        }
        $ticket->delete();
        return [
            'response' => [
                'message' => 'Ticket eliminado correctamente.'
            ],
            'status'   => 204
        ];
    }
}
