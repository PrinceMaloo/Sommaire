import Image from 'next/image';
import { Button } from '@/components/ui/button';
import HeroSection from '@/components/home/hero-section';
import DemoSection from '@/components/home/demo-section';
import HowItWorksSection from '@/components/home/howitworks-section';
import PricingSection from '@/components/home/pricing-section';
import CTASection from '@/components/home/cta-section';

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <DemoSection />
      <HowItWorksSection />
      <PricingSection />
      <CTASection />
    </div>
  );
}
