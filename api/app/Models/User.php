<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use DB;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username',
        'uuid',
        'first_name',
        'last_name',
        'email',
        'bio',
        'password',
        'phone_number',
        'country',
        'profile_picture',
        'telegram_username',
        'website',
        'youtube_video',
        'facebook_profile',
        'linkedin_profile',
        'twitter_profile',
        'last_seen',
        'is_banned',
        'verification_code',
        'is_email_verified',
        'is_admin',
        'is_id_verified',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
        'verification_code',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'full_name'
    ];

    /**
     * Get full name
     * @return string
     */
    public function getFullNameAttribute()
    {
        return "{$this->first_name} {$this->middle_name} {$this->last_name}";
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function icos()
    {
        return $this->hasMany(Ico::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function comments()
    {
        return $this->hasMany(Comment::class)->latest();
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function feedback()
    {
        return $this->hasMany(Feedback::class, 'to_user_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function trusts()
    {
        return $this->hasMany(Trust::class, 'trusted_by_user_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function blocks()
    {
        return $this->hasMany(Block::class, 'blocked_by_user_id');
    }

    /**
     * Scopes
     */

    /**
     * Scope a query to only include banned user.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeBanned($query)
    {
        return $query->where('is_banned', 1);
    }

    /**
     * Scope a query to only inlcude not banned user
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeAllowed($query)
    {
        return $query->where('is_banned', 0);
    }

    /**
     * Get users that are admin
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     * @author goper
     */
    public function scopeAdmin($query)
    {
        return $query->where('is_admin', 1);
    }

    /**
     * Get users
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     * @author goper
     */
    public function scopeUsers($query)
    {
        return $query->where('is_admin', 0);
    }

    /**
     * Find users by full name
     *
     * @param  QueryBuilder $query                              the query builder to use
     * @param  String $name                                     the name to look for
     * @return QueryBuilder
     * @author goper
     */
    public function scopeFindByName($query, $name)
    {
        $name = strtolower($name);
        return $query->where(DB::raw("CONCAT(`first_name`, ' ', `last_name`)"), 'LIKE', '%' . $name . '%')->orWhere("email","like","%$name%");
    }

    /**
     * Get user by UUID
     *
     * @param  QueryBuilder $query                              the query builder to use
     * @param  String $uuid                                     the name to look for
     * @return QueryBuilder
     * @author goper
     */
    public function scopeUuid($query, $uuid)
    {
        return $query->where('uuid', $uuid);
    }
}
