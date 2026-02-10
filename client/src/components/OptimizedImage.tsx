import { useState, useEffect, useRef } from "react";
import { isWebPSupported } from "@/lib/imageOptimization";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
  onLoad?: () => void;
  placeholder?: string;
  srcSet?: string;
  sizes?: string;
}

/**
 * OptimizedImage Component
 * Enhanced version with:
 * - WebP format detection and fallback
 * - Responsive image support (srcSet)
 * - Intersection Observer for lazy loading
 * - Blur-up placeholder effect
 * - Native lazy loading attribute
 * - Automatic format negotiation
 */
export function OptimizedImage({
  src,
  alt,
  className = "",
  width,
  height,
  loading = "lazy",
  onLoad,
  placeholder,
  srcSet,
  sizes,
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(loading === "eager" ? src : null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
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
        rootMargin: "50px",
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

  const handleError = () => {
    setHasError(true);
    console.warn(`Failed to load image: ${src}`);
  };

  // Determine if we should use WebP format
  const supportsWebP = isWebPSupported();
  const optimizedSrc = imageSrc && supportsWebP && imageSrc.endsWith('.jpg')
    ? imageSrc.replace('.jpg', '.webp')
    : imageSrc;

  return (
    <picture>
      {/* WebP format for supported browsers */}
      {supportsWebP && imageSrc?.endsWith('.jpg') && (
        <source
          srcSet={(srcSet?.replace(/\.jpg/g, '.webp') || optimizedSrc) ?? ""}
          type="image/webp"
          sizes={sizes}
        />
      )}
      
      {/* Fallback to original format */}
      <img
        ref={imgRef}
        src={imageSrc || placeholder || ""}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        className={`${className} ${
          isLoaded ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
        width={width}
        height={height}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        decoding="async"
      />
    </picture>
  );
}
