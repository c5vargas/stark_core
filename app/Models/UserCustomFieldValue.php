<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserCustomFieldValue extends Model
{
    protected $fillable = [
        'user_id',
        'custom_field_id',
        'value',
    ];

    protected $casts = [
        'value' => 'array',
    ];

    /**
     * Get the user that owns this value.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the custom field this value belongs to.
     */
    public function customField(): BelongsTo
    {
        return $this->belongsTo(CustomField::class);
    }

    /**
     * Get the value as a string.
     */
    public function getValueAttribute($value)
    {
        if (is_array($value)) {
            return $value;
        }
        return json_decode($value, true) ?? $value;
    }

    /**
     * Set the value attribute.
     */
    public function setValueAttribute($value)
    {
        $this->attributes['value'] = is_array($value) ? json_encode($value) : $value;
    }
}
