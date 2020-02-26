<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Member;

class MemberController extends Controller {

    // Set how many items should be displayed per page
    protected $itemsPerPage = 10;
    
    public function filter(Request $request) {
        // Get the params
        $query = '%' . $request->input('query') . '%';
        $page = (int) $request->input('page');
        if ($page == null) {
            $page = 1;
        }

        $members = Member::where('firstname', 'like', $query)
        ->orWhere('surname', 'like', $query)
        ->orWhere('email', 'like', $query);

        // Calculate the number of pages for this search
        $pageCount = ceil($members->count() / $this->itemsPerPage);

        return response()->json(
            array(
                'pageCount' => $pageCount,
                'members' => $members->forPage($page, $this->itemsPerPage)->get()
            )
        );
    }
}