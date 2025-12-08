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
        Schema::table('user_sessions', function (Blueprint $table) {
            $table->unsignedBigInteger('personal_access_token_id')->nullable()->after('user_id');
            $table->foreign('personal_access_token_id')
                ->references('id')
                ->on('personal_access_tokens')
                ->onDelete('cascade');
            $table->index('personal_access_token_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_sessions', function (Blueprint $table) {
            $table->dropForeign(['personal_access_token_id']);
            $table->dropIndex(['personal_access_token_id']);
            $table->dropColumn('personal_access_token_id');
        });
    }
};
