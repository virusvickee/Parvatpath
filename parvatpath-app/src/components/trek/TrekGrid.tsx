'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Trek } from '@/types';
import TrekCard from './TrekCard';
import { SkeletonCard } from '../ui/SkeletonCard';

interface TrekGridProps {
  treks: Trek[];
  loading: boolean;
}

export default function TrekGrid({ treks, loading }: TrekGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get('sort') || 'popular';

  const updateSort = (sortVal: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', sortVal);
    router.push(`/treks?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      {/* Top Bar info */}
      <div className="flex justify-between items-center bg-bg-card/30 border border-border/40 p-4 rounded-xl">
        <span className="text-text-secondary text-sm">
          Showing <span className="text-text-primary font-bold">{treks.length}</span> treks
        </span>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-muted uppercase font-bold md:block hidden">Sort By:</span>
          <select
            value={currentSort}
            onChange={(e) => updateSort(e.target.value)}
            className="bg-bg-card border border-border text-text-primary text-xs px-3 py-2 rounded-lg focus:border-accent outline-none"
          >
            <option value="popular">Popularity</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="duration">Duration</option>
          </select>
        </div>
      </div>

      {/* Grid Content */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      ) : treks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {treks.map((trek) => (
            <div key={trek._id}>
              <TrekCard trek={trek} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-bg-card border border-border rounded-xl space-y-3">
          <p className="text-text-secondary text-lg font-bold">No Treks Match Your Filters</p>
          <p className="text-text-muted text-sm max-w-md mx-auto">
            Try adjusting your search criteria, region filters, or budget constraint to locate available routes.
          </p>
        </div>
      )}
    </div>
  );
}
