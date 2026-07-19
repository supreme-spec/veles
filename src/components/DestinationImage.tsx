'use client';

import { useState } from 'react';
import Image from 'next/image';

interface DestinationImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export function DestinationImage({
  src,
  alt,
  width = 600,
  height = 400,
  className = ''
}: DestinationImageProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div
        className={`w-full h-32 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center ${className}`}
      >
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`w-full h-full object-cover ${className}`}
      onError={() => setError(true)}
    />
  );
}
