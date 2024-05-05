<?php

namespace Database\Seeders;

use App\Http\Resources\V1\Admin;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(RoleSeeder::class);
        User::factory(10)->create();
        $this->call(TicketTypeSeeder::class);
        $this->call(TicketStatusSeeder::class);
        $this->call(TicketSeeder::class);

    }
}
