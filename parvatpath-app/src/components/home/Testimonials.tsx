'use client';

import { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Testimonial } from '@/types';

const LOCAL_TESTIMONIALS: Testimonial[] = [
  {
    _id: 't1',
    name: 'Aarav Sharma',
    trekName: 'Kedarkantha Winter Trek',
    rating: 5,
    comment: 'An incredible experience. The guides from Parvatpath were exceptionally professional and safety-conscious. Camp sites were extremely clean and food was delicious!',
    date: 'Jan 2026',
    location: 'Delhi',
  },
  {
    _id: 't2',
    name: 'Sneha Patel',
    trekName: 'Valley of Flowers',
    rating: 5,
    comment: 'Trekking in monsoons was scary, but Parvatpath made it feel like a breeze. Excellent hotel choice in Ghangaria and super helpful guide who explained the local flora.',
    date: 'August 2025',
    location: 'Mumbai',
  },
  {
    _id: 't3',
    name: 'Rohan Das',
    trekName: 'Kashmir Great Lakes',
    rating: 5,
    comment: 'Best 8 days of my life! Stunning views and perfect logistics. Parvatpath handles everything smoothly so you can focus entirely on the beauty of the lakes.',
    date: 'July 2025',
    location: 'Kolkata',
  },
  {
    _id: 't4',
    name: 'Priya Nair',
    trekName: 'Har Ki Dun Trek',
    rating: 5,
    comment: 'The Valley of Gods exceeded all expectations. The 500-year-old Osla village homestay experience was truly magical. Highly recommend Parvatpath for families!',
    date: 'May 2025',
    location: 'Bengaluru',
  },
  {
    _id: 't5',
    name: 'Vikash Yadav',
    trekName: 'Kedarkantha Winter Trek',
    rating: 5,
    comment: 'My first trek and Parvatpath made it absolutely unforgettable. The summit views at sunrise are something I will never forget. Safety was paramount throughout.',
    date: 'Dec 2025',
    location: 'Jaipur',
  },
];

function getInitials(name: string) {
  return name.split(' ').map((p) => p[0]).join('').toUpperCase();
}

const AVATAR_COLORS = [
  'from-orange-500 to-amber-600',
  'from-emerald-500 to-teal-600',
  'from-blue-500 to-indigo-600',
  'from-purple-500 to-violet-600',
  'from-rose-500 to-pink-600',
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const reset = () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };

  useEffect(() => {
    reset();
    timeoutRef.current = setTimeout(
      () => setActiveIndex((p) => (p === LOCAL_TESTIMONIALS.length - 1 ? 0 : p + 1)),
      5000
    );
    return reset;
  }, [activeIndex]);

  const prev = () => setActiveIndex((p) => (p === 0 ? LOCAL_TESTIMONIALS.length - 1 : p - 1));
  const next = () => setActiveIndex((p) => (p === LOCAL_TESTIMONIALS.length - 1 ? 0 : p + 1));

  const active = LOCAL_TESTIMONIALS[activeIndex];

  return (
    <section
      className="relative py-28 px-6 md:px-12 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0A0F0D 0%, #0D1610 50%, #0A0F0D 100%)' }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(249,115,22,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="section-line" />
            <span className="text-accent text-xs font-semibold uppercase tracking-widest font-sub">
              Community Stories
            </span>
            <div className="section-line" style={{ transform: 'scaleX(-1)' }} />
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-text-primary mt-2">
            What Trekkers{' '}
            <span className="text-gradient-accent">Say</span>
          </h2>
          <p className="text-text-secondary font-body text-sm md:text-base mt-3 max-w-lg mx-auto">
            Raw, verified accounts from our Himalayan community across India.
          </p>
        </div>

        {/* Thumbnail Strip (small avatars) */}
        <div className="flex justify-center gap-3 mb-8">
          {LOCAL_TESTIMONIALS.map((t, idx) => (
            <button
              key={t._id}
              onClick={() => setActiveIndex(idx)}
              className="transition-all duration-300 flex flex-col items-center gap-1"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-sm text-white bg-gradient-to-br ${AVATAR_COLORS[idx]} transition-all duration-300`}
                style={{
                  boxShadow: activeIndex === idx ? '0 0 0 3px #F97316, 0 0 20px rgba(249,115,22,0.3)' : '0 0 0 2px rgba(42,63,45,0.5)',
                  opacity: activeIndex === idx ? 1 : 0.5,
                  transform: activeIndex === idx ? 'scale(1.1)' : 'scale(1)',
                }}
              >
                {getInitials(t.name)}
              </div>
            </button>
          ))}
        </div>

        {/* Active Testimonial Card */}
        <div className="relative max-w-3xl mx-auto">
          {/* Nav Buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-10 h-10 rounded-full flex items-center justify-center transition-all hidden md:flex"
            style={{ background: 'rgba(17,26,20,0.9)', border: '1px solid #2A3F2D' }}
          >
            <ChevronLeft className="w-5 h-5 text-text-secondary hover:text-accent transition-colors" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-10 h-10 rounded-full flex items-center justify-center transition-all hidden md:flex"
            style={{ background: 'rgba(17,26,20,0.9)', border: '1px solid #2A3F2D' }}
          >
            <ChevronRight className="w-5 h-5 text-text-secondary hover:text-accent transition-colors" />
          </button>

          {/* Card */}
          <div
            key={active._id}
            className="relative p-8 md:p-12 rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #111A14 0%, #0D1610 100%)',
              border: '1px solid #2A3F2D',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
              animation: 'fadeIn 0.4s ease-out',
            }}
          >
            {/* Large quote icon */}
            <Quote
              className="absolute top-6 right-6 w-16 h-16 pointer-events-none"
              style={{ color: 'rgba(249,115,22,0.07)' }}
            />

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i <= active.rating ? 'text-gold fill-gold' : 'text-border'}`}
                />
              ))}
            </div>

            {/* Comment */}
            <p className="font-body text-text-primary text-lg md:text-xl leading-relaxed italic mb-8 relative z-10">
              &ldquo;{active.comment}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-heading font-extrabold text-sm text-white bg-gradient-to-br ${AVATAR_COLORS[activeIndex]}`}
                >
                  {getInitials(active.name)}
                </div>
                <div>
                  <div className="font-heading font-bold text-text-primary">{active.name}</div>
                  <div className="text-accent text-xs font-sub font-medium">{active.trekName}</div>
                  <div className="text-text-muted text-xs font-body mt-0.5">{active.location} · {active.date}</div>
                </div>
              </div>

              {/* Verified badge */}
              <span
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-sub font-semibold text-success"
                style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-success" />
                Verified Trekker
              </span>
            </div>

            {/* Bottom accent */}
            <div
              className="absolute bottom-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.3), transparent)' }}
            />
          </div>
        </div>

        {/* Dot Navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {LOCAL_TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className="h-2 rounded-full transition-all duration-400"
              style={{
                width: activeIndex === idx ? '28px' : '8px',
                background: activeIndex === idx ? '#F97316' : 'rgba(42,63,45,0.6)',
              }}
            />
          ))}
        </div>

        {/* Mobile Nav */}
        <div className="flex justify-center gap-3 mt-6 md:hidden">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(17,26,20,0.9)', border: '1px solid #2A3F2D' }}
          >
            <ChevronLeft className="w-5 h-5 text-text-secondary" />
          </button>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(17,26,20,0.9)', border: '1px solid #2A3F2D' }}
          >
            <ChevronRight className="w-5 h-5 text-text-secondary" />
          </button>
        </div>
      </div>
    </section>
  );
}
