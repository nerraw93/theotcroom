<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Broadcast;
use App\Broadcasting\Channel\CustomDbChannel;
use Illuminate\Notifications\Channels\DatabaseChannel;

class BroadcastServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // Inject custom DB channel
        $this->app->instance(DatabaseChannel::class, new CustomDbChannel);

        //** routes
        Broadcast::routes();
        require base_path('routes/channels.php');
    }
}
