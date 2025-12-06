import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAnalytics } from '@/contexts/dashboard/hooks/useAnalytics'

/**
 * Analytics Tracker Component
 *
 * This component tracks page views automatically when routes change.
 * It should be included in the layout or router outlet.
 */
export const AnalyticsTracker: React.FC = () => {
  const location = useLocation()
  const { trackPage, isEnabled } = useAnalytics()

  useEffect(() => {
    if (isEnabled) {
      trackPage(location.pathname, document.title)
    }
  }, [location.pathname, isEnabled, trackPage])

  return null
}
