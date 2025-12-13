<?php

namespace App\Http\Controllers;

use App\Http\Requests\Api\Setting\EmailTestRequest;
use App\Http\Requests\Api\Setting\UpdateRequest;
use App\Http\Transformers\SettingTransformer;
use App\Jobs\SendTestMailJob;
use App\Repositories\Eloquent\SettingRepository;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class SettingController extends Controller
{
    /**
     * @property SettingRepository $repository
     */
    private $repository;

    public function __construct(
        SettingTransformer $transformer,
        SettingRepository $repository,
        Request $request
    ){
        parent::__construct($transformer, $request);
        $this->repository = $repository;
    }

    public function index()
    {
        $items = $this->repository->all();
        return $this->respondWithCollection($items);
    }

    public function update(UpdateRequest $request)
    {
        $data = $request->except(['account_key']);

        // Handle account key file upload
        if ($request->hasFile('account_key')) {
            $file = $request->file('account_key');

            // Validate JSON structure
            $jsonContent = file_get_contents($file->getRealPath());
            $jsonData = json_decode($jsonContent, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new Exception('Invalid JSON file format.', 422);
            }

            // Validate required fields for Google Service Account
            $requiredFields = ['type', 'project_id', 'private_key_id', 'private_key', 'client_email'];
            foreach ($requiredFields as $field) {
                if (!isset($jsonData[$field])) {
                    throw new Exception("Missing required field in JSON: {$field}", 422);
                }
            }

            // Store file in analytics directory
            $directory = 'analytics';
            if (!Storage::exists($directory)) {
                Storage::makeDirectory($directory);
            }

            // Delete old file if exists
            $oldPath = \App\Models\Setting::where('key', 'account_key_path')->first()?->value;
            if ($oldPath && Storage::exists($oldPath)) {
                Storage::delete($oldPath);
            }

            // Store new file
            $path = $file->storeAs($directory, 'service-account-key.json');
            $data['account_key_path'] = $path;
        }

        // Filter out empty values
        $data = array_filter($data, function($value) {
            return $value !== null && $value !== '';
        });

        $updated = $this->repository->updateKey($data);

        if(!$updated)
            throw new Exception(__('messages.controller.common.error_500'), 500);

        return $this->respondWithMessage(__('messages.controller.updated'));
    }

    public function sendTest(EmailTestRequest $request)
    {
        try {
            SendTestMailJob::dispatchSync($request->input('email'));
            return $this->respondWithMessage(__('messages.controller.sent'));
        } catch (\Throwable $th) {
            Log::error($th);
            throw new Exception(__('messages.controller.common.error_500'), 500);
        }
    }
}
