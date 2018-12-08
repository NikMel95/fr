<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UsersSql extends Model
{
    protected $fillable = ['group_id'];
    public $timestamps = false;
    protected $table = 'users_sql';
}
