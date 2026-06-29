'use client';

import { useState, useEffect } from 'react';
import BlogGrid from '@/components/blog/BlogGrid';
import { cn } from '@/lib/utils';
import { Blog } from '@/types';

export default function BlogListingPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<'All' | 'Trek Tips' | 'Gear' | 'Destinations' | 'Safety'>('All');

  const categories = ['All', 'Trek Tips', 'Gear', 'Destinations', 'Safety'] as const;

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch('/api/blogs')
        if (res.ok) {
          const data = await res.json()
          setBlogs(data)
        }
      } catch (err) {
        console.error('Failed to fetch blogs:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  const filteredBlogs = activeCategory === 'All'
    ? blogs
    : blogs.filter((b) => b.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 min-h-[600px]">
      {/* Header */}
      <div className="mb-10 text-left">
        <h1 className="font-heading text-3xl md:text-5xl font-extrabold mb-3">
          Himalayan Whispers & Stories
        </h1>
        <p className="text-text-secondary font-body text-sm md:text-base max-w-2xl leading-relaxed">
          Expert recommendations, packing checksheets, altitude safety manuals, and detailed stories direct from the field.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-border/40 pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              'px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full border transition-all duration-300 font-body',
              activeCategory === cat
                ? 'bg-accent text-white border-accent'
                : 'bg-bg-card hover:bg-bg-hover text-text-secondary border-border hover:text-white'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="animate-fade-up">
        {loading ? (
          <div className="text-center py-20 text-text-secondary">Loading blogs...</div>
        ) : (
          <BlogGrid blogs={filteredBlogs} />
        )}
      </div>
    </div>
  );
}
