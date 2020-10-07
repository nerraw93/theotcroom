<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OpeningHour extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'advertisement_id',
        'sun_open',
        'sun_close',
        'mon_open',
        'mon_close',
        'tue_open',
        'tue_close',
        'wed_open',
        'wed_close',
        'thu_open',
        'thu_close',
        'fri_open',
        'fri_close',
        'sat_open',
        'sat_close',
    ];
}
