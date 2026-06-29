import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Compass } from 'lucide-react';
import Link from 'next/link';

export default function CharDhamPage() {
  const shrines = [
    {
      name: 'Yamunotri Dham',
      desc: 'The source of the Yamuna River, dedicated to Goddess Yamuna. Portals open on Akshaya Tritiya (May) and close on Yama Dwitiya (November).',
      altitude: '10,797 ft',
      trek: '6 km trek from Janki Chatti',
    },
    {
      name: 'Gangotri Dham',
      desc: 'Seat of Goddess Ganga. The river Bhagirathi originates from Gaumukh glacier, located 19 km further up from the shrine.',
      altitude: '10,200 ft',
      trek: 'Accessible directly by road',
    },
    {
      name: 'Kedarnath Dham',
      desc: 'One of the twelve Jyotirlingas, dedicated to Lord Shiva, nestled in the Mandakini valley near the Kedar dome.',
      altitude: '11,750 ft',
      trek: '16 km trek from Gaurikund',
    },
    {
      name: 'Badrinath Dham',
      desc: 'Dedicated to Lord Vishnu, located along the Alaknanda river, flanked by Nar and Narayan mountain ranges.',
      altitude: '10,279 ft',
      trek: 'Accessible directly by road',
    },
  ];

  return (
    <div className="bg-bg-primary text-text-primary min-h-screen pb-20 font-body">
      {/* Hero */}
      <section className="relative py-20 px-6 text-center bg-bg-card/45 border-b border-border/40">
        <div className="max-w-3xl mx-auto space-y-4">
          <Badge variant="warning" className="text-xs py-1 px-3 uppercase tracking-wider font-semibold">
            🕉️ Holy Himalayan Pilgrimage
          </Badge>
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight">
            Char Dham Yatra Uttarakhand
          </h1>
          <p className="text-text-secondary text-sm md:text-base leading-relaxed">
            A spiritual yatra to the four holy shrines located in the Garhwal Himalayas. Safe logistics, verified biometric registrations, and comfortable stays.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* Intro */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4 text-text-secondary text-sm md:text-base leading-relaxed">
            <h2 className="font-heading text-2xl font-bold text-text-primary">
              Plan Your Sacred Yatra in 2026
            </h2>
            <p>
              The Char Dham Yatra is one of the most auspicious pilgrimages in India. Traveling through deep valleys, high ridges, and sacred prayags, the journey covers four ancient temples of high spiritual energy.
            </p>
            <p>
              At Parvatpath, we manage the entire yatra logistics. We provide AC vehicles, pre-booked premium cottages, local tour managers, and complete bio-metric/registration compliance support so you can focus entirely on your worship.
            </p>
          </div>
          <div
            className="h-72 rounded-2xl bg-cover bg-center border border-border/80"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800')",
            }}
          />
        </div>

        {/* Shrines grid */}
        <div className="space-y-8">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-center text-text-primary">
            The Four Holy Shrines
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {shrines.map((shrine) => (
              <Card key={shrine.name} hover={false} className="bg-bg-card border border-border p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-heading text-lg font-bold text-text-primary">{shrine.name}</h3>
                  <Badge variant="warning">{shrine.altitude}</Badge>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">{shrine.desc}</p>
                <div className="text-xs font-semibold text-accent flex items-center gap-2">
                  <Compass className="w-4 h-4 shrink-0" /> {shrine.trek}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Package redirect box */}
        <div className="bg-bg-card border border-border p-8 md:p-12 rounded-2xl text-center space-y-6 max-w-4xl mx-auto">
          <h3 className="font-heading text-2xl font-bold text-text-primary">Ready to Book Your Yatra?</h3>
          <p className="text-text-secondary text-sm max-w-lg mx-auto leading-relaxed">
            Browse our complete 10-day Char Dham Road Package starting from Haridwar, featuring premium stays and VIP Darshan assistance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/tours/char-dham-yatra-package"
              className="bg-accent hover:bg-accent-hover text-white text-xs font-extrabold uppercase tracking-wider py-3.5 px-7 rounded-full transition-all"
            >
              View Road Package
            </Link>
            <Link
              href="/treks/kedarnath-trek"
              className="bg-bg-hover hover:bg-border text-text-primary border border-border text-xs font-extrabold uppercase tracking-wider py-3.5 px-7 rounded-full transition-all"
            >
              Kedarnath Trek details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
