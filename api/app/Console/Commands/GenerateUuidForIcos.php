<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Ico;

class GenerateUuidForIcos extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'generate:uuidIcos';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate uuid for icos that have no UUID.';

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
        $icos = Ico::whereNull('uuid')->orWhere('uuid', '')->get();
        foreach ($icos as $ico) {
            $ico->uuid = str_random('5') . \Carbon\Carbon::now()->timestamp;
            $ico->save();
            sleep(1);
        }
    }
}
