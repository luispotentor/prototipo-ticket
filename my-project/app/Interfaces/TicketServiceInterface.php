<?php

namespace App\Interfaces;
use Illuminate\Http\Request;

interface TicketServiceInterface
{
    public function getAllTickets():array;
    public function getTicketById(string $id):array;
    public function createTicket(array $request):array;
    public function updateTicket(string $id, array $request):array;
    public function deleteTicket(string $id):array;
}
