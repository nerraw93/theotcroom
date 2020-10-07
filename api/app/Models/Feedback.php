<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    protected $table = "feedbacks";

    protected $fillable = [
        'from_user_id',
        'to_user_id',
        'message'
    ];

    protected $hidden = [
        'to_user_id',
        'from_user_id'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function fromUser() {
        return $this->belongsTo(User::class, 'from_user_id', 'id');
    }
}
