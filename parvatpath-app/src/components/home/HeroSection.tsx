'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronDown, Star, ArrowRight, MapPin } from 'lucide-react';

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920&auto=format&fit=crop&q=80',
];

const POPULAR_SEARCHES = ['Kedarkantha', 'Valley of Flowers', 'Har Ki Dun', 'Kashmir Lakes', 'Chopta'];

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentImg, setCurrentImg] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoaded(true);
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(searchQuery.trim() ? `/treks?search=${encodeURIComponent(searchQuery.trim())}` : '/treks');
  };

  const scrollToContent = () => {
    document.getElementById('stats-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images with Ken Burns */}
      {HERO_IMAGES.map((src, idx) => (
        <div
          key={idx}
          className="absolute inset-0 transition-opacity duration-2000"
          style={{
            opacity: currentImg === idx ? 1 : 0,
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: currentImg === idx ? 'scale(1.05)' : 'scale(1)',
            transition: 'opacity 1.5s ease-in-out, transform 8s ease-in-out',
            zIndex: 0,
          }}
        />
      ))}

      {/* Layered Gradient Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: 'linear-gradient(to bottom, rgba(10,15,13,0.3) 0%, rgba(10,15,13,0.55) 40%, rgba(10,15,13,0.92) 80%, #0A0F0D 100%)',
        }}
      />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 z-10 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(42,63,45,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(42,63,45,0.2) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(249,115,22,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Main Content */}
      <div
        className="relative z-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-6 mt-8"
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.8s ease' }}
      >
        {/* Trust Pill */}
        <div
          className="flex items-center gap-2 pill-accent px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-widest font-sub"
          style={{ animationDelay: '0.1s' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Uttarakhand&apos;s Premier Trekking Platform
        </div>

        {/* Headline */}
        <h1
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-none"
          style={{ animation: loaded ? 'fadeUp 0.8s ease-out 0.2s both' : 'none' }}
        >
          Discover the{' '}
          <span className="relative inline-block">
            <span className="text-gradient-accent">Himalayas</span>
            <span
              className="absolute -bottom-2 left-0 w-full h-0.5 rounded-full"
              style={{ background: 'linear-gradient(90deg, #F97316, transparent)' }}
            />
          </span>
          <br />
          Your Way
        </h1>

        {/* Subtitle */}
        <p
          className="font-body text-text-secondary text-base md:text-xl max-w-2xl leading-relaxed"
          style={{ animation: loaded ? 'fadeUp 0.8s ease-out 0.35s both' : 'none' }}
        >
          From Kedarkantha&apos;s winter summits to Valley of Flowers — expert-led, safety-first adventures with Uttarakhand&apos;s most trusted trekking platform.
        </p>

        {/* Trust Stats Row */}
        <div
          className="flex flex-wrap items-center justify-center gap-6 text-sm"
          style={{ animation: loaded ? 'fadeUp 0.8s ease-out 0.45s both' : 'none' }}
        >
          <div className="flex items-center gap-1.5 text-text-secondary">
            <div className="flex">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="w-3.5 h-3.5 text-gold fill-gold" />
              ))}
            </div>
            <span className="font-semibold text-text-primary">5.0</span>
            <span>Google Rating</span>
          </div>
          <div className="w-px h-4 bg-border-light hidden sm:block" />
          <div className="flex items-center gap-1.5 text-text-secondary">
            <span className="font-semibold text-text-primary">15,000+</span>
            <span>Happy Trekkers</span>
          </div>
          <div className="w-px h-4 bg-border-light hidden sm:block" />
          <div className="flex items-center gap-1.5 text-text-secondary">
            <span className="font-semibold text-text-primary">10+</span>
            <span>Years Experience</span>
          </div>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="w-full max-w-2xl mt-4"
          style={{ animation: loaded ? 'fadeUp 0.8s ease-out 0.55s both' : 'none' }}
        >
          <div className="relative flex items-center glass-card rounded-2xl overflow-hidden p-1.5 gap-2">
            <div className="flex items-center gap-2 flex-1 px-3">
              <Search className="w-4 h-4 text-text-muted shrink-0" />
              <input
                type="text"
                placeholder="Search treks, destinations (e.g. Kedarkantha)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-text-primary placeholder-text-muted text-sm font-body outline-none py-3"
              />
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 border-l border-border">
              <MapPin className="w-4 h-4 text-text-muted shrink-0" />
              <span className="text-text-muted text-sm font-body whitespace-nowrap">Uttarakhand</span>
            </div>
            <button
              type="submit"
              className="btn-accent text-white px-6 py-3 rounded-xl font-sub font-semibold text-sm flex items-center gap-2 shrink-0"
            >
              Search <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Popular Searches */}
          <div className="flex flex-wrap gap-2 mt-3 justify-center">
            <span className="text-text-muted text-xs font-body">Popular:</span>
            {POPULAR_SEARCHES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => { setSearchQuery(s); router.push(`/treks?search=${encodeURIComponent(s)}`); }}
                className="text-xs text-text-secondary hover:text-accent transition-colors font-body hover:underline"
              >
                {s}
              </button>
            ))}
          </div>
        </form>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-3 mt-2"
          style={{ animation: loaded ? 'fadeUp 0.8s ease-out 0.65s both' : 'none' }}
        >
          <button
            onClick={() => router.push('/treks')}
            className="btn-accent text-white px-8 py-3.5 rounded-full font-sub font-bold text-sm flex items-center gap-2 justify-center"
          >
            Explore All Treks <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => router.push('/char-dham')}
            className="glass text-text-primary hover:text-white px-8 py-3.5 rounded-full font-sub font-bold text-sm transition-all hover:border-accent/40"
          >
            Char Dham Yatra →
          </button>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {HERO_IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentImg(idx)}
            className="transition-all duration-500 rounded-full"
            style={{
              width: currentImg === idx ? '28px' : '8px',
              height: '8px',
              background: currentImg === idx ? '#F97316' : 'rgba(255,255,255,0.3)',
            }}
          />
        ))}
      </div>

      {/* Scroll Down */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-text-muted hover:text-text-secondary transition-colors flex flex-col items-center gap-1"
      >
        <span className="text-[10px] font-body uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </button>
    </section>
  );
}
