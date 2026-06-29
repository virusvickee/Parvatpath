const logos = [
  { name: 'Hindustan Times', sub: 'Eco Trekking Partner' },
  { name: 'News Nation', sub: 'Winter Safety Feature' },
  { name: 'IANS', sub: 'Tourism Growth Report' },
  { name: 'Silicon India', sub: 'Top Travel Platform' },
  { name: 'Uttarakhand News', sub: 'Local Economy Impact' },
  { name: 'Travel Triangle', sub: 'Best Trek Operator' },
];

// Duplicate for infinite scroll
const marqueeItems = [...logos, ...logos];

export default function MediaSection() {
  return (
    <section className="py-14 border-y overflow-hidden" style={{ borderColor: '#1E2E20', background: 'rgba(17,26,20,0.3)' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8">
        <p className="text-center text-text-muted text-xs uppercase tracking-widest font-sub font-semibold">
          As Featured In
        </p>
      </div>

      {/* Marquee */}
      <div className="relative">
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #0A0F0D, transparent)' }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #0A0F0D, transparent)' }}
        />

        <div
          className="flex gap-10 items-center"
          style={{ animation: 'scrollLeft 28s linear infinite', width: 'max-content' }}
        >
          {marqueeItems.map((logo, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center px-8 py-3 rounded-xl shrink-0 group cursor-default transition-all duration-300"
              style={{ border: '1px solid rgba(42,63,45,0.3)', background: 'rgba(17,26,20,0.5)' }}
            >
              <span className="font-heading font-extrabold text-base md:text-lg text-text-muted group-hover:text-text-secondary transition-colors tracking-wide uppercase whitespace-nowrap">
                {logo.name}
              </span>
              <span className="text-[10px] text-text-muted font-body tracking-wider opacity-70">{logo.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
