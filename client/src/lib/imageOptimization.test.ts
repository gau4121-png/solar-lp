import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  generateResponsiveImageSizes,
  supportsWebP,
  isWebPSupported,
  getOptimizedImageUrl,
  calculateImageDimensions,
  preloadImage,
  preloadImages,
} from './imageOptimization';

describe('Image Optimization Utilities', () => {
  describe('generateResponsiveImageSizes', () => {
    it('should generate responsive image sizes with default sizes', () => {
      const result = generateResponsiveImageSizes('https://example.com/image.jpg');
      expect(result).toContain('320w');
      expect(result).toContain('640w');
      expect(result).toContain('1024w');
      expect(result).toContain('1280w');
    });

    it('should generate responsive image sizes with custom sizes', () => {
      const result = generateResponsiveImageSizes('https://example.com/image.jpg', [
        400,
        800,
        1200,
      ]);
      expect(result).toContain('400w');
      expect(result).toContain('800w');
      expect(result).toContain('1200w');
    });
  });

  describe('supportsWebP', () => {
    it('should detect WebP support', () => {
      const result = supportsWebP();
      expect(typeof result).toBe('boolean');
    });
  });

  describe('isWebPSupported', () => {
    it('should return memoized WebP support result', () => {
      const result1 = isWebPSupported();
      const result2 = isWebPSupported();
      expect(result1).toBe(result2);
      expect(typeof result1).toBe('boolean');
    });
  });

  describe('getOptimizedImageUrl', () => {
    it('should return URL as-is for external CDN', () => {
      const url = 'https://example.com/image.jpg';
      const result = getOptimizedImageUrl(url);
      expect(result).toBe(url);
    });

    it('should accept options parameter', () => {
      const url = 'https://example.com/image.jpg';
      const result = getOptimizedImageUrl(url, { format: 'webp', quality: 80 });
      expect(result).toBe(url);
    });
  });

  describe('calculateImageDimensions', () => {
    it('should calculate dimensions with default 16:9 aspect ratio', () => {
      const result = calculateImageDimensions(800);
      expect(result.width).toBe(800);
      expect(result.height).toBe(450); // 800 / (16/9)
    });

    it('should calculate dimensions with custom aspect ratio', () => {
      const result = calculateImageDimensions(800, 1);
      expect(result.width).toBe(800);
      expect(result.height).toBe(800);
    });

    it('should calculate dimensions with square aspect ratio', () => {
      const result = calculateImageDimensions(600, 1);
      expect(result.width).toBe(600);
      expect(result.height).toBe(600);
    });
  });

  describe('preloadImage', () => {
    it('should resolve when image loads successfully', async () => {
      const mockImage = {
        onload: null as any,
        onerror: null as any,
        src: '',
      };

      const ImageMock = vi.fn(() => mockImage);
      global.Image = ImageMock as any;

      const promise = preloadImage('https://example.com/image.jpg');

      // Simulate image load
      setTimeout(() => {
        mockImage.onload?.();
      }, 0);

      await expect(promise).resolves.toBeUndefined();
    });

    it('should reject when image fails to load', async () => {
      const mockImage = {
        onload: null as any,
        onerror: null as any,
        src: '',
      };

      const ImageMock = vi.fn(() => mockImage);
      global.Image = ImageMock as any;

      const promise = preloadImage('https://example.com/invalid.jpg');

      // Simulate image error
      setTimeout(() => {
        mockImage.onerror?.();
      }, 0);

      await expect(promise).rejects.toThrow();
    });
  });

  describe('preloadImages', () => {
    it('should preload multiple images', async () => {
      const mockImage = {
        onload: null as any,
        onerror: null as any,
        src: '',
      };

      const ImageMock = vi.fn(() => ({ ...mockImage }));
      global.Image = ImageMock as any;

      const urls = [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
      ];

      const promise = preloadImages(urls);

      // Simulate successful loads
      setTimeout(() => {
        mockImage.onload?.();
      }, 0);

      // Should not throw even if some fail
      await expect(promise).resolves.toBeUndefined();
    });
  });
});
