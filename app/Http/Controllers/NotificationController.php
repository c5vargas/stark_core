<?php

namespace App\Http\Controllers;

use App\Http\Transformers\NotificationTransformer;
use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;

class NotificationController extends Controller
{
    public function __construct(
        NotificationTransformer $transformer,
        Request $request
    ) {
        parent::__construct($transformer, $request);
    }

    /**
     * Get all notifications for the authenticated user.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        $query = $user->notifications();
        
        if ($request->has('unread')) {
            if ($request->boolean('unread')) {
                $query->whereNull('read_at');
            } else {
                $query->whereNotNull('read_at');
            }
        }
        
        $perPage = $request->get('perPage', 15);
        $page = $request->get('page', 1);
        
        $notifications = $query->orderBy('created_at', 'desc')
            ->skip(($page - 1) * $perPage)
            ->take($perPage)
            ->get();

        return $this->respondWithCollection($notifications);
    }

    /**
     * Get unread notifications count.
     */
    public function unreadCount(Request $request)
    {
        $user = $request->user();
        $count = $user->unreadNotifications()->count();

        return $this->respondWithArray([
            'count' => $count,
        ]);
    }

    /**
     * Mark notification as read.
     */
    public function markAsRead(Request $request, string $id)
    {
        $user = $request->user();
        $notification = $user->notifications()->findOrFail($id);
        $notification->markAsRead();

        return $this->respondWithMessage('Notification marked as read');
    }

    /**
     * Mark all notifications as read.
     */
    public function markAllAsRead(Request $request)
    {
        $user = $request->user();
        $user->unreadNotifications->markAsRead();

        return $this->respondWithMessage('All notifications marked as read');
    }

    /**
     * Delete a notification.
     */
    public function delete(Request $request, string $id)
    {
        $user = $request->user();
        $notification = $user->notifications()->findOrFail($id);
        $notification->delete();

        return $this->respondWithMessage('Notification deleted');
    }

    /**
     * Delete all notifications.
     */
    public function deleteAll(Request $request)
    {
        $user = $request->user();
        $user->notifications()->delete();

        return $this->respondWithMessage('All notifications deleted');
    }
}

