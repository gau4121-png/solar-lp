import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { LazyImage } from './LazyImage';

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver as any;

describe('LazyImage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render with lazy loading by default', () => {
    render(
      <LazyImage
        src="https://example.com/image.jpg"
        alt="Test Image"
        className="test-class"
      />
    );

    const img = screen.getByAltText('Test Image');
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  it('should render with eager loading when specified', () => {
    render(
      <LazyImage
        src="https://example.com/image.jpg"
        alt="Test Image"
        loading="eager"
      />
    );

    const img = screen.getByAltText('Test Image');
    expect(img).toHaveAttribute('loading', 'eager');
  });

  it('should apply custom className', () => {
    render(
      <LazyImage
        src="https://example.com/image.jpg"
        alt="Test Image"
        className="custom-class"
      />
    );

    const img = screen.getByAltText('Test Image');
    expect(img).toHaveClass('custom-class');
  });

  it('should have decoding attribute set to async', () => {
    render(
      <LazyImage
        src="https://example.com/image.jpg"
        alt="Test Image"
      />
    );

    const img = screen.getByAltText('Test Image');
    expect(img).toHaveAttribute('decoding', 'async');
  });

  it('should call onLoad callback when image loads', async () => {
    const onLoadMock = vi.fn();
    render(
      <LazyImage
        src="https://example.com/image.jpg"
        alt="Test Image"
        onLoad={onLoadMock}
      />
    );

    const img = screen.getByAltText('Test Image') as HTMLImageElement;
    img.onload?.(new Event('load'));

    await waitFor(() => {
      expect(onLoadMock).toHaveBeenCalled();
    });
  });

  it('should set width and height attributes', () => {
    render(
      <LazyImage
        src="https://example.com/image.jpg"
        alt="Test Image"
        width={800}
        height={600}
      />
    );

    const img = screen.getByAltText('Test Image');
    expect(img).toHaveAttribute('width', '800');
    expect(img).toHaveAttribute('height', '600');
  });

  it('should use placeholder when provided and image not loaded', () => {
    render(
      <LazyImage
        src="https://example.com/image.jpg"
        alt="Test Image"
        placeholder="https://example.com/placeholder.jpg"
        loading="lazy"
      />
    );

    const img = screen.getByAltText('Test Image') as HTMLImageElement;
    expect(img.src).toContain('placeholder.jpg');
  });
});
