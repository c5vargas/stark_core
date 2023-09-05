<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->createQuietly([
            'name' => 'Mia Wong',
            'email' => 'user@user.com',
            'password' => 'user'
        ]);

        User::factory()->count(30)->createQuietly();
    }
}
