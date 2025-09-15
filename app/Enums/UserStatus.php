<?php

namespace App\Enums;

enum UserStatus: string
{
    case ACTIVE   = 'active';
    case INACTIVE = 'inactive';
    case PENDING  = 'pending';
    case BLOCKED  = 'blocked';

    /**
     * Retorna un array con todos los valores (para validaciones).
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
