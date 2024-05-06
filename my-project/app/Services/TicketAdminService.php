<?php

namespace App\Services;
use App\Interfaces\TicketServiceInterface;
use App\Models\User;
use App\Models\Ticket;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\V1\TicketResource;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class TicketAdminService implements TicketServiceInterface
{
    protected $auth;

    public function __construct(Auth $auth)
    {
        $this->auth = $auth;;
    }

    public function getAllTickets():array
    {
        $tickets = Ticket::all();

        if (count($tickets) == 0) {
            throw new HttpException(404,'No se encontraron Tickets.');
        }

        return [
            'response' => [
                'tickets' => TicketResource::collection($tickets)
            ],
            'status'   => 200
        ];
    }
    public function getTicketById(string $id):array
    {
        $ticket = Ticket::find($id);

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
        DB::beginTransaction();

        try {

            Ticket::create($request);
            DB::commit();

            return [
                'response' => [
                    'message' => 'Ticket creado correctamente.'
                ],
                'status'   => 201
            ];
        } catch (\Throwable $th) {
            DB::rollBack();
            throw new HttpException(500, 'Error al crear el Ticket.');
        }


    }
    public function updateTicket(string $id, array $request): array
    {
        DB::beginTransaction();

        try {
            $ticket = Ticket::find($id);

            if (is_null($ticket)) {

                throw new ModelNotFoundException('Ticket no encontrado.');
            }

            $ticket->update($request);
            DB::commit();
            return [
                'response' => [
                    'message' => 'Ticket actualizado correctamente.'
                ],
                'status'   => 200
            ];
        } catch (ModelNotFoundException $e) {

            return [
                'response' => [
                    'message' => $e->getMessage()
                ],
                'status'   => 404
            ];
        } catch (\Throwable $th) {
            DB::rollBack();
            throw new HttpException(500, 'Error al actualizar el Ticket.');
        }

    }
    public function deleteTicket($id):array
    {
        $ticket = Ticket::find($id);

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
