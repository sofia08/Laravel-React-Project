<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Member;

class MemberController extends Controller {
    
    public function filter(Request $request) {
        $query = '%' . $request->input('query') . '%';
        return response()->json(
            Member::where('firstname', 'like', $query)
                ->orWhere('surname', 'like', $query)
                ->orWhere('email', 'like', $query)
                ->take(10)->get()
        );
    }
}