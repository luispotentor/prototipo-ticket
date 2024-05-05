<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Interfaces\TicketServiceInterface;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\V1\ChangeStatusRequest;
use App\Http\Requests\V1\CreateTicketAdminRequest;
use App\Http\Requests\V1\UpdateTicketAdminRequest;

class TicketAdminController extends Controller
{
    protected $ticketService;

    public function __construct( TicketServiceInterface $ticketService )
    {
        $this->ticketService = $ticketService;
    }

    public function index() : JsonResponse
    {
        try {
            $result = $this->ticketService->getAllTickets();

            return response()->json($result['response'],$result['status']);
        } catch (\Throwable $th) {

            return response()->json([
                "message" => $th->getMessage()

            ], $th->getStatusCode() ?? 500);
        }

    }

    public function show(string $ticketId) : JsonResponse
    {
        try {
            $result = $this->ticketService->getTicketById($ticketId);

            return response()->json($result['response'], $result['status']);
        } catch (\Throwable $th) {

            return response()->json([
                "message" => $th->getMessage()

            ], $th->getStatusCode() ?? 500);
        }

    }

    public function store(CreateTicketAdminRequest $request) : JsonResponse
    {
        try {
            $result = $this->ticketService->createTicket($request->validated());

            return response()->json($result['response'], $result['status']);

        } catch (\Throwable $th) {

            return response()->json([
                "message" => $th->getMessage()

            ], method_exists($th, 'getStatusCode') ? $th->getStatusCode() : 500 );
        }
    }

    public function update(UpdateTicketAdminRequest $request, string $ticketId) : JsonResponse
    {
        try {

            $result = $this->ticketService->updateTicket($ticketId, $request->validated() );

            return response()->json($result['response'], $result['status']);
        } catch (\Throwable $th) {

            return response()->json([
                "message" => $th->getMessage()

            ], $th->getStatusCode() ?? 500);
        }

    }

    public function updateStatus(ChangeStatusRequest $request, string $ticketId) : JsonResponse
    {
        try {
            //code...
        } catch (\Throwable $th) {

            return response()->json([
                "message" => $th->getMessage()

            ], $th->getStatusCode() ?? 500);
        }
        $result = $this->ticketService->updateTicket($ticketId, $request->validated());

        return response()->json($result['response'], $result['status']);
    }

    public function destroy(string $ticketId) : JsonResponse
    {
        try {

            $result = $this->ticketService->deleteTicket($ticketId);

            return response()->json($result['response'], $result['status']);
        } catch (\Throwable $th) {

            return response()->json([
                "message" => $th->getMessage()

            ], $th->getStatusCode() ?? 500);
        }

    }
}
