<?php

namespace App\Repositories\Eloquent;

use App\Models\Media;
use Illuminate\Http\UploadedFile;

class MediaRepository extends BaseRepository
{
    protected $model;

    /**
     * MediaRepository constructor.
     *
     * @param Media $item
     */
    public function __construct(Media $item)
    {
        $this->model = $item;
    }

    public function upload(UploadedFile $file) {
        $path = $file->store('uploads', 'public');

        $media = $this->model->create([
            'filename'  => $file->getClientOriginalName(),
            'path'      => $path,
            'mime_type' => $file->getMimeType(),
            'size'      => $file->getSize(),
        ]);

        return $media;
    }
}
