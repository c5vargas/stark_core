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
     * Get the value attribute, handling JSON decoding.
     */
    public function getValueAttribute($value)
    {
        if ($value === null) {
            return null;
        }
        
        // If already decoded (from cast), return as is
        if (is_array($value)) {
            return $value;
        }
        
        // Try to decode JSON, if fails return as string
        $decoded = json_decode($value, true);
        return json_last_error() === JSON_ERROR_NONE ? $decoded : $value;
    }

    /**
     * Set the value attribute, encoding to JSON.
     * Always encode as JSON since the database column is JSON type.
     */
    public function setValueAttribute($value)
    {
        if ($value === null) {
            $this->attributes['value'] = null;
        } elseif (is_array($value)) {
            $this->attributes['value'] = json_encode($value);
        } else {
            // For scalar values (string, number, boolean), wrap in JSON
            // This ensures MySQL JSON column always receives valid JSON
            $this->attributes['value'] = json_encode($value);
        }
    }
}
