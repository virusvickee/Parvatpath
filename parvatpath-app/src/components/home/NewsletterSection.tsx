'use client';

import { useState } from 'react';
import { Mail, Check, ArrowRight, Users } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 6000);
    }
  };

  return (
    <section className="py-24 px-6 md:px-12">
      <div
        className="relative max-w-6xl mx-auto rounded-3xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #111A14 0%, #0D1610 100%)',
          border: '1px solid #2A3F2D',
          boxShadow: '0 20px 80px rgba(0,0,0,0.5)',
        }}
      >
        {/* Background image with overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&auto=format&fit=crop&q=60')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(42,63,45,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(42,63,45,0.2) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #F97316, transparent)' }} />

        {/* Ambient glow */}
        <div
          className="absolute -top-20 -right-20 w-80 h-80 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)' }}
        />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 p-10 md:p-16">
          {/* Left content */}
          <div className="flex-1 text-left">
            {/* Pill */}
            <span className="pill-accent px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest font-sub inline-flex items-center gap-2 mb-5">
              <Users className="w-3.5 h-3.5" />
              Adventure Club
            </span>

            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-primary leading-tight mb-4">
              Join the<br />
              <span className="text-gradient-accent">Himalayan Community</span>
            </h2>

            <p className="text-text-secondary font-body text-sm md:text-base leading-relaxed max-w-md mb-6">
              Get early access to winter batches, discount coupons, packing lists, and safety updates from our mountain experts.
            </p>

            {/* Trust points */}
            <div className="flex flex-wrap gap-4 text-xs text-text-secondary font-body">
              {['No spam, ever', 'Early batch access', 'Exclusive coupons', '5,000+ subscribers'].map((pt) => (
                <span key={pt} className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-accent" />
                  {pt}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="w-full md:w-80 shrink-0">
            {subscribed ? (
              <div
                className="p-6 rounded-2xl flex flex-col items-center gap-3 text-center"
                style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)' }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(34,197,94,0.15)' }}
                >
                  <Check className="w-6 h-6 text-success" />
                </div>
                <div className="font-heading font-bold text-text-primary text-lg">You&apos;re In!</div>
                <div className="text-text-secondary text-sm font-body">Welcome to the Parvatpath adventure club. Check your inbox shortly!</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div
                  className="flex items-center gap-3 px-4 rounded-xl"
                  style={{ background: 'rgba(10,15,13,0.8)', border: '1px solid #2A3F2D' }}
                >
                  <Mail className="w-4 h-4 text-text-muted shrink-0" />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 bg-transparent text-text-primary placeholder-text-muted text-sm font-body outline-none py-4"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-accent text-white py-4 rounded-xl font-sub font-bold text-sm flex items-center gap-2 justify-center"
                >
                  Subscribe & Join <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-text-muted text-[11px] font-body text-center">
                  By subscribing, you agree to our <span className="text-accent hover:underline cursor-pointer">Privacy Policy</span>.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
