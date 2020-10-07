<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('username')->nullable()->unique();
            $table->string('first_name');
            $table->string('middle_name')->nullable();
            $table->string('last_name');
            $table->string('email')->unique();
            $table->string('password');
            $table->text('bio')->nullable();
            $table->string('country')->nullable();;
            $table->string('phone_number')->nullable();
            $table->string('profile_picture')->nullable();
            $table->string('website')->nullable();
            $table->string('youtube_video')->nullable();
            $table->string('telegram_username')->nullable();
            $table->string('facebook_profile')->nullable();
            $table->string('linkedin_profile')->nullable();
            $table->string('twitter_profile')->nullable();
            $table->integer('is_email_verified')->nullable()->default(0);
            $table->integer('is_phone_verified')->nullable()->default(0);
            $table->integer('is_id_verified')->nullable()->default(0);
            $table->dateTime('last_seen')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
