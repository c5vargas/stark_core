<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
Use Illuminate\Support\Str;

class Media extends Model
{
    use HasFactory;

    protected $fillable = ['uuid', 'filename', 'path', 'mime_type', 'size'];

    protected static function booted()
    {
        static::creating(function ($media) {
            if (!$media->uuid) {
                $media->uuid = (string) Str::uuid();
            }
        });
    }

    // URL pública del archivo
    public function getUrlAttribute(): string
    {
        return asset('storage/' . $this->path);
    }
}
