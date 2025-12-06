import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import getSettings from '@/contexts/settings/actions/getSettings'
import { initializeGA, trackPageView } from '@/contexts/shared/libs/analytics'
import fetchAnalyticsOverview from '@/contexts/dashboard/actions/fetchAnalyticsOverview'
import fetchAnalyticsTraffic from '@/contexts/dashboard/actions/fetchAnalyticsTraffic'
import fetchTopPages from '@/contexts/dashboard/actions/fetchTopPages'

export const useAnalytics = () => {
  const [isEnabled, setIsEnabled] = useState(false)
  const [measurementId, setMeasurementId] = useState<string | null>(null)

  // Fetch settings to check if analytics is enabled
  const { data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
  })

  useEffect(() => {
    if (settings) {
      const analyticsSettings = settings.find(s => s.key === 'manager_measurement_id')
      const measurementIdValue = analyticsSettings?.value || ''

      if (measurementIdValue && measurementIdValue.trim() !== '') {
        setMeasurementId(measurementIdValue)
        setIsEnabled(true)
        initializeGA(measurementIdValue)
      } else {
        setIsEnabled(false)
      }
    }
  }, [settings])

  // Track page view on location change
  const trackPage = (path: string, title?: string) => {
    if (isEnabled && measurementId) {
      trackPageView(path, title)
    }
  }

  // Fetch analytics overview data
  const {
    data: overviewData,
    isLoading: overviewLoading,
    error: overviewError,
  } = useQuery({
    queryKey: ['analytics', 'overview'],
    queryFn: fetchAnalyticsOverview,
    enabled: isEnabled,
    refetchInterval: 300000, // Refetch every 5 minutes
  })

  // Fetch traffic data (default to 7d)
  const useTraffic = (range: '7d' | '30d' | '90d' = '7d') => {
    return useQuery({
      queryKey: ['analytics', 'traffic', range],
      queryFn: () => fetchAnalyticsTraffic(range),
      enabled: isEnabled,
      refetchInterval: 300000,
    })
  }

  // Fetch top pages
  const {
    data: topPagesData,
    isLoading: topPagesLoading,
    error: topPagesError,
  } = useQuery({
    queryKey: ['analytics', 'top-pages'],
    queryFn: () => fetchTopPages(5),
    enabled: isEnabled,
    refetchInterval: 300000,
  })

  return {
    isEnabled,
    measurementId,
    trackPage,
    overview: {
      data: overviewData?.data,
      loading: overviewLoading,
      error: overviewError,
      configured: overviewData?.configured ?? false,
    },
    useTraffic,
    topPages: {
      data: topPagesData?.data ?? [],
      loading: topPagesLoading,
      error: topPagesError,
      configured: topPagesData?.configured ?? false,
    },
  }
}
