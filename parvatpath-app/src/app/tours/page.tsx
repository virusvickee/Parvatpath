'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Clock, Check, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { Tour } from '@/types';

export default function ToursPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<'All' | 'Leisure' | 'Char Dham' | 'Group' | 'Corporate'>('All');

  const categories = ['All', 'Leisure', 'Char Dham', 'Group', 'Corporate'] as const;

  useEffect(() => {
    async function fetchTours() {
      try {
        const res = await fetch('/api/tours');
        if (res.ok) {
          const data = await res.json();
          setTours(data);
        }
      } catch (err) {
        console.error('Failed to fetch tours:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchTours();
  }, []);

  const filteredTours = activeCategory === 'All'
    ? tours
    : tours.filter((t) => t.type === activeCategory);

  const handleBookTour = (tourName: string) => {
    alert(`Booking flow for "${tourName}" is under development.`);
  };

  return (
    <div className="bg-bg-primary text-text-primary min-h-screen pb-20 font-body">
      {/* Header */}
      <section className="py-16 px-6 text-center bg-bg-card/45 border-b border-border/40">
        <h1 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight">Leisure & Group Tour Packages</h1>
        <p className="text-text-secondary text-sm md:text-base mt-2 max-w-xl mx-auto">
          From corporate team retreats to custom pilgrimage packages, discover professional local planning at its finest.
        </p>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 justify-center border-b border-border/40 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full border transition-all duration-300',
                activeCategory === cat
                  ? 'bg-accent text-white border-accent'
                  : 'bg-bg-card hover:bg-bg-hover text-text-secondary border-border hover:text-white'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tours Grid */}
        {loading ? (
          <div className="text-center py-20 text-text-secondary">Loading tour packages...</div>
        ) : filteredTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-up">
            {filteredTours.map((tour) => (
              <Card key={tour._id} hover={true} className="bg-bg-card border border-border rounded-2xl overflow-hidden p-0 flex flex-col h-full">
                <div className="h-60 relative w-full overflow-hidden shrink-0">
                  <img
                    src={tour.coverImage}
                    alt={tour.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-accent text-white px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                      {tour.type}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between flex-grow gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-heading text-xl font-bold text-text-primary">
                        {tour.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-accent text-xs font-bold uppercase tracking-wider shrink-0 bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
                        <Clock className="w-3.5 h-3.5" /> {tour.duration.days}D / {tour.duration.nights}N
                      </div>
                    </div>

                    <p className="text-text-secondary text-sm leading-relaxed">
                      {tour.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-2">
                      <span className="text-xs uppercase font-extrabold tracking-wider text-text-muted">Highlights</span>
                      <ul className="space-y-1.5 text-xs text-text-secondary pl-1">
                        {tour.highlights.map((h, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/50 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-text-muted uppercase tracking-wider block">Price starts at</span>
                      <span className="font-heading font-extrabold text-2xl text-text-primary">
                        {formatPrice(tour.startingPrice)}
                      </span>
                    </div>
                    <Button onClick={() => handleBookTour(tour.name)} size="sm" className="gap-1.5">
                      Book Package <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-bg-card border border-border rounded-xl">
            <p className="text-text-secondary text-sm">No packages found for this category at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
