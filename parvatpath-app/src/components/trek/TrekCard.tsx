import Link from 'next/link';
import { Clock, Mountain, Star, ArrowRight, MapPin } from 'lucide-react';
import { Trek } from '@/types';
import { formatPrice, getDifficultyColor } from '@/lib/utils';

interface TrekCardProps {
  trek: Trek;
}

export default function TrekCard({ trek }: TrekCardProps) {
  return (
    <Link
      href={`/treks/${trek.slug}`}
      className="group relative flex flex-col rounded-2xl overflow-hidden card-hover h-full"
      style={{
        background: 'linear-gradient(135deg, #111A14 0%, #0D1610 100%)',
        border: '1px solid #1E2E20',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
      }}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden shrink-0">
        <img
          src={trek.coverImage}
          alt={trek.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(10,15,13,0.9) 0%, rgba(10,15,13,0.2) 50%, transparent 100%)' }}
        />

        {/* Difficulty badge */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className={`px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider backdrop-blur-sm font-sub ${getDifficultyColor(trek.difficulty)}`}
          >
            {trek.difficulty}
          </span>
        </div>

        {/* Region badge */}
        <div className="absolute top-3 right-3 z-10">
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-body text-text-secondary backdrop-blur-md font-medium"
            style={{ background: 'rgba(10,15,13,0.75)', border: '1px solid rgba(42,63,45,0.5)' }}>
            <MapPin className="w-3 h-3 text-accent" />
            {trek.subRegion}
          </span>
        </div>

        {/* Rating overlay on image */}
        <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1">
          <Star className="w-3.5 h-3.5 text-gold fill-gold" />
          <span className="text-white text-xs font-semibold font-sub">{trek.rating.toFixed(1)}</span>
          <span className="text-white/60 text-[10px] font-body">({trek.reviewCount})</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-5 gap-4">
        {/* Title */}
        <div>
          <h3 className="font-heading text-lg font-bold text-text-primary group-hover:text-accent transition-colors duration-300 line-clamp-1 mb-2">
            {trek.name}
          </h3>

          {/* Highlights chips */}
          <div className="flex flex-wrap gap-1.5">
            {trek.highlights.slice(0, 2).map((h, i) => (
              <span
                key={i}
                className="text-[10px] text-text-muted px-2 py-0.5 rounded font-body truncate max-w-[160px]"
                style={{ background: 'rgba(42,63,45,0.3)', border: '1px solid rgba(42,63,45,0.4)' }}
              >
                {h}
              </span>
            ))}
          </div>
        </div>

        {/* Trek Stats */}
        <div
          className="grid grid-cols-2 gap-3 py-3 text-xs"
          style={{ borderTop: '1px solid rgba(42,63,45,0.4)', borderBottom: '1px solid rgba(42,63,45,0.4)' }}
        >
          <div className="flex items-center gap-1.5 text-text-secondary">
            <Clock className="w-3.5 h-3.5 text-accent shrink-0" />
            <span className="font-body">{trek.duration.days}D / {trek.duration.nights}N</span>
          </div>
          <div className="flex items-center gap-1.5 text-text-secondary justify-end">
            <Mountain className="w-3.5 h-3.5 text-accent shrink-0" />
            <span className="font-body truncate">{trek.maxAltitude}</span>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-text-muted text-[10px] uppercase tracking-wider font-body block">Starting From</span>
            <span className="font-heading font-extrabold text-xl text-text-primary">
              {formatPrice(trek.startingPrice)}
            </span>
          </div>

          <div
            className="flex items-center gap-1.5 text-xs font-semibold font-sub px-4 py-2 rounded-full transition-all duration-300 group-hover:gap-2.5"
            style={{
              background: 'rgba(249,115,22,0.12)',
              border: '1px solid rgba(249,115,22,0.25)',
              color: '#F97316',
            }}
          >
            View Trek
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>

      {/* Bottom accent line on hover */}
      <div
        className="absolute bottom-0 left-0 h-0.5 transition-all duration-500 ease-out"
        style={{
          width: '0%',
          background: 'linear-gradient(90deg, #F97316, transparent)',
        }}
        data-hover-line
      />
    </Link>
  );
}
