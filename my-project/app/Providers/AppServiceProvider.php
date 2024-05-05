<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Http\Controllers\Api\V1\TicketAdminController;
use App\Http\Controllers\Api\V1\TicketCustomerController;
use App\Services\TicketAdminService;
use App\Services\TicketCustomerService;
use App\Interfaces\TicketServiceInterface;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->when( TicketAdminController::class )
            ->needs( TicketServiceInterface::class )
            ->give( TicketAdminService::class );

        $this->app->when( TicketCustomerController::class )
            ->needs( TicketServiceInterface::class )
            ->give( TicketCustomerService::class );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
