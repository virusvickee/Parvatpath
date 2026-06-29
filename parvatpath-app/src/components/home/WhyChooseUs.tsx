import { Shield, ShieldCheck, HeartHandshake, Leaf, CheckCircle } from 'lucide-react';

const features = [
  {
    icon: Shield,
    label: 'Safety First',
    title: 'Safety First',
    description: 'First Himalayan operator to introduce medical tents, oxygen canisters, and mandatory pulse checks twice a day.',
    points: ['Medical tents & O₂ canisters', 'Daily pulse monitoring', 'Emergency evacuation protocol'],
    color: 'from-orange-500/20 to-orange-900/5',
    border: 'border-orange-500/20',
  },
  {
    icon: ShieldCheck,
    label: 'Expert Guides',
    title: 'Expert Mountain Guides',
    description: 'NIM/HMI certified guides with at least 10 years of experience on high-altitude passes.',
    points: ['NIM/HMI certified', '10+ years on high passes', 'Search & rescue qualified'],
    color: 'from-emerald-500/20 to-emerald-900/5',
    border: 'border-emerald-500/20',
  },
  {
    icon: HeartHandshake,
    label: 'Certified Operator',
    title: 'Certified Local Operator',
    description: 'Duly approved by StartupIndia, MSME, and Uttarakhand Tourism. 70% of bookings flow to the local economy.',
    points: ['StartupIndia certified', 'MSME & UT Tourism approved', '70% local economy benefit'],
    color: 'from-blue-500/20 to-blue-900/5',
    border: 'border-blue-500/20',
  },
  {
    icon: Leaf,
    label: 'Responsible Travel',
    title: 'Responsible Travel',
    description: 'Strict Leave No Trace adherence. Regular cleaning drives and eco-friendly high mountain camping.',
    points: ['Leave No Trace principles', 'Eco camping practices', 'Seasonal cleaning drives'],
    color: 'from-teal-500/20 to-teal-900/5',
    border: 'border-teal-500/20',
  },
];

export default function WhyChooseUs() {
  return (
    <section
      className="relative py-28 px-6 md:px-12 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0A0F0D 0%, #0D1610 50%, #0A0F0D 100%)' }}
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(42,63,45,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(42,63,45,0.15) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.04) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="section-line" />
            <span className="text-accent text-xs font-semibold uppercase tracking-widest font-sub">
              The Parvatpath Difference
            </span>
            <div className="section-line" style={{ transform: 'scaleX(-1)' }} />
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-text-primary mt-2">
            Why Choose{' '}
            <span className="text-gradient-accent">Parvatpath</span>
          </h2>
          <p className="text-text-secondary font-body text-sm md:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
            We combine localized Himalayan hospitality with global safety standards to deliver the ultimate mountain exploration experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className={`relative flex flex-col gap-4 p-6 rounded-2xl border ${feature.border} card-hover overflow-hidden`}
                style={{
                  background: `linear-gradient(135deg, #111A14 0%, #0D1610 100%)`,
                  boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                }}
              >
                {/* Gradient glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-50 pointer-events-none`}
                />

                {/* Icon */}
                <div className="relative w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(42,63,45,0.4)', border: '1px solid rgba(42,63,45,0.6)' }}>
                  <Icon className="w-5 h-5 text-accent" />
                </div>

                {/* Title + Description */}
                <div className="relative">
                  <h3 className="font-heading text-lg font-bold text-text-primary mb-2">{feature.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed font-body">{feature.description}</p>
                </div>

                {/* Points */}
                <ul className="relative flex flex-col gap-2 mt-auto pt-3" style={{ borderTop: '1px solid rgba(42,63,45,0.3)' }}>
                  {feature.points.map((pt, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-text-secondary font-body">
                      <CheckCircle className="w-3.5 h-3.5 text-accent shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
