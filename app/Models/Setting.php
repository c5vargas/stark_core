<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'key', 'value'
    ];

    public function scopeLogo($query)
    {
        return $query->where('key', 'app_logo')->first()->value;
    }

    public function scopeName($query)
    {
        return $query->where('key', 'app_name')->first()->value;
    }

    public function scopeOneSignalAppId($query)
    {
        return $query->where('key', 'onesignal_app_id')->first()->value;
    }

    public function scopeOneSignalApiKey($query)
    {
        return $query->where('key', 'onesignal_api_key')->first()->value;
    }
}
