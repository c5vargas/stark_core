<?php

namespace App\Repositories\Eloquent;

use App\Models\Setting;

class SettingRepository extends BaseRepository
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
        try {
            foreach($data as $key => $value) {
                $this->model->updateOrCreate(
                    ['key' => $key],
                    ['value' => $value]
                );
            }

            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
}
