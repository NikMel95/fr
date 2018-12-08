<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\UsersSql;
use DB;
use Validator;


class SQLController extends Controller
{
	public function index() {
		return UsersSql::get();
	}

	public function reset() {
		UsersSql::truncate();
	}

	public function add(Request $request, Response $response) {
		$input = $request->all();
		$validate_data = Validator::make($input, [
        	'group_id'=>'required|numeric',
      	]);
      	if($validate_data->fails()) {
      		return response()->json([
		    	'error' => $validate_data->errors()
			], 400);
      	}
      	return response()->json([
		    'data' => UsersSql::create($input)
		], 201);
	}

	public function delete(Request $request, Response $response) {
		return UsersSql::where('id', $request->id)->delete();
	}

	public function test() {
		$data = [
		    ['group_id' => 1],
		    ['group_id' => 1],
		    ['group_id' => 1],
		    ['group_id' => 2],
		    ['group_id' => 1],
		    ['group_id' => 3],
		];
		foreach ($data as $key) {
			UsersSql::create($key);
		}
		return response()->json([
		    'data' => UsersSql::get()
		], 201);
	}

    public function select() {
    	return DB::select("SELECT min(id) AS min_id, group_id, count(*)
							FROM ( 
							    SELECT id , group_id 
							    , id - row_number() OVER (PARTITION BY group_id ORDER BY id) AS col
							    FROM users_sql
						    ) p 
							GROUP BY group_id, col
							ORDER BY min_id;"
						);
    }
}
