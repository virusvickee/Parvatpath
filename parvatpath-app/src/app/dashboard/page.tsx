'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { LayoutDashboard, BookOpen, Settings, Compass, MapPin } from 'lucide-react';

interface BookingEntry {
  _id: string;
  bookingId: string;
  bookingStatus: string;
  participants: unknown[];
  balanceDue: number;
  trekId: { name: string; slug: string; coverImage?: string };
  batchId: { startDate: string; endDate: string };
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<BookingEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch('/api/bookings/my');
        const data = await res.json();
        if (data.success) {
          setBookings(data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const upcomingBookings = bookings.filter(
    (b) => b.bookingStatus === 'confirmed' && new Date(b.batchId.startDate) > new Date()
  );

  return (
    <div className="min-h-screen bg-bg-primary py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Welcome Header */}
        <div className="flex items-center gap-4 animate-fade-up">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold font-heading shadow-glow-sm"
            style={{ background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)', color: 'white' }}>
            {user?.name?.charAt(0).toUpperCase() || 'E'}
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-white">
              Welcome back, {user?.name?.split(' ')[0] || 'Explorer'}! 🏔️
            </h1>
            <p className="text-text-secondary text-sm font-body mt-1">Manage your upcoming Himalayan adventures.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8 animate-fade-up stagger-1">
            <h2 className="text-xl font-heading font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-accent" /> My Upcoming Treks
            </h2>
            
            {loading ? (
              <div className="glass-card p-8 rounded-2xl border border-border animate-pulse">
                <div className="h-6 bg-border rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-border rounded w-1/2"></div>
              </div>
            ) : upcomingBookings.length > 0 ? (
              <div className="space-y-5">
                {upcomingBookings.map((booking) => (
                  <div key={booking._id} className="glass-dark p-6 rounded-2xl border border-border flex flex-col sm:flex-row gap-6 items-start hover:border-border-light transition-colors shadow-glow-card">
                    {/* Thumbnail */}
                    <div
                      className="w-full sm:w-40 h-32 rounded-xl flex-shrink-0 bg-cover bg-center border border-border"
                      style={{ backgroundImage: `url(${booking.trekId.coverImage || 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=400'})` }}
                    />
                    
                    {/* Details */}
                    <div className="flex-1 space-y-2.5">
                      <h3 className="text-xl font-heading font-bold text-white group-hover:text-accent transition-colors">
                        {booking.trekId.name}
                      </h3>
                      
                      <div className="flex flex-wrap gap-4 text-xs font-body text-text-secondary">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-accent" />
                          {new Date(booking.batchId.startDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })} – {new Date(booking.batchId.endDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                          {booking.participants.length} Participant{booking.participants.length > 1 ? 's' : ''}
                        </div>
                      </div>

                      {/* Status row */}
                      <div className="flex gap-4 text-xs font-body mt-2 pt-3" style={{ borderTop: '1px solid rgba(42,63,45,0.4)' }}>
                        <span className="px-2.5 py-1 rounded bg-success/10 text-success border border-success/20 font-semibold flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-success" /> Confirmed
                        </span>
                        {booking.balanceDue > 0 && (
                          <span className="px-2.5 py-1 rounded bg-accent/10 text-accent border border-accent/20 font-semibold">
                            Balance Due: ₹{booking.balanceDue.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-card p-12 rounded-2xl border border-border text-center flex flex-col items-center gap-4">
                <Compass className="w-12 h-12 text-text-muted" />
                <p className="text-text-secondary font-body">You have no upcoming treks on your calendar.</p>
                <Link href="/treks" className="btn-accent text-white px-8 py-3 rounded-full font-sub font-bold text-sm shadow-glow-sm transition-transform hover:-translate-y-0.5 mt-2">
                  Find Your Next Adventure
                </Link>
              </div>
            )}
          </div>

          {/* Quick Links Sidebar */}
          <div className="animate-fade-up stagger-2">
            <div className="glass-card p-6 rounded-2xl border border-border sticky top-28 shadow-glow-card">
              <h2 className="text-lg font-heading font-bold text-white mb-5 flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4 text-accent" /> Quick Links
              </h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/dashboard/bookings" className="flex items-center justify-between p-3 rounded-xl hover:bg-bg-hover text-text-secondary hover:text-white transition-colors border border-transparent hover:border-border font-body text-sm">
                    <span className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-text-muted" /> My Bookings</span>
                    <span className="text-text-muted">→</span>
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/profile" className="flex items-center justify-between p-3 rounded-xl hover:bg-bg-hover text-text-secondary hover:text-white transition-colors border border-transparent hover:border-border font-body text-sm">
                    <span className="flex items-center gap-2"><Settings className="w-4 h-4 text-text-muted" /> Edit Profile</span>
                    <span className="text-text-muted">→</span>
                  </Link>
                </li>
                <li className="pt-2 mt-2" style={{ borderTop: '1px solid rgba(42,63,45,0.4)' }}>
                  <Link href="/treks" className="flex items-center justify-between p-3 rounded-xl bg-accent/10 hover:bg-accent/20 text-accent transition-colors border border-accent/20 font-sub font-semibold text-sm">
                    <span>Explore New Treks</span>
                    <span>→</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
