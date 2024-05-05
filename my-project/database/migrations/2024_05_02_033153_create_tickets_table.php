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
        Schema::create('tickets', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('ticket_type_id');
            $table->uuid('user_id');
            $table->uuid('ticket_status_id');
            $table->string('title');
            $table->text('description');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('ticket_type_id')->references('id')->on('ticket_types');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('ticket_status_id')->references('id')->on('ticket_statuses');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tickets', function (Blueprint $table) {
            $table->dropForeign(['ticket_type_id']);
            $table->dropForeign(['user_id']);
            $table->dropForeign(['ticket_status_id']);
        });
        Schema::dropIfExists('tickets');
    }
};
