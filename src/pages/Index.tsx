import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { CoreInfoSection } from "@/components/core-info-section";
import { TimelineSection } from "@/components/timeline-section";
import { RequirementsSection } from "@/components/requirements-section";
import { FAQSection } from "@/components/faq-section";
import { Footer } from "@/components/footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CoreInfoSection />
        <TimelineSection />
        <RequirementsSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
