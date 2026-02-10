import { useEffect, useState } from 'react';
import { initializePerformanceMonitoring, reportMetrics, PerformanceMetrics } from '@/lib/performanceMonitoring';

/**
 * Hook to initialize and track performance metrics
 */
export function usePerformanceMonitoring() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});

  useEffect(() => {
    // Initialize performance monitoring
    const initialMetrics = initializePerformanceMonitoring();
    setMetrics(initialMetrics);

    // Report metrics after a delay to allow all metrics to be collected
    const timer = setTimeout(() => {
      reportMetrics(initialMetrics);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return metrics;
}
