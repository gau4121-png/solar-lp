/**
 * Image Optimization Utilities
 * Provides helpers for responsive images, WebP detection, and URL optimization
 */

/**
 * Generate responsive image URLs with different sizes
 * Useful for srcset attributes
 */
export function generateResponsiveImageSizes(baseUrl: string, sizes: number[] = [320, 640, 1024, 1280]) {
  // For external CDN URLs, we would add query parameters for resizing
  // Since we're using Manus CDN, we'll return the base URL for now
  // In production, you might use a service like Cloudinary or similar
  return sizes.map(size => `${baseUrl} ${size}w`).join(', ');
}

/**
 * Check if browser supports WebP format
 */
export function supportsWebP(): boolean {
  if (typeof window === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  
  try {
    return canvas.toDataURL('image/webp').indexOf('image/webp') === 5;
  } catch {
    return false;
  }
}

/**
 * Memoized WebP support check
 */
let webpSupported: boolean | null = null;

export function isWebPSupported(): boolean {
  if (webpSupported === null) {
    webpSupported = supportsWebP();
  }
  return webpSupported;
}

/**
 * Get optimized image URL with format negotiation
 */
export function getOptimizedImageUrl(url: string, options?: { format?: 'webp' | 'auto'; quality?: number }) {
  // For external CDN URLs, return as-is
  // In production, you could add query parameters for format/quality
  // Example: url + '?fm=webp&q=80'
  return url;
}

/**
 * Calculate image dimensions for responsive layout
 */
export function calculateImageDimensions(
  containerWidth: number,
  aspectRatio: number = 16 / 9
): { width: number; height: number } {
  return {
    width: containerWidth,
    height: Math.round(containerWidth / aspectRatio),
  };
}

/**
 * Image preloading utility
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Batch preload multiple images
 */
export async function preloadImages(urls: string[]): Promise<void> {
  try {
    await Promise.all(urls.map(url => preloadImage(url)));
  } catch (error) {
    console.warn('Failed to preload some images:', error);
  }
}
