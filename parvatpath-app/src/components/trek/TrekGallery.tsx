'use client';

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface TrekGalleryProps {
  gallery: string[];
}

export default function TrekGallery({ gallery }: TrekGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!gallery || gallery.length === 0) {
    return (
      <div className="text-center py-10 bg-bg-card border border-border rounded-xl">
        <p className="text-text-secondary text-sm">No photos uploaded for this trek yet.</p>
      </div>
    );
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) =>
        prev === 0 ? gallery.length - 1 : (prev as number) - 1
      );
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) =>
        prev === gallery.length - 1 ? 0 : (prev as number) + 1
      );
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-heading text-xl font-bold text-text-primary mb-4">
        Trek Gallery
      </h3>

      {/* Masonry Columns */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {gallery.map((image, index) => (
          <div
            key={index}
            onClick={() => setLightboxIndex(index)}
            className="break-inside-avoid overflow-hidden rounded-xl border border-border cursor-pointer group relative"
          >
            <img
              src={image}
              alt={`Trek photo ${index + 1}`}
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="bg-accent text-white px-4 py-2 rounded-full text-xs font-bold font-body">
                Zoom Photo
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-up"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Nav Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image */}
          <div className="max-w-4xl max-h-[80vh]">
            <img
              src={gallery[lightboxIndex]}
              alt={`Trek photo zoomed ${lightboxIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain rounded-lg border border-white/10 shadow-2xl"
            />
            <div className="text-center text-xs text-text-secondary mt-4 font-body">
              Image {lightboxIndex + 1} of {gallery.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
