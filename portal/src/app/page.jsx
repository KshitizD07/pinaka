import Hero from '@/components/sections/Hero';
import StatsBar from '@/components/sections/StatsBar';
import PortfolioGrid from '@/components/sections/PortfolioGrid';
import ManifestoStrip from '@/components/sections/ManifestoStrip';
import FoundryIntake from '@/components/sections/FoundryIntake';

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <PortfolioGrid />
      <ManifestoStrip />
      <FoundryIntake />
    </>
  );
}
