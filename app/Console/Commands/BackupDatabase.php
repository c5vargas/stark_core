<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class BackupDatabase extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'backup:database 
                            {--driver=mysql : Database driver (mysql, pgsql)}
                            {--compress : Compress the backup file}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a backup of the database';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting database backup...');

        $driver = $this->option('driver');
        $compress = $this->option('compress');

        try {
            $backupPath = $this->createBackup($driver, $compress);
            
            $this->info("Database backup created successfully: {$backupPath}");
            
            // Clean old backups (keep last 7 days)
            $this->cleanOldBackups();
            
            return Command::SUCCESS;
        } catch (\Exception $e) {
            $this->error("Backup failed: " . $e->getMessage());
            return Command::FAILURE;
        }
    }

    /**
     * Create the database backup.
     */
    protected function createBackup(string $driver, bool $compress): string
    {
        $connection = DB::connection();
        $database = $connection->getDatabaseName();
        $timestamp = Carbon::now()->format('Y-m-d_H-i-s');
        $filename = "backup_db_{$database}_{$timestamp}.sql";
        
        $backupDir = storage_path('app/backups/database');
        if (!file_exists($backupDir)) {
            mkdir($backupDir, 0755, true);
        }
        
        $filePath = $backupDir . '/' . $filename;

        if ($driver === 'mysql') {
            $this->backupMySQL($connection, $filePath);
        } elseif ($driver === 'pgsql') {
            $this->backupPostgreSQL($connection, $filePath);
        } else {
            throw new \Exception("Unsupported database driver: {$driver}");
        }

        if ($compress) {
            $compressedPath = $filePath . '.gz';
            $this->compressFile($filePath, $compressedPath);
            unlink($filePath);
            return $compressedPath;
        }

        return $filePath;
    }

    /**
     * Backup MySQL database.
     */
    protected function backupMySQL($connection, string $filePath): void
    {
        $host = $connection->getConfig('host');
        $port = $connection->getConfig('port') ?? 3306;
        $username = $connection->getConfig('username');
        $password = $connection->getConfig('password');
        $database = $connection->getDatabaseName();

        $command = sprintf(
            'mysqldump -h %s -P %s -u %s -p%s %s > %s',
            escapeshellarg($host),
            escapeshellarg($port),
            escapeshellarg($username),
            escapeshellarg($password),
            escapeshellarg($database),
            escapeshellarg($filePath)
        );

        exec($command, $output, $returnVar);

        if ($returnVar !== 0) {
            throw new \Exception("MySQL backup command failed");
        }
    }

    /**
     * Backup PostgreSQL database.
     */
    protected function backupPostgreSQL($connection, string $filePath): void
    {
        $host = $connection->getConfig('host');
        $port = $connection->getConfig('port') ?? 5432;
        $username = $connection->getConfig('username');
        $password = $connection->getConfig('password');
        $database = $connection->getDatabaseName();

        putenv("PGPASSWORD={$password}");

        $command = sprintf(
            'pg_dump -h %s -p %s -U %s -d %s -f %s',
            escapeshellarg($host),
            escapeshellarg($port),
            escapeshellarg($username),
            escapeshellarg($database),
            escapeshellarg($filePath)
        );

        exec($command, $output, $returnVar);

        if ($returnVar !== 0) {
            throw new \Exception("PostgreSQL backup command failed");
        }
    }

    /**
     * Compress a file using gzip.
     */
    protected function compressFile(string $source, string $destination): void
    {
        $fp_in = fopen($source, 'rb');
        $fp_out = gzopen($destination, 'wb9');

        if (!$fp_in || !$fp_out) {
            throw new \Exception("Failed to compress backup file");
        }

        while (!feof($fp_in)) {
            gzwrite($fp_out, fread($fp_in, 8192));
        }

        fclose($fp_in);
        gzclose($fp_out);
    }

    /**
     * Clean old backup files (keep last 7 days).
     */
    protected function cleanOldBackups(): void
    {
        $backupDir = storage_path('app/backups/database');
        
        if (!file_exists($backupDir)) {
            return;
        }

        $files = glob($backupDir . '/*.{sql,sql.gz}', GLOB_BRACE);
        $cutoffDate = Carbon::now()->subDays(7);

        foreach ($files as $file) {
            if (filemtime($file) < $cutoffDate->timestamp) {
                unlink($file);
                $this->info("Deleted old backup: " . basename($file));
            }
        }
    }
}

