import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturedCollections } from "@/components/home/featured-collections";
import { CampaignSection } from "@/components/home/campaign-section";
import { BrandStory } from "@/components/home/brand-story";
import { InstagramGrid } from "@/components/home/instagram-grid";
import { NewsletterSection } from "@/components/home/newsletter-section";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturedCollections />
      <CampaignSection />
      <BrandStory />
      <InstagramGrid />
      <NewsletterSection />
      <Footer />
    </>
  );
}
