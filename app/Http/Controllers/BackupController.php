<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Carbon\Carbon;

class BackupController extends Controller
{
    public function __construct(Request $request)
    {
        parent::__construct(null, $request);
    }

    /**
     * List all backups with pagination, sorting and filtering.
     */
    public function index(Request $request)
    {
        $type = $request->get('type', 'all'); // 'database', 'files', 'all'
        $query = $request->get('query', ''); // Search in filename
        $sortBy = $request->get('sortBy', 'created_at');
        $sortOrder = $request->get('sortOrder', 'desc');
        $page = (int) $request->get('page', 1);
        $perPage = (int) $request->get('perPage', 15);
        
        $backups = [];
        
        if ($type === 'all' || $type === 'database') {
            $dbBackups = $this->getBackups('database');
            $backups = array_merge($backups, $dbBackups);
        }
        
        if ($type === 'all' || $type === 'files') {
            $fileBackups = $this->getBackups('files');
            $backups = array_merge($backups, $fileBackups);
        }
        
        // Filter by search query (filename)
        if (!empty($query)) {
            $backups = array_filter($backups, function($backup) use ($query) {
                return stripos($backup['filename'], $query) !== false;
            });
            $backups = array_values($backups); // Re-index array
        }
        
        // Sort
        usort($backups, function($a, $b) use ($sortBy, $sortOrder) {
            $valueA = $a[$sortBy] ?? '';
            $valueB = $b[$sortBy] ?? '';
            
            // Handle numeric sorting for size_bytes
            if ($sortBy === 'size_bytes') {
                $result = $valueA <=> $valueB;
            } else {
                $result = strcmp((string)$valueA, (string)$valueB);
            }
            
            return $sortOrder === 'asc' ? $result : -$result;
        });
        
        // Paginate
        $total = count($backups);
        $offset = ($page - 1) * $perPage;
        $items = array_slice($backups, $offset, $perPage);
        $totalPages = (int) ceil($total / $perPage);
        
        // Build response manually since we're using arrays, not Eloquent models
        return $this->respondWithArray([
            'data' => $items,
            'meta' => [
                'pagination' => [
                    'total' => $total,
                    'count' => count($items),
                    'per_page' => $perPage,
                    'current_page' => $page,
                    'total_pages' => $totalPages,
                ],
            ],
        ]);
    }

    /**
     * Create a new backup.
     */
    public function create(Request $request)
    {
        $request->validate([
            'type' => 'required|in:database,files,both',
        ]);

        $type = $request->input('type');
        $backups = [];

        if ($type === 'database' || $type === 'both') {
            \Artisan::call('backup:database', [
                '--compress' => true,
            ]);
            $dbBackups = $this->getBackups('database');
            $backups = array_merge($backups, array_slice($dbBackups, 0, 1));
        }

        if ($type === 'files' || $type === 'both') {
            \Artisan::call('backup:files', [
                '--path' => 'storage',
            ]);
            $fileBackups = $this->getBackups('files');
            $backups = array_merge($backups, array_slice($fileBackups, 0, 1));
        }

        return $this->respondWithMessage('Backup created successfully', 201);
    }

    /**
     * Download a backup file.
     */
    public function download(Request $request, string $type, string $filename)
    {
        $backupPath = storage_path("app/backups/{$type}/{$filename}");
        
        if (!file_exists($backupPath)) {
            return $this->respondWithError('Backup file not found', 404);
        }

        return response()->download($backupPath, $filename);
    }

    /**
     * Delete a backup file.
     */
    public function delete(Request $request, string $type, string $filename)
    {
        $backupPath = storage_path("app/backups/{$type}/{$filename}");
        
        if (!file_exists($backupPath)) {
            return $this->respondWithError('Backup file not found', 404);
        }

        unlink($backupPath);

        return $this->respondWithMessage('Backup deleted successfully');
    }

    /**
     * Get backups from a specific directory.
     */
    protected function getBackups(string $type): array
    {
        $backupDir = storage_path("app/backups/{$type}");
        
        if (!file_exists($backupDir)) {
            return [];
        }

        $files = glob($backupDir . '/*');
        $backups = [];

        foreach ($files as $file) {
            if (is_file($file)) {
                $backups[] = [
                    'type' => $type,
                    'filename' => basename($file),
                    'size' => $this->formatBytes(filesize($file)),
                    'size_bytes' => filesize($file),
                    'created_at' => Carbon::createFromTimestamp(filemtime($file))->toISOString(),
                    'path' => "backups/{$type}/" . basename($file),
                ];
            }
        }

        return $backups;
    }

    /**
     * Format bytes to human readable format.
     */
    protected function formatBytes(int $bytes, int $precision = 2): string
    {
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];
        
        for ($i = 0; $bytes > 1024 && $i < count($units) - 1; $i++) {
            $bytes /= 1024;
        }
        
        return round($bytes, $precision) . ' ' . $units[$i];
    }
}

