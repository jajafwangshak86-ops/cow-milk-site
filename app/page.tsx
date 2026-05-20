import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  HeroSection, TrustBanner, PartnersSection, StatsSection, FeaturesSection,
  ProductsSection, HowItWorksSection, BlockchainCTA, TestimonialsSection,
  FAQSection, CTASection, NewsletterSection,
} from "@/components/home";

export default function Home() {
  return (
    <main className="bg-[#f6f3ee] font-sans text-gray-800 overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <TrustBanner />
      <PartnersSection />
      <StatsSection />
      <FeaturesSection />
      <ProductsSection />
      <HowItWorksSection />
      <BlockchainCTA />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
