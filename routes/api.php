<?php

use Illuminate\Http\Request;
use App\FindController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/findrows/file', 'FindController@index');
Route::get('/findrows/remote', 'FindController@remote');
Route::get('/findrows/files', 'FindController@files');


Route::get('/sql', 'SQLController@index');
Route::post('/sql', 'SQLController@add');
Route::delete('/sql/{id}', 'SQLController@delete');
Route::post('/sql/test', 'SQLController@test');
Route::get('/sql/reset', 'SQLController@reset');
Route::get('/sql/select', 'SQLController@select');
