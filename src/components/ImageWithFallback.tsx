import React, { useState } from 'react';
import { PawPrint } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
}

export function ImageWithFallback({
  src,
  alt,
  className = '',
  loading = 'lazy',
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-3 bg-surface-warm text-muted-foreground p-6 text-center ${className}`}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pastel-green text-primary">
          <PawPrint className="h-6 w-6" aria-hidden="true" />
        </div>
        <span className="text-sm font-semibold text-foreground/80 max-w-[22ch]">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
