/**
 * Google Analytics Integration
 */

declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

/**
 * Initialize Google Analytics
 */
export const initializeGA = (measurementId: string): void => {
  if (!measurementId || typeof window === 'undefined') {
    return
  }

  // Check if already initialized
  if (window.gtag) {
    return
  }

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || []
  window.gtag = function (...args: unknown[]) {
    window.dataLayer?.push(args)
  }

  // Configure gtag
  window.gtag('js', new Date())
  window.gtag('config', measurementId, {
    send_page_view: false, // We'll send page views manually
  })

  // Load gtag script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)
}

/**
 * Send page view to Google Analytics
 */
export const trackPageView = (url: string, title?: string): void => {
  if (!window.gtag) {
    return
  }

  window.gtag('event', 'page_view', {
    page_path: url,
    page_title: title || document.title,
  })
}

/**
 * Send custom event to Google Analytics
 */
export const trackEvent = (eventName: string, eventParams?: Record<string, unknown>): void => {
  if (!window.gtag) {
    return
  }

  window.gtag('event', eventName, eventParams)
}

/**
 * Track user login
 */
export const trackLogin = (method: string = 'email'): void => {
  trackEvent('login', {
    method: method,
  })
}

/**
 * Track user registration
 */
export const trackSignUp = (method: string = 'email'): void => {
  trackEvent('sign_up', {
    method: method,
  })
}

/**
 * Check if Google Analytics is initialized
 */
export const isGAInitialized = (): boolean => {
  return typeof window !== 'undefined' && !!window.gtag
}
