<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Redis;
use Exception;

class HealthCheckService
{
    /**
     * Perform all health checks.
     */
    public function checkAll(): array
    {
        return [
            'status' => 'healthy',
            'timestamp' => now()->toISOString(),
            'checks' => [
                'database' => $this->checkDatabase(),
                'cache' => $this->checkCache(),
                'redis' => $this->checkRedis(),
                'disk_space' => $this->checkDiskSpace(),
            ],
        ];
    }

    /**
     * Check database connection.
     */
    public function checkDatabase(): array
    {
        try {
            DB::connection()->getPdo();
            $status = 'healthy';
            $message = 'Database connection successful';
        } catch (Exception $e) {
            $status = 'unhealthy';
            $message = 'Database connection failed: ' . $e->getMessage();
        }

        return [
            'status' => $status,
            'message' => $message,
        ];
    }

    /**
     * Check cache connection.
     */
    public function checkCache(): array
    {
        try {
            $key = 'health_check_' . time();
            $value = 'test';
            
            Cache::put($key, $value, 10);
            $retrieved = Cache::get($key);
            Cache::forget($key);
            
            if ($retrieved === $value) {
                $status = 'healthy';
                $message = 'Cache is working correctly';
            } else {
                $status = 'unhealthy';
                $message = 'Cache retrieval failed';
            }
        } catch (Exception $e) {
            $status = 'unhealthy';
            $message = 'Cache check failed: ' . $e->getMessage();
        }

        return [
            'status' => $status,
            'message' => $message,
        ];
    }

    /**
     * Check Redis connection (if configured).
     */
    public function checkRedis(): array
    {
        try {
            if (config('cache.default') === 'redis' || config('queue.default') === 'redis') {
                Redis::connection()->ping();
                $status = 'healthy';
                $message = 'Redis connection successful';
            } else {
                $status = 'skipped';
                $message = 'Redis not configured';
            }
        } catch (Exception $e) {
            $status = 'unhealthy';
            $message = 'Redis connection failed: ' . $e->getMessage();
        }

        return [
            'status' => $status,
            'message' => $message,
        ];
    }

    /**
     * Check disk space.
     */
    public function checkDiskSpace(): array
    {
        try {
            $path = storage_path();
            $totalSpace = disk_total_space($path);
            $freeSpace = disk_free_space($path);
            $usedSpace = $totalSpace - $freeSpace;
            $usagePercent = ($usedSpace / $totalSpace) * 100;

            $status = 'healthy';
            $message = 'Disk space is available';

            // Warn if usage is above 90%
            if ($usagePercent > 90) {
                $status = 'warning';
                $message = 'Disk usage is above 90%';
            }

            return [
                'status' => $status,
                'message' => $message,
                'total' => $this->formatBytes($totalSpace),
                'free' => $this->formatBytes($freeSpace),
                'used' => $this->formatBytes($usedSpace),
                'usage_percent' => round($usagePercent, 2),
            ];
        } catch (Exception $e) {
            return [
                'status' => 'unhealthy',
                'message' => 'Disk space check failed: ' . $e->getMessage(),
            ];
        }
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

