<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\TicketType;

class TicketTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TicketType::create([
            'name' => 'General',
        ]);

        TicketType::create([
            'name' => 'Incidente',
        ]);

        TicketType::create([
            'name' => 'Operativo',
        ]);

        TicketType::create([
            'name' => 'Operativo',
        ]);
    }
}
