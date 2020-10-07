<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Ico extends Model
{
    use SoftDeletes;
    
    const STATUS_OPEN = 'open';
    const STATUS_CLOSED = 'closed';
    const STATUS_SOLD_OUT = 'sold out';


    protected $fillable = [
        'uuid',
        'user_id',
        'type',
        'name',
        'symbol',
        'currency',
        'ico_price_token',
        'selling_price_token',
        'fee',
        'supply',
        'token_release_date',
        'vesting_schedule',
        'notes',
        'is_visible', // Enable / Disable
        'status',
        'deleted_at',
    ];

    protected $hidden = [];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }

    /**
     * Scope a query to only include hidden icos.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeHidden($query)
    {
        return $query->where('is_visible', 0);
    }

    /**
     * Scope a query to only include show icos.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeShow($query)
    {
        return $query->where('is_visible', 1);
    }

    /**
     * Icos which are sell type
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSell($query)
    {
        return $query->where('type', 'sell');
    }

    /**
     * Icos which are buy type
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeBuy($query)
    {
        return $query->where('type', 'buy');
    }

    /**
     * Search
     *
     * @param  QueryBuilder $query                              the query builder to use
     * @param  String $name                                     the name to look for
     * @return QueryBuilder
     * @author goper
     */
    public function scopeSearch($query, $name)
    {
        $name = strtolower($name);
        return $query->where('name', 'LIKE', '%' . $name . '%')->orWhere("symbol", "like", "%$name%");
    }

    /**
     * Get ICO using `uuid`
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeUuid($query, $id)
    {
        return $query->where('uuid', $id);
    }
}
