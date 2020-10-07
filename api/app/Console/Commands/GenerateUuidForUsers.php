<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;

class GenerateUuidForUsers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'generate:uuid';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate uuid for users that have no UUID.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $users = User::whereNull('uuid')->orWhere('uuid', '')->get();
        foreach ($users as $user) {
            $user->uuid = str_random('20') . \Carbon\Carbon::now()->timestamp;
            $user->save();
            sleep(1);
        }
    }
}
