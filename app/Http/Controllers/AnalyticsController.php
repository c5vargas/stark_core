<?php

namespace App\Http\Controllers;

use App\Services\GoogleAnalyticsService;
use Illuminate\Http\Request;

class AnalyticsController extends Controller
{
    protected GoogleAnalyticsService $analyticsService;

    public function __construct(
        Request $request,
        GoogleAnalyticsService $analyticsService
    ) {
        parent::__construct(null, $request);
        $this->analyticsService = $analyticsService;
    }

    /**
     * Get analytics overview metrics
     * GET /api/analytics/overview
     */
    public function overview()
    {
        if (!$this->analyticsService->isConfigured()) {
            return $this->respondWithArray([
                'data' => $this->analyticsService->getOverview(),
                'configured' => false,
            ]);
        }

        $data = $this->analyticsService->getOverview();
        return $this->respondWithArray([
            'data' => $data,
            'configured' => true,
        ]);
    }

    /**
     * Get traffic data for chart
     * GET /api/analytics/traffic?range=7d|30d|90d
     */
    public function traffic(Request $request)
    {
        $range = $request->input('range', '7d');
        
        if (!in_array($range, ['7d', '30d', '90d'])) {
            return $this->respondWithError('Invalid range parameter. Must be 7d, 30d, or 90d', 400);
        }

        if (!$this->analyticsService->isConfigured()) {
            return $this->respondWithArray([
                'data' => [],
                'configured' => false,
            ]);
        }

        $data = $this->analyticsService->getTraffic($range);
        return $this->respondWithArray([
            'data' => $data,
            'configured' => true,
        ]);
    }

    /**
     * Get top pages
     * GET /api/analytics/top-pages?limit=5
     */
    public function topPages(Request $request)
    {
        $limit = (int) $request->input('limit', 5);

        if (!$this->analyticsService->isConfigured()) {
            return $this->respondWithArray([
                'data' => [],
                'configured' => false,
            ]);
        }

        $data = $this->analyticsService->getTopPages($limit);
        return $this->respondWithArray([
            'data' => $data,
            'configured' => true,
        ]);
    }
}

