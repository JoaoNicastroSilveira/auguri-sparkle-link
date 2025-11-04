import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-3">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
        <img
          src={images[selectedImage]}
          alt={productName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={cn(
                "relative aspect-square overflow-hidden rounded-lg border-2 transition-all",
                selectedImage === index
                  ? "border-primary"
                  : "border-transparent opacity-60 hover:opacity-100"
              )}
            >
              <img
                src={img}
                alt={`${productName} - ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
