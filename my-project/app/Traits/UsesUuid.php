<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait UsesUuid
{
    protected static function bootUsesUuid()
    {
        static::creating(function ($model) {
            $model->{$model->getKeyName()} = (string) Str::uuid();
        });

        // Para evitar que se intente asignar un ID al actualizar
        static::updating(function ($model) {
            unset($model->{$model->getKeyName()});
        });
    }

}
