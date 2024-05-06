<?php
namespace App\Services;

use App\Interfaces\TicketServiceInterface;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpKernel\Exception\HttpException;
use App\Http\Resources\V1\TicketResource;
use Illuminate\Support\Facades\DB;
use App\Models\TicketStatus;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class TicketCustomerService implements TicketServiceInterface {

    protected $tickets;
    protected $user;

    const STATUS_IN_PROGRESS = 'En Proceso';

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

        DB::beginTransaction();
        try {

            $statusInProgress = TicketStatus::where('name', self::STATUS_IN_PROGRESS )->first();

            if (is_null($statusInProgress)) {
                DB::rollBack();
                throw new HttpException(500, 'Error al crear el Ticket.');
            }

            $request['ticket_status_id'] = $statusInProgress->id;
            $this->user->tickets()->create($request);
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
            $ticket = $this->tickets->find($id);

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
