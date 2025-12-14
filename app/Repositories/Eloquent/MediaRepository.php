<?php

namespace App\Repositories\Eloquent;

use App\Models\Media;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

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

    /**
     * Delete a media file and its physical file from storage
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool
    {
        $media = $this->find($id);

        if (!$media) {
            return false;
        }

        // Delete physical file from storage
        if (Storage::disk('public')->exists($media->path)) {
            Storage::disk('public')->delete($media->path);
        }

        // Delete database record
        return parent::delete($id);
    }
}
