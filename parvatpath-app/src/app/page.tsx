import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import FeaturedTreks from '@/components/home/FeaturedTreks';
import TrekCategories from '@/components/home/TrekCategories';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Testimonials from '@/components/home/Testimonials';
import MediaSection from '@/components/home/MediaSection';
import NewsletterSection from '@/components/home/NewsletterSection';

export default function Home() {
  return (
    <div className="bg-bg-primary text-text-primary min-h-screen">
      <HeroSection />
      <StatsSection />
      <FeaturedTreks />
      <TrekCategories />
      <WhyChooseUs />
      <Testimonials />
      <MediaSection />
      <NewsletterSection />
    </div>
  );
}
