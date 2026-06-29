import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Mountain } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { num: '15,000+', label: 'Happy Trekkers' },
    { num: '50+', label: 'Trek Routes' },
    { num: '5.0★', label: 'Google Rating' },
    { num: '10+', label: 'Years Experience' },
  ];

  const team = [
    { name: 'Vikas Uniyal', role: 'Founder & Chief Explorer', exp: '15+ Years mountaineering experience, NIM certified.' },
    { name: 'Pradeep Semwal', role: 'Lead Operations Manager', exp: '10+ Years managing base camps and rescue protocols.' },
    { name: 'Aman Negi', role: 'Head Mountain Guide', exp: 'Search & rescue qualified, certified by HMI Darjeeling.' },
    { name: 'Dr. Sandeep Rawat', role: 'Medical Support Officer', exp: 'Specialist in wilderness medicine & AMS diagnostics.' },
  ];

  const certifications = [
    'Uttarakhand Tourism Department',
    'IMF (Indian Mountaineering Foundation)',
    'StartupIndia Certified',
    'MSME Registered',
    'ATOAI Active Member',
  ];

  return (
    <div className="bg-bg-primary text-text-primary min-h-screen pb-20 font-body">
      {/* Mini Hero */}
      <section className="relative py-20 px-6 text-center bg-bg-card/45 border-b border-border/40">
        <div className="max-w-3xl mx-auto space-y-4">
          <Mountain className="w-12 h-12 text-accent mx-auto" />
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight">Our Story & Mission</h1>
          <p className="text-text-secondary text-sm md:text-base leading-relaxed">
            Parvatpath was founded in the heart of Dehradun, Uttarakhand, to revolutionize how outdoor lovers discover and book Himalayan adventures.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Core details / story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4 leading-relaxed text-sm md:text-base text-text-secondary">
            <h2 className="font-heading text-2xl font-bold text-text-primary">
              Direct, Safe, and Certified Adventure Journeys
            </h2>
            <p>
              Himalayan trekking companies historically relied on unstructured WhatsApp calls or high-commission OTAs to manage operations. We built Parvatpath to put travelers directly in touch with local certified teams, removing 10–15% commission losses and ensuring bookings are instantly registered.
            </p>
            <p>
              Every trek and Char Dham package is designed and led by NIM/HMI certified mountaineers. Safety is not a checkbox for us—it is the core of our business, featuring medical tents and diagnostic equipment on all high-altitude passes.
            </p>
          </div>
          <div
            className="h-72 rounded-2xl bg-cover bg-center border border-border/80"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800')",
            }}
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
          {stats.map((stat, idx) => (
            <Card key={idx} hover={false} className="text-center p-6 bg-bg-card/60">
              <div className="font-heading text-3xl md:text-4xl font-extrabold text-accent mb-1">{stat.num}</div>
              <div className="text-text-secondary text-xs uppercase tracking-wider font-semibold">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Certifications list */}
        <div className="bg-bg-card/40 border border-border p-8 rounded-2xl space-y-6 text-center">
          <h3 className="font-heading text-xl font-bold text-text-primary">
            Approved & Recognized By
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {certifications.map((cert) => (
              <Badge key={cert} variant="default" className="text-xs py-1.5 px-4 font-semibold">
                ✓ {cert}
              </Badge>
            ))}
          </div>
        </div>

        {/* Team list */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-2">
              Meet the Expedition Directors
            </h2>
            <p className="text-text-secondary text-sm max-w-xl mx-auto">
              Our guides are certified mountaineers trained in high altitude emergency response and safety drills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <Card key={idx} className="flex flex-col gap-4 text-center items-center">
                <div className="w-16 h-16 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center font-heading font-extrabold text-xl text-accent">
                  {member.name.split(' ').map((p) => p[0]).join('')}
                </div>
                <div>
                  <h4 className="font-heading font-bold text-text-primary text-sm">{member.name}</h4>
                  <p className="text-accent text-[11px] font-semibold mt-0.5">{member.role}</p>
                </div>
                <p className="text-text-secondary text-xs leading-relaxed">{member.exp}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center bg-gradient-to-r from-accent/10 to-transparent border border-accent/20 p-8 rounded-2xl space-y-4 max-w-3xl mx-auto">
          <h3 className="font-heading text-xl font-bold text-text-primary">Join the Climbing Family</h3>
          <p className="text-text-secondary text-sm leading-relaxed max-w-xl mx-auto">
            Ready to explore? Register for our upcoming winter expeditions or plan a holy yatra with your family.
          </p>
          <a
            href="/treks"
            className="inline-block bg-accent hover:bg-accent-hover text-white text-xs font-extrabold uppercase tracking-wider py-3 px-6 rounded-full transition-all"
          >
            Explore Available Treks
          </a>
        </div>
      </div>
    </div>
  );
}
