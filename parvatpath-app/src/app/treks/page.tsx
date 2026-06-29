'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import TrekFilters from '@/components/trek/TrekFilters';
import TrekGrid from '@/components/trek/TrekGrid';
import { Trek } from '@/types';
import { Filter } from 'lucide-react';

function TrekListingContent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [allTreks, setAllTreks] = useState<Trek[]>([]);
  const [filteredTreks, setFilteredTreks] = useState<Trek[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Load all treks from MongoDB
  useEffect(() => {
    async function loadTreks() {
      try {
        const res = await fetch('/api/treks');
        if (res.ok) {
          const data = await res.json();
          setAllTreks(data);
        }
      } catch (err) {
        console.error('Failed to load treks:', err);
      } finally {
        setLoading(false);
      }
    }
    loadTreks();
  }, []);

  // Filter local state based on searchParams
  useEffect(() => {
    if (allTreks.length === 0) return;

    // Read params
    const search = searchParams.get('search') || '';
    const district = searchParams.get('district') || '';
    const difficulty = searchParams.get('difficulty') || '';
    const duration = searchParams.get('duration') || '';
    const month = searchParams.get('month') || '';
    const maxPrice = Number(searchParams.get('maxPrice') || '30000');
    const sort = searchParams.get('sort') || 'popular';

    let results = [...allTreks];

    // Filter by search query
    if (search) {
      const query = search.toLowerCase();
      results = results.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.region.toLowerCase().includes(query) ||
          t.highlights.some((h) => h.toLowerCase().includes(query))
      );
    }

    // Filter by district (subRegion)
    if (district) {
      results = results.filter((t) => t.subRegion === district);
    }

    // Filter by difficulty
    if (difficulty) {
      results = results.filter((t) => t.difficulty === difficulty);
    }

    // Filter by duration
    if (duration) {
      results = results.filter((t) => {
        const days = t.duration.days;
        if (duration === '2-3') return days >= 2 && days <= 3;
        if (duration === '4-5') return days >= 4 && days <= 5;
        if (duration === '6-7') return days >= 6 && days <= 7;
        if (duration === '7+') return days >= 7;
        return true;
      });
    }

    // Filter by month
    if (month) {
      results = results.filter((t) => t.bestSeason.includes(month));
    }

    // Filter by max price
    results = results.filter((t) => t.startingPrice <= maxPrice);

    // Sort
    if (sort === 'price-asc') {
      results.sort((a, b) => a.startingPrice - b.startingPrice);
    } else if (sort === 'price-desc') {
      results.sort((a, b) => b.startingPrice - a.startingPrice);
    } else if (sort === 'duration') {
      results.sort((a, b) => b.duration.days - a.duration.days);
    } else {
      // default / popular: sort by rating & reviewCount
      results.sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount);
    }

    setFilteredTreks(results);
  }, [searchParams, allTreks]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Page Header */}
      <div className="mb-10 text-left">
        <div className="flex items-center gap-3 mb-3">
          <div className="section-line" />
          <span className="text-accent text-xs font-semibold uppercase tracking-widest font-sub">
            All Adventures
          </span>
        </div>
        <h1 className="font-heading text-3xl md:text-5xl font-extrabold mb-3 leading-tight">
          Explore <span className="text-gradient-accent">Himalayan</span> Treks
        </h1>
        <p className="text-text-secondary font-body text-sm md:text-base max-w-2xl leading-relaxed">
          Book direct slots on standard, monsoon, and frozen lake trails. All operations managed by certified mountaineers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar (col-span-1) */}
        <div className="hidden lg:block lg:col-span-1">
          <TrekFilters />
        </div>

        {/* Mobile Filters Trigger */}
        <div className="lg:hidden w-full flex justify-end">
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="flex items-center gap-2 bg-bg-card border border-border px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-text-primary"
          >
            <Filter className="w-4 h-4 text-accent" /> Filters
          </button>
        </div>

        {/* Mobile Filters bottom-sheet backdrop / container */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden flex justify-end">
            <div className="w-[85%] max-w-sm bg-bg-primary h-full overflow-y-auto p-6 flex flex-col gap-4 shadow-2xl relative animate-fade-up">
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="absolute top-4 right-4 text-text-secondary hover:text-accent font-bold"
              >
                Close
              </button>
              <div className="mt-8" onClick={() => setMobileFiltersOpen(false)}>
                <TrekFilters />
              </div>
            </div>
          </div>
        )}

        {/* Content area (col-span-3) */}
        <div className="lg:col-span-3">
          <TrekGrid treks={filteredTreks} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default function TrekListingPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-6 py-20 text-center text-text-secondary">
        Loading listing page...
      </div>
    }>
      <TrekListingContent />
    </Suspense>
  );
}
