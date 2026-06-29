'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import TrekHero from '@/components/trek/TrekHero';
import TrekTabs from '@/components/trek/TrekTabs';
import TrekBatches from '@/components/trek/TrekBatches';
import TrekBookingSidebar from '@/components/trek/TrekBookingSidebar';
import TrekCard from '@/components/trek/TrekCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Trek } from '@/types';

interface PageProps {
  params: {
    slug: string;
  };
}

export default function TrekDetailPage({ params }: PageProps) {
  const [trek, setTrek] = useState<Trek | null>(null);
  const [relatedTreks, setRelatedTreks] = useState<Trek[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTrekDetails() {
      try {
        const res = await fetch('/api/treks');
        if (res.ok) {
          const allTreks: Trek[] = await res.json();
          const current = allTreks.find((t) => t.slug === params.slug);
          if (current) {
            setTrek(current);
            setRelatedTreks(
              allTreks.filter((t) => t.slug !== current.slug && t.isActive).slice(0, 3)
            );
          }
        }
      } catch (err) {
        console.error('Failed to load trek details:', err);
      } finally {
        setLoading(false);
      }
    }
    loadTrekDetails();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <p className="text-text-secondary">Loading trek details...</p>
      </div>
    );
  }

  if (!trek) {
    notFound();
  }

  return (
    <div className="bg-bg-primary text-text-primary min-h-screen pb-20">
      {/* Trek Hero */}
      <TrekHero trek={trek} />

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main info (col-span-2) */}
          <div className="lg:col-span-2 space-y-10">
            {/* Tabs details */}
            <TrekTabs trek={trek} />

            {/* Batch tables explicitly rendered below tabs for ease of view */}
            <hr className="border-border/40" />
            <TrekBatches batches={trek.batches} slug={trek.slug} />
          </div>

          {/* Sticky booking sidebar (col-span-1) */}
          <div className="lg:col-span-1">
            <TrekBookingSidebar trek={trek} slug={trek.slug} />
          </div>
        </div>

        {/* Related Treks Section */}
        {relatedTreks.length > 0 && (
          <div className="mt-20 pt-10 border-t border-border/40">
            <SectionHeader
              title="You Might Also Like"
              subtitle="Similar high-altitude expeditions and gorgeous alpine treks curated for your passion."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedTreks.map((t) => (
                <div key={t._id}>
                  <TrekCard trek={t} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
