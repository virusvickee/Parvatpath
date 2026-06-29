'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { X } from 'lucide-react';

export default function TrekFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read current URL search params
  const currentDistrict = searchParams.get('district') || '';
  const currentDifficulty = searchParams.get('difficulty') || '';
  const currentDuration = searchParams.get('duration') || '';
  const currentMonth = searchParams.get('month') || '';
  const currentMaxPrice = searchParams.get('maxPrice') || '30000';

  const districts = ['Uttarkashi', 'Chamoli', 'Rudraprayag', 'Tehri', 'Pithoragarh'];
  const difficulties = ['Easy', 'Easy-Moderate', 'Moderate', 'Moderate-Difficult', 'Difficult'];
  const durations = [
    { label: 'Weekend (2-3 Days)', val: '2-3' },
    { label: 'Short (4-5 Days)', val: '4-5' },
    { label: 'Moderate (6-7 Days)', val: '6-7' },
    { label: 'Expedition (7+ Days)', val: '7+' },
  ];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Helper to construct and set query parameters
  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/treks?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push('/treks');
  };

  return (
    <div className="bg-bg-card border border-border rounded-xl p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-border/40 pb-4">
        <h3 className="font-heading text-lg font-bold text-text-primary">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-accent hover:text-accent-hover text-xs font-semibold font-body flex items-center gap-1 transition-colors"
        >
          Clear All <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* District Filter */}
      <div className="space-y-3">
        <label className="text-xs font-extrabold uppercase tracking-wider text-text-secondary">
          District
        </label>
        <div className="flex flex-col gap-2">
          {districts.map((district) => (
            <label key={district} className="flex items-center gap-2.5 text-sm text-text-secondary cursor-pointer hover:text-text-primary transition-colors">
              <input
                type="checkbox"
                checked={currentDistrict === district}
                onChange={() => updateFilter('district', currentDistrict === district ? '' : district)}
                className="w-4 h-4 rounded border-border bg-bg-primary text-accent focus:ring-accent checked:bg-accent checked:border-accent"
              />
              <span>{district}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Difficulty Filter */}
      <div className="space-y-3">
        <label className="text-xs font-extrabold uppercase tracking-wider text-text-secondary">
          Difficulty
        </label>
        <div className="flex flex-col gap-2">
          {difficulties.map((diff) => (
            <label key={diff} className="flex items-center gap-2.5 text-sm text-text-secondary cursor-pointer hover:text-text-primary transition-colors">
              <input
                type="checkbox"
                checked={currentDifficulty === diff}
                onChange={() => updateFilter('difficulty', currentDifficulty === diff ? '' : diff)}
                className="w-4 h-4 rounded border-border bg-bg-primary text-accent focus:ring-accent"
              />
              <span>{diff}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Duration Filter */}
      <div className="space-y-3">
        <label className="text-xs font-extrabold uppercase tracking-wider text-text-secondary">
          Duration
        </label>
        <div className="flex flex-col gap-2">
          {durations.map((dur) => (
            <label key={dur.val} className="flex items-center gap-2.5 text-sm text-text-secondary cursor-pointer hover:text-text-primary transition-colors">
              <input
                type="checkbox"
                checked={currentDuration === dur.val}
                onChange={() => updateFilter('duration', currentDuration === dur.val ? '' : dur.val)}
                className="w-4 h-4 rounded border-border bg-bg-primary text-accent focus:ring-accent"
              />
              <span>{dur.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Month Dropdown */}
      <div className="space-y-3">
        <label className="text-xs font-extrabold uppercase tracking-wider text-text-secondary">
          Month of Travel
        </label>
        <select
          value={currentMonth}
          onChange={(e) => updateFilter('month', e.target.value)}
          className="w-full bg-bg-primary border border-border text-text-primary text-sm px-3.5 py-2.5 rounded-lg focus:border-accent outline-none"
        >
          <option value="">Any Month</option>
          {months.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-xs font-extrabold uppercase tracking-wider text-text-secondary">
          <span>Max Price</span>
          <span className="text-accent font-bold">₹{Number(currentMaxPrice).toLocaleString('en-IN')}</span>
        </div>
        <input
          type="range"
          min="3000"
          max="30000"
          step="500"
          value={currentMaxPrice}
          onChange={(e) => updateFilter('maxPrice', e.target.value)}
          className="w-full accent-accent bg-bg-primary border-none cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-text-muted">
          <span>₹3,000</span>
          <span>₹30,000</span>
        </div>
      </div>
    </div>
  );
}
