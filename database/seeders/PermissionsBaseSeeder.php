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
        Permission::create(['name' => 'edit.users', 'descr' => 'Allows user editing.']);
        Permission::create(['name' => 'delete.users', 'descr' => 'Permits user deletion.']);
        Permission::create(['name' => 'create.users', 'descr' => 'Enables user creation.']);
        Permission::create(['name' => 'view.users', 'descr' => 'Grants access to view user list.']);

        // Settings
        Permission::create(['name' => 'edit.settings', 'descr' => 'Allows editing application settings.']);
        Permission::create(['name' => 'view.settings', 'descr' => 'Permits viewing application settings.']);

        // Dashboard
        Permission::create(['name' => 'view.dashboard', 'descr' => 'Provides access to the application dashboard.']);


        $root->syncPermissions([
            'view.users',
            'create.users',
            'edit.users',
            'delete.users',
            'view.dashboard',
            'view.settings',
            'edit.settings',
        ]);

        $editor->syncPermissions([
            'view.users',
            'create.users',
            'edit.users',
            'delete.users',
            'view.dashboard',
        ]);

        $userRoot = User::factory()->createQuietly([
            'name' => 'John Doe',
            'email' => 'admin@admin.com',
            'password' => 'admin'
        ]);

        $userEditor = User::factory()->createQuietly([
            'name' => 'Stiven Or',
            'email' => 'editor@editor.com',
            'password' => 'editor'
        ]);

        $userRoot->syncRoles([$root]);
        $userEditor->syncRoles([$editor]);
    }
}
