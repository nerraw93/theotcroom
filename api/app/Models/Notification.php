<?php

namespace App\Models;

use Illuminate\Notifications\DatabaseNotification;

class Notification extends DatabaseNotification
{
    const CATEGORY_NEW_MESSAGE = 1;
    const CATEGORY_REPLY = 2;
    const CATEGORY_NEW_RESERVATION = 3;

    /**
     * Get user by UUID
     *
     * @param  QueryBuilder $query                              the query builder to use
     * @param  String $uuid                                     the name to look for
     * @return QueryBuilder
     * @author goper
     */
    public function scopeComments($query, $reservationId)
    {
        return $query->where('reservation_id', $reservationId)
            ->whereIn('category', [self::CATEGORY_NEW_MESSAGE, self::CATEGORY_REPLY])->orderBy('created_at');
    }

    /**
     * Get user by UUID
     *
     * @param  QueryBuilder $query                              the query builder to use
     * @param  String $uuid                                     the name to look for
     * @return QueryBuilder
     * @author goper
     */
    public function scopeAllComments($query, $icoId)
    {
        return $query->where('ico_id', $icoId)
            ->whereIn('category', [self::CATEGORY_NEW_MESSAGE, self::CATEGORY_REPLY])->orderBy('created_at');
    }
}
