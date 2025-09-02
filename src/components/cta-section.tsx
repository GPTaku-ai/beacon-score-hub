import { Button } from "@/components/ui/button";

export const CTASection = () => {
  const scrollToFAQ = () => {
    const faqSection = document.getElementById('faq-section');
    faqSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToRequirements = () => {
    const requirementsSection = document.getElementById('requirements-section');
    requirementsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-mc mx-auto px-6 text-center">
        <div className="space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            더 궁금한 점이 있으신가요?
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline"
              size="lg"
              className="px-8 py-3 text-base font-medium border-foreground text-foreground hover:bg-foreground hover:text-background"
              onClick={scrollToRequirements}
            >
              챌린지 상세
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="px-8 py-3 text-base font-medium border-foreground text-foreground hover:bg-foreground hover:text-background"
              onClick={scrollToFAQ}
            >
              FAQ 전체보기
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};