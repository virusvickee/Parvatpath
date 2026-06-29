import Link from 'next/link';
import { Clock, Gauge, MapPin, ArrowRight } from 'lucide-react';

const regions = [
  {
    name: 'Uttarkashi',
    href: '/treks?district=Uttarkashi',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&auto=format&fit=crop&q=80',
    count: '12 Treks',
  },
  {
    name: 'Chamoli',
    href: '/treks?district=Chamoli',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop&q=80',
    count: '8 Treks',
  },
  {
    name: 'Rudraprayag',
    href: '/treks?district=Rudraprayag',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&auto=format&fit=crop&q=80',
    count: '6 Treks',
  },
  {
    name: 'Pithoragarh',
    href: '/treks?district=Pithoragarh',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&auto=format&fit=crop&q=80',
    count: '5 Treks',
  },
  {
    name: 'Tehri',
    href: '/treks?district=Tehri',
    image: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=400&auto=format&fit=crop&q=80',
    count: '4 Treks',
  },
];

const difficulties = [
  { name: 'Easy', href: '/treks?difficulty=Easy', color: '#22C55E', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.25)', desc: 'For beginners & families' },
  { name: 'Moderate', href: '/treks?difficulty=Moderate', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)', desc: 'Some fitness required' },
  { name: 'Difficult', href: '/treks?difficulty=Difficult', color: '#EF4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.25)', desc: 'For experienced trekkers' },
];

const durations = [
  { name: 'Weekend', sub: '2–3 Days', href: '/treks?duration=2-3' },
  { name: 'Short', sub: '4–5 Days', href: '/treks?duration=4-5' },
  { name: 'Classic', sub: '6–7 Days', href: '/treks?duration=6-7' },
  { name: 'Expedition', sub: '7+ Days', href: '/treks?duration=7+' },
];

export default function TrekCategories() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-14">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="section-line" />
          <span className="text-accent text-xs font-semibold uppercase tracking-widest font-sub">Find Your Trek</span>
          <div className="section-line" style={{ transform: 'scaleX(-1)' }} />
        </div>
        <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-primary mt-2">
          Explore By{' '}
          <span className="text-gradient-accent">Category</span>
        </h2>
      </div>

      <div className="space-y-12">
        {/* Region Cards — Image Mosaic */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <MapPin className="w-4 h-4 text-accent" />
            <span className="text-text-secondary text-sm font-semibold uppercase tracking-wider font-sub">By Region</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {regions.map((r) => (
              <Link
                key={r.name}
                href={r.href}
                className="group relative rounded-xl overflow-hidden aspect-[4/3] card-hover"
              >
                <img
                  src={r.image}
                  alt={r.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(10,15,13,0.9) 0%, rgba(10,15,13,0.2) 60%, transparent 100%)' }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="font-heading font-bold text-sm text-white">{r.name}</div>
                  <div className="text-accent text-[11px] font-sub font-medium">{r.count}</div>
                </div>
                <div className="absolute top-2 right-2">
                  <ArrowRight className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity translate-x-1 group-hover:translate-x-0 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Difficulty + Duration — Side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Difficulty */}
          <div
            className="p-6 rounded-2xl"
            style={{ background: 'rgba(17,26,20,0.7)', border: '1px solid #1E2E20' }}
          >
            <div className="flex items-center gap-2 mb-5">
              <Gauge className="w-4 h-4 text-accent" />
              <span className="text-text-secondary text-sm font-semibold uppercase tracking-wider font-sub">By Difficulty</span>
            </div>
            <div className="flex flex-col gap-3">
              {difficulties.map((d) => (
                <Link
                  key={d.name}
                  href={d.href}
                  className="flex items-center justify-between p-4 rounded-xl group transition-all duration-200"
                  style={{
                    background: d.bg,
                    border: `1px solid ${d.border}`,
                  }}
                >
                  <div>
                    <span className="font-heading font-bold text-base" style={{ color: d.color }}>{d.name}</span>
                    <p className="text-text-muted text-xs font-body mt-0.5">{d.desc}</p>
                  </div>
                  <ArrowRight
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    style={{ color: d.color }}
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div
            className="p-6 rounded-2xl"
            style={{ background: 'rgba(17,26,20,0.7)', border: '1px solid #1E2E20' }}
          >
            <div className="flex items-center gap-2 mb-5">
              <Clock className="w-4 h-4 text-accent" />
              <span className="text-text-secondary text-sm font-semibold uppercase tracking-wider font-sub">By Duration</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {durations.map((d) => (
                <Link
                  key={d.name}
                  href={d.href}
                  className="group flex flex-col justify-center p-5 rounded-xl text-center card-hover"
                  style={{
                    background: 'rgba(10,15,13,0.8)',
                    border: '1px solid #2A3F2D',
                  }}
                >
                  <span className="font-heading font-bold text-lg text-text-primary group-hover:text-accent transition-colors">{d.name}</span>
                  <span className="text-accent text-xs font-sub font-medium mt-0.5">{d.sub}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
