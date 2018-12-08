<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use FindRows\FindRows;

class FindController extends Controller
{
    public function index(Request $request) {
    	$path = base_path().'/lib_test/';
    	try {
    		if($request->hash) {
    			$fr = new  FindRows($path.'/files', $path.'fr.yml', true, $request->hash);
    		} else {
    			$fr = new  FindRows($path.'/files', $path.'fr.yml');
    		}
    		$rows = $fr->toFindRows($request->file, $request->str);
        	return response()->json([
		    	'data' => $rows
			], 200);
    	} catch(\Exception $e) {
    		return response()->json([
		    	'error' => $e->getMessage()
			], 404);
    	}
    }

    public function files() {
    	$path = base_path().'/lib_test/';
    	try {	
    		$fr = new  FindRows($path.'/files', $path.'fr.yml');
	    	$files = $fr->getFiles();
	    	return response()->json([
			    'data' => $files
			], 200);
    	} catch(\Exception $e) {
    		return response()->json([
		    	'error' => $e->getMessage()
			], 404);
    	}
    }

    public function remote(Request $request) {
    	$path = base_path().'/lib_test/';
    	try {	
    		if($request->hash) {
    			$fr = new  FindRows($path.'/files', $path.'fr.yml', true, $request->hash);
    		} else {
    			$fr = new  FindRows($path.'/files', $path.'fr.yml');
    		}
	    	$files = $fr->toFindRowsRemote($request->url, $request->str);
	    	return response()->json([
			    'data' => $files
			], 200);
		} catch(\Exception $e) {
    		return response()->json([
		    	'error' => $e->getMessage()
			], 404);
    	}
    }
}
