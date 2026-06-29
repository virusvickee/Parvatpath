'use client';

import { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FaqItem {
  q: string;
  a: string;
  category: 'Booking' | 'Safety' | 'What to Carry' | 'Payments' | 'Cancellation';
}

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Booking' | 'Safety' | 'What to Carry' | 'Payments' | 'Cancellation'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Open first by default

  const faqCategories = ['All', 'Booking', 'Safety', 'What to Carry', 'Payments', 'Cancellation'] as const;

  const faqs: FaqItem[] = [
    {
      q: 'How do I choose the right trek for a beginner?',
      a: 'If you are new to trekking, we recommend starting with an "Easy" grade trek such as Chopta Tungnath or Nag Tibba. These treks require low daily walking hours (3-4 hours) and have easy-to-climb routes without technical steep zones.',
      category: 'Booking',
    },
    {
      q: 'Can I pay a partial advance to confirm my trek booking?',
      a: 'Yes! You can choose to pay a 30% advance on the booking page to reserve your slot. The remaining 70% must be paid at least 7 days before the trek start date.',
      category: 'Payments',
    },
    {
      q: 'What is the cancellation and refund policy?',
      a: 'If you cancel 30 days before the trek, we offer a 100% refund. Cancellations made 15-30 days before the trek receive a 50% refund. Within 15 days, no refund is possible but you can transfer the slot to a friend.',
      category: 'Cancellation',
    },
    {
      q: 'What safety measures do you carry on high altitude treks?',
      a: 'All our treks are equipped with a medical oxygen cylinder, first-aid kits, pulse-oximeters, and emergency stretchers. Our guides are trained search-and-rescue specialists certified by mountaineering institutes.',
      category: 'Safety',
    },
    {
      q: 'What type of shoes should I buy for a winter trek?',
      a: 'Buy high-ankle trekking shoes with deep lug patterns for grip on snow and loose mud. Make sure they are water-resistant. Break them in by wearing them at least 10 days before the trek to avoid blisters.',
      category: 'What to Carry',
    },
    {
      q: 'Is travel insurance mandatory for high passes?',
      a: 'Yes, travel insurance covering medical evacuation and adventure activities up to the trek altitude is highly recommended. It protects you against search & rescue expenses.',
      category: 'Safety',
    },
    {
      q: 'Do you provide sleeping bags and tents?',
      a: 'Yes, we provide high-grade dome tents, warm sleeping bags rated for negative temperatures, clean fleece liners, and thick trekking mats at all campsites.',
      category: 'What to Carry',
    },
    {
      q: 'Can we book private customized batches?',
      a: 'Yes! If you have a group of 6 or more participants, we can create a custom batch for you on any available route with private guides and customizable pick-up points.',
      category: 'Booking',
    },
    {
      q: 'Is there mobile network coverage on the trail?',
      a: 'In most high-altitude zones in Uttarakhand and Kashmir, mobile signal drops off at the base camps. Airtel and BSNL have network coverage in Sankri, but trails like Kedarkantha have zero network connectivity.',
      category: 'Booking',
    },
    {
      q: 'How do you handle emergency evacuation?',
      a: 'In case of medical emergencies, the participant is escorted down to the nearest road-head by emergency staff. From there, local transport is arranged to Dehradun/Rishikesh hospitals.',
      category: 'Safety',
    },
    {
      q: 'Are meals pure vegetarian on the trek?',
      a: 'Yes, we serve pure vegetarian, fresh, and nutritious meals on the trail. A typical menu includes porridge, roti, dal, sabzi, rice, soup, and warm desserts to keep your energy levels high.',
      category: 'Payments',
    },
    {
      q: 'Can I offload my backpack to a mule?',
      a: 'Yes, you can choose to offload your heavy backpack. Mule/porter charges are extra and can be paid either during booking or at base camp Sankri/Govindghat.',
      category: 'What to Carry',
    },
  ];

  // Filtering faqs
  const filteredFaqs = faqs
    .filter((f) => activeCategory === 'All' || f.category === activeCategory)
    .filter((f) => f.q.toLowerCase().includes(searchQuery.toLowerCase()) || f.a.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="bg-bg-primary text-text-primary min-h-screen pb-20 font-body">
      {/* Header */}
      <section className="py-16 px-6 text-center bg-bg-card/45 border-b border-border/40">
        <h1 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight font-heading">Frequently Asked Questions</h1>
        <p className="text-text-secondary text-sm md:text-base mt-2 max-w-xl mx-auto">
          Got questions about yatra passes, physical fitness levels, or cancellation policies? We have answers.
        </p>

        {/* Search bar */}
        <div className="max-w-md mx-auto mt-6 relative">
          <input
            type="text"
            placeholder="Search questions (e.g. advance, safety)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-bg-card border border-border text-text-primary pl-10 pr-4 py-2.5 rounded-full text-xs outline-none focus:border-accent transition-all"
          />
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-text-muted" />
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Categories Bar */}
        <div className="flex flex-wrap gap-2 justify-center mb-8 pb-4 border-b border-border/40">
          {faqCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(null); // Close active when category changes
              }}
              className={cn(
                'px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full border transition-all duration-300',
                activeCategory === cat
                  ? 'bg-accent text-white border-accent'
                  : 'bg-bg-card hover:bg-bg-hover text-text-secondary border-border hover:text-white'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordions */}
        {filteredFaqs.length > 0 ? (
          <div className="space-y-3">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className={cn(
                    'border rounded-xl transition-all duration-300 overflow-hidden bg-bg-card',
                    isOpen ? 'border-accent/40 shadow-lg' : 'border-border'
                  )}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-bg-hover"
                  >
                    <span className="font-heading font-bold text-text-primary text-sm md:text-base pr-4">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={cn(
                        'w-5 h-5 text-text-secondary transition-transform duration-300 shrink-0',
                        isOpen && 'transform rotate-180 text-accent'
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      'transition-all duration-300 ease-in-out border-t border-border/40 text-text-secondary text-sm leading-relaxed bg-bg-card/50',
                      isOpen ? 'max-h-[500px] p-5 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                    )}
                  >
                    {faq.a}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-bg-card border border-border rounded-xl">
            <p className="text-text-secondary text-sm">No answers match your search term.</p>
          </div>
        )}
      </div>
    </div>
  );
}
