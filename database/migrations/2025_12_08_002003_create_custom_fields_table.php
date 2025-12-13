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
        Schema::create('custom_fields', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('type'); // text, textarea, select, date, number, email, etc.
            $table->string('label');
            $table->boolean('required')->default(false);
            $table->json('options')->nullable(); // Para campos select, radio, etc.
            $table->integer('order')->default(0);
            $table->timestamps();

            $table->index('order');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('custom_fields');
    }
};
