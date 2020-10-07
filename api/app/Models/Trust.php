<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Trust extends Model
{
    protected $fillable = [
        'id',
        'trusted_by_user_id',
        'user_id',
        'created_at',
        'updated_at'
    ];

    protected $hidden = [
        'id',
        'trusted_by_user_id',
        'created_at',
        'updated_at'
    ];
}
