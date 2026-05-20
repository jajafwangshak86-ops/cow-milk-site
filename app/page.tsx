import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  HeroSection, TrustBanner, FeaturesSection, ProductsSection,
  HowItWorksSection, BlockchainCTA, TestimonialsSection, CTASection,
  NewsletterSection,
} from "@/components/home";

export default function Home() {
  return (
    <main className="bg-[#f6f3ee] font-sans text-gray-800 overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <TrustBanner />
      <FeaturesSection />
      <ProductsSection />
      <HowItWorksSection />
      <BlockchainCTA />
      <TestimonialsSection />
      <CTASection />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
