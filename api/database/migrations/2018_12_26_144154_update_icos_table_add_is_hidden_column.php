<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateIcosTableAddIsHiddenColumn extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('icos', function (Blueprint $table) {
            $table->tinyInteger('is_hidden')->default(1)->after('notes');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('icos', function (Blueprint $table) {
            $table->dropColumn('is_hidden');
        });
    }
}
