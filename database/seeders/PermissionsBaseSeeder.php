<?php

namespace Database\Seeders;

use App\Models\User;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;
use Illuminate\Database\Seeder;

class PermissionsBaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // All Application Roles default
        $root = Role::create(['name' => 'root']);
        $editor = Role::create(['name' => 'editor']);
        $member = Role::create(['name' => 'member']);
        $trial = Role::create(['name' => 'trial']);
        $guest = Role::create(['name' => 'guest']);

        // Users
        Permission::create(['name' => 'edit.users']);
        Permission::create(['name' => 'delete.users']);
        Permission::create(['name' => 'create.users']);
        Permission::create(['name' => 'view.users']);

        // Settings
        Permission::create(['name' => 'edit.settings']);
        Permission::create(['name' => 'view.settings']);

        // Dashboard
        Permission::create(['name' => 'view.dashboard']);


        $root->syncPermissions([
            'create.users',
            'delete.users',
            'edit.settings',
            'edit.users',
            'view.dashboard',
            'view.settings',
            'view.users',
        ]);

        $user = User::factory()->createQuietly([
            'name' => 'John Doe',
            'email' => 'admin@admin.com',
            'password' => 'admin'
        ]);
        $user->syncRoles([$root]);
    }
}
