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
            'color' => 'yellow',
        ]);

        TicketStatus::create([
            'name' => 'En Proceso',
            'color' => 'green',
        ]);

        TicketStatus::create([
            'name' => 'Finalizado',
            'color' => 'blue',
        ]);

        TicketStatus::create([
            'name' => 'Eliminado',
            'color' => 'red',
        ]);
    }
}
