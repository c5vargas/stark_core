<?php

namespace App\Http\Controllers;

use App\Http\Transformers\NotificationTransformer;
use App\Services\HealthCheckService;
use Illuminate\Http\Request;

class HealthController extends Controller
{
    private $healthCheckService;

    public function __construct(
        NotificationTransformer $transformer,
        Request $request,
        HealthCheckService $healthCheckService
    ) {
        parent::__construct($transformer, $request);
        $this->healthCheckService = $healthCheckService;
    }

    /**
     * Get health status of the application.
     */
    public function index()
    {
        $health = $this->healthCheckService->checkAll();
        
        // Determine overall status
        $overallStatus = 'healthy';
        foreach ($health['checks'] as $check) {
            if ($check['status'] === 'unhealthy') {
                $overallStatus = 'unhealthy';
                break;
            } elseif ($check['status'] === 'warning' && $overallStatus === 'healthy') {
                $overallStatus = 'warning';
            }
        }

        $health['status'] = $overallStatus;
        
        $statusCode = $overallStatus === 'healthy' ? 200 : ($overallStatus === 'warning' ? 200 : 503);
        
        return response()->json($health, $statusCode);
    }
}

