import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { CoreInfoSection } from "@/components/core-info-section";
import { ProcessFlowSection } from "@/components/process-flow-section";
import { TimelineSection } from "@/components/timeline-section";
import { RequirementsSection } from "@/components/requirements-section";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CoreInfoSection />
        <ProcessFlowSection />
        <TimelineSection />
        <RequirementsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
