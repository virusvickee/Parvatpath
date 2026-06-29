'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import TrekCard from '../trek/TrekCard';
import { cn } from '@/lib/utils';
import { Trek } from '@/types';
import { ArrowRight, Compass } from 'lucide-react';

type Season = 'All' | 'Winter' | 'Summer' | 'Monsoon' | 'Post-Monsoon';

const TABS: Season[] = ['All', 'Winter', 'Summer', 'Monsoon', 'Post-Monsoon'];

const SEASON_MONTHS: Record<string, string[]> = {
  Winter: ['December', 'January', 'February', 'March'],
  Summer: ['April', 'May', 'June'],
  Monsoon: ['July', 'August'],
  'Post-Monsoon': ['September', 'October', 'November'],
};

export default function FeaturedTreks() {
  const [allTreks, setAllTreks] = useState<Trek[]>([]);
  const [activeTab, setActiveTab] = useState<Season>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeatured() {
      try {
        const res = await fetch('/api/treks');
        if (res.ok) {
          const data = await res.json();
          setAllTreks(data);
        }
      } catch (err) {
        console.error('Failed to load featured treks:', err);
      } finally {
        setLoading(false);
      }
    }
    loadFeatured();
  }, []);

  const filteredTreks = allTreks
    .filter((t) => t.isFeatured && t.isActive)
    .filter((t) => {
      if (activeTab === 'All') return true;
      return t.bestSeason.some((m) => (SEASON_MONTHS[activeTab] || []).includes(m));
    })
    .slice(0, 6);

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="section-line" />
            <span className="text-accent text-xs font-semibold uppercase tracking-widest font-sub">
              Handpicked Adventures
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-text-primary leading-tight">
            Featured Himalayan
            <br />
            <span className="text-gradient-accent">Treks</span>
          </h2>
          <p className="text-text-secondary font-body text-sm md:text-base mt-3 max-w-lg leading-relaxed">
            Expert-led expeditions with top-notch safety, comfortable logistics and local mountain knowledge.
          </p>
        </div>

        <Link
          href="/treks"
          className="flex items-center gap-2 text-accent font-sub font-semibold text-sm hover:gap-3 transition-all shrink-0 group"
        >
          View All Treks
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Season Tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded-full border transition-all duration-300 font-sub',
              activeTab === tab
                ? 'bg-accent text-white border-accent shadow-glow-sm'
                : 'text-text-secondary border-border hover:border-border-light hover:text-text-primary'
            )}
            style={activeTab !== tab ? { background: 'rgba(17,26,20,0.8)' } : {}}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Trek Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="rounded-2xl overflow-hidden" style={{ border: '1px solid #1E2E20' }}>
              <div className="h-56 shimmer" />
              <div className="p-5 space-y-3">
                <div className="h-4 shimmer rounded w-3/4" />
                <div className="h-3 shimmer rounded w-1/2" />
                <div className="h-3 shimmer rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredTreks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTreks.map((trek, idx) => (
            <div
              key={trek._id}
              style={{
                opacity: 0,
                animation: `fadeUp 0.6s ease-out ${idx * 0.1}s both`,
              }}
            >
              <TrekCard trek={trek} />
            </div>
          ))}
        </div>
      ) : (
        <div
          className="text-center py-20 rounded-2xl flex flex-col items-center gap-4"
          style={{ background: 'rgba(17,26,20,0.6)', border: '1px solid #1E2E20' }}
        >
          <Compass className="w-12 h-12 text-text-muted" />
          <p className="text-text-secondary font-sub">No treks matching this season right now.</p>
          <Link href="/treks" className="text-accent font-sub text-sm hover:underline">
            Browse all treks →
          </Link>
        </div>
      )}
    </section>
  );
}
