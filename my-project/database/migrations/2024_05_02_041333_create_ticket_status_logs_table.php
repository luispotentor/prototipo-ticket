<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ticket_status_logs', function (Blueprint $table) {
            $table->uuid('id')->primary()->uniqid;
            $table->uuid('ticket_id');
            $table->uuid('user_id');
            $table->uuid('ticket_status_id');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('ticket_id')->references('id')->on('tickets');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('ticket_status_id')->references('id')->on('ticket_statuses');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ticket_status_logs', function (Blueprint $table) {
            $table->dropForeign(['ticket_id']);
            $table->dropForeign(['user_id']);
            $table->dropForeign(['ticket_status_id']);
        });

        Schema::dropIfExists('ticket_status_logs');
    }
};
