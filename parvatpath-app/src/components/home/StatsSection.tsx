'use client';

import { useEffect, useRef, useState } from 'react';
import { Users, Route, Star, Award } from 'lucide-react';

interface StatItemProps {
  icon: React.ReactNode;
  target: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sublabel: string;
  isDecimal?: boolean;
  delay?: number;
}

function StatItem({ icon, target, suffix = '', prefix = '', label, sublabel, isDecimal = false, delay = 0 }: StatItemProps) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const duration = 1400;
    const increment = target / (duration / 16);
    let start = 0;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { clearInterval(timer); setCount(target); }
      else { setCount(start); }
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target]);

  const displayValue = isDecimal ? count.toFixed(1) : Math.floor(count).toLocaleString('en-IN');

  return (
    <div
      ref={elementRef}
      className="relative flex flex-col items-center text-center p-6 group"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 group-hover:bg-accent/20 group-hover:border-accent/40 transition-all duration-300">
        {icon}
      </div>

      {/* Number */}
      <div className="font-heading font-extrabold text-3xl md:text-4xl text-text-primary mb-1">
        {prefix}{displayValue}<span className="text-accent">{suffix}</span>
      </div>

      {/* Label */}
      <div className="font-sub font-semibold text-sm text-text-primary mb-0.5">{label}</div>
      <div className="text-text-muted text-xs font-body">{sublabel}</div>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section id="stats-section" className="relative -mt-16 z-30 px-6 md:px-12 max-w-7xl mx-auto pb-6">
      <div
        className="glass-card rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(17,26,20,0.95) 0%, rgba(10,15,13,0.95) 100%)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        {/* Top accent line */}
        <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #F97316, transparent)' }} />

        <div className="grid grid-cols-2 md:grid-cols-4 divide-x-0 md:divide-x divide-y md:divide-y-0 divide-border">
          <StatItem
            icon={<Users className="w-5 h-5 text-accent" />}
            target={15000}
            suffix="+"
            label="Happy Trekkers"
            sublabel="Across India & World"
            delay={0}
          />
          <StatItem
            icon={<Route className="w-5 h-5 text-accent" />}
            target={50}
            suffix="+"
            label="Trek Routes"
            sublabel="Uttarakhand & Beyond"
            delay={100}
          />
          <StatItem
            icon={<Star className="w-5 h-5 text-accent" />}
            target={5.0}
            suffix="★"
            label="Google Rating"
            sublabel="Verified Reviews"
            isDecimal
            delay={200}
          />
          <StatItem
            icon={<Award className="w-5 h-5 text-accent" />}
            target={10}
            suffix="+"
            label="Years Experience"
            sublabel="Mountain Experts"
            delay={300}
          />
        </div>

        {/* Bottom accent line */}
        <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.3), transparent)' }} />
      </div>
    </section>
  );
}
