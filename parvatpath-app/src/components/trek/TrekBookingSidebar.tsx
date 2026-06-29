'use client';

import { Phone, MessageSquare, ShieldAlert, ArrowRight } from 'lucide-react';
import { Trek } from '@/types';
import { formatPrice, getSeatsColor, formatDate } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface TrekBookingSidebarProps {
  trek: Trek;
  slug: string;
}

export default function TrekBookingSidebar({ trek, slug }: TrekBookingSidebarProps) {
  const { user } = useAuth();
  const router = useRouter();

  const nextAvailableBatch = (trek.batches || []).find((b) => b.totalSeats - b.bookedSeats > 0);
  const startingPrice = trek.startingPrice;

  const phoneNo = '+919634923602';
  const whatsappUrl = `https://wa.me/919634923602?text=Hi+Parvatpath!+I+want+to+know+more+about+the+${encodeURIComponent(
    trek.name
  )}+trek.`;

  const handleBookNow = () => {
    if (!user) {
      router.push(`/login?redirect=/booking/${slug}`);
    } else {
      router.push(`/booking/${slug}`);
    }
  };

  const seatsLeft = nextAvailableBatch
    ? nextAvailableBatch.totalSeats - nextAvailableBatch.bookedSeats
    : 0;

  return (
    <>
      {/* Desktop Sidebar: Sticky */}
      <div className="hidden lg:block sticky top-24 glass-card p-6 shadow-glow-card rounded-3xl space-y-6 overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <span className="text-text-muted text-[11px] uppercase tracking-widest font-sub font-semibold">
            Starting Price
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="font-heading font-extrabold text-4xl text-text-primary">
              {formatPrice(startingPrice)}
            </span>
            <span className="text-text-secondary text-xs font-body font-medium">/person</span>
          </div>
        </div>

        <div className="relative z-10">
          {nextAvailableBatch ? (
            <div className="bg-bg-card/50 border border-border rounded-2xl p-4 space-y-2">
              <span className="text-text-muted text-[10px] uppercase font-bold tracking-widest font-sub">Next Available Batch</span>
              <div className="font-semibold text-text-primary text-sm mt-1 font-body">
                {formatDate(nextAvailableBatch.startDate)} – {formatDate(nextAvailableBatch.endDate)}
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <span className={`font-semibold text-xs font-body ${getSeatsColor(seatsLeft)}`}>
                  {seatsLeft < 5 ? `🔴 Only ${seatsLeft} seats left!` : `🟢 ${seatsLeft} slots available`}
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-danger/10 border border-danger/20 text-danger p-4 rounded-2xl text-xs font-semibold flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>All upcoming batches are sold out.</span>
            </div>
          )}
        </div>

        <div className="space-y-3 relative z-10">
          <button
            onClick={handleBookNow}
            className="w-full btn-accent text-white py-3.5 rounded-xl font-sub font-bold text-sm flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5"
          >
            Book Slots Now <ArrowRight className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <a
              href={`tel:${phoneNo}`}
              className="flex items-center justify-center gap-2 border border-border rounded-xl py-3 hover:bg-bg-hover text-text-secondary hover:text-text-primary transition-all font-sub font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-accent" /> Call
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 border border-border rounded-xl py-3 hover:bg-bg-hover text-text-secondary hover:text-text-primary transition-all font-sub font-semibold"
            >
              <MessageSquare className="w-3.5 h-3.5 text-success" /> WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.4), transparent)' }} />
      </div>

      {/* Mobile Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full z-40 bg-bg-primary/95 backdrop-blur-xl border-t border-border p-4 flex items-center justify-between shadow-2xl lg:hidden">
        <div>
          <span className="text-[10px] text-text-muted uppercase tracking-wider block font-sub font-semibold">Price per slot</span>
          <span className="font-heading font-extrabold text-2xl text-text-primary">
            {formatPrice(startingPrice)}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${phoneNo}`}
            className="w-11 h-11 border border-border rounded-full flex items-center justify-center text-text-secondary hover:text-white hover:bg-bg-hover transition-all"
          >
            <Phone className="w-4 h-4 text-accent" />
          </a>
          <button
            onClick={handleBookNow}
            className="btn-accent text-white px-6 py-3 rounded-full font-sub font-bold text-sm"
          >
            Book Now
          </button>
        </div>
      </div>
    </>
  );
}
