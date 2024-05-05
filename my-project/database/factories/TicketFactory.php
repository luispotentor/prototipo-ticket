<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\TicketStatus;
use App\Models\TicketType;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ticket>
 */
class TicketFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $customer = User::whereHas('role', function($q){
            $q->where('name', 'Customer');
        })->inRandomOrder()->first();

        $ticketStatus = TicketStatus::inRandomOrder()->first();
        $ticketType = TicketType::inRandomOrder()->first();


        return [
            'ticket_type_id' => $ticketType->id,
            'user_id'    => $customer->id ,
            'title' => fake()->sentence(3),
            'description' => fake()->paragraph,
            'ticket_status_id' => $ticketStatus->id,
        ];
    }
}
