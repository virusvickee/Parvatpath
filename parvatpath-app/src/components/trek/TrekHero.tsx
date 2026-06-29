import Link from 'next/link';
import { Clock, TrendingUp, Compass, Sun, Users, MapPin } from 'lucide-react';
import { Trek } from '@/types';

interface TrekHeroProps {
  trek: Trek;
}

export default function TrekHero({ trek }: TrekHeroProps) {
  return (
    <section className="relative h-[65vh] min-h-[500px] flex items-end justify-start overflow-hidden">
      {/* Background Image with Ken Burns animation */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('${trek.coverImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          animation: 'scale-up 20s ease-out infinite alternate',
        }}
      />
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scale-up {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
      `}} />

      {/* Layered Gradient Overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0A0F0D 0%, rgba(10,15,13,0.6) 50%, rgba(10,15,13,0.2) 100%)' }}
      />
      
      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 z-10 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(42,63,45,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(42,63,45,0.2) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-6 md:px-12 pb-12 flex flex-col gap-5">
        {/* Breadcrumb */}
        <div className="flex gap-2 items-center text-xs font-sub uppercase tracking-wider text-text-secondary animate-fade-up">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <span className="text-border-light">/</span>
          <Link href="/treks" className="hover:text-accent transition-colors">Treks</Link>
          <span className="text-border-light">/</span>
          <span className="text-accent font-semibold">{trek.name}</span>
        </div>

        {/* Title & Region */}
        <div className="animate-fade-up stagger-1">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-accent" />
            <span className="text-text-primary text-sm font-semibold tracking-wide font-sub">
              {trek.subRegion}, {trek.region}
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
            {trek.name}
          </h1>
        </div>

        {/* Quick Info Glass Bar */}
        <div 
          className="flex flex-wrap items-center gap-y-4 gap-x-8 px-6 py-5 rounded-2xl animate-fade-up stagger-2 mt-4"
          style={{
            background: 'rgba(17,26,20,0.6)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(42,63,45,0.5)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-accent/10 border border-accent/20">
              <Clock className="w-5 h-5 text-accent shrink-0" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-text-muted uppercase tracking-wider font-sub font-semibold">Duration</span>
              <span className="text-sm font-semibold text-text-primary font-body">{trek.duration.days}D / {trek.duration.nights}N</span>
            </div>
          </div>

          <div className="w-px h-8 bg-border-light hidden md:block" />

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-accent/10 border border-accent/20">
              <Compass className="w-5 h-5 text-accent shrink-0" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-text-muted uppercase tracking-wider font-sub font-semibold">Difficulty</span>
              <span className="text-sm font-semibold text-text-primary font-body">{trek.difficulty}</span>
            </div>
          </div>

          <div className="w-px h-8 bg-border-light hidden md:block" />

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-accent/10 border border-accent/20">
              <TrendingUp className="w-5 h-5 text-accent shrink-0" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-text-muted uppercase tracking-wider font-sub font-semibold">Max Alt</span>
              <span className="text-sm font-semibold text-text-primary font-body">{trek.maxAltitude}</span>
            </div>
          </div>

          <div className="w-px h-8 bg-border-light hidden md:block" />

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-accent/10 border border-accent/20">
              <Sun className="w-5 h-5 text-accent shrink-0" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-text-muted uppercase tracking-wider font-sub font-semibold">Best Season</span>
              <span className="text-sm font-semibold text-text-primary font-body">{trek.bestSeason.slice(0, 2).join(', ')}</span>
            </div>
          </div>
          
          <div className="w-px h-8 bg-border-light hidden lg:block" />

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-accent/10 border border-accent/20">
              <Users className="w-5 h-5 text-accent shrink-0" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-text-muted uppercase tracking-wider font-sub font-semibold">Group Size</span>
              <span className="text-sm font-semibold text-text-primary font-body">{trek.groupSize?.min || 8} - {trek.groupSize?.max || 20} Pax</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
