<?php

namespace App\Http\Controllers;

use App\Http\Requests\Api\User\BulkActionRequest;
use App\Http\Requests\Api\User\CreateRequest;
use App\Http\Requests\Api\User\SyncPermissionsRequest;
use App\Http\Requests\Api\User\SyncRolesRequest;
use App\Http\Requests\Api\User\UpdateRequest;
use App\Http\Transformers\ActivityLogTransformer;
use App\Http\Transformers\UserSessionTransformer;
use App\Http\Transformers\UserTransformer;
use App\Repositories\Eloquent\UserRepository;
use App\Repositories\Eloquent\UserSessionRepository;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use League\Fractal\Resource\Collection;

class UserController extends Controller
{
    /**
     * @property UserRepository $repository
     */
    private $repository;

    /**
     * @property UserSessionRepository $sessionRepository
     */
    private $sessionRepository;

    public function __construct(
        UserTransformer $transformer,
        UserRepository $repository,
        UserSessionRepository $sessionRepository,
        Request $request
    ){
        parent::__construct($transformer, $request);
        $this->repository = $repository;
        $this->sessionRepository = $sessionRepository;
    }

    public function index(Request $request)
    {
        $users = $this->repository->paginate($request->all());
        return $this->respondWithCollection($users);
    }

    public function show(int $id)
    {
        $user = $this->repository->find($id);
        $user->load('customFieldValues.customField');
        return $this->respondWithItem($user);
    }

    public function create(CreateRequest $request)
    {
        $data = $request->validated();
        $user = $this->repository->create($data);
        $user->load('customFieldValues.customField');
        return $this->respondWithItem($user, 201, __('messages.controller.user.created'));
    }

    public function update(UpdateRequest $request)
    {
        $data = $request->validated();
        $userId = $request->input('id');
        $updated = $this->repository->update($data, $userId);

        if(!$updated)
            throw new Exception(__('messages.controller.common.error_500'), 500);

        // Reload the user with custom fields to ensure data is fresh
        $user = $this->repository->find($userId);
        $user->load('customFieldValues.customField');

        return $this->respondWithMessage(__('messages.controller.updated'));
    }

    public function delete($id)
    {
        $deleted = $this->repository->delete($id);

        if(!$deleted)
            throw new Exception(__('messages.controller.common.error_500'), 500);

        return $this->respondWithMessage(__('messages.controller.user.deleted'));
    }

    /**
     * Get user statistics.
     */
    public function statistics()
    {
        $statistics = $this->repository->getStatistics();
        return $this->respondWithArray(['data' => $statistics]);
    }

    /**
     * Bulk actions on users.
     */
    public function bulkAction(BulkActionRequest $request)
    {
        $action = $request->input('action');
        $userIds = $request->input('ids');

        switch ($action) {
            case 'activate':
                $this->repository->bulkUpdate($userIds, ['status' => 'active']);
                break;
            case 'deactivate':
                $this->repository->bulkUpdate($userIds, ['status' => 'inactive']);
                break;
            case 'block':
                $this->repository->bulkUpdate($userIds, ['status' => 'blocked']);
                break;
            case 'delete':
                $this->repository->bulkDelete($userIds);
                break;
        }

        return $this->respondWithMessage(__('messages.controller.user.bulk_action_success'));
    }

    /**
     * Get activity logs for a user.
     */
    public function getActivityLogs(int $id, Request $request)
    {
        $logs = $this->repository->getActivityLogs($id, $request->all());

        // Use ActivityLogTransformer instead of UserTransformer
        $activityLogTransformer = new ActivityLogTransformer();
        $collection = new Collection($logs, $activityLogTransformer);
        $collectionTransformed = $this->fractal->createData($collection)->toArray();

        // Add pagination metadata
        if ($logs instanceof \Illuminate\Pagination\LengthAwarePaginator) {
            $collectionTransformed['meta'] = [
                'pagination' => [
                    'total' => $logs->total(),
                    'count' => $logs->count(),
                    'per_page' => $logs->perPage(),
                    'current_page' => $logs->currentPage(),
                    'total_pages' => $logs->lastPage(),
                ],
            ];
        }

        $data = [
            'results' => $collectionTransformed,
            'status'  => 200
        ];

        return response()->json($data);
    }

    /**
     * Sync roles for a user.
     */
    public function syncRoles(int $id, SyncRolesRequest $request)
    {
        $roleIds = $request->input('role_ids');
        $this->repository->syncRoles($id, $roleIds);
        return $this->respondWithMessage(__('messages.controller.user.roles_synced'));
    }

    /**
     * Sync permissions for a user.
     */
    public function syncPermissions(int $id, SyncPermissionsRequest $request)
    {
        $permissionIds = $request->input('permission_ids');
        $this->repository->syncPermissions($id, $permissionIds);
        return $this->respondWithMessage(__('messages.controller.user.permissions_synced'));
    }

    /**
     * Get sessions for a user.
     */
    public function getSessions(int $id)
    {
        $sessions = $this->repository->getSessions($id);

        // Use UserSessionTransformer instead of UserTransformer
        $sessionTransformer = new UserSessionTransformer();
        $collection = new Collection($sessions, $sessionTransformer);
        $collectionTransformed = $this->fractal->createData($collection)->toArray();

        $data = [
            'results' => $collectionTransformed,
            'status'  => 200
        ];

        return response()->json($data);
    }

    /**
     * Revoke a specific session.
     */
    public function revokeSession(int $id, int $sessionId)
    {
        $this->sessionRepository->revokeSession($sessionId);
        return $this->respondWithMessage(__('messages.controller.user.session_revoked'));
    }

    /**
     * Revoke all sessions for a user.
     */
    public function revokeAllSessions(int $id)
    {
        $this->sessionRepository->revokeAllSessions($id);
        return $this->respondWithMessage(__('messages.controller.user.all_sessions_revoked'));
    }
}
