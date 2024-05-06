<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Interfaces\TicketTypeServiceInterface;
use Illuminate\Http\JsonResponse;

class TicketTypeController extends Controller
{
    protected $ticketTypeService;

    public function __construct(TicketTypeServiceInterface $ticketTypeService)
    {
        $this->ticketTypeService = $ticketTypeService;
    }

    public function index(): JsonResponse
    {
        try {
            $result = $this->ticketTypeService->getAllTypes();

            return response()->json($result['response'],$result['status']);
        } catch (\Throwable $th) {

            return response()->json([
                "message" => $th->getMessage(),

            ], method_exists($th, 'getStatusCode') ? $th->getStatusCode() : 500 );
        }
    }
}
