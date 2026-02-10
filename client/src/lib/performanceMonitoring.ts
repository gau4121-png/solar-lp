/**
 * Performance Monitoring Utilities
 * Tracks Core Web Vitals and other performance metrics
 */

export interface PerformanceMetrics {
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  fcp?: number; // First Contentful Paint
  ttfb?: number; // Time to First Byte
  imageLoadTime?: number;
}

/**
 * Initialize performance monitoring
 */
export function initializePerformanceMonitoring(): PerformanceMetrics {
  const metrics: PerformanceMetrics = {};

  // Measure Core Web Vitals using web-vitals library approach
  if (typeof window !== 'undefined') {
    // Measure LCP (Largest Contentful Paint)
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          metrics.lcp = lastEntry.renderTime || lastEntry.loadTime;
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.warn('LCP monitoring not available');
      }

      // Measure CLS (Cumulative Layout Shift)
      try {
        let clsValue = 0;
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
              metrics.cls = clsValue;
            }
          }
        });
        observer.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.warn('CLS monitoring not available');
      }

      // Measure FCP (First Contentful Paint)
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          if (entries.length > 0) {
            metrics.fcp = entries[0].startTime;
          }
        });
        observer.observe({ entryTypes: ['paint'] });
      } catch (e) {
        console.warn('FCP monitoring not available');
      }
    }

    // Measure TTFB (Time to First Byte)
    if (performance.timing) {
      const ttfb = performance.timing.responseStart - performance.timing.navigationStart;
      metrics.ttfb = ttfb > 0 ? ttfb : undefined;
    }
  }

  return metrics;
}

/**
 * Report metrics to analytics
 */
export function reportMetrics(metrics: PerformanceMetrics): void {
  if (typeof window === 'undefined') return;

  // Send to analytics service
  if ((window as any).gtag) {
    Object.entries(metrics).forEach(([key, value]) => {
      if (value !== undefined) {
        (window as any).gtag('event', `web_vital_${key}`, {
          value: Math.round(value),
          event_category: 'web_vitals',
        });
      }
    });
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Performance Metrics:', metrics);
  }
}

/**
 * Measure image loading performance
 */
export function measureImageLoadTime(src: string): Promise<number> {
  return new Promise((resolve) => {
    const startTime = performance.now();
    const img = new Image();
    img.onload = () => {
      const loadTime = performance.now() - startTime;
      resolve(loadTime);
    };
    img.onerror = () => {
      resolve(-1); // Error loading image
    };
    img.src = src;
  });
}

/**
 * Get current performance metrics
 */
export function getCurrentMetrics(): PerformanceMetrics {
  const metrics: PerformanceMetrics = {};

  if (typeof window !== 'undefined' && performance) {
    const perfData = performance.timing;
    if (perfData) {
      metrics.ttfb = perfData.responseStart - perfData.navigationStart;
      metrics.fcp = perfData.domContentLoadedEventEnd - perfData.navigationStart;
    }
  }

  return metrics;
}
