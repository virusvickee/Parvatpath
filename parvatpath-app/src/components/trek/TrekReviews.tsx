import { Star } from 'lucide-react';
import { Card } from '../ui/Card';

interface ReviewCard {
  name: string;
  rating: number;
  date: string;
  comment: string;
}

interface TrekReviewsProps {
  rating: number;
  reviewCount: number;
  reviews?: ReviewCard[];
}

export default function TrekReviews({ rating, reviewCount, reviews }: TrekReviewsProps) {
  // Static list of trek reviews for fallback, matching our mock testimonials profile
  const fallbackReviews: ReviewCard[] = [
    {
      name: 'Vikas Dobhal',
      rating: 5,
      date: '12-Feb-2026',
      comment: 'Excellent service! The technical gear (sleeping bags, microspikes) were in top condition. Our guide, Pradeep, was exceptionally knowledgeable.',
    },
    {
      name: 'Priyanka Rawat',
      rating: 4.8,
      date: '28-Jan-2026',
      comment: 'Summit climb was tough in snow but the guides kept us motivated. Clean camps and warm food are a huge plus in negative temperatures.',
    },
    {
      name: 'Anuj Semwal',
      rating: 5,
      date: '10-Dec-2025',
      comment: 'Safety standards are highly professional. We did pulse checks twice every day. Highly recommend booking direct with Parvatpath.',
    },
  ];

  const activeReviews = reviews && reviews.length > 0 ? reviews : fallbackReviews;

  return (
    <div className="space-y-6">
      <h3 className="font-heading text-xl font-bold text-text-primary mb-4">
        Trekkers Feedback
      </h3>

      {/* Aggregate Rating Box */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card hover={false} className="bg-bg-card border border-border flex flex-col items-center justify-center py-6 text-center">
          <span className="font-heading font-extrabold text-5xl text-accent mb-2">
            {rating.toFixed(1)}
          </span>
          <div className="flex gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.round(rating)
                    ? 'text-accent fill-accent'
                    : 'text-text-muted'
                }`}
              />
            ))}
          </div>
          <span className="text-text-secondary text-xs font-body font-semibold uppercase tracking-wider">
            {reviewCount} Verified Reviews
          </span>
        </Card>

        {/* Rating Breakdown Bar chart */}
        <Card hover={false} className="md:col-span-2 bg-bg-card border border-border p-6 flex flex-col justify-center gap-2 text-xs font-body text-text-secondary">
          <div className="flex items-center gap-3">
            <span className="w-10">5 Star</span>
            <div className="flex-grow bg-bg-primary h-2 rounded-full overflow-hidden">
              <div className="bg-accent h-full w-[85%]" />
            </div>
            <span className="w-8 text-right font-bold text-text-primary">85%</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-10">4 Star</span>
            <div className="flex-grow bg-bg-primary h-2 rounded-full overflow-hidden">
              <div className="bg-accent h-full w-[12%]" />
            </div>
            <span className="w-8 text-right font-bold text-text-primary">12%</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-10">3 Star</span>
            <div className="flex-grow bg-bg-primary h-2 rounded-full overflow-hidden">
              <div className="bg-accent h-full w-[3%]" />
            </div>
            <span className="w-8 text-right font-bold text-text-primary">3%</span>
          </div>
        </Card>
      </div>

      {/* Individual Review cards list */}
      <div className="space-y-4 pt-4">
        {activeReviews.map((review, idx) => (
          <div key={idx} className="border border-border/60 bg-bg-card/45 rounded-xl p-5 space-y-3 font-body">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-heading font-bold text-text-primary text-sm">{review.name}</h4>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.round(review.rating)
                            ? 'text-accent fill-accent'
                            : 'text-text-muted'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-text-muted font-bold">{review.date}</span>
                </div>
              </div>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              &quot;{review.comment}&quot;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
