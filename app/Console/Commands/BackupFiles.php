<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use ZipArchive;

class BackupFiles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'backup:files 
                            {--path=storage : Path to backup (storage, public, or custom)}
                            {--exclude= : Comma-separated list of paths to exclude}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a backup of application files';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting files backup...');

        $path = $this->option('path');
        $exclude = $this->option('exclude') ? explode(',', $this->option('exclude')) : [];

        try {
            $backupPath = $this->createBackup($path, $exclude);
            
            $this->info("Files backup created successfully: {$backupPath}");
            
            // Clean old backups (keep last 7 days)
            $this->cleanOldBackups();
            
            return Command::SUCCESS;
        } catch (\Exception $e) {
            $this->error("Backup failed: " . $e->getMessage());
            return Command::FAILURE;
        }
    }

    /**
     * Create the files backup.
     */
    protected function createBackup(string $path, array $exclude): string
    {
        $timestamp = Carbon::now()->format('Y-m-d_H-i-s');
        $backupDir = storage_path('app/backups/files');
        
        if (!file_exists($backupDir)) {
            mkdir($backupDir, 0755, true);
        }

        $filename = "backup_files_{$path}_{$timestamp}.zip";
        $filePath = $backupDir . '/' . $filename;

        $zip = new ZipArchive();
        
        if ($zip->open($filePath, ZipArchive::CREATE | ZipArchive::OVERWRITE) !== TRUE) {
            throw new \Exception("Cannot create zip file: {$filePath}");
        }

        $basePath = base_path();
        $sourcePath = $basePath . '/' . $path;

        if (!file_exists($sourcePath)) {
            throw new \Exception("Source path does not exist: {$sourcePath}");
        }

        $this->addDirectoryToZip($zip, $sourcePath, $basePath, $exclude);
        
        $zip->close();

        return $filePath;
    }

    /**
     * Recursively add directory to zip.
     */
    protected function addDirectoryToZip(ZipArchive $zip, string $dir, string $basePath, array $exclude): void
    {
        $files = new \RecursiveIteratorIterator(
            new \RecursiveDirectoryIterator($dir),
            \RecursiveIteratorIterator::LEAVES_ONLY
        );

        foreach ($files as $file) {
            if (!$file->isDir()) {
                $filePath = $file->getRealPath();
                $relativePath = substr($filePath, strlen($basePath) + 1);

                // Check if path should be excluded
                $shouldExclude = false;
                foreach ($exclude as $excludedPath) {
                    if (strpos($relativePath, trim($excludedPath)) === 0) {
                        $shouldExclude = true;
                        break;
                    }
                }

                if (!$shouldExclude) {
                    $zip->addFile($filePath, $relativePath);
                }
            }
        }
    }

    /**
     * Clean old backup files (keep last 7 days).
     */
    protected function cleanOldBackups(): void
    {
        $backupDir = storage_path('app/backups/files');
        
        if (!file_exists($backupDir)) {
            return;
        }

        $files = glob($backupDir . '/*.zip');
        $cutoffDate = Carbon::now()->subDays(7);

        foreach ($files as $file) {
            if (filemtime($file) < $cutoffDate->timestamp) {
                unlink($file);
                $this->info("Deleted old backup: " . basename($file));
            }
        }
    }
}

