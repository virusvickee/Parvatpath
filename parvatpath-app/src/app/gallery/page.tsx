'use client';

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Mountain } from 'lucide-react';

export default function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const images = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
    'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800',
    'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=700',
    'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=700',
    'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=700',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600',
  ];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) =>
        prev === 0 ? images.length - 1 : (prev as number) - 1
      );
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) =>
        prev === images.length - 1 ? 0 : (prev as number) + 1
      );
    }
  };

  return (
    <div className="bg-bg-primary text-text-primary min-h-screen pb-20 font-body">
      {/* Header */}
      <section className="py-16 px-6 text-center bg-bg-card/45 border-b border-border/40">
        <div className="max-w-3xl mx-auto space-y-3">
          <Mountain className="w-10 h-10 text-accent mx-auto" />
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight">Himalayan Photo Gallery</h1>
          <p className="text-text-secondary text-sm md:text-base mt-2 max-w-xl mx-auto">
            High quality shots of routes, campsites, frozen lakes, and high-altitude peaks captured by our climbers.
          </p>
        </div>
      </section>

      {/* Masonry */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxIndex(idx)}
              className="break-inside-avoid overflow-hidden rounded-xl border border-border cursor-pointer group relative"
            >
              <img
                src={img}
                alt={`Himalayas photo ${idx + 1}`}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-accent text-white px-4 py-2 rounded-full text-xs font-bold font-body">
                  Zoom Photo
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-up"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Controls */}
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
              src={images[lightboxIndex]}
              alt={`Zoomed mountain view ${lightboxIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain rounded-lg border border-white/10 shadow-2xl"
            />
            <div className="text-center text-xs text-text-secondary mt-4 font-body font-semibold">
              Image {lightboxIndex + 1} of {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
