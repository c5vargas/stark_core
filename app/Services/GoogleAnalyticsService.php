<?php

namespace App\Services;

use App\Models\Setting;
use Google\Analytics\Data\V1beta\Client\BetaAnalyticsDataClient;
use Google\Analytics\Data\V1beta\DateRange;
use Google\Analytics\Data\V1beta\Dimension;
use Google\Analytics\Data\V1beta\Metric;
use Google\Analytics\Data\V1beta\RunReportRequest;
use Google\Analytics\Data\V1beta\OrderBy;
use Google\Analytics\Data\V1beta\OrderBy\DimensionOrderBy;
use Google\Analytics\Data\V1beta\OrderBy\MetricOrderBy;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class GoogleAnalyticsService
{
    protected ?BetaAnalyticsDataClient $client = null;
    protected ?string $propertyId = null;
    protected ?string $credentialsPath = null;

    public function __construct()
    {
        $this->propertyId = Setting::where('key', 'analytics_property_id')->first()?->value;
        $credentialsPath = Setting::where('key', 'account_key_path')->first()?->value;

        if ($credentialsPath && Storage::exists($credentialsPath)) {
            $this->credentialsPath = Storage::path($credentialsPath);
        }

        $this->initializeClient();
    }

    /**
     * Initialize Google Analytics Data API client
     */
    protected function initializeClient(): void
    {
        if (!$this->credentialsPath || !$this->propertyId) {
            return;
        }

        try {
            putenv("GOOGLE_APPLICATION_CREDENTIALS={$this->credentialsPath}");
            $this->client = new BetaAnalyticsDataClient();
        } catch (\Exception $e) {
            Log::error('Failed to initialize Google Analytics client: ' . $e->getMessage());
            $this->client = null;
        }
    }

    /**
     * Check if the service is properly configured
     */
    public function isConfigured(): bool
    {
        return $this->client !== null && $this->propertyId !== null;
    }

    /**
     * Get overview metrics (page views, unique visitors, avg session duration, bounce rate)
     */
    public function getOverview(array $dateRange = null): array
    {
        if (!$this->isConfigured()) {
            return $this->getEmptyOverview();
        }

        try {
            $dateRange = $dateRange ?? ['start_date' => '30daysAgo', 'end_date' => 'today'];

            $request = (new RunReportRequest())
                ->setProperty('properties/' . $this->propertyId)
                ->setDateRanges([
                    new DateRange([
                        'start_date' => $dateRange['start_date'],
                        'end_date' => $dateRange['end_date'],
                    ]),
                ])
                ->setMetrics([
                    new Metric(['name' => 'screenPageViews']),
                    new Metric(['name' => 'activeUsers']),
                    new Metric(['name' => 'averageSessionDuration']),
                    new Metric(['name' => 'bounceRate']),
                ]);

            $response = $this->client->runReport($request);

            $metrics = [];
            if ($response->getRows() && count($response->getRows()) > 0) {
                $row = $response->getRows()[0];
                $metricValues = $row->getMetricValues();

                $metrics = [
                    'pageViews' => (int) ($metricValues[0]->getValue() ?? 0),
                    'uniqueVisitors' => (int) ($metricValues[1]->getValue() ?? 0),
                    'avgSessionDuration' => $this->formatDuration($metricValues[2]->getValue() ?? 0),
                    'bounceRate' => round((float) ($metricValues[3]->getValue() ?? 0), 2),
                ];
            }

            return $metrics;
        } catch (\Exception $e) {
            Log::error('Failed to get analytics overview: ' . $e->getMessage());
            return $this->getEmptyOverview();
        }
    }

    /**
     * Get traffic data for chart (views and visitors by day)
     */
    public function getTraffic(string $range = '7d'): array
    {
        if (!$this->isConfigured()) {
            return [];
        }

        try {
            $days = match ($range) {
                '7d' => 7,
                '30d' => 30,
                '90d' => 90,
                default => 7,
            };

            $request = (new RunReportRequest())
                ->setProperty('properties/' . $this->propertyId)
                ->setDateRanges([
                    new DateRange([
                        'start_date' => "{$days}daysAgo",
                        'end_date' => 'today',
                    ]),
                ])
                ->setDimensions([
                    new Dimension(['name' => 'date']),
                ])
                ->setMetrics([
                    new Metric(['name' => 'screenPageViews']),
                    new Metric(['name' => 'activeUsers']),
                ])
                ->setOrderBys([
                    new OrderBy([
                        'dimension' => new DimensionOrderBy([
                            'dimension_name' => 'date',
                        ]),
                    ]),
                ]);

            $response = $this->client->runReport($request);

            $data = [];
            foreach ($response->getRows() as $row) {
                $dimensionValues = $row->getDimensionValues();
                $metricValues = $row->getMetricValues();

                $date = $dimensionValues[0]->getValue();
                $dayName = $this->getDayName($date, $days);

                $data[] = [
                    'day' => $dayName,
                    'views' => (int) ($metricValues[0]->getValue() ?? 0),
                    'visitors' => (int) ($metricValues[1]->getValue() ?? 0),
                ];
            }

            return $data;
        } catch (\Exception $e) {
            Log::error('Failed to get analytics traffic: ' . $e->getMessage());
            return [];
        }
    }

    /**
     * Get top pages
     */
    public function getTopPages(int $limit = 5): array
    {
        if (!$this->isConfigured()) {
            return [];
        }

        try {
            $request = (new RunReportRequest())
                ->setProperty('properties/' . $this->propertyId)
                ->setDateRanges([
                    new DateRange([
                        'start_date' => '30daysAgo',
                        'end_date' => 'today',
                    ]),
                ])
                ->setDimensions([
                    new Dimension(['name' => 'pagePath']),
                ])
                ->setMetrics([
                    new Metric(['name' => 'screenPageViews']),
                    new Metric(['name' => 'activeUsers']),
                    new Metric(['name' => 'averageSessionDuration']),
                ])
                ->setOrderBys([
                    new OrderBy([
                        'metric' => new MetricOrderBy([
                            'metric_name' => 'screenPageViews',
                        ]),
                        'desc' => true,
                    ]),
                ])
                ->setLimit($limit);

            $response = $this->client->runReport($request);

            $pages = [];
            foreach ($response->getRows() as $row) {
                $dimensionValues = $row->getDimensionValues();
                $metricValues = $row->getMetricValues();

                $pages[] = [
                    'path' => $dimensionValues[0]->getValue(),
                    'views' => (int) ($metricValues[0]->getValue() ?? 0),
                    'uniqueViews' => (int) ($metricValues[1]->getValue() ?? 0),
                    'avgTime' => $this->formatDuration($metricValues[2]->getValue() ?? 0),
                ];
            }

            return $pages;
        } catch (\Exception $e) {
            Log::error('Failed to get top pages: ' . $e->getMessage());
            return [];
        }
    }

    /**
     * Format duration from seconds to MM:SS format
     */
    protected function formatDuration(float $seconds): string
    {
        $minutes = floor($seconds / 60);
        $remainingSeconds = round($seconds % 60);
        return sprintf('%d:%02d', $minutes, $remainingSeconds);
    }

    /**
     * Get day name based on date and range
     */
    protected function getDayName(string $date, int $days): string
    {
        if ($days === 7) {
            $timestamp = strtotime($date);
            $dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            return $dayNames[(int) date('w', $timestamp)];
        }

        // For longer ranges, return formatted date
        $timestamp = strtotime($date);
        return date('M j', $timestamp);
    }

    /**
     * Get empty overview structure
     */
    protected function getEmptyOverview(): array
    {
        return [
            'pageViews' => 0,
            'uniqueVisitors' => 0,
            'avgSessionDuration' => '0:00',
            'bounceRate' => 0,
        ];
    }
}

