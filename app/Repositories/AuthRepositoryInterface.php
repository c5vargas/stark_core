<?php

namespace App\Repositories;

use Illuminate\Http\Request;

interface AuthRepositoryInterface extends EloquentRepositoryInterface {

    public function login(String $email, String $password): Array|Bool;

    public function updateUserProfile(Array $data): Bool;

    public function resetPassword(Request $request): Bool;

    public function forgetPassword(Array $data): ?Array;
}

