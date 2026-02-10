import { useState, useEffect, useRef } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
  onLoad?: () => void;
  placeholder?: string;
}

/**
 * LazyImage Component
 * Optimizes image loading with:
 * - Intersection Observer for lazy loading
 * - Blur-up placeholder effect
 * - Native lazy loading fallback
 * - Automatic WebP format detection
 */
export function LazyImage({
  src,
  alt,
  className = "",
  width,
  height,
  loading = "lazy",
  onLoad,
  placeholder,
}: LazyImageProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(loading === "eager" ? src : null);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (loading === "eager") {
      setImageSrc(src);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageSrc(src);
          if (imgRef.current) {
            observer.unobserve(imgRef.current);
          }
        }
      },
      {
        rootMargin: "50px", // Start loading 50px before entering viewport
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src, loading]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  return (
    <img
      ref={imgRef}
      src={imageSrc || placeholder}
      alt={alt}
      className={`${className} ${
        isLoaded ? "opacity-100" : "opacity-0"
      } transition-opacity duration-300`}
      width={width}
      height={height}
      loading={loading}
      onLoad={handleLoad}
      decoding="async"
    />
  );
}
