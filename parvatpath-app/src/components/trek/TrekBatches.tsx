'use client';

import { Batch } from '@/types';
import { formatDate, formatPrice, getSeatsColor } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface TrekBatchesProps {
  batches: Batch[];
  slug: string;
  onBookClick?: (batch: Batch) => void;
}

export default function TrekBatches({ batches = [], slug, onBookClick }: TrekBatchesProps) {
  const { user } = useAuth();
  const router = useRouter();

  const handleBookClick = (batch: Batch) => {
    if (onBookClick) {
      onBookClick(batch);
      return;
    }
    if (!user) {
      router.push(`/login?redirect=/booking/${slug}`);
    } else {
      router.push(`/booking/${slug}`);
    }
  };
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="section-line" style={{ width: '20px' }} />
        <h3 className="font-heading text-xl font-bold text-text-primary">
          Upcoming Batches & Availability
        </h3>
      </div>

      <div className="overflow-x-auto rounded-2xl glass-dark shadow-glow-card">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border/80 bg-bg-hover/50 text-text-secondary text-xs uppercase tracking-wider font-semibold font-sub">
              <th className="p-4">Start Date</th>
              <th className="p-4">End Date</th>
              <th className="p-4">Price / person</th>
              <th className="p-4">Availability</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40 font-body">
            {batches.map((batch) => {
              const availableSeats = batch.totalSeats - batch.bookedSeats;
              const isSoldOut = availableSeats <= 0;

              return (
                <tr
                  key={batch._id}
                  className={`transition-colors hover:bg-bg-hover/30 ${
                    isSoldOut ? 'opacity-50 select-none bg-bg-hover/10' : ''
                  }`}
                >
                  <td className="p-4 font-semibold text-text-primary">
                    {formatDate(batch.startDate)}
                  </td>
                  <td className="p-4 text-text-secondary">
                    {formatDate(batch.endDate)}
                  </td>
                  <td className="p-4 font-bold text-text-primary">
                    {formatPrice(batch.price)}
                  </td>
                  <td className="p-4">
                    {isSoldOut ? (
                      <span className="text-text-muted font-bold text-[11px] font-sub uppercase tracking-widest border border-border px-2 py-1 rounded">Sold Out</span>
                    ) : (
                      <span className={`font-semibold text-xs ${getSeatsColor(availableSeats)}`}>
                        {availableSeats < 5
                          ? `🔴 Only ${availableSeats} left`
                          : availableSeats < 10
                          ? `🟡 ${availableSeats} slots available`
                          : `🟢 ${availableSeats} slots available`}
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    {isSoldOut ? (
                      <button disabled className="bg-bg-hover border border-border text-text-muted px-4 py-1.5 rounded-lg text-xs font-semibold cursor-not-allowed">
                        Sold Out
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBookClick(batch)}
                        className="btn-accent text-white px-4 py-1.5 rounded-lg text-xs font-semibold font-sub transition-transform hover:-translate-y-0.5"
                      >
                        Book Now
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
