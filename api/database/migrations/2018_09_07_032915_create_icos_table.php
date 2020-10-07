<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIcosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('icos', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('user_id');
            $table->string('type');
            $table->string('name');
            $table->string('symbol');
            $table->string('currency');
            $table->decimal('ico_price_token', 15, 2);
            $table->decimal('selling_price_token', 15, 2);
            $table->decimal('fee', 15, 2);
            $table->string('supply');
            $table->date('token_release_date');
            $table->string('vesting_schedule');
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        Schema::table('icos', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('icos');
    }
}
