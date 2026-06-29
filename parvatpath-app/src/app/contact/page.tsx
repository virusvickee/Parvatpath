'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MapPin, Phone, Mail, MessageSquare, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'Trek',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setSubmitted(true);
      // In Phase 2, this calls /api/enquiry
    }
  };

  const whatsappUrl = 'https://wa.me/919634923602?text=Hi+Parvatpath!+I+want+to+know+more+about+your+upcoming+treks.';

  return (
    <div className="bg-bg-primary text-text-primary min-h-screen pb-20 font-body">
      {/* Header */}
      <section className="py-16 px-6 text-center bg-bg-card/45 border-b border-border/40">
        <h1 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight">Contact Our Experts</h1>
        <p className="text-text-secondary text-sm md:text-base mt-2 max-w-xl mx-auto">
          Need custom pricing for group packages or yatra planning? Reach out directly and get a quote within 2 hours.
        </p>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Form */}
        <div>
          {submitted ? (
            <Card hover={false} className="bg-green-500/10 border border-green-500/20 text-green-400 p-8 text-center space-y-4 rounded-2xl animate-fade-up">
              <CheckCircle className="w-12 h-12 mx-auto" />
              <h3 className="font-heading text-2xl font-bold text-text-primary">Enquiry Submitted!</h3>
              <p className="text-sm text-text-secondary leading-relaxed max-w-md mx-auto">
                Thank you for contacting Parvatpath. Our trek coordinator will call or email you with the yatra itinerary shortly.
              </p>
              <Button onClick={() => setSubmitted(false)} size="sm" className="mt-4">
                Submit Another Inquiry
              </Button>
            </Card>
          ) : (
            <Card hover={false} className="bg-bg-card border border-border p-6 md:p-8 rounded-2xl space-y-6">
              <h2 className="font-heading text-xl font-bold text-text-primary">Send an Enquiry</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-secondary uppercase">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter name"
                      className="w-full bg-bg-primary border border-border focus:border-accent text-text-primary px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-secondary uppercase">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Enter phone"
                      className="w-full bg-bg-primary border border-border focus:border-accent text-text-primary px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-secondary uppercase">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter email"
                    className="w-full bg-bg-primary border border-border focus:border-accent text-text-primary px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-secondary uppercase">Interested In</label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full bg-bg-primary border border-border text-text-primary text-sm px-4 py-2.5 rounded-lg focus:border-accent outline-none"
                  >
                    <option value="Trek">Himalayan Trekking</option>
                    <option value="Tour">Leisure Tours</option>
                    <option value="Char-Dham">Char Dham Yatra</option>
                    <option value="Other">Corporate / Custom Outings</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-secondary uppercase">Message Details</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about group size, travel dates, and requirements..."
                    className="w-full bg-bg-primary border border-border focus:border-accent text-text-primary px-4 py-2.5 rounded-lg text-sm outline-none transition-all resize-none"
                  />
                </div>

                <Button type="submit" className="w-full">
                  Submit Details
                </Button>
              </form>
            </Card>
          )}
        </div>

        {/* Right Info */}
        <div className="space-y-8 flex flex-col justify-between">
          <Card hover={false} className="bg-bg-card border border-border p-6 rounded-xl space-y-4">
            <h3 className="font-heading text-lg font-bold text-text-primary">Contact Coordinates</h3>
            <div className="space-y-3.5 text-sm text-text-secondary">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span>IT Park, Sahastradhara Road, Dehradun, Uttarakhand, 248001</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <span>+91 96349 23602, +91 94561 02882</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <span>info@parvatpath.com, bookings@parvatpath.com</span>
              </div>
            </div>
          </Card>

          {/* Large WhatsApp CTA */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-green-500 hover:bg-green-600 border border-green-600/30 text-white rounded-xl p-5 shadow-lg shadow-green-500/10 transition-transform hover:-translate-y-0.5 active:translate-y-0 group"
          >
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-extrabold text-base text-white">Chat instantly with Yatra Leads</h4>
              <p className="text-white/80 text-xs font-semibold mt-0.5">Response time: under 5 minutes</p>
            </div>
          </a>

          {/* Google Maps placeholder */}
          <div className="bg-bg-card border border-border rounded-xl h-48 overflow-hidden relative flex items-center justify-center p-6 text-center text-xs text-text-muted">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400')",
              }}
            />
            <div className="relative z-10 space-y-1">
              <MapPin className="w-6 h-6 text-accent mx-auto" />
              <h4 className="font-heading font-bold text-text-primary text-sm">Uttarakhand Office Location</h4>
              <p className="max-w-[200px] mx-auto text-text-secondary mt-1">Sahastradhara Road, IT Park Complex, Dehradun</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
