'use client';

import { useState } from 'react';
import { ChevronDown, MapPin, Compass } from 'lucide-react';
import { ItineraryDay } from '@/types';
import { cn } from '@/lib/utils';

interface TrekItineraryProps {
  itinerary: ItineraryDay[];
}

export default function TrekItinerary({ itinerary }: TrekItineraryProps) {
  const [openDays, setOpenDays] = useState<Record<number, boolean>>({ 1: true }); // Open Day 1 by default

  const toggleDay = (day: number) => {
    setOpenDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  return (
    <div className="space-y-4">
      <h3 className="font-heading text-xl font-bold text-text-primary mb-4">
        Day-wise Itinerary
      </h3>

      <div className="space-y-3">
        {itinerary.map((item) => {
          const isOpen = !!openDays[item.day];

          return (
            <div
              key={item.day}
              className={cn(
                'border rounded-xl transition-all duration-300 overflow-hidden bg-bg-card',
                isOpen ? 'border-accent/40 shadow-lg' : 'border-border'
              )}
            >
              {/* Header */}
              <button
                onClick={() => toggleDay(item.day)}
                className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-bg-hover"
              >
                <div className="flex gap-4 items-center">
                  <div className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center font-heading font-extrabold text-sm border shrink-0 transition-colors',
                    isOpen
                      ? 'bg-accent/15 border-accent text-accent'
                      : 'bg-bg-primary border-border text-text-secondary'
                  )}>
                    D{item.day}
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-text-primary text-sm md:text-base">
                      {item.title}
                    </h4>
                    <div className="flex gap-4 items-center text-xs text-text-muted mt-1 font-body">
                      {item.distance && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-accent" /> {item.distance}
                        </span>
                      )}
                      {item.altitude && (
                        <span className="flex items-center gap-1">
                          <Compass className="w-3.5 h-3.5 text-accent" /> {item.altitude}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <ChevronDown
                  className={cn(
                    'w-5 h-5 text-text-secondary transition-transform duration-300',
                    isOpen && 'transform rotate-180 text-accent'
                  )}
                />
              </button>

              {/* Body */}
              <div
                className={cn(
                  'transition-all duration-300 ease-in-out border-t border-border/40 font-body text-sm text-text-secondary leading-relaxed bg-bg-card/50',
                  isOpen ? 'max-h-[500px] p-5 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                )}
              >
                {item.description}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
