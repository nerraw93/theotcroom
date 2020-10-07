<?php

use Illuminate\Database\Seeder;
use App\Models\User;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = User::create([
            'username' => 'otcadmin',
            'first_name' => 'admin',
            'last_name' => 'theotc',
            'email' => 'admin@theotcroom.com',
            'password' => bcrypt('secret'),
            'is_email_verified' => 1,
            'is_admin' => 1,
            'is_id_verified' => 1,
        ]);

    }
}
