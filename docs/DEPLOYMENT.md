# Deployment Guide

Comprehensive guide for deploying Stark Core to production environments.

## Table of Contents

- [Overview](#overview)
- [Requirements](#requirements)
- [Pre-Deployment](#pre-deployment)
- [Server Setup](#server-setup)
- [Deployment Methods](#deployment-methods)
- [Environment Configuration](#environment-configuration)
- [Build & Optimization](#build--optimization)
- [Database Migration](#database-migration)
- [Post-Deployment](#post-deployment)
- [Monitoring & Maintenance](#monitoring--maintenance)
- [Rollback Strategy](#rollback-strategy)

## Overview

This guide covers deploying Stark Core to production servers using various methods and best practices.

### Deployment Architecture

```
┌─────────────────────────────────────────────────┐
│                Load Balancer                     │
│            (Optional for scaling)                │
└────────────────────┬────────────────────────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
┌────────▼─────────┐   ┌────────▼─────────┐
│   Web Server 1   │   │   Web Server 2   │
│   (Nginx/Apache) │   │   (Nginx/Apache) │
│    - Static      │   │    - Static      │
│    - PHP-FPM     │   │    - PHP-FPM     │
└────────┬─────────┘   └────────┬─────────┘
         │                       │
         └───────────┬───────────┘
                     │
         ┌───────────▼───────────┐
         │   Database Server     │
         │   (MySQL/PostgreSQL)  │
         └───────────────────────┘
```

## Requirements

### Server Requirements

**Minimum:**
- Ubuntu 20.04+ or similar Linux distribution
- 2 CPU cores
- 4GB RAM
- 20GB SSD storage
- PHP 8.3+
- Composer 2.x
- Node.js 18+
- NPM 9+
- MySQL 8.0+ or PostgreSQL 14+
- Nginx 1.18+ or Apache 2.4+

**Recommended:**
- Ubuntu 22.04 LTS
- 4 CPU cores
- 8GB RAM
- 50GB SSD storage
- Redis for caching and queues
- SSL certificate (Let's Encrypt)

### PHP Extensions

```bash
php8.3-cli
php8.3-fpm
php8.3-mysql
php8.3-pgsql (if using PostgreSQL)
php8.3-curl
php8.3-mbstring
php8.3-xml
php8.3-zip
php8.3-bcmath
php8.3-gd
php8.3-intl
php8.3-redis (if using Redis)
```

## Pre-Deployment

### 1. Prepare Codebase

```bash
# Ensure all changes are committed
git status

# Tag the release
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0

# Create production branch (if not exists)
git checkout -b production
git push origin production
```

### 2. Run Tests

```bash
# Backend tests
php artisan test

# Frontend tests
npm run test

# Linting
npm run lint
./vendor/bin/pint

# Type checking
npx tsc --noEmit
```

### 3. Update Documentation

- Update CHANGELOG.md
- Update version numbers
- Document any breaking changes
- Update environment variable documentation

### 4. Backup Current Production

```bash
# Backup database
mysqldump -u root -p database_name > backup_$(date +%Y%m%d_%H%M%S).sql

# Backup files
tar -czf backup_files_$(date +%Y%m%d_%H%M%S).tar.gz /var/www/app

# Backup .env
cp /var/www/app/.env /var/www/backups/.env.backup
```

## Server Setup

### 1. Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install PHP and extensions
sudo apt install -y php8.3-cli php8.3-fpm php8.3-mysql php8.3-curl \
    php8.3-mbstring php8.3-xml php8.3-zip php8.3-bcmath php8.3-gd \
    php8.3-intl php8.3-redis

# Install Composer
curl -sS https://getcomposer.org/installer | sudo php -- \
    --install-dir=/usr/local/bin --filename=composer

# Install Node.js and NPM
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install MySQL
sudo apt install -y mysql-server

# Install Nginx
sudo apt install -y nginx

# Install Redis (optional)
sudo apt install -y redis-server
```

### 2. Configure PHP-FPM

**File**: `/etc/php/8.3/fpm/pool.d/www.conf`

```ini
[www]
user = www-data
group = www-data
listen = /run/php/php8.3-fpm.sock
listen.owner = www-data
listen.group = www-data
pm = dynamic
pm.max_children = 50
pm.start_servers = 5
pm.min_spare_servers = 5
pm.max_spare_servers = 35
pm.max_requests = 500
```

**Restart PHP-FPM:**
```bash
sudo systemctl restart php8.3-fpm
```

### 3. Configure Nginx

**File**: `/etc/nginx/sites-available/stark_core`

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name example.com www.example.com;
    root /var/www/stark_core/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 365d;
        add_header Cache-Control "public, immutable";
    }
}
```

**Enable site:**
```bash
sudo ln -s /etc/nginx/sites-available/stark_core /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 4. Configure SSL (Let's Encrypt)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d example.com -d www.example.com

# Auto-renewal is configured by default
# Test renewal
sudo certbot renew --dry-run
```

### 5. Setup MySQL Database

```bash
# Secure MySQL installation
sudo mysql_secure_installation

# Create database and user
sudo mysql -u root -p

mysql> CREATE DATABASE stark_core;
mysql> CREATE USER 'stark_user'@'localhost' IDENTIFIED BY 'strong_password';
mysql> GRANT ALL PRIVILEGES ON stark_core.* TO 'stark_user'@'localhost';
mysql> FLUSH PRIVILEGES;
mysql> EXIT;
```

### 6. Setup Queue Worker (Supervisor)

**Install Supervisor:**
```bash
sudo apt install -y supervisor
```

**File**: `/etc/supervisor/conf.d/stark-worker.conf`

```ini
[program:stark-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/stark_core/artisan queue:work --sleep=3 --tries=3 --max-time=3600
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
user=www-data
numprocs=4
redirect_stderr=true
stdout_logfile=/var/www/stark_core/storage/logs/worker.log
stopwaitsecs=3600
```

**Start Supervisor:**
```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start stark-worker:*
```

### 7. Setup Scheduled Tasks (Cron)

```bash
# Edit crontab
sudo crontab -e

# Add Laravel scheduler
* * * * * cd /var/www/stark_core && php artisan schedule:run >> /dev/null 2>&1
```

## Deployment Methods

### Method 1: Manual Deployment

```bash
# 1. SSH into server
ssh user@your-server.com

# 2. Navigate to application directory
cd /var/www/stark_core

# 3. Put application in maintenance mode
php artisan down

# 4. Pull latest code
git fetch origin
git checkout production
git pull origin production

# 5. Install/update dependencies
composer install --no-dev --optimize-autoloader
npm install --production

# 6. Build frontend assets
npm run build

# 7. Run migrations
php artisan migrate --force

# 8. Clear and cache config
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 9. Restart services
sudo systemctl restart php8.3-fpm
sudo supervisorctl restart stark-worker:*

# 10. Bring application back online
php artisan up
```

### Method 2: Deployment Script

**File**: `deploy.sh`

```bash
#!/bin/bash

set -e

echo "🚀 Starting deployment..."

# Configuration
APP_DIR="/var/www/stark_core"
PHP_FPM="php8.3-fpm"

# Navigate to app directory
cd $APP_DIR

# Maintenance mode
echo "📝 Enabling maintenance mode..."
php artisan down

# Update code
echo "📦 Pulling latest code..."
git fetch origin
git checkout production
git pull origin production

# Backend dependencies
echo "🔧 Installing backend dependencies..."
composer install --no-dev --optimize-autoloader --no-interaction

# Frontend dependencies and build
echo "🎨 Building frontend..."
npm install --production
npm run build

# Database migrations
echo "🗄️  Running migrations..."
php artisan migrate --force

# Clear old cache
echo "🧹 Clearing cache..."
php artisan cache:clear
php artisan view:clear
php artisan route:clear
php artisan config:clear

# Cache configuration
echo "💾 Caching configuration..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Fix permissions
echo "🔐 Fixing permissions..."
chown -R www-data:www-data $APP_DIR/storage
chown -R www-data:www-data $APP_DIR/bootstrap/cache
chmod -R 775 $APP_DIR/storage
chmod -R 775 $APP_DIR/bootstrap/cache

# Restart services
echo "♻️  Restarting services..."
systemctl restart $PHP_FPM
supervisorctl restart stark-worker:*

# Bring app back online
echo "✅ Bringing application online..."
php artisan up

echo "🎉 Deployment completed successfully!"
```

**Make executable:**
```bash
chmod +x deploy.sh
```

**Run deployment:**
```bash
sudo ./deploy.sh
```

### Method 3: CI/CD Pipeline (GitHub Actions)

**File**: `.github/workflows/deploy.yml`

```yaml
name: Deploy to Production

on:
  push:
    branches: [production]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Deploy to server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /var/www/stark_core
            git pull origin production
            composer install --no-dev --optimize-autoloader
            npm install --production
            npm run build
            php artisan migrate --force
            php artisan config:cache
            php artisan route:cache
            php artisan view:cache
            sudo systemctl restart php8.3-fpm
            sudo supervisorctl restart stark-worker:*
```

## Environment Configuration

### Production .env

**File**: `/var/www/stark_core/.env`

```env
# Application
APP_NAME="Stark Core"
APP_ENV=production
APP_KEY=base64:your-generated-key
APP_DEBUG=false
APP_URL=https://example.com

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=stark_core
DB_USERNAME=stark_user
DB_PASSWORD=strong_password

# Cache & Session
CACHE_DRIVER=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis

# Redis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

# Mail
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="noreply@example.com"
MAIL_FROM_NAME="${APP_NAME}"

# Laravel Sanctum
SANCTUM_STATEFUL_DOMAINS=example.com

# Frontend
VITE_API_URL=https://example.com

# OneSignal (optional)
ONESIGNAL_APP_ID=
ONESIGNAL_API_KEY=
```

### Security Checklist

- [ ] `APP_DEBUG=false` in production
- [ ] Strong `APP_KEY` generated
- [ ] Database credentials are secure
- [ ] `.env` file permissions: `chmod 600 .env`
- [ ] SSL certificate installed
- [ ] Firewall configured (UFW)
- [ ] SSH key authentication only
- [ ] Regular security updates
- [ ] Fail2ban installed (optional)

## Build & Optimization

### Optimize Autoloader

```bash
composer install --optimize-autoloader --no-dev
```

### Cache Configuration

```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Build Frontend Assets

```bash
npm run build
```

### Optimize Images

- Use WebP format
- Compress images
- Use CDN for static assets

### Enable OPcache

**File**: `/etc/php/8.3/fpm/conf.d/10-opcache.ini`

```ini
opcache.enable=1
opcache.memory_consumption=256
opcache.interned_strings_buffer=16
opcache.max_accelerated_files=10000
opcache.revalidate_freq=60
opcache.fast_shutdown=1
```

## Database Migration

### Safe Migration Strategy

```bash
# 1. Backup database
mysqldump -u root -p stark_core > backup_pre_migration.sql

# 2. Test migrations on staging
php artisan migrate --pretend

# 3. Run migrations
php artisan migrate --force

# 4. If something goes wrong, rollback
php artisan migrate:rollback

# 5. Restore from backup if needed
mysql -u root -p stark_core < backup_pre_migration.sql
```

### Zero-Downtime Migrations

For critical applications:

1. Make migrations backward compatible
2. Deploy new code (without running migrations)
3. Run migrations
4. Verify everything works
5. Remove old code in next deployment

## Post-Deployment

### Verification Checklist

- [ ] Application is accessible
- [ ] No errors in logs
- [ ] Database migrations successful
- [ ] Queue workers running
- [ ] Scheduled tasks working
- [ ] API endpoints responding
- [ ] Frontend assets loading
- [ ] SSL certificate valid
- [ ] Email sending works
- [ ] Authentication working
- [ ] Permissions working correctly

### Check Logs

```bash
# Application logs
tail -f /var/www/stark_core/storage/logs/laravel.log

# Nginx access logs
tail -f /var/log/nginx/access.log

# Nginx error logs
tail -f /var/log/nginx/error.log

# PHP-FPM logs
tail -f /var/log/php8.3-fpm.log

# Queue worker logs
tail -f /var/www/stark_core/storage/logs/worker.log
```

### Monitor Performance

```bash
# Check server resources
htop

# Check disk usage
df -h

# Check memory usage
free -m

# Check MySQL processes
mysqladmin -u root -p processlist
```

## Monitoring & Maintenance

### Log Rotation

**File**: `/etc/logrotate.d/stark-core`

```
/var/www/stark_core/storage/logs/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 www-data www-data
    sharedscripts
}
```

### Monitoring Tools

**Recommended:**
- **Laravel Telescope** (development/staging)
- **New Relic** or **Datadog** (APM)
- **Sentry** (error tracking)
- **UptimeRobot** (uptime monitoring)
- **Prometheus + Grafana** (metrics)

### Backup Strategy

```bash
# Automated daily backup script
#!/bin/bash

BACKUP_DIR="/var/backups/stark_core"
DATE=$(date +%Y%m%d_%H%M%S)

# Database backup
mysqldump -u root -p stark_core | gzip > $BACKUP_DIR/db_$DATE.sql.gz

# Files backup
tar -czf $BACKUP_DIR/files_$DATE.tar.gz /var/www/stark_core

# Keep only last 7 days
find $BACKUP_DIR -type f -mtime +7 -delete

# Upload to S3 (optional)
aws s3 cp $BACKUP_DIR/ s3://your-bucket/backups/ --recursive
```

### Update Process

```bash
# 1. Backup
./backup.sh

# 2. Pull updates
git pull origin production

# 3. Update dependencies
composer update --no-dev
npm update

# 4. Run migrations
php artisan migrate --force

# 5. Clear cache
php artisan cache:clear
php artisan config:cache

# 6. Test
# Verify everything works
```

## Rollback Strategy

### Quick Rollback

```bash
# 1. Enable maintenance mode
php artisan down

# 2. Revert to previous commit
git log --oneline  # Find previous commit
git reset --hard <commit-hash>

# 3. Install dependencies
composer install --no-dev
npm install --production
npm run build

# 4. Rollback migrations (if needed)
php artisan migrate:rollback

# 5. Clear cache
php artisan cache:clear
php artisan config:cache

# 6. Bring online
php artisan up
```

### Restore from Backup

```bash
# 1. Enable maintenance mode
php artisan down

# 2. Restore database
mysql -u root -p stark_core < backup_20240115_100000.sql

# 3. Restore files
tar -xzf backup_files_20240115_100000.tar.gz -C /

# 4. Restore .env
cp /var/www/backups/.env.backup /var/www/stark_core/.env

# 5. Clear cache
php artisan cache:clear
php artisan config:cache

# 6. Bring online
php artisan up
```

## Troubleshooting

### Common Issues

**Issue: 500 Internal Server Error**
```bash
# Check logs
tail -f storage/logs/laravel.log

# Fix permissions
sudo chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

# Clear cache
php artisan cache:clear
php artisan config:clear
```

**Issue: Queue not processing**
```bash
# Check supervisor status
sudo supervisorctl status

# Restart queue workers
sudo supervisorctl restart stark-worker:*

# Check queue
php artisan queue:failed
```

**Issue: High memory usage**
```bash
# Check PHP-FPM pool
sudo systemctl status php8.3-fpm

# Adjust pool settings
# Edit /etc/php/8.3/fpm/pool.d/www.conf

# Restart PHP-FPM
sudo systemctl restart php8.3-fpm
```

---

**Deployment Complete!** Your Stark Core application should now be running in production. Monitor logs and performance for the first few hours after deployment.

