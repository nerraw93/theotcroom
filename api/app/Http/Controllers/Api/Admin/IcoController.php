<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Ico;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class IcoController extends Controller
{
    /**
     * Disable user
     * @param  [type] $id
     * @return response
     */
    public function disable($id)
    {
        $ico = Ico::findOrFail($id);
        $ico->is_visible = false;
        $ico->save();

        return response()->json([
            'message' => 'Order has been disabled.'
        ]);
    }

    /**
     * Enable user
     * @param  [type] $id
     * @return response
     */
    public function enable($id)
    {
        $ico = Ico::findOrFail($id);
        $ico->is_visible = true;
        $ico->save();

        return response()->json([
            'message' => 'Order has been enable.'
        ]);
    }
}
