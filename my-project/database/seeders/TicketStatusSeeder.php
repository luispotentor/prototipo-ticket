<?php

namespace Database\Seeders;

use App\Models\Ticket;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\TicketStatus;

class TicketStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TicketStatus::create([
            'name' => 'Pendiente',
            'color' => '#FFD700',
        ]);

        TicketStatus::create([
            'name' => 'En Proceso',
            'color' => '#32CD32 ',
        ]);

        TicketStatus::create([
            'name' => 'Finalizado',
            'color' => '#4169E1 ',
        ]);

        TicketStatus::create([
            'name' => 'Eliminado',
            'color' => '#FF4500',
        ]);
    }
}
