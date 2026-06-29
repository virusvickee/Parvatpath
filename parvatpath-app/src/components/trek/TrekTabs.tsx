'use client';

import { useState } from 'react';
import { Check, X, ShieldAlert, Sparkles, MapPin, Gauge } from 'lucide-react';
import { Trek } from '@/types';
import TrekItinerary from './TrekItinerary';
import TrekGallery from './TrekGallery';
import TrekReviews from './TrekReviews';
import { cn } from '@/lib/utils';

interface TrekTabsProps {
  trek: Trek;
}

export default function TrekTabs({ trek }: TrekTabsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'inclusions' | 'gallery' | 'reviews'>('overview');

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'itinerary', name: 'Itinerary' },
    { id: 'inclusions', name: 'Inclusions' },
    { id: 'gallery', name: 'Gallery' },
    { id: 'reviews', name: 'Reviews' },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Tab Navigation header */}
      <div className="flex border-b border-border overflow-x-auto scrollbar-none gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'px-5 py-3.5 text-sm font-semibold transition-all border-b-2 whitespace-nowrap font-sub shrink-0 uppercase tracking-wider',
              activeTab === tab.id
                ? 'border-accent text-accent'
                : 'border-transparent text-text-secondary hover:text-text-primary'
            )}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab content area */}
      <div className="min-h-[300px]">
        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-up font-body text-sm text-text-secondary leading-relaxed">
            {/* Description */}
            <div
              className="prose prose-invert max-w-none text-text-secondary prose-p:leading-relaxed prose-headings:font-heading prose-a:text-accent"
              dangerouslySetInnerHTML={{ __html: trek.description }}
            />

            {/* Highlights */}
            <div className="glass-dark border border-border p-6 rounded-2xl space-y-4 shadow-glow-card relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
              <h4 className="font-heading text-lg font-bold text-text-primary flex items-center gap-2 relative z-10">
                <Sparkles className="w-5 h-5 text-accent" /> Trek Highlights
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-2 relative z-10">
                {trek.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Map Placeholder & Visual Difficulty Meter */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Difficulty visual gauge */}
              <div className="glass border border-border p-6 rounded-2xl flex flex-col justify-between gap-4">
                <h4 className="font-heading text-base font-bold text-text-primary flex items-center gap-2">
                  <Gauge className="w-5 h-5 text-accent" /> Difficulty Level Indicator
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold font-sub tracking-wider text-text-secondary uppercase">
                    <span>{trek.difficulty}</span>
                    <span className="text-accent">{trek.difficulty === 'Easy' ? '2/10' : trek.difficulty === 'Easy-Moderate' ? '4/10' : trek.difficulty === 'Moderate' ? '6/10' : trek.difficulty === 'Moderate-Difficult' ? '8/10' : '10/10'}</span>
                  </div>
                  {/* Gauge bar */}
                  <div className="bg-bg-primary h-2 rounded-full overflow-hidden" style={{ border: '1px solid #1E2E20' }}>
                    <div
                      className={cn(
                        'h-full rounded-full transition-all duration-1000',
                        trek.difficulty === 'Easy' && 'bg-green-500 w-[20%]',
                        trek.difficulty === 'Easy-Moderate' && 'bg-lime-500 w-[40%]',
                        trek.difficulty === 'Moderate' && 'bg-yellow-500 w-[60%]',
                        trek.difficulty === 'Moderate-Difficult' && 'bg-orange-500 w-[80%]',
                        trek.difficulty === 'Difficult' && 'bg-red-500 w-[100%]'
                      )}
                      style={{ boxShadow: '0 0 10px currentColor' }}
                    />
                  </div>
                </div>
                <p className="text-[11px] text-text-muted">
                  Make sure you have basic physical fitness cardio prep for at least 3 weeks before setting out.
                </p>
              </div>

              {/* Map embed placeholder */}
              <div className="glass border border-border rounded-2xl overflow-hidden min-h-[160px] relative flex items-center justify-center p-6 text-center group">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=400')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111A14] via-transparent to-transparent opacity-80" />
                <div className="relative z-10 space-y-1">
                  <MapPin className="w-6 h-6 text-accent mx-auto mb-2" />
                  <h4 className="font-heading font-bold text-text-primary text-sm">Interactive Map Embed</h4>
                  <p className="text-[11px] text-text-secondary max-w-[220px] mx-auto">
                    Full maps with tracking and trail elevations will render in Phase 2 release.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ITINERARY */}
        {activeTab === 'itinerary' && (
          <div className="animate-fade-up">
            <TrekItinerary itinerary={trek.itinerary} />
          </div>
        )}

        {/* INCLUSIONS & EXCLUSIONS */}
        {activeTab === 'inclusions' && (
          <div className="space-y-8 animate-fade-up font-body text-sm text-text-secondary">
            {/* Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Inclusions */}
              <div className="glass border border-border p-6 rounded-2xl space-y-4">
                <h4 className="font-heading text-lg font-bold text-success flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center border border-success/20">
                    <Check className="w-4 h-4" />
                  </div>
                  Included Packages
                </h4>
                <ul className="space-y-3">
                  {trek.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-text-secondary">
                      <span className="text-success font-bold shrink-0 mt-0.5">✓</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div className="glass border border-border p-6 rounded-2xl space-y-4">
                <h4 className="font-heading text-lg font-bold text-danger flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-danger/10 flex items-center justify-center border border-danger/20">
                    <X className="w-4 h-4" />
                  </div>
                  Excluded Services
                </h4>
                <ul className="space-y-3">
                  {trek.exclusions.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-text-secondary">
                      <span className="text-danger font-bold shrink-0 mt-0.5">✗</span>
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Things to bring */}
            <div className="glass-dark border border-border p-6 rounded-2xl space-y-4 relative overflow-hidden">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
              <h4 className="font-heading text-lg font-bold text-text-primary flex items-center gap-2 relative z-10">
                <ShieldAlert className="w-5 h-5 text-accent" /> Essential Packing Checklist
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 pl-2 relative z-10">
                {trek.thingsToBring.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-glow-sm" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* GALLERY */}
        {activeTab === 'gallery' && (
          <div className="animate-fade-up">
            <TrekGallery gallery={trek.gallery} />
          </div>
        )}

        {/* REVIEWS */}
        {activeTab === 'reviews' && (
          <div className="animate-fade-up">
            <TrekReviews rating={trek.rating} reviewCount={trek.reviewCount} />
          </div>
        )}
      </div>
    </div>
  );
}
