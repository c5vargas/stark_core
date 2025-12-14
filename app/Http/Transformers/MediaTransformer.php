<?php

namespace App\Http\Transformers;

use App\Models\Media;
use League\Fractal\TransformerAbstract;

class MediaTransformer extends TransformerAbstract
{
  public function transform(Media $item)
  {
    return [
      'id'         => $item->id,
      'uuid'       => $item->uuid,
      'filename'   => $item->filename,
      'url'        => $item->url,
      'mime'       => $item->mime_type,
      'size'       => $item->size,
      'created_at' => $item->created_at ? $item->created_at->toISOString() : null,
    ];
  }
}
