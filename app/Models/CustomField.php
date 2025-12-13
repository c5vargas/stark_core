<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CustomField extends Model
{
    protected $fillable = [
        'name',
        'type',
        'label',
        'required',
        'options',
        'order',
    ];

    protected $casts = [
        'required' => 'boolean',
        'options' => 'array',
        'order' => 'integer',
    ];

    /**
     * Get the users that have values for this custom field.
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_custom_field_values')
            ->withPivot('value')
            ->withTimestamps();
    }

    /**
     * Get all values for this custom field.
     */
    public function values(): HasMany
    {
        return $this->hasMany(UserCustomFieldValue::class);
    }

    /**
     * Validate value based on field type.
     */
    public function validateValue($value): bool
    {
        if ($this->required && empty($value)) {
            return false;
        }

        switch ($this->type) {
            case 'email':
                return filter_var($value, FILTER_VALIDATE_EMAIL) !== false;
            case 'number':
                return is_numeric($value);
            case 'date':
                return strtotime($value) !== false;
            case 'select':
                return in_array($value, $this->options ?? []);
            default:
                return true;
        }
    }
}
