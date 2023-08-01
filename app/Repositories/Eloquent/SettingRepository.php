<?php

namespace App\Repositories\Eloquent;

use App\Models\Setting;
use App\Repositories\SettingRepositoryInterface;

class SettingRepository extends BaseRepository implements SettingRepositoryInterface
{
    protected $model;

    /**
     * SettingRepository constructor.
     *
     * @param Setting $item
     */
    public function __construct(Setting $item)
    {
        $this->model = $item;
    }

    public function updateKey(array $data): bool
    {
        $errored = false;

        foreach($data as $key => $value) {
            $this->model->where('key', $key)->first()->update(['value' => $value]);
        }

        return !$errored;
    }
}
