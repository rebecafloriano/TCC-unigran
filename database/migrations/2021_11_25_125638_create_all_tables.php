<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAllTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('avatar')->default('default.png');
            $table->string('email')->unique();
            $table->string('password'); 
        });

        Schema::create('userfavorites', function (Blueprint $table) {
            $table->id();
            $table->integer('id_user');
            $table->integer('id_doctor');           
        });

        Schema::create('userappointments', function (Blueprint $table) {
            $table->id();
            $table->integer('id_user');
            $table->integer('id_doctor');
            $table->datetime('ap_datetime');            
        });

        Schema::create('doctors', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('avatar')->default('default.png');
            $table->float('stars')->default(0);   
            $table->string('latitude')->nullable();
            $table->string('longitude')->nullable();
        });

        Schema::create('doctorphotos', function (Blueprint $table) {
            $table->id();
            $table->integer('id_doctor');
            $table->string('url');         
        });

        Schema::create('doctorreviews', function (Blueprint $table) {
            $table->id();
            $table->integer('id_doctor');
            $table->float('rate');
        });

        Schema::create('doctorservices', function (Blueprint $table) {
            $table->id();
            $table->integer('id_doctor');
            $table->string('name');
            $table->float('price');   
        });

        Schema::create('doctortestimonials', function (Blueprint $table) {
            $table->id();
            $table->integer('id_doctor');
            $table->string('name');
            $table->float('rate');
            $table->string('body');   
        });

        Schema::create('doctoravailability', function (Blueprint $table) {
            $table->id();
            $table->integer('id_doctor');
            $table->integer('weekday');
            $table->text('hours');   
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
        Schema::dropIfExists('userfavorites');
        Schema::dropIfExists('userappointments');
        Schema::dropIfExists('doctors');
        Schema::dropIfExists('doctorphotos');
        Schema::dropIfExists('doctorreviews');
        Schema::dropIfExists('doctorservices');
        Schema::dropIfExists('doctortestimonials');
        Schema::dropIfExists('doctoravailability');
    }
}
